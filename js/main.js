'use strict';

const FPS        = 60;
let   DPI        = window.devicePixelRatio;
let   MOUSE_DOWN = false;
let   CTRL_DOWN  = false;
let   PREVENT_FORMATION_CHANGE_VIA_KEYS = false;
let   DISPLAY_DRONE_SPACE = true;
let   DISABLE_MOVEMENT    = false;

function fix_canvas_blur(canvas)
{
    DPI = window.devicePixelRatio;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    canvas.setAttribute("width",  getComputedStyle(canvas).getPropertyValue("width").slice(0, -2)  * DPI);
    canvas.setAttribute("height", getComputedStyle(canvas).getPropertyValue("height").slice(0, -2) * DPI);
}

// Canvas related
const canvas = document.querySelector("canvas#main");
const ctx    = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

fix_canvas_blur(canvas);

const DEBUG_POINTS = [];

// Drone related
const MAX_DRONE_COUNT  = 11;
const DRONE_SWARM_FORMATION = {
    none      : {
        id : 0,
        drone_spacing : 0
    },
    line      : {
        id : 1,
        drone_spacing : 100
    },
    v_shape   : {
        id : 2,
        drone_spacing : 100,
        drone_angle   : 120
    },
    circle    : {
        id : 3,
        drone_spacing : 100
    }
};

const PATH_FINDING_METHOD = {
    simple : 1
};

let drone_swarm = {
    dest       : { x : -1, y : -1 },
    formation  : DRONE_SWARM_FORMATION.line,
    drone_list : []
};

let last_formation     = drone_swarm.formation;
let last_drone_spacing = DRONE_SWARM_FORMATION.line.drone_spacing;

// Scene loop
setInterval(() => {
    clear_canvas(ctx);

    if(drone_swarm.drone_list.length < 1 && DEBUG_POINTS.length < 1) return;

    // draw everything in here
    for(let i in drone_swarm.drone_list)
    {
        let drone = drone_swarm.drone_list[i];

        if(drone.pos.dest.length > 0)
            draw_drone_path_line(ctx, drone);
        
        if(!DISABLE_MOVEMENT)
            drone.update_pos();
            
        draw_drone(ctx, drone);
    }

    // draw debug points
    for(let i in DEBUG_POINTS)
    {
        let point = DEBUG_POINTS[i];

        ctx.beginPath();
        ctx.arc(point.x, point.y, 6, 0, 2 * Math.PI, false);
        ctx.fillStyle = "red";
        ctx.fill();
    }
}, 1000 / FPS);
