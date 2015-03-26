
if(!('indexOf' in Array)){
    Array.prototype.indexOf = function(item){
        for(var i = 0;i<this.length;i++){
            if(this[i] == item){
                return i;
            }
        }
        return -1;
    }
}

if(!('lastIndexOf' in Array)){
    Array.prototype.lastIndexOf = function(item){
        for(var i = this.length-1;i>=0;i--){
            if(this[i] == item){
                return i;
            }
        }
        return -1;
    }
}


/* 日期格式化函数 */
if(!('format' in Array)){
    Date.prototype.format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

        return fmt;
    }
}

/**
 * 日期格式转时间戳
 * example: toTime(2013-04-19 23:40:48);
 */
if(!('toTime' in String)){
    String.prototype.toTime = function () {
        if('' == this) return 0;
        var str = this;
        str = str.replace(/:/g,'-');
        str = str.replace(/ /g,'-');
        var arr = str.split("-");

        if(arr.length == 6){
            var datum = new Date(arr[0],arr[1]-1,arr[2],arr[3],arr[4], arr[5]);
        } else if(arr.length == 3) {
            var datum = new Date(arr[0],arr[1]-1,arr[2]);
        } else {
            return str
        }

        return datum.getTime();
    }
}

/**
 * 合并数组
 * var o1={hello:1},o2={world:2};
 * extend(o1,o2);
 * alert(o1.world);
 */
var extend = function(o, n, override){
   for(var p in n)if(n.hasOwnProperty(p) && (!o.hasOwnProperty(p) || override)) o[p] = n[p];
};

/**
 * 克隆对象
 */
var clone = function clone(myObj) {
    if(typeof(myObj) != 'object' || myObj == null) return myObj;

    var newObj = new Object();
    for(var i in myObj){
      newObj[i] = clone(myObj[i]);
    }

    return newObj;
}

//深度复制数组 [{},{},{}]
var depCloneArr = function(arr) {
    arr = arr.slice(0);

    var newArr = [];
    for(var i=0; i<arr.length; i++){
        var obj = arr[i];
        var newObj = {};
        for(var k in obj){
            newObj[k] = obj[k];
        }
        newArr.push(newObj);
    }

    return newArr;
}


//把dataObj中的属性添加给targetObj,isReplace表示是否替换原有属性，默认为false
function objValueCopy(targetObj, dataObj, isReplace) {
    if(!targetObj || !dataObj) return;
    isReplace = isReplace || false;
    for(var key in dataObj){
        //标记key是否已经存在在在targetObj中
        var flag = targetObj.hasOwnProperty(key);
        if(flag &&! isReplace) continue;
        targetObj[key] = dataObj[key];
    }
}