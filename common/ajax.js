function CreatAjax(json) {
    // 2、创建ajax对象
    if(window.XMLHttpRequest) {
        var ajax = new XMLHttpRequest();
    }else {
        var ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    // 3、打开请求并发送请求
    if(json.type == "get") {
        var url = json.data ? json.url+"?"+json.data : json.url;
        ajax.open("get",url,true);
        ajax.send();
    }else {
        ajax.open("post",json.url,true);
        ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
        ajax.send(json.data);
    }
    // 4、数据库省略
    // 5、响应数据
    ajax.onreadystatechange = function() {
        if(ajax.readyState == 4 && ajax.status == 200) {
            // 请求成功
            json.success && json.success(ajax.responseText);
        }else {
            // 请求失败
            json.error && json.error();
        }
    }
}