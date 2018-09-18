
export default class Fx {

    mouse = [0, 0];

    constructor(options) {

        this.raf = null;
        this.ctx = null;
        this.bb = {};
        this.options = Object.assign({
            mouse: false,
            history: false,
            click: false
        }, options);

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
        if (this.options.mouse === true) {
            el.addEventListener('mousemove', (e) => {
                this.mouse = [e.x - this.bb.left, e.y - this.bb.top];
            })
        }
    }

    attach(component, ctx, bb) {
        this.ctx = ctx;
        this.bb = bb;
    }
    
    listenMouse(el) {
        // attach mouse listener
        this.options.mouse = true;
    }

    listenMouseHistory() {
     // attach position history listener   
    }

    listenScrollPosition() {
     // attach scroll position listener   
    }

}

