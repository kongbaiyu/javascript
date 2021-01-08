var sum=0;
var Boo=false;//判断是否按下计算符号
var ope;//存储计算符号的变量
//获取数字
function num(Num) {
    var result=document.getElementById('result');
    if (Boo) {
        result.value=Num;
        Boo=false;//若接受过运算符，文本框清零
    }else{
        if (result.value=='0') {
            result.value=Num;
        } else{
            result.value+=Num;
        }
    }
}
//避免出现两个小数点
function dian () {
    var result=document.getElementById('result');
    if (result.value.indexOf('.')==-1) {
        result.value+='.';
    }
}
//清零，重新加载页面
function clean() {
        location.replace(location)
}
//退格
function backspace() {
    var result=document.getElementById('result');
        result.value=result.value.substring(0,result.value.length-1);
        if (result.value=='') {
            result.value=0;
        }
}
function calc(op){
    var result=document.getElementById('result').value*1;
    if (result=='') {
        result=0;
    }
    Boo=true;
    switch (ope){
        case '+':
            sum=sum+result;
            break;
        case '-':
            sum=sum-result;
            break;
        case '*':
            sum=sum*result;
            break;
        case '/':
            sum=sum/result;
            break;
        case '取整':
            sum=Math.floor(sum/result);
            break;
        case '%':
            sum=sum%result;
            break;
        case 'x^y':
            sum=Math.pow(sum,result);
            break;
        case '+/-':
            sum=result*(-1);            
            break;
        case '=':
            document.getElementById('result').value=sum;
            break;
        default:sum=parseFloat(result);
        break;
    }
    document.getElementById('result').value=sum;
    ope=op;
}
function calc1(op){
    var result=document.getElementById('result').value*1;
    var  π=Math.PI*2/360;//角度转换成弧度
    var deg=360/(Math.PI*2);//弧度转换成角度
    if (result=='') {
        result=0;
    }
    Boo=true;
    switch (op){
        case 'sin':
            sum=Math.round(Math.sin(result* π)*100000000000000)/100000000000000;    //sum=Math.sin(result* π);Math.round()解决浮点数运算问题                                                         
            break;                                                                    //程序处理浮点数的时候，每一次运算都会取一次近似值，所以最终的结果，总是近似值，而不是我们通过代数得出的结果。
        case 'cos':
            sum=Math.round(Math.cos(result* π)*100000000000000)/100000000000000;                
            break;
        case 'tan':
            sum=Math.round(Math.tan(result* π)*100000000000000)/100000000000000;        
            break;
        case 'asin':
            sum=Math.round(Math.asin(result)*deg*100000000000000)/100000000000000+'°';            
            break;
        case 'acos':
            sum=Math.round(Math.acos(result)*deg*100000000000000)/100000000000000+'°';        
            break;
        case 'atan':
            sum=Math.round(Math.atan(result)*deg*100000000000000)/100000000000000+'°';    
            break;
        case 'PI':
            sum=Math.PI;            
            break;
        case '1/x':
            sum=1/parseFloat(result);            
            break;
        case 'exp':
            sum=Math.exp(result);
            break;
        case 'Inx':
            sum=Math.log(result);
            break;
        case 'lgx':
            sum=Math.log10(result);
            break;
        case 'n!':
            for (var i=1;i<result;i++) {
                sum=sum*i;
            }
            break;
        default:sum=parseFloat(result);
        break;    
    }
    document.getElementById('result').value=sum;
}
//设置时间
window.onload=function(){
    showTime();
}
function showTime(){
        var today=new Date();
        var y=today.getFullYear();
        var M=today.getMonth()+1;
        var d=today.getDate();
        var h=today.getHours();
        var m=today.getMinutes();
        var s=today.getSeconds();
        m=checkTime(m);
         s=checkTime(s);
        var week=today.getDay();
        var w=new Array('星期天','星期一','星期二','星期三','星期四','星期五','星期六');
        for (var i=0;i<w.length;i++) {
            document.getElementById('time').innerHTML=y+'年'+M+'月'+d+'日'+'</br>'+h+":"+m+":"+s+'    '+w[week];
        }    
   setTimeout('showTime()',500);
}
//数字小于10时，前面添加一个0
function checkTime(i){
    if (i<10) {
        i="0" + i;
    }
  return i
}

    function loadAll(){
        var list = document.getElementById("list");
        if(localStorage.length>0){
            var result = "<table border='1'>";
            result += "<tr><td>key</td><td>value</td><td>操作</td></tr>";
            for(var i = 0;i<localStorage.length;i++){
                var sitename = localStorage.key(i);
                var siturl = localStorage.getItem(sitename);
                result += "<tr><td>"+sitename+"</td><td>"+siturl+"</td>"+
                    "<td><input type=button value=删除 onclick=del("+"'"+sitename+"')></td>"+
                    "</tr>";
            }
            result += "</table>";
            list.innerHTML = result;
        }else{
            list.innerHTML = "数据为空";
        }
    }
    function del(name){
        localStorage.removeItem(name);
        alert("删除成功");
        loadAll();
    }