import Fx from "../Fx";

export default class Neon extends Fx {

    padding = this.options.size;

    draw() {
        if (this.ctx!==null) {
            this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);
            this.ctx.fillStyle = 'hsla(0,100%,100%, 0.5)';
            this.ctx.fillRect(0, 0, this.bb.width, this.bb.height);

            this.ctx.clearRect(this.padding, this.padding, this.bb.width - this.padding * 2, this.bb.height - this.padding * 2);

        }
        this.raf = requestAnimationFrame(this.draw);
    }

}