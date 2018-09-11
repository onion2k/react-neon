import Fx from "./Fx";

export default class Light extends Fx {

    constructor() {
        super();
        this.mouse = [0, 0];
    }

    draw() {
        if (this.ctx!==null) {
            this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);
            this.ctx.strokeStyle = 'hsla(0, 100%, 100%, 1)';
            this.ctx.beginPath();
            this.ctx.moveTo(this.bb.width / 2, this.bb.height / 2);
            this.ctx.lineTo(this.mouse[0], this.mouse[1]);
            this.ctx.stroke();
        }
        this.raf = requestAnimationFrame(this.draw);
    }

    listeners(el) {
        el.addEventListener('mousemove', (e) => {
            this.mouse = [e.x - this.bb.left, e.y - this.bb.top];
        })
    }

}