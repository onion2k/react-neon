import Fx from "../Fx";

export default class Fuzz extends Fx {

    padding = this.options.size;
    hair = [];
    length = this.options.size * .8;
    maxActive = 200;

    init() {
        for (var i=0; i < this.maxActive / 2; i++) {
            let y = this.padding + Math.floor((Math.random() * (this.bb.height - (this.padding * 2))));
            this.hair.push({ x: this.padding, x2: this.padding - this.length, y: y });
            this.hair.push({ x: this.bb.width - this.padding, x2: this.bb.width - this.padding + this.length, y: y });
        }
    }

    draw() {

        if (this.ctx!==null) {

            this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);

            // this.ctx.fillStyle = 'hsla(0,100%,50%,0.5)';
            // this.ctx.fillRect(0, 0, this.bb.width, this.bb.height);

            if (this.hair.length) {

                this.ctx.strokeStyle = 'hsla(0,100%,50%,1)';

                this.hair.forEach((m, i)=>{

                    this.ctx.beginPath();
                    this.ctx.moveTo(m.x, m.y);
                    this.ctx.lineTo(m.x2, m.y);
                    this.ctx.stroke();

                });
            }

        }

        this.raf = requestAnimationFrame(this.draw);

    }

}