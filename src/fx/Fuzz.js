import Fx from "../Fx";

export default class Fuzz extends Fx {

    padding = this.options.size;
    hair = [];
    length = this.options.size * .8;
    maxActive = 200;

    jitter(value) {
        return (Math.random() * value) - (value / 2);
    }

    init() {
        for (var i=0; i < this.maxActive / 2; i++) {
            let y = this.padding + Math.floor((Math.random() * (this.bb.height - (this.padding * 2))));
            this.hair.push({ x: this.padding + this.jitter(-10), x2: -1, y: y });
            this.hair.push({ x: this.bb.width - this.padding + this.jitter(10), x2: +1, y: y });
        }
        for (var i=0; i < this.maxActive / 2; i++) {
            let x = this.padding + Math.floor((Math.random() * (this.bb.width - (this.padding * 2))));
            this.hair.push({ x: x, x2: -1, y: this.padding + this.jitter(-10) });
            this.hair.push({ x: x, x2: +1, y: this.bb.height - this.padding + this.jitter(10) });
        }
    }

    draw() {

        if (this.ctx!==null) {

            this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);

            if (this.hair.length) {

                this.ctx.strokeStyle = 'hsla(0,100%,50%,1)';

                this.hair.forEach((m, i)=>{

                    let d = Math.hypot(m.x - this.mouse[0], m.y - this.mouse[1]) * 0.05;

                    d = d - d*0.5;

                    const x2 = m.x + ( this.length* Math.sin( d ) );
                    const y2 = m.y + ( this.length * Math.cos( d ) );

                    this.ctx.beginPath();
                    this.ctx.moveTo(m.x, m.y);
                    this.ctx.lineTo(x2, y2);
                    this.ctx.stroke();

                });
            }

        }

        this.jitteraf = requestAnimationFrame(this.draw);

    }

}