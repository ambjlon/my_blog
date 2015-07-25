# mapreduce实现二次排序时, SortComparator GroupComparator PartitionComparator都有什么作用?
+ SortComparator(早前的hadoop称作KeyComparator)定义了map的输出数据按照Key进行排序的规则. 实现二次排序的时候会定义复合key, SortComparator一般定义先按照第一关键字排序, 第一关键字一样的情况下按照第二关键字排序. mapper输出的内容向磁盘写入, 以及mapper端多个partition之间的merge, reducer端来自不同mapper的数据merge的时候都要调用SortComparator.
+ 在shuffle结束后, 输入到一个Reducer(JVM)的数据已经准备好, 可能存放在磁盘或者内存中, 而且是按照SortComparator定义的规则排好序了. 对于一个Key值, Reducer Method会被调用一次. GroupComparator就是用来定义怎么算是相同的Key. **既然已经按照Key做好排序了, 那么每当发现第一关键字发生变化时就调用一词Reducer method就可以了, 为什么还要定义GroupComparator. 估计hadoop框架在实现的时候不会做这么复杂的控制, 留一个Key相同定义的接口给用户是很自然的.**  还可以进一步参考第二个问题的解释.
+ PartitionComparator的功能很简单, 就是实现hash映射的, 数据按照某种hash规则映射到不同的Reducer进行处理. 相同的Key会被send到同一个Reducer(JVM), send到同一个Reducer的数据可能是很多种Key.
+ 这三个类发生作用的先后顺序: PartitionComparator-->SortComparator-->GroupComparator. PartitionComparator和SortComparator应该是在mapper的输出时在内存差不多同时调用的.

# 为什么在mapreduce过程中要不断的依据Key进行排序?
+ 首先当没有Reducer的时候, mapper的输出不会进行排序.
+ 排序是为了后面Reducer加快处理速度. 对Key进行排序后, 同一Group的数据会紧挨在一起, 这会加快Reducer的处理速度. 假设Key是一个三元组, 按照前两个Key进行排序, 再按照第三个关键字进行Group, 这样奇葩的使用貌似不会因为shuffle&merge中的排序而加速Reducer的处理过程. 可以做一下验证.

# 参考
1. http://stackoverflow.com/questions/16184745/what-is-difference-between-sort-comparator-and-group-comparator-in-hadoop
2. http://dailyhadoopsoup.blogspot.com/2014/01/shuffle-and-sort.html
3. http://www.dummies.com/how-to/content/the-shuffle-phase-of-hadoops-mapreduce-application.html
4. http://stackoverflow.com/questions/22141631/what-is-the-purpose-of-shuffling-and-sorting-phase-in-the-reducer-in-map-reduce
5. http://stackoverflow.com/questions/24771006/is-the-output-of-map-phase-of-the-mapreduce-job-always-sorted
6. Mapreduce: definitive guide
