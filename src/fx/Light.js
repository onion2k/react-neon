import Fx from "./Fx";

export default class Light extends Fx {

    constructor() {

        super();

        this.mouse = [0, 0];

    }

    render() {

    }

    listeners(el) {

        el.addEventListener('mousemove', (e) => {
            this.mouse = [e.x - this.bb.left, e.y - this.bb.top];
        })

    }

    attach(ctx, bb) {

        this.ctx = ctx;
        this.bb = bb;

    }

}

