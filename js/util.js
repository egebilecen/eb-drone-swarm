function debug_log(title, msg, data=null, data2=null, data3=null)
{
    console.log("["+title+"] - "+msg);
    if(data  !== null) console.log(data);
    if(data2 !== null) console.log(data2);
    if(data3 !== null) console.log(data3);
    console.log("-----");
}

function random_int(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
function random_color(opacity=1){
    return 'rgba('+random_int(1, 255)+','+random_int(1, 255)+','+random_int(1, 255)+','+opacity+')';
}
