/*
    单元素的匀速运动
    obj：具体哪一个元素的运动
    attr：具体元素运动的属性
    step：运动的步长
    target：运动的目标点
    time：定时器的速度
*/
var timer = null;
function move(obj,attr,step,target,time) {
    //判断运动的方向
    step = target > parseInt(getStyle(obj,attr)) ? step : -step;
    //每一个元素都有自己的定时器
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var left = parseInt(getStyle(obj,attr)) + step
        // 设置边界
        if((left>target && step>0) || (left<target && step<0)) {
            left = target;
        }
        //设置元素的left值等于每次运动的新值
        obj.style[attr] = left + "px";
        // 停止定时器
        if(left == target) {
            clearInterval(obj.timer)
        }
    },time)
}
/*
    单元素的缓冲运动
    obj：具体发生的哪一个元素
    attr：具体哪一个属性
    target：运动的目标点
*/
var timer = null;
function BufferMove(obj,attr,target) {
    // 清除之前运动的定时器
    clearInterval(obj.timer)
    obj.timer = setInterval(function() {
        // 判断属性是否为不透明度
        if(attr == "opacity") {
            var start = parseFloat(getStyle(obj,attr) * 100);
        }else {
            // 初始位置
            var start = parseInt(getStyle(obj,attr))
        }
        // 初始位置
        // var start = parseInt(getStyle(obj,attr))

        // 步长
        // 公式：步长 = (目标值 - 初始值) / 缩放比例
        var speed = (target - start) / 10
        // 根据speed的正负来判断运动的方向
        speed = speed> 0 ? Math.ceil(speed) : Math.floor(speed)

        if(attr == "opacity") {
            obj.style[attr] = (speed + start) / 100
        }else {
            obj.style[attr] = start + speed + "px"
        }
        // obj.style[attr] = start + speed + "px"

        // 停止定时器
        if(start == target) {
            clearInterval(obj.timer)
        }
    },100)
}
/*
    多物体的多属性运动
    obj：具体哪一个元素在发生运动
    json：对象
    fun：回调函数
*/ 
function BufferJSON(obj,json,fun) {
    // 清除之前运动的定时器
    clearInterval(obj.timer)
    obj.timer = setInterval(function() {
        // 获取对象中的每一个值
        var tag = true;
        for(var attr in json) {
            //多属性的判断条件 假设都达到了目标点
            if(attr == "opacity") {
                var start = parseFloat(getStyle(obj,attr) * 100);
            }else {
                // 初始位置
                var start = parseInt(getStyle(obj,attr))
            }
            // console.log(json[attr]) //属性值
            var speed = (json[attr] - start) / 10
            // 根据speed的正负来判断运动的方向
            speed = speed> 0 ? Math.ceil(speed) : Math.floor(speed)
            
            if(attr == "opacity") {
                obj.style[attr] = (speed + start) / 100
            }else {
                obj.style[attr] = start + speed + "px"
            }
            if(start != json[attr]) {
                tag = false
            }
        }

        // 判断是不是所有的值都达到了目标点
        if(tag == true) {
            clearInterval(obj.timer)
            // 再次调用回调函数
            fun && fun();
        }
    },100)
}