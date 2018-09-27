import Fx from "../Fx";
/**
*
* Heatmap is a very basic map of the positions where the user has clicked.
*
**/

export default class Heatmap extends Fx {
  draw() {
    /**
    *
    * Only draw if the canvas context is available
    *
    **/
    if (this.ctx !== null) {
      /**
      *
      * Clear the whole canvas on every frame
      *
      **/
      this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);
      /**
      *
      * Every time the user clicks the wrapped component the position is added to an
      * array. This simply loops through the array and draws a red square at all the positions
      *
      **/

      if (this.clicks.length) {
        this.ctx.fillStyle = 'hsla(0,100%,50%,0.7)';
        this.clicks.forEach((m, i) => {
          this.ctx.beginPath();
          this.ctx.arc(m[0], m[1], 6, 0, 2 * Math.PI);
          this.ctx.fill();
        });
      }
      /**
      *
      * Heatmap draws a small red square where the user's mouse pointer is
      *
      **/


      this.ctx.fillStyle = 'hsla(0,100%,50%,1)';
      this.ctx.fillRect(this.mouse[0] - 2, this.mouse[1] - 2, 5, 5);
    }
    /**
    *
    * Request a new frame and remember the callback id in case it needs to be cancelled
    *
    **/


    this.raf = requestAnimationFrame(this.draw);
  }

}