const ajax = {
  get: function (url, onsuccess, onerror) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, false);
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200 || xhr.status == 304) {
          onsuccess(xhr.response);
        } else {
          onerror(xhr.response);
        }
      }
    };

    xhr.send();
  },
  post: function (url, params = {}, onsuccess, onerror) {
    const xhr = new XMLHttpRequest();
    xhr.open("post", url, false);
    xhr.setRequestHeader(
      "Content-Type",
      "multipart/form-data; boundary=------WebKitFormBoundarywCIQp7LGd0ScAbsZ"
    );
    // xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8')
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        if (xhr.status == 200 || xhr.status == 304) {
          onsuccess(xhr.response);
        } else {
          onerror(xhr.response);
        }
      }
    };
    console.log(params);
    var formData = new FormData();
    Object.keys(params).forEach((item) => {
      formData.append(item, encodeURI(encodeURI(params[item])));
    });
    xhr.send(formData);
  },
};

// ajax.post(`http://127.0.0.1:8083/uploadfile`,  { fileName, fileObj }, function (res) {
//   console.log(res,'正确')
// },function(err) {
//   console.log(err,'错误xinxi')
// })
