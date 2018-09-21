import Fx from "../Fx";

export default class Heatmap extends Fx {

    draw() {
        if (this.ctx!==null) {
            this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);
            if (this.clicks.length) {
                this.clicks.forEach((m, i)=>{
                    this.ctx.fillStyle = 'hsla(0,100%,50%,0.7)';
                    this.ctx.beginPath();
                    this.ctx.arc(m[0], m[1], 6, 0, 2 * Math.PI);
                    this.ctx.fill();
                });
            }
            this.ctx.fillStyle = 'hsla(0,100%,50%,1)';
            this.ctx.fillRect(this.mouse[0]-2, this.mouse[1]-2, 5, 5);
        }
        this.raf = requestAnimationFrame(this.draw);
    }

}