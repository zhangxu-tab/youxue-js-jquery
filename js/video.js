// 顶部导航
var top_nav = document.getElementsByClassName("top_nav")[0];
var ul_top = document.getElementsByClassName("top_one")[0];
var li_top = ul_top.children;

CreatAjax({
    "type":"get",
    "url":"../data3.json",
    "success":function(data){
        nav(JSON.parse(data));
        lit(JSON.parse(data));
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

// 视频播放部分
var tit = document.getElementsByClassName("tit")[0];
var p = tit.getElementsByTagName("p")[0];
var watch = document.getElementsByClassName("watch")[0];
var list = watch.getElementsByClassName("list")[0];
var video = watch.getElementsByTagName("video")[0];
var play_btn = document.getElementById("play_btn");
var play_cur = document.getElementById("play_cur");
var slide = document.getElementsByClassName("slide")[0];
var slide_line = document.getElementsByClassName("slide_line")[0];
var slide_l = document.getElementsByClassName("slide_l")[0];
var slideBtn = document.getElementById("slideBtn");
var playTime = document.getElementById("playTime");
var fullscreen = document.getElementsByClassName("fullscreen")[0];

function lit(data) {
    var html = template("lt",data);
    list.innerHTML = html;

    var arr = ["./video/Mark Ronson Bruno Mars - Uptown Funk.mp4","./video/cat.mp4","./video/hzw.mp4","./video/mao.mp4","./video/smile.mp4","./video/yy.mp4","./video/yy1.mp4"];

    var li = list.getElementsByTagName("li");
    var img = list.getElementsByTagName("img");
    li[0].className = "active";
    img[0].src = "./image/cts-200815142714192.png";

    //单个元素的状态切换放在全局变量上
    var tag = true;

    // 播放页面右侧目录滑动效果
    for(var i = 0;i<li.length;i++) {
        li[i].index = i;
        li[i].onmouseover = function() {
            for(var j = 0;j<li.length;j++) {
                li[j].className = "";
                img[j].src = "./image/cts-200815142727098.png";
            }
            this.className = "active";
            img[this.index].src = "./image/cts-200815142714192.png"
            video.src = arr[this.index];
            slide_l.style.width = "0px";
            slideBtn.style.left = "0px";
            if(play_btn.className == "play_b") {
                play_btn.className = "";
                tag = true;
            }
        }    
    }
    
    window.onload = function() {
        // 页面一加载的时候显示默认第一个视频的总长度
        playTime.innerText = toTime(video.duration);
        
        play_btn.onclick = function() {
            if(tag) {
                // 视频的播放
                video.play();
                // 首次点击是从播放-->暂停
                play_btn.className = "play_b";
                // 切换状态
                tag = false;
            }else {
                // 视频暂停
                video.pause();
                play_btn.className = "";
                tag = true;
            }
        }
        // 视频长度的显示
        //oncanplay：当浏览器可以开始播放视频或者音频的时候所触发的事件
        video.oncanplay = function() {
        // 视频总长度来显示到对应的标签
            playTime.innerText = toTime(this.duration);
        }
        function toTime(time) {
            // 由总秒数 ==> 小时、分钟、秒
            var hour = add(parseInt(time / 3600));
            var mis = add(parseInt(time % 3600 /60));
            var sec = add(parseInt(time % 60));
            var str = hour + ":" + mis + ":" + sec;
            return str;
        }
        // 添加前导0
        function add(value) {
            return value<10?'0'+value:value;
        }
        // 全屏功能
        fullscreen.onclick = function() {
            if(video.requestFullscreen) {
                video.requestFullscreen();
            }
        }
        // 视频播放的显示时间
        // 在视频播放的时候触发的事件
        video.ontimeupdate = function() {
            // 视频在实时播放的时候需要获取当前的时间
            // currentTime：设置或返回音频/视频的当前播放位置（按秒计）
            play_cur.innerText = toTime(video.currentTime);
            //实时的播放位置 = 当前播放的时间*播放条的总长度 / 视频播放的总长度
            slide_l.style.width = video.currentTime * 550 / video.duration + "px";
            slideBtn.style.left = video.currentTime * 550 / video.duration + "px";
        } 
    }
}

// 相关课程部分
CreatAjax({
    "type":"get",
    "url":"../data.json",
    "success":function(data){
        lesson(JSON.parse(data));
    }
})
var ret = document.getElementsByClassName("ret")[0];
var ul = ret.getElementsByTagName("ul")[0];
function lesson(data) {
    var p = data.onlineclass.dataArr;
    var pp = p[0].child;
    pp.sort(function(a,b){
        return Date.parse(b.timer) - Date.parse(a.timer)
    })
    var a = {"aa":pp}
    var html2 = template("ke",a);
    ul.innerHTML = html2;
}

// 学员评价部分
var words = document.getElementsByClassName("words")[0];
var span = words.getElementsByTagName("span")[0];
var pingjia = document.getElementsByClassName("pingjia")[0];
var time = document.getElementsByClassName("time")[0];
var n = span.innerText;

pingjia.onblur = function(){
    // 用户输入的长度不能超过200个字
    if(pingjia.value.length >= 200) {
        alert("评价不能超过200字");
    }else {
        n++;
    }
    span.innerText = n;
    // 时间显示
    var now = new Date();
    time.innerText = now.toLocaleDateString();
}

