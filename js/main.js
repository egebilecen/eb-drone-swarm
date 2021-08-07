'use strict';

const FPS        = 60;
const DPI        = window.devicePixelRatio;
let   MOUSE_DOWN = false;

// Canvas related
const canvas = document.querySelector("canvas#main");
const ctx    = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

canvas.setAttribute("width",  getComputedStyle(canvas).getPropertyValue("width").slice(0, -2)  * DPI);
canvas.setAttribute("height", getComputedStyle(canvas).getPropertyValue("height").slice(0, -2) * DPI);

const DEBUG_POINTS = [];

// Drone related
const MAX_DRONE_COUNT  = 11;
const DRONE_SWARM_FORMATION = {
    none      : {
        id : 0,
        drone_spacing : 50
    },
    line      : {
        id : 1,
        drone_spacing : 50
    },
    v_shape   : {
        id : 2,
        drone_spacing : 50,
        drone_angle   : 120
    },
    circle    : {
        id : 3,
        drone_spacing : 100
    }
};
let   drone_swarm      = {
    dest       : { x : -1, y : -1 },
    formation  : DRONE_SWARM_FORMATION.line.id,
    drone_list : []
};

// Scene loop
setInterval(() => {
    clear_canvas(ctx);

    if(drone_swarm.drone_list.length < 1) return;

    // draw everything in here
    for(let i in drone_swarm.drone_list)
    {
        let drone = drone_swarm.drone_list[i];

        if(drone.pos.dest.x != -1 && drone.pos.dest.y != -1)
            draw_drone_path_line(ctx, drone);
        
        drone.update_pos();
        draw_drone(ctx, drone);

        // draw debug points
        for(i in DEBUG_POINTS)
        {
            let point = DEBUG_POINTS[i];

            ctx.beginPath();
            ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI, false);
            ctx.fillStyle = "red";
            ctx.fill();
        }
    }
}, 1000 / FPS);
