function show_popup(title, text, type="dark")
{
    $("#alert-popup > * div.alert").attr("class", "alert alert-"+type)
    $("#alert-popup > * div.alert > h4").html(title);
    $("#alert-popup > * div.alert > p").html(text);
    $("#alert-popup").css("top", window.innerHeight / 2 - $("#alert-popup").css("height").replace("px", ""));
    $("#alert-popup").fadeIn(200);
}

$(() => {
    // Initialize tooltips
    $("#swarm-formation").tooltip();

    // EVENTS
    // Click on canvas
    $("canvas#main").on("click", (e) => {
        if(drone_swarm.drone_list.length < 1) return;

        drone_swarm.dest.x = e.pageX;
        drone_swarm.dest.y = e.pageY;

        debug_log("Canvas onclick", "Swarm target position: ", drone_swarm.dest);
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

        drone_swarm.drone_list.push(drone);
        
        debug_log("Add Drone", "Added new drone!", drone);
    });

    // Change swarm formation
    $("#swarm-formation").on("change", () => {
        let formation_number = parseInt($("#swarm-formation").val());
        let set_formation    = false;

        switch (formation_number) 
        {
            case 0:
            {
                set_formation = true;
            }
            break;

            case 1:
            {
                show_popup("Warning", "Formation is not yet implemented.", "warning");
            }
            break;

            case 2:
            {
                show_popup("Warning", "Formation is not yet implemented.", "warning");
            }
            break;

            case 3:
            {
                show_popup("Warning", "Formation is not yet implemented.", "warning");
            }
            break;

            case 4:
            {
                show_popup("Warning", "Formation is not yet implemented.", "warning");
            }
            break;
        
            default:
            {
                show_popup("Error", "Unknown formation.", "danger");
            }
            break;
        }

        if(set_formation) drone_swarm.formation = formation_number;

        debug_log("Set Formation", "Swarm formation: "+drone_swarm.formation);
    });
    
    $("#close-popup").on("click", () => {
        $("#alert-popup").fadeOut(200);
    });

    $("body").on("keydown", (e) => {
        if(e.keyCode === 27 && $("#alert-popup").css("display") == "block") // ESC
            $("#alert-popup").fadeOut(200);
    });
});
