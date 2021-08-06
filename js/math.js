function rad_to_deg(rad_val)
{
    return rad_val * (180 / Math.PI);
}

function angle_of(pt1, pt2)
{
    let deltaX = pt2.x - pt1.x;
    let deltaY = pt2.y - pt1.y;

    return rad_to_deg(Math.atan2(deltaY, deltaX));
}
