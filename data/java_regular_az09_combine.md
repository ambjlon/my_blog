在一个输入字符串中查找“数字和字母以及空格的组合”，注意，是这三者同时出现，或者只有数字和字母同时出现而没有空格。  
比如:  
输入“hg 437 djj  第三款dufwf745 、dfn^894dk大姐夫iPhone 6s&&&&74854”  
输出：  
hg 437 djj  
dufwf745  
894dk  
iPhone 6s  
以下代码可以实现:
```java
String s = "hg 437 djj  第三款dufwf745 、dfn^894dk大姐夫iPhone 6s&&&&74854";
String pattern = "([A-Za-z]+\\s+[0-9]+[A-Za-z0-9\\s]*|[A-Za-z]+[0-9]+[A-Za-z0-9\\s]*|[0-9]+[A-Za-z]+[A-Za-z0-9\\s]*|[0-9]+\\s+[A-Za-z]+[A-Za-z0-9\\s]*)[^a-zA-Z0-9\\s]*";
Pattern r = Pattern.compile( pattern );
Matcher m = r.matcher( s );

ArrayList< String > p = new ArrayList<String>();
while(m.find())
{
    p.add( m.group(1) );
}
for( String e:p )
    System.out.println(e);
```
