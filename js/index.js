// 顶部导航
var top_nav = document.getElementsByClassName("top_nav")[0];
var ul_top = document.getElementsByClassName("top_one")[0];
var li_top = ul_top.children;

CreatAjax({
    "type":"get",
    "url":"../data.json",
    "success":function(data){
        nav(JSON.parse(data));
        show(JSON.parse(data));
        hot(JSON.parse(data));
        online(JSON.parse(data));
        fee(JSON.parse(data));
        wok(JSON.parse(data));
        mid(JSON.parse(data));
        sid(JSON.parse(data));
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


// 中间图片部分
var banner = document.getElementsByClassName("banner")[0];
var ul = banner.getElementsByTagName("ul")[0];
var p = banner.getElementsByTagName("p")[0];
var span = banner.getElementsByTagName("span");
var left = banner.getElementsByClassName("left")[0];
var right = banner.getElementsByClassName("right")[0];
var n = 0;

// 中间图片的效果
function show(data) {
    var html2 = template("pict",data);
    ul.innerHTML = html2;
    // 将结构写在页面上
    var str = "";
    var str1 = "";
    for(var i = 0;i<data.banner.length;i++) {
        str += "<li><img src='" +data.banner[i].src+ "'></li>";
        str1 += "<span></span>";
    }
    ul.innerHTML = str;
    p.innerHTML = str1;
    span[0].className = "active";
    // 下面小圆点的效果
    for(var i = 0;i<span.length;i++) {
        span[i].index = i;
        span[i].onclick = function() {
            for(var j = 0;j<span.length;j++) {
                span[j].className = "";
            }
            this.className = "active";
            move(ul,"left",40,-1600*this.index,10);
            n = this.index;
        }
    }
    // 页面一加载的时候，图片的效果
    var timer = setInterval(autoNext,3000);
    function autoNext() {
        fn();
    }
    // 鼠标移入移出效果
    banner.onmouseover = function() {
        clearInterval(timer);
        left.style.display = "block";
        right.style.display = "block";
    }
    banner.onmouseout = function() {
        timer = setInterval(autoNext,3000);
        left.style.display = "none";
        right.style.display = "none";
    }
    left.onclick = function() {
        n--;
        if(n < 0) {
            n = data.banner.length - 1;
        }
        for(var i = 0;i<span.length;i++) {
            span[i].className = "";
        }
        span[n].className = "active";
        move(ul,"left",40,-1600*n,10);
    }
    right.onclick = function() {
        fn();
    }
    function fn() {
        n++;
        if(n == data.banner.length) {
            n = 0;
        }
        for(var i = 0;i<span.length;i++) {
            span[i].className = "";
        }
        span[n].className = "active";
        move(ul,"left",40,-1600*n,10);
    }
}

// 热门直播
var hot_box = document.getElementsByClassName("hot_box")[0];
var hot_left = hot_box.getElementsByClassName("left")[0];
var hot_right = hot_box.getElementsByClassName("right")[0];
var hot_ul = hot_right.getElementsByTagName("ul")[0];
var hot_li = hot_ul.getElementsByTagName("li");
var hot_box = hot_left.getElementsByClassName("box");
function hot(data) {
    var html3 = template("hot1",data);
    hot_left.innerHTML = html3;
    var htm4 = template("hot2",data);
    hot_ul.innerHTML = htm4;

    // 将内容写在页面上
    var str = "";
    var str1 = "";
    for(var i = 0;i<data.hotclass.left.length;i++) {
        str += "<div class='box'><img src='" +data.hotclass.left[i].src+ "'><div class='time'><img src='" +data.hotclass.left[i].timesrc+ "'>" +data.hotclass.left[i].title+ "</div><p>" +data.hotclass.left[i].infro+ "</p></div>"
        str1 += "<li><img src='" +data.hotclass.right[i].src+ "'><div class='date'>" +data.hotclass.right[i].year +data.hotclass.right[i].hour+ "</div><p>" +data.hotclass.right[i].tit+ "</p></li>";
    }
    hot_left.innerHTML = str;
    hot_ul.innerHTML = str1;
    // 鼠标滑动右边的li，改变左边的盒子
    for(var i = 0;i<hot_li.length;i++) {
        hot_li[i].index = i;
        hot_li[i].onmouseover = function() {
            for(var j = 0;j<hot_li.length;j++) {
                hot_li[j].className = "";
                hot_box[j].style.display = "none";
            }
            this.className = "active";
            hot_box[this.index].style.display = "block";
        }
    }
}
// 精品网课
var online1 = document.getElementsByClassName("onlineclass")[0];

function online(data) {
    var html5 = template("onl",data.onlineclass);
    online1.innerHTML = html5;

    var online1_tit = online1.getElementsByClassName("title")[0];
    var online1_box = online1.getElementsByClassName("online_box");
    online1_box[0].className = "online_box act";

    // 滑动效果 
    var lef = online1_tit.getElementsByClassName("lef")[0];
    var online_a = lef.getElementsByTagName("a");

    for(var i = 0;i<online_a.length;i++) {
        online_a[i].index = i;
        online_a[i].onmouseover = function() {
            for(var j = 0;j<online_a.length;j++) {
                online_a[j].className = "";
                online1_box[j].className = "online_box";
            }
            this.className = "active";
            online1_box[this.index].className = "online_box act";
        }
    }
}

var free = document.getElementsByClassName("freeclass")[0];
// 免费课程
function fee(data) {
    var html6 = template("fe",data.freeclass);
    free.innerHTML = html6;

    var free_left = free.getElementsByClassName("left")[0];
    var free_a = free_left.getElementsByTagName("a");
    var free_box = free.getElementsByClassName("free_box");
    free_box[0].className = "free_box active";
    for(var i = 0;i<free_a.length;i++) {
        free_a[i].index = i;
        free_a[i].onmouseover = function() {
            for(var j = 0;j<free_a.length;j++) {
                free_a[j].className = "";
                free_box[j].className = "free_box"
            }
            this.className = "active";
            free_box[this.index].className = "free_box active";
        }
    }
}
// 就业面授班
var work = document.getElementsByClassName("workclass")[0];
function wok(data) {
    var html7 = template("wok",data.workclass);
    work.innerHTML = html7;

    var work_left = work.getElementsByClassName("left")[0];
    var work_a = work_left.getElementsByTagName("a");
    var work_box = work.getElementsByClassName("work_box");
    work_box[0].className = "work_box active";
    for(var i = 0;i<work_a.length;i++) {
        work_a[i].index = i;
        work_a[i].onmouseover = function() {
            for(var j = 0;j<work_a.length;j++) {
                work_a[j].className = "";
                work_box[j].className = "work_box";
            }
            this.className = "active";
            work_box[this.index].className = "work_box active";
        }
    }
}

var center = document.getElementsByClassName("center")[0];
var center_text = center.getElementsByClassName("text")[0];
// 友情链接部分
function mid(data) {
    var html8 = template("lian",data.link);
    center_text.innerHTML = html8;

    var span = center_text.getElementsByTagName("span");
    var ul = center.getElementsByTagName("ul");
    for(var i = 0;i<span.length;i++) {
        span[i].index = i;
        span[i].onmouseover = function() {
            for(var j = 0;j<span.length;j++) {
                span[j].className = "";
                ul[j].className = "";
            }
            this.className = "active";
            ul[this.index].className = "act";
        }
    }
}

// 微信微博手机端悬停效果
var side = document.getElementsByClassName("side")[0];
var side_child = side.getElementsByClassName("child");
var side_img = side.getElementsByClassName("img");
function sid(data) {
    for(var i = 0;i<side_img.length;i++) {
        side_img[i].index = i;
        side_img[i].onmouseover = function() {
            this.src = data.way.src1[this.index].src;
            side_child[this.index].style.display = "block";
        }
        side_img[i].onmouseout = function() {
            this.src = data.way.src2[this.index].src;
            side_child[this.index].style.display = "none";
        }
    }
}

// 返回顶部
var start = document.getElementsByClassName("start")[0];
window.onscroll = function() {
    var top = document.documentElement.scrollTop || document.body.scrollTop;
    if(top >= 400) {
        start.style.display = "block";
    }
    if(top < 400) {
        start.style.display = "none";
    }
}
start.onclick = function() {
    document.documentElement.scrollTop = 0;
    start.style.display = "none";
}