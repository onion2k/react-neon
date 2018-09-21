
export default class Fx {

    mouse = [0, 0];
    clicks = [];
    history = [];

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

    attach(component, ctx, bb) {
        this.ctx = ctx;
        this.bb = bb;

        this.init();
    }

    init() {
        // override me do
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

        if (this.options.history === true) {
            el.addEventListener('mousemove', (e) => {
                this.history.push([e.x - this.bb.left, e.y - this.bb.top, Math.random(), Math.random(), 50 + Math.random() * 100]);
            })
        }

        if (this.options.clicks === true) {
            el.addEventListener('click', (e) => {
                this.clicks.push([e.x - this.bb.left, e.y - this.bb.top]);
            })
        }

    }
    
    listenMouse(el) {
        // attach mouse listener
        this.options.mouse = true;
        return this;
    }

    listenMouseHistory() {
        // attach position history listener   
        this.options.history = true;
        return this;
    }

    listenClick() {
        // attach scroll position listener   
        this.options.clicks = true;
        return this;
    }

    listenScrollPosition() {

        return this;
    }
}

