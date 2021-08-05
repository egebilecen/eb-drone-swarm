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

function clear_canvas(ctx)
{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
