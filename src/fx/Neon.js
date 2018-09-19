import Fx from "../Fx";

export default class Neon extends Fx {

    padding = this.options.size;
    flicker = 0;
    randFlicker = 0;

    color = 0;
    saturation = '0%';
    lightness = '50%';

    draw() {
        if (this.ctx!==null) {

            this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);
            // this.ctx.fillStyle = 'hsla(0,100%,100%, 0.5)';
            // this.ctx.fillRect(0, 0, this.bb.width, this.bb.height);

            this.ctx.globalCompositeOperation = "lighter";

            let color = this.color;
            let saturation = this.saturation;
            let lightness = this.lightness;

            if (this.flicker++ === this.randFlicker) {

                if (this.saturation==='100%') {
                    this.color = 0;
                    this.saturation = '0%';
                    this.lightness = '20%';
                    this.randFlicker = Math.floor(Math.random() * 30);
                } else {
                    this.color = 0;
                    this.saturation = '100%';
                    this.lightness = '50%';
                    this.randFlicker = Math.floor(Math.random() * 400);
                }

                this.flicker = 0;
            }

            const offx = ((this.bb.width / 2) - this.mouse[0]) / 20;
            const offy = ((this.bb.height / 2) - this.mouse[1]) / 20;

            const itl = { x: this.padding, y: this.padding };
            const itr = { x: this.bb.width - this.padding, y: this.padding };
            const ibl = { x: this.padding, y: this.bb.height - this.padding };
            const ibr = { x: this.bb.width - this.padding, y: this.bb.height - this.padding };

            const otl = { x: 0, y: 0 };
            const otr = { x: this.bb.width, y: 0 };
            const obl = { x: 0, y: this.bb.height };
            const obr = { x: this.bb.width, y: this.bb.height };

            const iw = this.bb.width - this.padding * 2;
            const ih = this.bb.height - this.padding * 2;

            const ow = this.bb.width;
            const oh = this.bb.height;

            let g = this.ctx.createLinearGradient(otl.x, otl.y, itl.x, otl.y);
            g.addColorStop(0, 'hsla('+color+','+saturation+','+lightness+',0)');
            g.addColorStop(1, 'hsla('+color+','+saturation+','+lightness+',1)');
            this.ctx.fillStyle = g;
            this.ctx.fillRect(otl.x, itl.y, itl.x, ih);

            g = this.ctx.createLinearGradient(itr.x, otr.y, otr.x, otr.y);
            g.addColorStop(0, 'hsla('+color+','+saturation+','+lightness+',1)');
            g.addColorStop(1, 'hsla('+color+','+saturation+','+lightness+',0)');
            this.ctx.fillStyle = g;
            this.ctx.fillRect(itr.x, itr.y, itl.x, ih);

            g = this.ctx.createLinearGradient(itl.x, itl.y, itl.x, otl.y);
            g.addColorStop(0, 'hsla('+color+','+saturation+','+lightness+',1)');
            g.addColorStop(1, 'hsla('+color+','+saturation+','+lightness+',0)');
            this.ctx.fillStyle = g;
            this.ctx.fillRect(itl.x, otl.y, iw, itl.y);

            g = this.ctx.createLinearGradient(ibl.x, ibl.y, ibl.x, obl.y);
            g.addColorStop(0, 'hsla('+color+','+saturation+','+lightness+',1)');
            g.addColorStop(1, 'hsla('+color+','+saturation+','+lightness+',0)');
            this.ctx.fillStyle = g;
            this.ctx.fillRect(ibl.x, ibl.y, iw, oh);

            g = this.ctx.createRadialGradient(itl.x, itl.y, 0, itl.x, itl.y, this.padding);
            g.addColorStop(0, 'hsla('+color+','+saturation+','+lightness+',1)');
            g.addColorStop(1, 'hsla('+color+','+saturation+','+lightness+',0)');
            this.ctx.fillStyle = g;
            this.ctx.fillRect(otl.x, otl.y, this.padding, this.padding);

            g = this.ctx.createRadialGradient(itr.x, itr.y, 0, itr.x, itr.y, this.padding);
            g.addColorStop(0, 'hsla('+color+','+saturation+','+lightness+',1)');
            g.addColorStop(1, 'hsla('+color+','+saturation+','+lightness+',0)');
            this.ctx.fillStyle = g;
            this.ctx.fillRect(itr.x, otr.y, this.padding, this.padding);

            g = this.ctx.createRadialGradient(ibl.x, ibl.y, 0, ibl.x, ibl.y, this.padding);
            g.addColorStop(0, 'hsla('+color+','+saturation+','+lightness+',1)');
            g.addColorStop(1, 'hsla('+color+','+saturation+','+lightness+',0)');
            this.ctx.fillStyle = g;
            this.ctx.fillRect(obl.x, ibl.y, this.padding, this.padding);

            g = this.ctx.createRadialGradient(ibr.x, ibr.y, 0, ibr.x, ibr.y, this.padding);
            g.addColorStop(0, 'hsla('+color+','+saturation+','+lightness+',1)');
            g.addColorStop(1, 'hsla('+color+','+saturation+','+lightness+',0)');
            this.ctx.fillStyle = g;
            this.ctx.fillRect(ibr.x, ibr.y, this.padding, this.padding);

            this.ctx.clearRect(this.padding, this.padding, this.bb.width - this.padding * 2, this.bb.height - this.padding * 2);

        }
        this.raf = requestAnimationFrame(this.draw);
    }

}