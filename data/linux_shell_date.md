记得曾经写脚本按照天为单位进行循环，循环的其实日期可以是任何一天，像这样：  

```shell
START_DAY=$(date -d "$TODAY -1days" +%Y%m%d);
END_DAY=$(date -d "$TODAY -${cycle}days" +%Y%m%d);
for((;$END_DAY<=$START_DAY; END_DAY=$(date -d "$END_DAY +1days" +%Y%m%d)))
do
　　...
done
```
　　$TODAY是外界传入的时间参数，比如20141222；cycle是一个整数，表示希望循环的天数，比如一个月 30。然后再循环的时候对END_DAY每次加一天，加够30次后，循环终止.  
　　现在突然需要按照10分钟的时间片段循环。本以为\`date -d "201412021311 +10minutes" +%H:%M\`这样的方式可以凑效的，却发现这样写不行。试来试去，写作这样\`date -d "20141202 1311 +10minutes" +%H:%M\`才凑效，感觉这样很奇葩。改造了一下，只在一天内进行循环  
```shell
startpoint=0000;
endpoint=0010;
for((i=1;i<=144;i++))
do
startpoint_format=`date -d "$startpoint" +%H:%M;`
endpoint_format=`date -d "$endpoint" +%H:%M;`
...
startpoint=`date -d "$startpoint +10minutes" +%H%M;`
endpoint=`date -d "$endpoint +10minutes" +%H%M;`
done
```
这样看来还不错：）还可以按照时间戳增减来做循环，没有这个看着舒心：）

