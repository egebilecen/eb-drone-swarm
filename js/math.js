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
    return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
}

function compass_angle_of(pt1, pt2)
{
    let deltaX = pt2.x - pt1.x;
    let deltaY = pt2.y - pt1.y;
    
    let deg    = rad_to_deg(Math.atan2(deltaY, deltaX));

    return (map_value(deg, -180, 180, 0, 360) + 270) % 360;
}

function angle_of_rad(pt1, pt2)
{
    let deltaX = pt2.x - pt1.x;
    let deltaY = pt2.y - pt1.y;

    return Math.atan2(deltaY, deltaX);
}

function angle_of(pt1, pt2, deg_360=true)
{
    let deg = rad_to_deg(angle_of_rad(pt1, pt2));

    if(deg_360) return map_value(deg, -180, 180, 0, 360);

    return deg;
}

function get_perpendicular_point_on_line_from_given_point(line_point1, line_point2, given_point)
{
    let A = line_point1;
    let B = line_point2;
    let C = given_point;

    let x1 = A.x;
    let y1 = A.y;

    let x2 = B.x;
    let y2 = B.y;

    let x3 = C.x;
    let y3 = C.y;

    let px  = x2 - x1;
    let py  = y2 - y1;
    let dAB = (px * px) + (py * py)

    let u = ((x3 - x1) * px + (y3 - y1) * py) / dAB;

    let x4 = x1 + u * px;
    let y4 = y1 + u * py;

    return {x : x4, y : y4};
}

function check_line_intersection_with_circle(line_start_point, line_end_point, circle_center_point, circle_radius)
{
    let perpendicular_point = get_perpendicular_point_on_line_from_given_point(line_start_point, line_end_point, circle_center_point);

    if(distance_of(perpendicular_point, circle_center_point) < circle_radius)
        return true;
        
    return false;
}
