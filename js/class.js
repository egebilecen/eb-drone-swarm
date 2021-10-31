// Drone class
class Drone
{
    static last_id = 0;

    constructor(id)
    {
        this.id  = ++Drone.last_id;
        this.pos = {
            x : 0,
            y : 0,
            dest : []
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
        if(this.pos.dest.length > 0)
        {
            let dest    = this.pos.dest[0];
            let heading = angle_of_rad(this.pos, dest);
            let spd     = {
                x : this.spd * Math.cos(heading),
                y : this.spd * Math.sin(heading)
            };

            if(distance_of(this.pos, dest) <= 2.5)
            {
                this.pos.x = dest.x;
                this.pos.y = dest.y;
            }
            else
            {
                this.pos.x += spd.x;
                this.pos.y += spd.y;
            }

            if(this.pos.x == dest.x && this.pos.y == dest.y) 
                this.pos.dest = this.pos.dest.slice(1);
        }
    }
}
