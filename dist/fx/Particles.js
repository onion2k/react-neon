import Fx from "../Fx";
/**
*
* Basic particles radiating from the user's mouse, with more when the user clicks.
*
**/

export default class Particles extends Fx {
  constructor(options) {
    super(options);
    /**
    *
    * particles is an array that holds the current particles that are on the canvas
    * particleCount is the number of particles that are added when the mouse is moved
    *
    **/

    this.particles = [];
    this.particleCount = 4;
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
          }
          /**
          *
          * Set the fill style to be white with an opacity that's inversely related to the age, so it
          * fades away.
          *
          **/


          this.ctx.fillStyle = 'hsla(0,100%,100%,' + m[4] / 100 + ')';
          /**
          *
          * Draw the particle
          *
          **/

          this.ctx.beginPath();
          this.ctx.arc(m[0], m[1], 2, 0, 2 * Math.PI);
          this.ctx.fill();
          /**
          *
          * Move the particle based on it's x and y velocity values
          *
          **/

          m[0] += Math.sin(Math.PI * 2 * m[2]);
          m[1] += Math.cos(Math.PI * 2 * m[3]);
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
        this.particles.push([e.x - this.bb.left + e.view.scrollX, e.y - this.bb.top + e.view.scrollY, Math.random(), Math.random(), 50 + Math.random() * 100]);
      }
    });
    /**
    *
    * Add more particles on a mouse click
    *
    **/

    el.addEventListener('click', e => {
      for (let x = 0; x < this.particleCount * 4; x++) {
        this.particles.push([e.x - this.bb.left + e.view.scrollX, e.y - this.bb.top + e.view.scrollY, Math.random(), Math.random(), 50 + Math.random() * 100]);
      }
    });
  }

}