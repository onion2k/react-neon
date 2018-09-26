import Fx from "../Fx";

export default class Fuzz extends Fx {

    padding = this.options.size;
    hair = [];
    maxActive = 200;

    init() {
        console.log(this.bb, this.padding, this.bb.width - this.padding);
        for (var i=0; i < this.maxActive / 2; i++) {
            let y = Math.floor(Math.random() * this.bb.height);
            this.hair.push({ x: this.padding, x2: this.padding - 10, y: y });
            this.hair.push({ x: this.bb.width - this.padding, x2: this.bb.width - this.padding + 10, y: y });
        }
    }

    draw() {

        if (this.ctx!==null) {

            this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);

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