var http = require("http");
var queryString = require("querystring");
const arr = [
  76,
  84,
  65,
  73,
  52,
  71,
  55,
  80,
  74,
  102,
  68,
  55,
  65,
  122,
  51,
  118,
  103,
  118,
  54,
  80,
  57,
  119,
  66,
  121,
];
const OSS = require("ali-oss");
const client = new OSS({
  region: "oss-cn-shenzhen",
  accessKeyId: arr.map((i) => String.fromCharCode(i)).join(""),
  accessKeySecret: "1t5f58Ji6HCLzwIbrWK1pl44DahxSS",
  bucket: "oss-zhao",
});

async function upload(fileName) {
  try {
    await client.put(fileName, new Buffer("hello world"));
    console.log("上传成功");
  } catch (e) {
    console.log(e, "上传错误的原因");
  }
}

const server = http.createServer();

server.on("request", function (req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Expose-Headers", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
    );

    if (req.url.indexOf("uploadfile") !== -1) {
      upload("text1.txt");
      let obj = null;
      let currentData = "";
      req.on("data", function (data) {
        console.log(data, "传来的数据");
        currentData += data;
        obj = queryString.parse(currentData);
        console.log(obj, "格式化后的数据");
      });

      res.end("success");
    }
  } catch (err) {
    res.end(err);
  }
});

server.listen("8083");
//用于提示我们服务器启动成功
console.log("Server running at 8083 port!");

// var fs=require("fs");

// http.createServer(function(req,res){
// 	res.writeHead(200,{"Content-type":"text/html;charset=UTF-8","Access-Control-Allow-Origin":"*"});
// 	if (req.method.toLowerCase()=="post") {
// 		//新建一个空数组接受流的信息
// 		var chunks=[];
// 		//获取长度
// 		let num=0;

// 		req.on("data",function(chunk){
// 			chunks.push(chunk);
// 			num+=chunk.length;
// 		});
// 		req.on("end",function(){
// 			//最终流的内容本体
// 			var buffer = Buffer.concat(chunks, num);
// 			//新建数组接收出去\r\n的数据下标
// 			let rems=[];
// 			//根据\r\n分离数据和报头
// 			for (var i = 0; i < buffer.length; i++) {
// 				let v=buffer[i];
// 				let v2=buffer[i+1];
// 			// 10代表\n 13代表\r
// 			if (v==13&&v2==10) {
// 				rems.push(i)
// 			}
// 		}
// 		//获取上传图片信息
// 		let picmsg_1 = buffer.slice(rems[0]+2,rems[1]).toString();
// 		console.log(picmsg_1);
// 		let filename = picmsg_1.match(/filename=".*"/g)[0].split('"')[1];
// 		console.log(filename);

// 		 //图片数据
// 		 var nbuf = buffer.slice(rems[3]+2,rems[rems.length-2]);
// 		 let address="./"+filename;
// 		 //创建空文件并写入内容
// 		 fs.writeFile(address,nbuf,function(err){
// 		 	if (err) {
// 		 		console.log(err);
// 		 	}else{
// 		 		console.log("创建成功")
// 		 	}
// 		 })

// 		})
// 		res.end();
// 	}
// }).listen(3000,"localhost")
