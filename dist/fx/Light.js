import Fx from "../Fx";
/**
*
* A light shining from the center of the component that follows the user's mouse
*
**/

export default class Light extends Fx {
  /**
  *
  * clamp is a utility that takes a value, min and max, and returns the min if it's less than the min and the
  * max if it's greater than the max, or just the initial value if they're not.
  *
  **/
  clamp(x, min, max) {
    return Math.min(Math.max(x, min), max);
  }

  draw() {
    if (this.ctx !== null) {
      /**
      *
      * Clear the canvas
      *
      **/
      this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);
      /**
      *
      * Get a normalized mouse position (-1 to 1)
      *
      **/

      const lx = this.mouse[0] / this.bb.width * 2 - 1;
      const ly = this.mouse[1] / this.bb.height * 2 - 1;
      /**
      *
      * Precalculate some values for 1/2 and 1/3 sizes. More to make the code nicer
      * than any sort of optimization.
      *
      **/

      const halfWidth = this.bb.width / 2;
      const thirdWidth = this.bb.width / 3;
      const halfHeight = this.bb.height / 2;
      const thirdHeight = this.bb.height / 3;
      /**
      *
      * Create a radial gradient from the center to the mouse position. Note that the gradient
      * needs to be limited to less than the 'radius' of the component (minimum side / 2).
      *
      **/

      let g = this.ctx.createRadialGradient(halfWidth, halfHeight, 0, halfWidth + this.clamp(lx * thirdWidth, -1 * thirdWidth, thirdWidth), halfHeight + this.clamp(ly * thirdHeight, -1 * thirdHeight, thirdHeight), halfHeight);
      g.addColorStop(0, this.options.startColor);
      g.addColorStop(1, this.options.endColor);
      /**
      *
      * Fill the canvas with the gradient
      *
      **/

      this.ctx.fillStyle = g;
      this.ctx.fillRect(0, 0, this.bb.width, this.bb.height);
    }

    this.raf = requestAnimationFrame(this.draw);
  }

}