import Fx from "../Fx";

export default class Neon extends Fx {

    padding = this.options.size;

    draw() {
        if (this.ctx!==null) {

            this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);
            // this.ctx.fillStyle = 'hsla(0,100%,100%, 0.5)';
            // this.ctx.fillRect(0, 0, this.bb.width, this.bb.height);

            this.ctx.globalCompositeOperation = "lighter";

            const offx = 0;
            const offy = 0;

            const itl = { x: offx + this.padding, y: offy + this.padding };
            const itr = { x: offx + this.bb.width - this.padding, y: offy + this.padding };
            const ibl = { x: offx + this.padding, y: offy + this.bb.height - this.padding };
            const ibr = { x: offx + this.bb.width - this.padding, y: offy + this.bb.height - this.padding };

            const otl = { x: offx + 0, y: offy + 0 };
            const otr = { x: offx + this.bb.width, y: offy + 0 };
            const obl = { x: offx + 0, y: offy + this.bb.height };
            const obr = { x: offx + this.bb.width, y: offy + this.bb.height };

            const iw = this.bb.width - this.padding * 2;
            const ih = this.bb.height - this.padding * 2;

            const ow = this.bb.width;
            const oh = this.bb.height;

            let g = this.ctx.createLinearGradient(otl.x, otl.y, itl.x, otl.y);
            g.addColorStop(0, 'hsla(0,100%,50%,0)');
            g.addColorStop(1, 'hsla(0,100%,50%,1)');
            this.ctx.fillStyle = g;
            this.ctx.fillRect(otl.x, itl.y, itl.x, ih);

            g = this.ctx.createLinearGradient(itr.x, otr.y, otr.x, otr.y);
            g.addColorStop(0, 'hsla(0,100%,50%,1)');
            g.addColorStop(1, 'hsla(0,100%,50%,0)');
            this.ctx.fillStyle = g;
            this.ctx.fillRect(itr.x, itr.y, itl.x, ih);

            g = this.ctx.createLinearGradient(itl.x, otl.y, itl.x, itl.y);
            g.addColorStop(0, 'hsla(0,100%,50%,0)');
            g.addColorStop(1, 'hsla(0,100%,50%,1)');
            this.ctx.fillStyle = g;
            this.ctx.fillRect(itl.x, otl.y, iw, itl.y);

            g = this.ctx.createLinearGradient(ibl.x, ibl.y, ibl.x, obl.y);
            g.addColorStop(0, 'hsla(0,100%,50%,1)');
            g.addColorStop(1, 'hsla(0,100%,50%,0)');
            this.ctx.fillStyle = g;
            this.ctx.fillRect(ibl.x, ibl.y, iw, oh);

            g = this.ctx.createRadialGradient(itl.x, itl.y, 0, itl.x, itl.y, this.padding);
            g.addColorStop(0, 'hsla(0,100%,50%,1)');
            g.addColorStop(1, 'hsla(0,100%,50%,0)');
            this.ctx.fillStyle = g;
            this.ctx.fillRect(otl.x, otl.y, this.padding, this.padding);

            g = this.ctx.createRadialGradient(itr.x, itr.y, 0, itr.x, itr.y, this.padding);
            g.addColorStop(0, 'hsla(0,100%,50%,1)');
            g.addColorStop(1, 'hsla(0,100%,50%,0)');
            this.ctx.fillStyle = g;
            this.ctx.fillRect(itr.x, otr.y, this.padding, this.padding);

            g = this.ctx.createRadialGradient(ibl.x, ibl.y, 0, ibl.x, ibl.y, this.padding);
            g.addColorStop(0, 'hsla(0,100%,50%,1)');
            g.addColorStop(1, 'hsla(0,100%,50%,0)');
            this.ctx.fillStyle = g;
            this.ctx.fillRect(obl.x, ibl.y, this.padding, this.padding);

            g = this.ctx.createRadialGradient(ibr.x, ibr.y, 0, ibr.x, ibr.y, this.padding);
            g.addColorStop(0, 'hsla(0,100%,50%,1)');
            g.addColorStop(1, 'hsla(0,100%,50%,0)');
            this.ctx.fillStyle = g;
            this.ctx.fillRect(ibr.x, ibr.y, this.padding, this.padding);

            // this.ctx.clearRect(this.padding, this.padding, this.bb.width - this.padding * 2, this.bb.height - this.padding * 2);

        }
        this.raf = requestAnimationFrame(this.draw);
    }

}