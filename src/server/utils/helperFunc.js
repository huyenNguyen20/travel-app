
//Format Number Function
const formatNumber = (num) => {
    let x = num.toString();
    let str = "";
    var i;
    for( i = x.length; i >= 3 ; i -= 3){
        str = x.substring(i-3, i) + ", " + str
    }
    if(i > 0 ) {
       str = x.substring(0,i) + ", "+str
    }
    return str.substring(0, str.length-2)
}



module.exports = {
    formatNumber
}