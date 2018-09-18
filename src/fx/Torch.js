import Fx from "../Fx";

export default class Torch extends Fx {

    draw() {
        if (this.ctx!==null) {
            const m = this.mouse;
            const gradient = this.ctx.createRadialGradient(m[0], m[1], this.bb.width * 0.375, m[0], m[1], this.bb.width * 0.35);
            gradient.addColorStop(0, 'hsla(0, 0%, 0%, 0.75)');
            gradient.addColorStop(1, 'hsla(0, 0%, 100%, 0)');
            this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);
            this.ctx.fillStyle = gradient;
            this.ctx.fillRect(0, 0, this.bb.width, this.bb.height);
        }
        this.raf = requestAnimationFrame(this.draw);
    }

}
