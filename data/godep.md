Godep工具不是golang官方的, 安装:  
go get github.com/tools/godep  
安装过程中可能会报错:  
package golang.org/x/tools/go/vcs: unrecognized import path "golang.org/x/tools/go/vcs"  
这是由于此网址被墙的原因. 解决办法:  

>you can use go get github.com/golang/tools, it's a mirror from https://godoc.org/golang.org/x/tools, then mkdir -p src/golang.org/x/ and copy src/github.com/golang/tools to src/golang.org/x/.
>It would work well behind GFW.

或者在linux下使用shadow socks代理.
