// 顶部导航
var top_nav = document.getElementsByClassName("top_nav")[0];
var ul_top = document.getElementsByClassName("top_one")[0];
var li_top = ul_top.children;

CreatAjax({
    "type":"get",
    "url":"../data2.json",
    "success":function(data){
        nav(JSON.parse(data));
    }
})

// 顶部导航栏部分
function nav(data) {
    var html1=template("a",data)
    ul_top.innerHTML=html1

    var str = "";
    for(var i = 0;i<data.top_nav.length;i++) {
        str += "<li><a href='#'>" +data.top_nav[i].title+ "</a></li>";
        if(data.top_nav[i].child != undefined) {
            var str1 = "";
            str1 = "<div class=\"child1\"><a href='#'>" +data.top_nav[i].child[0].title+ "</a><a href='#'>" +data.top_nav[i].child[0].title1+ "</a></div>";
        } 
        if(data.top_nav[i].child1 != undefined) {
            var str2 = "";
            str2 = "<div class=\"col_child clearfix\"><img src=\"" +data.top_nav[i].child1[0].imgsrc+ "\"><p class=\"p1\">" +data.top_nav[i].child1[0].title1+ "</p><p class=\"p2\">" +data.top_nav[i].child1[0].title2+ "</p></div>";
        }     
    }
    ul_top.innerHTML = str;
    li_top[1].innerHTML += "<img src=\"./image/ujyx_13.jpg\">" + str1;
    li_top[li_top.length-1].innerHTML = "<li class=\"col\"><a href='#'>APP下载</a>" +str2+ "</li>";

    for(var i = 0;i<li_top.length;i++) {
        li_top[i].index = i;
        li_top[i].onmouseover = function() {
            var a1 = this.children[0];
            var div = this.getElementsByTagName("div")[0]
            a1.style.color = "red";
            if(div) {
                div.style.display = "block";
            }
        }
        li_top[i].onmouseout = function() {
            var a1 = this.children[0];
            var div = this.getElementsByTagName("div")[0]
            a1.style.color = "";
            if(div) {
                div.style.display = "none";
            }
        }
    }
}

var top_child = top_nav.children;

var right1 = top_child[2];
var search = right1.getElementsByClassName("search")[0];
var se_child = search.children;
var sao = right1.getElementsByClassName("sao")[0];
var sa_child = sao.children;

se_child[1].onmouseover = function() {
    se_child[0].style.visibility = "visible";
}
right1.onclick = function() {
    se_child[0].style.visibility = "hidden";
}
sa_child[0].onmouseover = function() {
    sa_child[1].style.display = "block"
}
sa_child[0].onmouseout = function() {
    sa_child[1].style.display = "none"
}

// 表单区域
var form1 = document.getElementById("form1");
var input = form1.getElementsByTagName("input");
var span =  form1.getElementsByTagName("span");
var pattern = /^1[3|4|5|6|7|8|9]\d{9}$/
// 手机号的判断
input[0].onblur = CreatTel;
function CreatTel() {
    // 非空检测
    if(input[0].value == "") {
        span[0].innerText = "请输入手机！"
        span[0].style.color = "rgb(153,153,153)"
        return false;
    // 手机号格式的检测
    }else if(pattern.test(input[0].value) == false) {
        span[0].innerText = "账号格式不正确！"
        span[0].style.color = "orange";
        return false;
    }else {
        span[0].innerHTML = " <img src='./image/offcn_img15.jpg'>"
        span[0].style.color = "orange";
    }
    return true;
}

// 密码的判断
input[1].onblur = CreatPass;
function CreatPass() {
    var pattern = /^[A-Z][a-z0-9]{5,19}$/
    // 非空检测
    if(input[1].value == "") {
        span[1].innerText = "请输入密码！";
        span[1].style.color = "rgb(153,153,153)";
        return false;
    // 密码格式检测
    }else if(pattern.test(input[1].value) == false) {
        span[1].innerText = "密码6-20位且首位须大写！";
        span[1].style.color = "orange";
        return false;
    // 密码强度检测
    }else if(input[1].value.length >= 12) {
        span[1].innerText = "密码强度：强√";
        span[1].style.color = "orange";
    }else if(input[1].value.length >= 9) {
        span[1].innerText = "密码强度：中√";
        span[1].style.color = "orange";
    }else if(input[1].value.length >= 6) {
        span[1].innerText = "密码强度：弱√";
        span[1].style.color = "orange";
    }
    return true;
}

// 确认密码部分
input[2].onblur = CreatTrue;
function CreatTrue() {
    // 非空检测
    if(input[2].value == "") {
        span[2].innerText = "请再次输入密码！";
        span[2].style.color = "rgb(153,153,153)";
        return false;
    // 检测两次密码是否一致
    }else if(input[2].value != input[1].value) {
        span[2].innerText = "两次密码不一致！";
        span[2].style.color = "orange";
        return false;
    }else {
        span[2].innerHTML = " <img src='./image/offcn_img15.jpg'>"
        span[2].style.color = "orange";
    }
    return true;
}

// 验证码部分
// 获取验证码
var s1 = document.getElementsByClassName("s1")[0];
s1.onclick = function() {
    var str = "0123456789";
    var str1 = "";
    for(var i = 0;i<5;i++) {
        var index = Math.floor(Math.random() * str.length);
        str1 += str[index];
    }
    s1.innerText = str1;
}

input[3].onblur = CreatYan;
function CreatYan() {
    // 非空检测
    if(input[3].value == "") {
        span[3].innerText = "请输入验证码";
        span[3].style.color = "rgb(153,153,153)";
        return false;
    // 检测输入与验证的值是否一致
    }else if(input[3].value != s1.innerText) {
        span[3].innerText = "输入不正确！";
        span[3].style.color = "orange";
        return false;
    }else {
        span[3].innerHTML = " <img src='./image/offcn_img15.jpg'>"
        span[3].style.color = "orange";
    }
    return true;
}
input[3].onfocus = function() {
    span[3].innerText = "";
}

// 注册部分
var btn = form1.getElementsByTagName("button")[0];
btn.onclick = function() {
    if(CreatTel() && CreatPass() && CreatYan()) {
        alert("用户注册成功！");
        form1.submit();
        return true;
    }else {
        alert("注册失败！");
        return false;
    }
}