// 获取非行间样式
/*
    obj：获取的是具体哪一个元素对象
    attr：获取的是哪一个属性
*/
function getStyle(obj,attr) {
    if(getComputedStyle) {
        // 标准浏览器
        return getComputedStyle(obj)[attr];
    }else {
        // IE浏览器
        return obj.currentStyle[attr];
    }
}