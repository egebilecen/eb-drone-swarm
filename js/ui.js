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
    // Add new drone to swarm
    $("#add-drone").on("click", () => {
        let drone = new Drone();

        drone_list.push(drone);
        
        debug_log("Add Drone", "Added new drone!", drone_list);
    });

    $("#swarm-formation").on("change", () => {
        console.log("Swarm formation changed!");
    });
    
    $("#close-popup").on("click", () => {
        $("#alert-popup").fadeOut();
    });
});
