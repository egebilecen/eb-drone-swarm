function show_popup(title, text)
{
    $("#alert-popup > * div.alert > h4").html(title);
    $("#alert-popup > * div.alert > p").html(text);
    $("#alert-popup").css("top", window.innerHeight / 2 - $("#alert-popup").css("height").replace("px", ""));
    $("#alert-popup").fadeIn();
}

$(() => {
    // Initialize tooltips
    $("#swarm-formation").tooltip();

    // EVENTS
    // Click on canvas
    $("canvas#main").on("click", (e) => {
        console.log(e.pageX+","+e.pageY);
    });

    // Add new drone to swarm
    $("#add-drone").on("click", () => {
        let drone = new Drone();
        drone.set_background_color(random_color());

        drone_list.push(drone);
        
        debug_log("Add Drone", "Added new drone!", drone_list);
    });

    // Change swarm formation
    $("#swarm-formation").on("change", () => {
        let formation_number = parseInt($("#swarm-formation").val());

        switch (formation_number) 
        {
            case 1:
            {
                show_popup("Error", "Formation is not yet implemented.");
            }
            break;

            case 2:
            {
                show_popup("Error", "Formation is not yet implemented.");
            }
            break;

            case 3:
            {
                show_popup("Error", "Formation is not yet implemented.");
            }
            break;

            case 4:
            {
                show_popup("Error", "Formation is not yet implemented.");
            }
            break;
        
            default:
            {
                show_popup("Error", "Unknown formation.");
            }
            break;
        }
    });
    
    $("#close-popup").on("click", () => {
        $("#alert-popup").fadeOut();
    });
});
