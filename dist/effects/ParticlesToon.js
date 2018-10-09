import Fx from "../Fx";
const TAU = Math.PI * 2;
/**
*
* Basic particles radiating from the user's mouse, with more when the user clicks.
*
**/

export default class ParticlesToon extends Fx {
  constructor() {
    super();
    /**
    *
    * particles is an array that holds the current particles that are on the canvas
    * particleCount is the number of particles that are added when the mouse is moved
    *
    **/

    this.particles = [];
    this.particleCount = 4;
    this.particlesMax = 200;
    this.c = 0;
  }

  draw() {
    if (this.ctx !== null) {
      /**
      *
      * Clear the canvas.
      *
      **/
      this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);
      /**
      *
      * If there aren't any particles then skip handling them entirely
      *
      **/

      if (this.particles.length) {
        this.ctx.globalCompositeOperation = "lighter";
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = 'hsla(0,100%,0%,1)';
        /**
        *
        * Loop through the current particles
        *
        **/

        this.particles.forEach((m, i) => {
          /**
          *
          * If the lifetime is less than zero after being decremented then remove the particle from
          * the particles array
          *
          **/
          if (--m[4] < 0) {
            this.particles.splice(i, 1);
          } else {
            /**
            *
            * Set the fill style to be white with an opacity that's inversely related to the age, so it
            * fades away.
            *
            **/
            this.ctx.fillStyle = 'hsla(' + m[5] + ',100%,50%,1)';
            /**
             *
             * Draw the particle
             *
             **/

            this.ctx.beginPath();
            this.ctx.arc(m[0], m[1], m[4] / 10 + 1, 0, TAU);
            this.ctx.fill();
            this.ctx.stroke();
            /**
             *
             * Move the particle based on it's x and y velocity values
             *
             **/

            m[0] += Math.sin(TAU * m[2]);
            m[1] += Math.cos(TAU * m[3]);
          }
        });
      }
    }

    this.raf = requestAnimationFrame(this.draw);
  }

  listeners(el) {
    /**
    *
    * Add a custom listener that creates particules when the mouse moves.
    * Each particle is an array of [ x position, y position, x velocity, y velocity, lifetime]
    *
    **/
    el.addEventListener('mousemove', e => {
      for (let x = 0; x < this.particleCount; x++) {
        this.c += 0.1;
        this.particles.unshift([e.x - this.bb.left + e.view.scrollX, e.y - this.bb.top + e.view.scrollY, Math.random(), Math.random(), 100, this.c % 255]);
      }

      if (this.particles.length > this.particlesMax) {
        this.particles = this.particles.slice(0, this.particlesMax - this.particleCount);
      }
    });
    /**
    *
    * Add more particles on a mouse click
    *
    **/

    el.addEventListener('click', e => {
      for (let x = 0; x < this.particleCount * 4; x++) {
        this.particles.push([e.x - this.bb.left + e.view.scrollX, e.y - this.bb.top + e.view.scrollY, Math.random(), Math.random(), 25 + Math.random() * 250]);
      }
    });
  }

}