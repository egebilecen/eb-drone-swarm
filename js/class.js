// Drone class
class Drone
{
    static last_id = 0;

    constructor(id)
    {
        this.id  = ++Drone.last_id;
        this.pos = {
            x : 250,
            y : 250,
            dest : {
                x : -1,
                y : -1
            }
        };
        this.spd = 5;

        // Appearance Variables
        this.size        = 12;
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

    update_pos()
    {
        if(this.pos.dest.x != -1 && this.pos.dest.y != -1)
        {
            if(this.pos.x <= this.pos.dest.x) this.pos.x += this.spd;
            else                              this.pos.x -= this.spd;
            if(Math.abs(this.pos.x - this.pos.dest.x) <= this.spd) this.pos.x = this.pos.dest.x;

            if(this.pos.y <= this.pos.dest.y) this.pos.y += this.spd;
            else                              this.pos.y -= this.spd;
            if(Math.abs(this.pos.y - this.pos.dest.y) <= this.spd) this.pos.y = this.pos.dest.y;
        }
    }
}

class Formation
{
    constructor()
    {
        this.drone_spacing = 5;
    }
}
