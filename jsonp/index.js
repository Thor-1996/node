//告诉Node.js引入http模块给该服务器应用使用
var http = require("http");

//引入url模块解析url字符串
var url = require("url");
//引入querystring模块处理query字符串
var querystring = require("querystring");
//创建新的HTTP服务器
var server = http.createServer();
//通过request事件来响应request请求
server.on("request", function (req, res) {
  var urlPath = url.parse(req.url).pathname;
  var qs = querystring.parse(req.url.split("?")[1]);
  if (urlPath === "/jsonp") {
    res.writeHead(200, { "Content-Type": "application/json;charset=utf-8" });
    var data = {
      name: "艾斯比",
    };
    data = JSON.stringify(data);
    var callback = qs.qq + "(" + data + ");";
    console.log(callback);
    res.end(callback);
  } else {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });
    res.end("你好");
  }
});
//监听8080端口
server.listen('8083');
//用于提示我们服务器启动成功
console.log("Server running!");
