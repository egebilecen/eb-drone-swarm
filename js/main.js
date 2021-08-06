'use strict';

const FPS = 60;

// Canvas related
const canvas = document.querySelector("canvas#main");
const ctx    = canvas.getContext("2d");
const DPI    = window.devicePixelRatio;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.setAttribute("width",  getComputedStyle(canvas).getPropertyValue("width").slice(0, -2)  * DPI);
canvas.setAttribute("height", getComputedStyle(canvas).getPropertyValue("height").slice(0, -2) * DPI);

// Drone related
const MAX_DRONE_COUNT  = 10;
const drone_list       = [];
let   drone_swarm      = {
    dest      : { x : -1, y : -1 },
    formation : 1
};

// Scene loop
setInterval(() => {
    if(drone_list.length < 1) return;

    clear_canvas(ctx);

    // draw everything in here
    for(let i in drone_list)
    {
        let drone = drone_list[i];
        draw_drone(ctx, drone);

        if(drone.pos.dest.x != -1 || drone.pos.dest.y != -1)
            draw_drone_path_line(ctx, drone);
    }
}, 1000 / FPS);
