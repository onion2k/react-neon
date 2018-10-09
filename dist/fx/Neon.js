function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Fx from "../Fx";
export default class Neon extends Fx {
  constructor(options) {
    super(options);

    _defineProperty(this, "flicker", 0);

    _defineProperty(this, "randFlicker", 0);

    _defineProperty(this, "color", 0);

    _defineProperty(this, "saturation", '0%');

    _defineProperty(this, "lightness", '50%');

    _defineProperty(this, "onoff", true);

    if (!options.padding) {
      this.options.padding = options.size;
    }
  }

  intersect(c) {
    if (c[0].intersectionRatio === 1) {
      this.onoff = true;
      this.randFlicker = 0;
    } else {
      this.onoff = false;
    }
  }

  draw() {
    if (this.ctx !== null) {
      this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);
      this.ctx.globalCompositeOperation = "lighter";
      let color = this.color;
      let saturation = this.saturation;
      let lightness = this.lightness;

      if (this.onoff) {
        if (this.flicker++ > this.randFlicker) {
          if (this.saturation === '100%') {
            this.saturation = '0%';
            this.lightness = '20%';
            this.randFlicker = Math.floor(Math.random() * 30);
          } else {
            this.saturation = '100%';
            this.lightness = '50%';
            this.randFlicker = Math.floor(Math.random() * 200);
          }

          this.flicker = 0;
        }
      } else {
        this.saturation = '0%';
        this.lightness = '20%';
      }

      const ps = this.options.padding - this.options.size;
      const itl = {
        x: this.options.padding,
        y: this.options.padding
      };
      const itr = {
        x: this.bb.width - this.options.padding,
        y: this.options.padding
      };
      const ibl = {
        x: this.options.padding,
        y: this.bb.height - this.options.padding
      };
      const ibr = {
        x: this.bb.width - this.options.padding,
        y: this.bb.height - this.options.padding
      };
      const otl = {
        x: ps,
        y: ps
      };
      const otr = {
        x: this.bb.width - ps,
        y: ps
      };
      const obl = {
        x: ps,
        y: this.bb.height - ps
      }; // const obr = { x: this.bb.width - ps, y: this.bb.height - ps };

      const iw = this.bb.width - this.options.padding * 2;
      const ih = this.bb.height - this.options.padding * 2;
      const ow = this.bb.width;
      const oh = this.bb.height;
      let g = this.ctx.createLinearGradient(otl.x, otl.y, itl.x, otl.y);
      g.addColorStop(0, 'hsla(' + color + ',' + saturation + ',' + lightness + ',0)');
      g.addColorStop(1, 'hsla(' + color + ',' + saturation + ',' + lightness + ',1)');
      this.ctx.fillStyle = g;
      this.ctx.fillRect(otl.x, itl.y, itl.x, ih);
      g = this.ctx.createLinearGradient(itr.x, otr.y, otr.x, otr.y);
      g.addColorStop(0, 'hsla(' + color + ',' + saturation + ',' + lightness + ',1)');
      g.addColorStop(1, 'hsla(' + color + ',' + saturation + ',' + lightness + ',0)');
      this.ctx.fillStyle = g;
      this.ctx.fillRect(itr.x, itr.y, itl.x, ih);
      g = this.ctx.createLinearGradient(itl.x, itl.y, itl.x, otl.y);
      g.addColorStop(0, 'hsla(' + color + ',' + saturation + ',' + lightness + ',1)');
      g.addColorStop(1, 'hsla(' + color + ',' + saturation + ',' + lightness + ',0)');
      this.ctx.fillStyle = g;
      this.ctx.fillRect(itl.x, otl.y, iw, itl.y);
      g = this.ctx.createLinearGradient(ibl.x, ibl.y, ibl.x, obl.y);
      g.addColorStop(0, 'hsla(' + color + ',' + saturation + ',' + lightness + ',1)');
      g.addColorStop(1, 'hsla(' + color + ',' + saturation + ',' + lightness + ',0)');
      this.ctx.fillStyle = g;
      this.ctx.fillRect(ibl.x, ibl.y, iw, oh);
      g = this.ctx.createRadialGradient(itl.x, itl.y, 0, itl.x, itl.y, this.options.size);
      g.addColorStop(0, 'hsla(' + color + ',' + saturation + ',' + lightness + ',1)');
      g.addColorStop(1, 'hsla(' + color + ',' + saturation + ',' + lightness + ',0)');
      this.ctx.fillStyle = g;
      this.ctx.fillRect(otl.x, otl.y, this.options.size, this.options.size);
      g = this.ctx.createRadialGradient(itr.x, itr.y, 0, itr.x, itr.y, this.options.size);
      g.addColorStop(0, 'hsla(' + color + ',' + saturation + ',' + lightness + ',1)');
      g.addColorStop(1, 'hsla(' + color + ',' + saturation + ',' + lightness + ',0)');
      this.ctx.fillStyle = g;
      this.ctx.fillRect(itr.x, otr.y, this.options.size, this.options.size);
      g = this.ctx.createRadialGradient(ibl.x, ibl.y, 0, ibl.x, ibl.y, this.options.size);
      g.addColorStop(0, 'hsla(' + color + ',' + saturation + ',' + lightness + ',1)');
      g.addColorStop(1, 'hsla(' + color + ',' + saturation + ',' + lightness + ',0)');
      this.ctx.fillStyle = g;
      this.ctx.fillRect(obl.x, ibl.y, this.options.size, this.options.size);
      g = this.ctx.createRadialGradient(ibr.x, ibr.y, 0, ibr.x, ibr.y, this.options.size);
      g.addColorStop(0, 'hsla(' + color + ',' + saturation + ',' + lightness + ',1)');
      g.addColorStop(1, 'hsla(' + color + ',' + saturation + ',' + lightness + ',0)');
      this.ctx.fillStyle = g;
      this.ctx.fillRect(ibr.x, ibr.y, this.options.size, this.options.size);
      this.ctx.clearRect(this.options.padding, this.options.padding, this.bb.width - this.options.padding * 2, this.bb.height - this.options.padding * 2);
    }

    this.raf = requestAnimationFrame(this.draw);
  }

}