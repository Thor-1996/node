var http = require("http"),
  formidable = require("formidable");
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
      var form = new formidable.IncomingForm();
      form.parse(req, function (err, fields, files) {
        if (err) {
          console.error(err.message);
          res.end(err);
          return;
        }

        client
          .put("image/" + fields.fileName, files.file.path)
          .then((r) => {
            console.log(r);
            res.end(r.url);
          })
          .catch((e) => {
            console.log(e, "失败");
            res.end("failure");
          });
      });
    }
  } catch (err) {
    res.end(err);
  }
});

server.listen("8083");
console.log("Server running at 8083 port!");
