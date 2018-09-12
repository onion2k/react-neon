import Fx from "../Fx";

export default class Heatmap extends Fx {

    constructor() {
        super();
        this.clicks = [];
    }

    draw() {
        if (this.ctx!==null) {
            if (this.clicks.length) {
                this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);
                this.clicks.forEach((m, i)=>{
                    this.ctx.fillStyle = 'hsla(0,100%,50%,0.1)';
                    this.ctx.beginPath();
                    this.ctx.arc(m[0], m[1], 20, 0, 2 * Math.PI);
                    this.ctx.fill();
                });    
            }
        }
        this.raf = requestAnimationFrame(this.draw);
    }

    listeners(el) {
        el.addEventListener('click', (e) => {
            this.clicks.push([e.x - this.bb.left, e.y - this.bb.top]);
        })
    }

}