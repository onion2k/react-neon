
export default class Fx {

    constructor() {

        this.raf = null;
        this.ctx = null;
        this.bb = {};

        this.draw = this.draw.bind(this);

    }

    draw() {

    }

    cancel() {
        if (this.raf) {
            cancelAnimationFrame(this.raf);
        }
    }

    listeners(el) {

    }

    attach(component, ctx, bb) {
        this.ctx = ctx;
        this.bb = bb;
    }

}

