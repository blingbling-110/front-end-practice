跨域练习`hosts`配置：

`C:\Windows\System32\drivers\etc\hosts`

```shell
# For CORS practice
    127.0.0.1    source.domain.com
    127.0.0.1    target.domain.com
```

然后在`PowerShell`中调用`ipconfig /flushdns`命令刷新DNS解析
