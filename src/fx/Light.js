import Fx from "../Fx";

export default class Light extends Fx {

    constructor() {
        super();
        this.mouse = [0, 0];
    }

    draw() {
        if (this.ctx!==null) {

            this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);

            const lx = ((this.mouse[0] / this.bb.width) * 2 - 1);
            const ly = ((this.mouse[1] / this.bb.height) * 2 - 1);

            let g = this.ctx.createRadialGradient(
                (this.bb.width / 2),
                (this.bb.height / 2),
                0,
                ( (this.bb.width / 2) + lx * (this.bb.width / 3) ),
                ( (this.bb.height / 2) + ly * (this.bb.height / 3) ),
                this.bb.width / 2
            );
            g.addColorStop(0, 'hsla(0,100%,100%,0)');
            g.addColorStop(1, 'hsla(0,100%,0%,1)');
            this.ctx.fillStyle = g;
            this.ctx.fillRect(0, 0, this.bb.width, this.bb.height);

        }
        this.raf = requestAnimationFrame(this.draw);
    }

    listeners(el) {
        el.addEventListener('mousemove', (e) => {
            this.mouse = [e.x - this.bb.left, e.y - this.bb.top];
        })
    }

}