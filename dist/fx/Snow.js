import Fx from "../Fx";
/**
*
* Snow is a particle system that draws a fixed number of particles that move across the canvas a
* bit like it's snowing.
*
**/

export default class Snow extends Fx {
  /**
  *
  * Set up some defaults. These should really come from amn options config object...
  * TODO: Use options.
  *
  **/
  constructor(options) {
    super(options);
    this.wind = 2;
    this.maxActive = 200;
    this.snowflakes = [];
  }
  /**
  *
  * init() runs when the effect is added to the DOM.
  * Create all the snowflakes at the start in random positions around the canvas, with
  * a random downward velocity (vy).
  *
  **/


  init() {
    this.snowflakes = [];

    for (var i = 0; i < this.maxActive; i++) {
      var x = Math.floor(Math.random() * this.bb.width);
      var y = Math.floor(Math.random() * this.bb.height);
      this.snowflakes.push({
        x: x,
        y: y,
        vy: 1 + Math.random() * 3
      });
    }
  }

  draw() {
    /**
    *
    * Only draw if there's a canvas to draw on..
    *
    **/
    if (this.ctx !== null) {
      /**
      *
      * Clear the canvas every frame
      *
      **/
      this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);
      /**
      *
      * Set the style for the snowflake
      *
      **/

      this.ctx.fillStyle = 'hsla(0,100%,100%,1)';
      /**
      *
      * Loop through the snowflakes array and draw each one.
      *
      **/

      this.snowflakes.forEach(f => {
        /**
        *
        * Move the snowflake downwards by it's velocity
        *
        **/
        f.y += f.vy;
        /**
        *
        * If the snowflake has reached the bottom for the canvas move it back to the top,
        * and move it to a random horizontal position.
        *
        **/

        if (f.y > this.bb.height) {
          f.y = 0;
          f.x = Math.floor(Math.random() * this.bb.width);
        }
        /**
        *
        * Update the x position based on a wind factor and some random jittering.
        *
        **/


        f.x += this.wind + (Math.random() * 2 - 1);
        /**
        *
        * As the snowflakes can be affected by a wind factor check to see if they've gone over
        * the edge of the canvas. If they have, move it back to the other side.
        *
        **/

        if (f.x > this.bb.width) {
          f.x = 0;
        } else if (f.x < 0) {
          f.x = this.bb.width;
        }
        /**
        *
        * Draw the snowflake as a small white circle.
        *
        **/


        this.ctx.beginPath();
        this.ctx.arc(f.x, f.y, 2, 0, 2 * Math.PI);
        this.ctx.fill();
      });
    }

    this.raf = requestAnimationFrame(this.draw);
  }

}