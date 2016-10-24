### 常见工具
+ tcpdump 
+ tcpflow 
+ httpry 
+ tshark(wireshark命令行版)

### tshark
#### example
+ 使用tshark抓取输出80端口的数据包: tshark -i eth0 -f "port 80"
+ 只检测http协议: grep HTTP
+ -V 显示详情：  
  sudo tshark -i eth1  src net 10.10.40.138 and tcp port 8080 -V
+ sudo tshark -i eth0 src net 10.10.35.143 and not tcp port 22 and dst net 10.97.100.119 -V
#### 原理
1. tshark的过滤分为capture filture和display filter. capture filture过滤的语法和TCPdump基本一样。
2. wireshark的packet list的每个条目是一个物理层的frame。对应的packet detail会从tcp/ip的各个层对这个packet进行解析。
#### document
1. http://openmaniak.com/wireshark_filters.php
2. https://wiki.wireshark.org/CaptureFilters
3. https://www.wireshark.org/docs/wsug_html_chunked/
4. https://www.wireshark.org/docs/man-pages/tshark.html
  
