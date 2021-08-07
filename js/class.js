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
        if(this.pos.dest.x != -1 && this.pos.dest.y != -1
        && (this.pos.x != this.pos.dest.x || this.pos.y != this.pos.dest.y))
        {
            let heading = angle_of_rad(this.pos, this.pos.dest);

            this.pos.x += this.spd * Math.cos(heading);
            this.pos.y += this.spd * Math.sin(heading);

            if(distance_of(this.pos, this.pos.dest) <= 2.5)
            {
                this.pos.x = this.pos.dest.x;
                this.pos.y = this.pos.dest.y;
            }
        }
    }
}
