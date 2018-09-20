import Fx from "../Fx";

export default class Light extends Fx {

    clamp(x, min, max) {
        return Math.min(Math.max(x, min), max);
    };

    draw() {
        if (this.ctx!==null) {

            this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);

            const lx = ((this.mouse[0] / this.bb.width) * 2 - 1);
            const ly = ((this.mouse[1] / this.bb.height) * 2 - 1);

            const halfWidth = (this.bb.width / 2);
            const thirdWidth = (this.bb.width / 3);

            const halfHeight = (this.bb.height / 2);
            const thirdHeight = (this.bb.height / 3);

            let g = this.ctx.createRadialGradient(
                halfWidth,
                halfHeight,
                0,
                halfWidth + this.clamp((lx * thirdWidth), -1 * thirdWidth, thirdWidth),
                halfHeight + this.clamp((ly * thirdHeight), -1 * thirdHeight, thirdHeight),
                halfHeight
            );
            g.addColorStop(0, this.options.startColor);
            g.addColorStop(1, this.options.endColor);
            this.ctx.fillStyle = g;
            this.ctx.fillRect(0, 0, this.bb.width, this.bb.height);

        }
        this.raf = requestAnimationFrame(this.draw);
    }

}