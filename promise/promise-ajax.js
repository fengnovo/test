function ajax(url = '', method = 'get', dataType = 'json', postData = {}){
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.responseType = dataType;
        xhr.onload = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(xhr.response);
            } else {
                reject(xhr);
            }
        };
        xhr.onerror = err => {
            reject(err);
        };
        if(method.toLocaleLowerCase() === 'post') {
            let postStr = Object.keys(postData).reduce((i1, i2) => i1 += `${i2}=${postData[i2]}&`, '');
            if (postStr) postStr.substr(0, postStr.length - 1);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(postStr);
        } else {
            xhr.send();
        }
    });
}
ajax('https://cnodejs.org/api/v1/topics','post', 'json', { page: 1, tab: 'ask', limit: 3}).then(data => {
    console.log(data);
}).catch(e => {
    console.log(e);
});
ajax('/api/v1/topic/5433d5e4e737cbe96dcef312').then(data => {
    console.log(data);
}).catch(e => {
    console.log(e);
});
/**
* xhr.readyState：XMLHttpRequest对象的状态，等于4表示数据已经接收完毕。
* xhr.status：服务器返回的状态码，等于200表示一切正常。
* xhr.responseText：服务器返回的文本数据
* xhr.responseXML：服务器返回的XML格式的数据
* xhr.statusText：服务器返回的状态文本。


跨域资源共享（CORS）
XMLHttpRequest可以向不同域名的服务器发出HTTP请求，叫做CORS
可以进行CORS有两个条件:
1)浏览器要支持CORS
2)服务器允许跨域：响应头需要添加一下选项

self.set_header('Access-Control-Allow-Origin', '*')
self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
self.set_header('Access-Control-Max-Age', 1000)
self.set_header('Access-Control-Allow-Headers', '*')
self.set_header('Content-type', 'application/json')
 */
// var xhr = new XMLHttpRequest();
// var url = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=github';
// var formdata = new FormData();
// formdata.append('username', 'xiaoming');
// formdata.append('password', '123456');
// xhr.onreadystatechange = function(){
//     if(xhr.readyState == 4 && xhr.status == 200){
//         console.log(xhr.statusText);
//     } else {
//         console.log(xhr.statusText);
//     }
// }
// xhr.open('POST', url);
// xhr.send();