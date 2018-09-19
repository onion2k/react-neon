import Fx from "../Fx";

export default class Light extends Fx {

    constructor() {
        super();
        this.mouse = [0, 0];
    }

    draw() {
        if (this.ctx!==null) {

            this.ctx.setTransform(1,0,0,1,0,0);
            this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);

            this.ctx.strokeStyle = 'hsla(0, 100%, 0%, 1)';
            this.ctx.beginPath();
            this.ctx.moveTo(this.bb.width / 2, this.bb.height / 2);
            this.ctx.lineTo(this.mouse[0], this.mouse[1]);
            this.ctx.stroke();
            
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
            // this.ctx.rotate( 30 * (Math.PI / 180) );

            let g = this.ctx.createRadialGradient(
                this.bb.width / 2,
                this.bb.height / 2,
                0,
                (this.bb.width - this.mouse[0]),
                (this.bb.height - this.mouse[1]),
                this.bb.width / 2
            );
            g.addColorStop(0, 'hsla(0,100%,100%,0)');
            g.addColorStop(1, 'hsla(0,100%,0%,1)');
            this.ctx.fillStyle = g;
            this.ctx.fillRect(0, 0, this.bb.width, this.bb.height);

            // this.ctx.fillStyle = 'hsla(0,100%,0%,1)';
            // this.ctx.fillRect(0, 0, this.bb.width , this.bb.height );
            // this.ctx.fillRect(0, this.bb.height  - 1, this.bb.width, this.bb.height + 1);

            this.ctx.setTransform(1, 0, 0, 1, this.bb.width / 2, this.bb.height / 2);
            // this.ctx.translate(this.bb.width, this.bb.height);

        }
        this.raf = requestAnimationFrame(this.draw);
    }

    listeners(el) {
        el.addEventListener('mousemove', (e) => {
            this.mouse = [e.x - this.bb.left, e.y - this.bb.top];
        })
    }

}