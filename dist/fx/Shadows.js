import Fx from "../Fx";
export default class Light extends Fx {
  draw() {
    if (this.ctx !== null) {}

    this.raf = requestAnimationFrame(this.draw);
  }

}