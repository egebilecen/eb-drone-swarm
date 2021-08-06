function draw_drone(ctx, drone)
{
    ctx.beginPath();
    ctx.arc(drone.pos.x, drone.pos.y, drone.size, 0, 2 * Math.PI, false);
    ctx.fillStyle = drone.color.background;
    ctx.fill();
    ctx.lineWidth = drone.border_size;
    ctx.strokeStyle = drone.color.border;
    ctx.stroke();
    ctx.closePath();
}

function draw_drone_path_line(ctx, drone)
{
    ctx.beginPath();
    ctx.moveTo(drone.pos.x,  drone.pos.y);
    ctx.lineTo(drone.pos.dest.x, drone.pos.dest.y);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(drone.pos.dest.x, drone.pos.dest.y, 6, 0, 2 * Math.PI, false);
    ctx.fillStyle = "white";
    ctx.fill();
    ctx.closePath();
}

function clear_canvas(ctx)
{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
