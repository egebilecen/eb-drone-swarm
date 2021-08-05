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

// Drone list
const drone_list = [];

// Scene loop
setInterval(() => {
    clear_canvas(ctx);

    // draw everything in here
    for(let i in drone_list) draw_drone(ctx, drone_list[i]);
}, 1000 / FPS);
