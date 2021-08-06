function map_value(val, in_min, in_max, out_min, out_max)
{
    if     (val < in_min) return out_min;
    else if(val > in_max) return out_max;

    return (val - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

function rad_to_deg(rad_val)
{
    return rad_val * (180 / Math.PI);
}

function deg_to_rad(deg_val)
{
    return deg_val * (Math.PI / 180);
}

function distance_of(pt1, pt2)
{
    return Math.sqrt(Math.pow(pt2.x - pt1.x, 2), Math.pow(pt2.y - pt1.y, 2));
}

function compass_angle_of(pt1, pt2)
{
    let deltaX = pt2.x - pt1.x;
    let deltaY = pt2.y - pt1.y;
    
    let deg    = rad_to_deg(Math.atan2(deltaY, deltaX));

    return (map_value(deg, -180, 180, 0, 360) + 270) % 360;
}

function angle_of(pt1, pt2, deg_360=true)
{
    let deltaX = pt2.x - pt1.x;
    let deltaY = pt2.y - pt1.y;
    
    let deg    = rad_to_deg(Math.atan2(deltaY, deltaX));

    if(deg_360) return map_value(deg, -180, 180, 0, 360);

    return deg;
}
