function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Fx from "../Fx";
export default class Neon extends Fx {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "padding", this.options.size);
  }

  draw() {
    if (this.ctx !== null) {
      this.ctx.clearRect(0, 0, this.bb.width, this.bb.height); // this.ctx.fillStyle = 'hsla(0,100%,100%, 0.5)';
      // this.ctx.fillRect(0, 0, this.bb.width, this.bb.height);

      let g = this.ctx.createLinearGradient(0, 0, this.padding, 0);
      g.addColorStop(0, 'hsla(0,100%,50%,0)');
      g.addColorStop(1, 'hsla(0,100%,50%,1)');
      this.ctx.fillStyle = g;
      this.ctx.fillRect(0, this.padding, this.padding, this.bb.height - this.padding * 2);
      g = this.ctx.createLinearGradient(this.bb.width - this.padding, 0, this.bb.width, 0);
      g.addColorStop(0, 'hsla(0,100%,50%,1)');
      g.addColorStop(1, 'hsla(0,100%,50%,0)');
      this.ctx.fillStyle = g;
      this.ctx.fillRect(this.bb.width - this.padding, this.padding, this.padding, this.bb.height - this.padding * 2);
      g = this.ctx.createLinearGradient(this.padding, 0, this.padding, this.padding);
      g.addColorStop(0, 'hsla(0,100%,50%,0)');
      g.addColorStop(1, 'hsla(0,100%,50%,1)');
      this.ctx.fillStyle = g;
      this.ctx.fillRect(this.padding, 0, this.bb.width - this.padding * 2, this.padding);
      g = this.ctx.createLinearGradient(this.padding, this.bb.height - this.padding, this.padding, this.bb.height);
      g.addColorStop(0, 'hsla(0,100%,50%,1)');
      g.addColorStop(1, 'hsla(0,100%,50%,0)');
      this.ctx.fillStyle = g;
      this.ctx.fillRect(this.padding, this.bb.height - this.padding, this.bb.width - this.padding * 2, this.bb.height);
      g = this.ctx.createRadialGradient(this.padding, this.padding, 0, this.padding, this.padding, this.padding);
      g.addColorStop(0, 'hsla(0,100%,50%,1)');
      g.addColorStop(1, 'hsla(0,100%,50%,0)');
      this.ctx.fillStyle = g;
      this.ctx.fillRect(0, 0, this.padding, this.padding);
      g = this.ctx.createRadialGradient(this.bb.width - this.padding, this.padding, 0, this.bb.width - this.padding, this.padding, this.padding);
      g.addColorStop(0, 'hsla(0,100%,50%,1)');
      g.addColorStop(1, 'hsla(0,100%,50%,0)');
      this.ctx.fillStyle = g;
      this.ctx.fillRect(this.bb.width - this.padding, 0, this.bb.width - this.padding, this.padding);
      g = this.ctx.createRadialGradient(this.padding, this.bb.height - this.padding, 0, this.padding, this.bb.height - this.padding, this.padding);
      g.addColorStop(0, 'hsla(0,100%,50%,1)');
      g.addColorStop(1, 'hsla(0,100%,50%,0)');
      this.ctx.fillStyle = g;
      this.ctx.fillRect(0, this.bb.height - this.padding, this.padding, this.bb.height);
      g = this.ctx.createRadialGradient(this.bb.width - this.padding, this.bb.height - this.padding, 0, this.bb.width - this.padding, this.bb.height - this.padding, this.padding);
      g.addColorStop(0, 'hsla(0,100%,50%,1)');
      g.addColorStop(1, 'hsla(0,100%,50%,0)');
      this.ctx.fillStyle = g;
      this.ctx.fillRect(this.bb.width - this.padding, this.bb.height - this.padding, this.bb.width - this.padding, this.bb.height - this.padding); // this.ctx.clearRect(this.padding, this.padding, this.bb.width - this.padding * 2, this.bb.height - this.padding * 2);
    }

    this.raf = requestAnimationFrame(this.draw);
  }

}