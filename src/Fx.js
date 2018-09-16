
export default class Fx {

    constructor() {

        this.raf = null;
        this.ctx = null;
        this.bb = {};

        this.draw = this.draw.bind(this);

    }

    draw() {
        // override this with a draw function
    }

    cancel() {
        if (this.raf) {
            cancelAnimationFrame(this.raf);
        }
    }

    listeners(el) {
        // attach custom listeners
    }

    attach(component, ctx, bb) {
        this.ctx = ctx;
        this.bb = bb;
    }
    
    listenMouse() {
     // attach mouse listener   
    }

    listenMouseHistory() {
     // attach position history listener   
    }

    listenScrollPosition() {
     // attach scroll position listener   
    }

}

