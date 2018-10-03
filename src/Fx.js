/**
*
* React Neon FX effect base class.
* Extend this class to create new effects to use with React Neon.
*
**/

export default class Fx {
    
    /**
    *
    * mouse, clicks and history hold data about the state of the page to use in the effect
    * mouse - an array that hold the mouse position relative to the component that's wrapper in Neon
    * clicks - an array of mouse positions when the user has clicked
    * history - the last 100 mouse positions
    *
    **/

    mouse = [0, 0];
    clicks = [];
    history = [];
    mouseover = false;
    context = '2d';

    _default = {
        mouse: false,
        history: false,
        click: false,
        intersection: false,
        padding: 0
    }

    constructor(options) {

        /**
        *
        * raf is the requestAnimationFrame id for the current frame. It's needed to cancel
        * the animation callback in situations like resizing.
        *
        **/
        this.raf = null;

        /**
        *
        * ctx is the Neon canvas element. By default it's a 2d context.
        *
        **/
        this.ctx = null;

        /**
        *
        * bb holds the bounding box size information about the Neon element. Note that if the effect
        * being used has a 'padding' option then this will be bigger than the component.
        *
        **/
        this.bb = {};

        /**
        *
        * options is an object that holds the effects configuration object that's passed in at construction
        * plus a few options that make adding listeners a bit simpler.
        *
        **/
        this.options = Object.assign(this._default, this.default, options);

        /**
        *
        * draw needs to be bound to the current object instance context for `this` to work.
        *
        **/
        this.draw = this.draw.bind(this);

    }


    /**
    *
    * attach runs when the component is inserted in to the DOM, during componentDidMount() in
    * the case of React. It has to be run at this time for the bounding boxes to be calculated and
    * the canvas context to be available.
    *
    **/
    attach(component, ctx, bb) {

        this.ctx = ctx;
        this.bb = bb;
        this.childPositions = [];

        Array.from(component.children).map((c)=>{

            const cbb = c.getBoundingClientRect();
            const cp = {
                _x: cbb.x,
                _y: cbb.y,
                top: cbb.top,
                left: cbb.left,
                width: cbb.width,
                height: cbb.height,
                x: cbb.x - this.bb.left,
                y: cbb.y - this.bb.top
            };

            this.childPositions.push(cp);

        });

        this.init();
    }

    /**
    *
    * Override init() with a function that gets called as soon as the effect has attached to the DOM
    *
    **/
    init() {
        // override me do
    }

    /**
    *
    * Override draw() with a function that draws to the canvas on every frame
    *
    **/
    draw() {
        // override this with a draw function
    }

    intersect(c) {

    }

    /**
    *
    * Cancel stops the requestAnimationFrame callback on a resize so it isn't run twice.
    * Override this if you need to do something before the draw() call runs.
    *
    **/
    cancel() {
        if (this.raf) {
            cancelAnimationFrame(this.raf);
        }
    }

    /**
    *
    * Override listeners() if you need to return different data from element event listeners
    *
    **/
    listeners(el) {

        if (this.options.mouse === true) {
            el.addEventListener('mousemove', (e) => {
                this.mouse = [e.x - this.bb.left + e.view.scrollX, e.y - this.bb.top + e.view.scrollY];
            });
            el.addEventListener('mouseenter', (e) => {
                this.mouseover = true;
            });
            el.addEventListener('mouseout', (e) => {
                this.mouseover = false;
            });
        }

        if (this.options.history === true) {
            el.addEventListener('mousemove', (e) => {
                this.history.push([e.x - this.bb.left + e.view.scrollY, e.y - this.bb.top + e.view.scrollY, Math.random(), Math.random(), 50 + Math.random() * 100]);
            })
        }

        if (this.options.clicks === true) {
            el.addEventListener('click', (e) => {
                this.clicks.push([e.x - this.bb.left + e.view.scrollX, e.y - this.bb.top + e.view.scrollY]);
            })
        }

    }
    
    /**
    *
    * listenMouse, listenMouseHistory and listenClick are helpers for setting options. They'll probably
    * be removed in a refactor soon because they're not really necessary.
    *
    **/
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

    listenIntersection() {
        // attach scroll position listener   
        this.options.intersection = true;
        return this;
    }
    /**
    *
    * TODO: We'll need to listen for the scroll position eventually.
    *
    **/
    listenScrollPosition() {
        return this;
    }
}

