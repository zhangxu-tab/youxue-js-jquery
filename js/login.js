// 顶部导航
var top_nav = document.getElementsByClassName("top_nav")[0];
var ul_top = document.getElementsByClassName("top_one")[0];
var li_top = ul_top.children;

CreatAjax({
    "type":"get",
    "url":"../data1.json",
    "success":function(data){
        nav(JSON.parse(data));
        dong(JSON.parse(data));
        cont(JSON.parse(data));
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

// 微信微博效果
var content = document.getElementsByClassName("content")[0];
var right = content.getElementsByClassName("right")[0];
var img = right.getElementsByTagName("img");
function dong(data) {
    for(var i = 0;i<img.length;i++) {
        img[i].index = i;
        img[i].onmouseover = function() {
            this.src = data.way.src1[this.index].src;
        }
        img[i].onmouseout = function() {
            this.src = data.way.src2[this.index].src;
        }
    }
}

// 表单部分
var form2 = document.getElementById("form2");
var input = form2.getElementsByTagName("input");
var span = form2.getElementsByTagName("span");

// 手机号的判断
input[0].onblur = CreatTel;
function CreatTel() {
    var pattern = /^1(3|5|7|8)\d{9}$/
    // 非空检测
    if(this.value == "") {
        span[0].innerText = "请输入手机！"
        span[0].style.color = "rgb(153,153,153)"
        return false;
    // 手机号格式的检测
    }else if(pattern.test(this.value) == false) {
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
    if(this.value == "") {
        span[1].innerText = "请输入密码！";
        span[1].style.color = "rgb(153,153,153)";
        return false;
    // 密码格式检测
    }else if(pattern.test(this.value) == false) {
        span[1].innerText = "密码6-20位且首位须大写！";
        span[1].style.color = "orange";
        return false;
    // 密码强度检测
    }else if(this.value.length >= 12) {
        span[1].innerText = "密码强度：强√";
        span[1].style.color = "orange";
    }else if(this.value.length >= 9) {
        span[1].innerText = "密码强度：中√";
        span[1].style.color = "orange";
    }else if(this.value.length >= 6) {
        span[1].innerText = "密码强度：弱√";
        span[1].style.color = "orange";
    }
    return true;
}

function cont(data) {
    var btn = form2.getElementsByTagName("button")[0];
    btn.onclick = function() {
        //JSON.stringify() 方法用于将 JavaScript 值转换为 JSON 字符串
        var str = JSON.stringify(data.denglu);
        localStorage.arr = str;

        //创建一个比对的假设条件，假设登录不成功
        var tag = false;
        for(var i = 0;i<data.denglu.length;i++) {
            //如果模拟数据中的用户名以及密码都和用户填写的值完全一致，就修改状态为 true
            if(data.denglu[i].phone == input[0].value && data.denglu[i].pass == input[1].value) {
                tag = true;
                //只要有符合要求的条件值，就跳出整体循环
                break;
            } 
        }
        if(tag == true) {
            alert("用户登录成功");
            form2.submit();
            return true;
        }else {
            alert("用户登录失败");
            return false;
        }
    }
}