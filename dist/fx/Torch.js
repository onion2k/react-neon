import Fx from "../Fx";
/**
*
* This effect leverages the React-Neon FX base class from https://github.com/onion2k/react-neon
*
**/

export default class Torch extends Fx {
  draw() {
    /**
    *
    * Only draw something if the canvas context isn't null (eg it's actually in the DOM)
    *
    **/
    if (this.ctx !== null) {
      /**
      *
      * mouse is a 2d array containing the x,y position of the mouse relative to the wrapped component.
      *
      **/
      const m = this.mouse;
      /**
      *
      * The torch effect is really a circular gradient centered on the mouse position.
      *
      **/

      const gradient = this.ctx.createRadialGradient(m[0], m[1], this.bb.width * 0.375, m[0], m[1], this.bb.width * 0.35);
      gradient.addColorStop(0, 'hsla(0, 0%, 0%, 0.75)');
      gradient.addColorStop(1, 'hsla(0, 0%, 100%, 0)');
      /**
      *
      * Clear the canvas to remove the previous frame
      *
      **/

      this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);
      /**
      *
      * Fill the whole of the canvas with the gradient defined above.
      *
      **/

      this.ctx.fillStyle = gradient;
      this.ctx.fillRect(0, 0, this.bb.width, this.bb.height);
    }
    /**
    *
    * Use requestAnimationFrame to run the next frame. Put the id of the request in to raf so it can be
    * cancelled in the resize observer in Neon.
    *
    **/


    this.raf = requestAnimationFrame(this.draw);
  }

}