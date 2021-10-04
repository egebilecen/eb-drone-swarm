function show_popup(title, text, type="dark")
{
    $("#alert-popup > * div.alert").attr("class", "alert alert-"+type)
    $("#alert-popup > * div.alert > h4").html(title);
    $("#alert-popup > * div.alert > p").html(text);
    $("#alert-popup").css("top", window.innerHeight / 2 - $("#alert-popup").css("height").replace("px", ""));
    $("#alert-popup").fadeIn(200);
}

function find_path(drone_index, dest, path_finding_method=PATH_FINDING_METHOD.simple)
{
    let drone = drone_swarm.drone_list[drone_index];
    // console.log(drone);

    switch(path_finding_method)
    {
        case PATH_FINDING_METHOD.simple:
            
        break;
    }
}

function update_swarm_dest_click_event(e)
{
    let destX = parseInt(e.pageX * DPI);
    let destY = parseInt(e.pageY * DPI);

    update_swarm_dest(destX, destY);
}

function update_swarm_dest(destX, destY)
{
    if(drone_swarm.drone_list.length < 1) return;

    drone_swarm.dest.x = destX;
    drone_swarm.dest.y = destY;

    switch (drone_swarm.formation.id) 
    {
        case DRONE_SWARM_FORMATION.line.id:
        {
            for(let i in drone_swarm.drone_list)
            {
                let drone = drone_swarm.drone_list[i];
                
                if(!CTRL_DOWN) drone.pos.dest = [];

                let dest = {
                    x : destX,
                    y : destY + (DRONE_SWARM_FORMATION.line.drone_spacing * i) 
                }

                find_path(i, dest);

                drone.pos.dest.push(dest);
            }
        }
        break;

        case DRONE_SWARM_FORMATION.v_shape.id:
        {
            let leader_drone = drone_swarm.drone_list[0];

            if(!CTRL_DOWN) leader_drone.pos.dest = [];
            let leader_dest = {};

            leader_dest.x = drone_swarm.dest.x;
            leader_dest.y = drone_swarm.dest.y;

            leader_drone.pos.dest.push(leader_dest);

            if(drone_swarm.drone_list.length <= 1) break;

            let heading_even = deg_to_rad(360 - DRONE_SWARM_FORMATION.v_shape.drone_angle);
            let heading_odd  = deg_to_rad(DRONE_SWARM_FORMATION.v_shape.drone_angle);

            for(let i=1; i < drone_swarm.drone_list.length; i++)
            {
                let drone = drone_swarm.drone_list[i];
                let even_drone_count = parseInt(i / 2);
                let odd_drone_count  = i - even_drone_count;

                if(!CTRL_DOWN) drone.pos.dest = [];
                let dest = { x : 0, y : 0 };

                // even (placed to right side in formation)
                if(drone.id % 2 == 0)
                {
                    dest.x = last_elem(leader_drone.pos.dest).x - (DRONE_SWARM_FORMATION.v_shape.drone_spacing * (even_drone_count + 1) * Math.cos(heading_even));
                    dest.y = last_elem(leader_drone.pos.dest).y - (DRONE_SWARM_FORMATION.v_shape.drone_spacing * (even_drone_count + 1) * Math.sin(heading_even));
                }
                // odd (placed to right side in formation)
                else
                {
                    dest.x = last_elem(leader_drone.pos.dest).x + (DRONE_SWARM_FORMATION.v_shape.drone_spacing * (odd_drone_count) * Math.cos(heading_odd));
                    dest.y = last_elem(leader_drone.pos.dest).y + (DRONE_SWARM_FORMATION.v_shape.drone_spacing * (odd_drone_count) * Math.sin(heading_odd));
                }

                drone.pos.dest.push(dest);
            }
        }
        break;

        case DRONE_SWARM_FORMATION.circle.id:
        {
            let angle_per_drone = 360 / drone_swarm.drone_list.length;
            let circle_center_point = {
                x : destX,
                y : destY
            };

            // add_debug_point(circle_center_point.x, circle_center_point.y);

            for(let i=0; i < drone_swarm.drone_list.length; i++)
            {
                let drone   = drone_swarm.drone_list[i];
                let heading = deg_to_rad(angle_per_drone * i);

                if(!CTRL_DOWN) drone.pos.dest = [];
                let dest = { x : 0, y : 0};

                dest.x = circle_center_point.x + (DRONE_SWARM_FORMATION.circle.drone_spacing * Math.cos(heading));
                dest.y = circle_center_point.y + (DRONE_SWARM_FORMATION.circle.drone_spacing * Math.sin(heading));

                drone.pos.dest.push(dest);
            }
        }
        break;
    }

    // if(log) debug_log("Canvas onclick", "Swarm target position: ", drone_swarm.dest);
}

$(() => {
    // Initialize tooltips
    $("#swarm-formation").tooltip();
    $("#swarm-spacing").tooltip();
    $("#display-drone-space").tooltip();

    // Initial input values
    $("#swarm-spacing").val(drone_swarm.formation.drone_spacing);

    // windows resize
    $(window).on('resize', function(){
        fix_canvas_blur(canvas);
    });
    
    // Click on canvas
    $("canvas#main").on("mousedown", () => {
        MOUSE_DOWN = true;
    });

    $("canvas#main").on("mouseup", () => {
        MOUSE_DOWN = false;
    });

    $("canvas#main").on("mousemove", (e) => {
        if(!MOUSE_DOWN || CTRL_DOWN) return;
        update_swarm_dest_click_event(e);
    });

    $("canvas#main").on("click", (e) => {
        update_swarm_dest_click_event(e);
    });

    $("body").on("keydown", (e) => {
        // console.log(e);

        if(e.keyCode === 27 && $("#alert-popup").css("display") == "block") // ESC
        {
            $("#alert-popup").fadeOut(200);
            return;
        }

        if(e.target.localName == "input"
        && (e.keyCode == 27      // ESC
            || e.keyCode == 13)) // ENTER
        {
            $(e.target).blur();
            return;
        }
        
        if(!PREVENT_FORMATION_CHANGE_VIA_KEYS)
        {
            if(e.keyCode == 49) // 1
            {
                $("#swarm-formation").val(1).change();
                $("#swarm-formation").change();
            }

            if(e.keyCode == 50) // 2
            {
                $("#swarm-formation").val(2).change();
                $("#swarm-formation").change();
            }

            if(e.keyCode == 51) // 3
            {
                $("#swarm-formation").val(3).change();
                $("#swarm-formation").change();
            }
        }

        if(e.keyCode == 17) // CTRL
            CTRL_DOWN = true;
    });

    $("body").on("keyup", (e) => {
        if(e.keyCode == 17) // CTRL
            CTRL_DOWN = false;
    });

    // Add new drone to swarm
    $("#add-drone").on("click", () => {
        if(drone_swarm.drone_list.length >= MAX_DRONE_COUNT)
        {
            show_popup("Warning", "You cannot add more than <b>"+MAX_DRONE_COUNT+"</b> drone(s).")
            return;
        }

        let drone = new Drone();
        drone.set_background_color(random_color());

        // default spawn location is center of the screen
        drone.pos.x = ((window.innerWidth  / 2) * DPI) - (drone.size / 2);
        drone.pos.y = ((window.innerHeight / 2) * DPI) - (drone.size / 2);

        switch (drone_swarm.formation.id) 
        {
            case DRONE_SWARM_FORMATION.line.id:
            {
                if(drone_swarm.drone_list.length < 1) break;

                let last_drone = drone_swarm.drone_list[drone_swarm.drone_list.length - 1];

                drone.pos.x = last_drone.pos.x;
                drone.pos.y = last_drone.pos.y + DRONE_SWARM_FORMATION.line.drone_spacing;
            }
            break;

            case DRONE_SWARM_FORMATION.v_shape.id:
            {
                if(drone_swarm.drone_list.length > 0)
                {
                    let leader_drone     = drone_swarm.drone_list[0];
                    let heading_even     = deg_to_rad(360 - DRONE_SWARM_FORMATION.v_shape.drone_angle);
                    let heading_odd      = deg_to_rad(DRONE_SWARM_FORMATION.v_shape.drone_angle);
                    let even_drone_count = parseInt(drone_swarm.drone_list.length / 2);
                    let odd_drone_count  = drone_swarm.drone_list.length - even_drone_count;

                    // even (placed to right side in formation)
                    if(drone.id % 2 == 0)
                    {
                        drone.pos.x = leader_drone.pos.x - (DRONE_SWARM_FORMATION.v_shape.drone_spacing * (even_drone_count + 1) * Math.cos(heading_even));
                        drone.pos.y = leader_drone.pos.y - (DRONE_SWARM_FORMATION.v_shape.drone_spacing * (even_drone_count + 1) * Math.sin(heading_even));
                    }
                    // odd (placed to right side in formation)
                    else
                    {
                        drone.pos.x = leader_drone.pos.x + (DRONE_SWARM_FORMATION.v_shape.drone_spacing * (odd_drone_count) * Math.cos(heading_odd));
                        drone.pos.y = leader_drone.pos.y + (DRONE_SWARM_FORMATION.v_shape.drone_spacing * (odd_drone_count) * Math.sin(heading_odd));
                    }
                }
            }
            break;

            case DRONE_SWARM_FORMATION.circle.id:
            {
                // spawns drones in circular angle
                let angle_per_drone = 360 / drone_swarm.drone_list.length;
                let circle_center_point = {
                    x : (drone_swarm.drone_list.length == 0 ? 
                            drone.pos.x : drone_swarm.drone_list[0].pos.x - (DRONE_SWARM_FORMATION.circle.drone_spacing * Math.cos(0))),
                    y : (drone_swarm.drone_list.length == 0 ? 
                            drone.pos.y : drone_swarm.drone_list[0].pos.y - (DRONE_SWARM_FORMATION.circle.drone_spacing * Math.sin(0)))
                };

                let heading = deg_to_rad(angle_per_drone * drone_swarm.drone_list.length);

                drone.pos.x = circle_center_point.x + (DRONE_SWARM_FORMATION.circle.drone_spacing * Math.cos(heading) / 2);
                drone.pos.y = circle_center_point.y + (DRONE_SWARM_FORMATION.circle.drone_spacing * Math.sin(heading));
            }
            break;
        }

        drone_swarm.drone_list.push(drone);

        if(drone_swarm.formation.id == DRONE_SWARM_FORMATION.circle.id)
        {
            update_swarm_dest(
                drone_swarm.drone_list[0].pos.x - (DRONE_SWARM_FORMATION.circle.drone_spacing * Math.cos(0)),
                drone_swarm.drone_list[0].pos.y - (DRONE_SWARM_FORMATION.circle.drone_spacing * Math.sin(0))
            );
        }
        
        // debug_log("Add Drone", "Added new drone!", drone);
    });

    // Delete drone
    $("#delete-drone").on("click", () => {
        if(drone_swarm.drone_list.length < 1) return;

        drone_swarm.drone_list = drone_swarm.drone_list.slice(0, -1);

        if(drone_swarm.formation.id == DRONE_SWARM_FORMATION.circle.id)
        {
            update_swarm_dest(
                drone_swarm.drone_list[0].pos.x - (DRONE_SWARM_FORMATION.circle.drone_spacing * Math.cos(0)),
                drone_swarm.drone_list[0].pos.y - (DRONE_SWARM_FORMATION.circle.drone_spacing * Math.sin(0))
            );
        }
    });

    // Change swarm formation
    $("#swarm-formation").on("change", () => {
        let formation_id = parseInt($("#swarm-formation").val());
        let revert_selection = false;

        switch (formation_id) 
        {
            case DRONE_SWARM_FORMATION.line.id:
            {
                drone_swarm.formation = DRONE_SWARM_FORMATION.line;
                $("#swarm-spacing").val(DRONE_SWARM_FORMATION.line.drone_spacing);

                if(drone_swarm.drone_list.length > 0)
                    update_swarm_dest(drone_swarm.drone_list[0].pos.x, drone_swarm.drone_list[0].pos.y);
            }
            break;

            case DRONE_SWARM_FORMATION.v_shape.id:
            {
                drone_swarm.formation = DRONE_SWARM_FORMATION.v_shape;
                $("#swarm-spacing").val(DRONE_SWARM_FORMATION.v_shape.drone_spacing);

                if(drone_swarm.drone_list.length > 0)
                    update_swarm_dest(drone_swarm.drone_list[0].pos.x, drone_swarm.drone_list[0].pos.y);
            }
            break;

            case DRONE_SWARM_FORMATION.circle.id:
            {
                // if(drone_swarm.drone_list.length <= 3)
                // {
                //     show_popup("Warning", "Circle formation need at least 4 drones.", "warning");
                //     revert_selection = true;
                //     break;
                // }

                drone_swarm.formation = DRONE_SWARM_FORMATION.circle;
                $("#swarm-spacing").val(DRONE_SWARM_FORMATION.circle.drone_spacing);

                if(drone_swarm.drone_list.length > 0)
                {
                    update_swarm_dest(
                        drone_swarm.drone_list[0].pos.x - (DRONE_SWARM_FORMATION.circle.drone_spacing * Math.cos(0)),
                        drone_swarm.drone_list[0].pos.y - (DRONE_SWARM_FORMATION.circle.drone_spacing * Math.sin(0))
                    );
                }
            }
            break;
        
            default:
            {
                show_popup("Error", "Unknown formation.", "danger");
                revert_selection = true;
            }
            break;
        }

        if(revert_selection)
        {
            $("#swarm-formation").val(last_formation).change();
            $("#swarm-formation").change();
            return;
        }
        
        last_formation = formation_id;

        // debug_log("Set Formation", "Swarm formation: "+drone_swarm.formation.id);
    });

    $("#swarm-spacing").on("focus", () => {
        PREVENT_FORMATION_CHANGE_VIA_KEYS = true;
    });

    $("#swarm-spacing").on("blur", () => {
        PREVENT_FORMATION_CHANGE_VIA_KEYS = false;

        let spacing_val = parseInt($("#swarm-spacing").val());

        if(spacing_val < 50)
        {
            $("#swarm-spacing").val(drone_swarm.formation.drone_spacing);
            show_popup("Warning", "Swarm drone spacing value must be bigger than 50.", "warning");
            return;
        }
        else if(!isNaN(spacing_val))
        {
            drone_swarm.formation.drone_spacing = spacing_val;
            update_swarm_dest(drone_swarm.dest.x, drone_swarm.dest.y);
            return;
        }
        else
        {
            $("#swarm-spacing").val(drone_swarm.formation.drone_spacing);
            show_popup("Error", "Swarm drone spacing value must be an integer.", "danger");
            return;
        }
    });

    $("#display-drone-space").on("click", () => {
        DISPLAY_DRONE_SPACE = $("#display-drone-space").prop("checked");
    });
    
    $("#close-popup").on("click", () => {
        $("#alert-popup").fadeOut(200);
    });

    $("#clear-wp").on("click", () => {
        for(let i in drone_swarm.drone_list)
        {
            let drone = drone_swarm.drone_list[i];
            drone.pos.dest = [];
        }
    });
});
