import Fx from "../Fx";

export default class Crystal extends Fx {

    draw() {
        if (this.ctx!==null) {

        }
        this.raf = requestAnimationFrame(this.draw);
    }

}