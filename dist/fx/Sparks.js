function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Fx from "../Fx";
export default class Sparks extends Fx {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "particles", []);

    _defineProperty(this, "particleCount", 40);

    _defineProperty(this, "sparkState", false);
  }

  draw() {
    if (this.ctx !== null) {
      this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);

      if (this.particles.length) {
        this.ctx.lineWidth = 3;
        this.particles.forEach((m, i) => {
          if (--m[4] < 0) {
            this.particles.splice(i, 1);
          }

          const px = m[0];
          const py = m[1];
          m[0] += m[2];
          m[1] += m[3];
          this.ctx.strokeStyle = 'hsla(192,100%,50%,' + m[4] / 100 + ')';
          this.ctx.beginPath();
          this.ctx.moveTo(px, py);
          this.ctx.lineTo(m[0], m[1]);
          this.ctx.stroke();
        });
      }
    }

    this.raf = requestAnimationFrame(this.draw);
  }

  listeners(el) {
    el.addEventListener('mousemove', e => {
      const a = {
        x: e.x - this.bb.left + e.view.scrollX,
        y: e.y - this.bb.top + e.view.scrollY,
        width: 1,
        height: 1
      };
      const b = {
        x: this.childPositions[0].x,
        y: this.childPositions[0].y,
        width: this.childPositions[0].width,
        height: this.childPositions[0].height
      };
      const spark = a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.height + a.y > b.y;

      if (spark !== this.sparkState) {
        this.sparkState = spark;
        let m = Math.atan2(e.movementX, e.movementY);

        if (m < 0) {
          m += 2 * Math.PI;
        }

        for (let x = 0; x < this.particleCount; x++) {
          this.particles.push([a.x, a.y, 2 * (Math.sin(m) + (-0.5 + Math.random())), 2 * (Math.cos(m) + (-0.5 + Math.random())), Math.random() * 100]);
        }
      }
    });
  }

}