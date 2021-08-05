// Drone class
class Drone
{
    static last_id = 0;

    constructor(id)
    {
        this.id  = ++Drone.last_id;
        this.pos = {
            x : 250,
            y : 250
        };
        this.vel = {
            x : 0,
            y : 0
        };
        this.spd = 5;

        // Appearance Variables
        this.size        = 15;
        this.border_size = 3;
        this.color = {
            background : "rgba(80, 00, 80, 1)",
            border     : "#FFFFFF"
        };
    }

    get_id()
    {
        return this.id;
    }

    // Appearance based functions
    set_size(size)
    {
        if(size <= 0) return;

        this.size = size;
    }

    set_background_color(color_code)
    {
        this.color.background = color_code;
    }

    set_border_color(color_code)
    {
        this.color.border = color_code;
    }
}

class Formation
{
    constructor()
    {
        this.drone_spacing = 5;
    }
}
