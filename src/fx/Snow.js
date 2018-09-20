import Fx from "../Fx";

export default class Snow extends Fx {

    constructor() {
        super();
        this.wind = 2;
        this.maxActive = 200;
        this.snowflakes = [];
    }

    init() {
        for (var i=0; i<this.maxActive; i++) {
            var x = Math.floor(Math.random() * this.bb.width);
            var y = Math.floor(Math.random() * this.bb.height);
            this.snowflakes.push({ x: x, y: y, vy: 1 + (Math.random()*3) });
        }
    }

    draw() {
        if (this.ctx!==null) {

            this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);

            if (this.snowflakes.length) {
                this.snowflakes.forEach((f)=>{
                    f.y += f.vy; 
                    if (f.y > this.bb.height){
                        f.x = Math.floor(Math.random() * this.bb.width);
                        f.y = 0;
                    }
                    if (f.x > this.bb.width){
                        f.x = 0;
                    }
                    this.ctx.fillStyle = 'hsla(0,100%,100%,1)';
                    this.ctx.beginPath();
                    this.ctx.arc(f.x, f.y, 2, 0, 2 * Math.PI);
                    this.ctx.fill();
                    f.x += this.wind + (Math.random() * 2 - 1);
                });    
            }

        }

        this.raf = requestAnimationFrame(this.draw);

    }

}