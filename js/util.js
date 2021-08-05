function debug_log(title, msg, data=null)
{
    console.log("["+title+"] - "+msg);
    if(data !== null) console.log(data);
    console.log("-----");
}

function random_int(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
function random_color(opacity=1){
    return 'rgba('+random_int(1, 255)+','+random_int(1, 255)+','+random_int(1, 255)+','+opacity+')';
}
