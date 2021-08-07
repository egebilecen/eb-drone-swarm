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
    // Draw backwards for z-index stuff
    for(let i=drone.pos.dest.length - 1; i >= 0; i--)
    {
        var dest = drone.pos.dest[i];

        ctx.beginPath();
        if(i == 0)
            ctx.moveTo(drone.pos.x,  drone.pos.y);
        else
            ctx.moveTo(drone.pos.dest[i-1].x, drone.pos.dest[i-1].y);
        ctx.lineTo(dest.x, dest.y);
        ctx.lineWidth = 3;
        ctx.strokeStyle = drone.color.background;
        ctx.stroke();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(dest.x, dest.y, 6, 0, 2 * Math.PI, false);
        ctx.fillStyle = drone.color.background;
        ctx.fill();

        ctx.lineWidth = drone.border_size;
        ctx.strokeStyle = drone.color.border;
        ctx.stroke();
        ctx.closePath();

        ctx.font = "16px Arial";
        ctx.fillText(i + 1, dest.x - 20, dest.y - 10);
    }
}

function clear_canvas(ctx)
{
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}
