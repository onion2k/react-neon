(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('twgl.js'), require('react'), require('react-dom')) :
  typeof define === 'function' && define.amd ? define(['exports', 'twgl.js', 'react', 'react-dom'], factory) :
  (factory((global.neon = {}),global.twgl,global.React,global.ReactDOM));
}(this, (function (exports,twgl,React,ReactDOM) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  /**
  *
  * React Neon FX effect base class.
  * Extend this class to create new effects to use with React Neon.
  *
  **/
  class Fx {
    /**
    *
    * mouse, clicks and history hold data about the state of the page to use in the effect
    * mouse - an array that hold the mouse position relative to the component that's wrapper in Neon
    * clicks - an array of mouse positions when the user has clicked
    * history - the last 100 mouse positions
    *
    **/
    constructor(options) {
      _defineProperty(this, "mouse", [0, 0]);

      _defineProperty(this, "clicks", []);

      _defineProperty(this, "history", []);

      _defineProperty(this, "mouseover", false);

      _defineProperty(this, "context", '2d');

      _defineProperty(this, "_default", {
        obsMouse: false,
        obsHistory: false,
        obsClick: false,
        obsIntersection: false,
        obsScroll: false,
        padding: 0
      });

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
      Array.from(component.children).map(c => {
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


    init() {} // override me do

    /**
    *
    * Override draw() with a function that draws to the canvas on every frame
    *
    **/


    draw() {} // override this with a draw function

    /**
    *
    * Override intersect() with a function that fires when the component intersection changes
    *
    **/


    intersect(c) {}
    /**
    *
    * Override scroll() with a function that fires when the window scrolls
    *
    **/


    scroll(e) {}
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
      if (this.options.obsMouse === true) {
        el.addEventListener('mousemove', e => {
          this.mouse = [e.x - this.bb.left + e.view.scrollX, e.y - this.bb.top + e.view.scrollY];
        });
        el.addEventListener('mouseenter', e => {
          this.mouseover = true;
        });
        el.addEventListener('mouseout', e => {
          this.mouseover = false;
        });
      }

      if (this.options.obsHistory === true) {
        el.addEventListener('mousemove', e => {
          this.history.push([e.x - this.bb.left + e.view.scrollY, e.y - this.bb.top + e.view.scrollY, Math.random(), Math.random(), 50 + Math.random() * 100]);
        }, {
          passive: true
        });
      }

      if (this.options.obsClick === true) {
        el.addEventListener('click', e => {
          this.clicks.push([e.x - this.bb.left + e.view.scrollX, e.y - this.bb.top + e.view.scrollY]);
        });
      }

      if (this.options.obsScroll === true) {
        window.addEventListener('scroll', e => {
          // this.history.push([e.x - this.bb.left + e.view.scrollY, e.y - this.bb.top + e.view.scrollY, Math.random(), Math.random(), 50 + Math.random() * 100]);
          this.scroll(e);
        });
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
      this.options.obsMouse = true;
      return this;
    }

    listenMouseHistory() {
      // attach position history listener   
      this.options.obsHistory = true;
      return this;
    }

    listenClick() {
      // attach scroll position listener   
      this.options.obsClick = true;
      return this;
    }

    listenIntersection() {
      this.options.obsIntersection = true;
      return this;
    }

    listenScroll() {
      this.options.obsScroll = true;
      return this;
    }

  }

  class Bokeh extends Fx {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "points", [[0.1, 0.3, 3], [0.2, 0.4, 2], [0.3, 0.2, 2], [0.4, 0.4, 1.5], [0.6, 0.2, 2], [-0.1, 0.7, 1.5], [0.75, 0.5, 2]]);

      _defineProperty(this, "time", 0);

      _defineProperty(this, "mouse", [0, 0]);
    }

    drawShape(ctx, x, y, points, radius1, radius2, alpha0) {
      let i, angle, radius;

      if (radius2 !== radius1) {
        points = 2 * points;
      }

      for (i = 0; i <= points; i++) {
        angle = i * 2 * Math.PI / points - Math.PI / 2 + alpha0;
        radius = i % 2 === 0 ? radius1 : radius2;
        ctx.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
      }
    }

    draw() {
      if (this.ctx !== null) {
        this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);
        this.points.forEach(p => {
          this.ctx.beginPath();
          this.ctx.fillStyle = 'hsla(64,' + 30 * p[2] + '%,50%,' + 0.2 * p[2] + ')';
          this.drawShape(this.ctx, this.bb.width * p[0] + this.mouse[0] / 6 / p[2], this.bb.height * p[1] - this.mouse[1] / 6 / p[2], 7, 50 * (4 - p[2]), 50 * (4 - p[2]), 0);
          this.ctx.fill();
        });
      }

      this.raf = requestAnimationFrame(this.draw);
    }

    listeners(el) {
      el.addEventListener('mousemove', e => {
        this.mouse = [e.x - this.bb.left, e.y - this.bb.top];
      });
    }

  }

  class Fuzz extends Fx {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "hair", []);

      _defineProperty(this, "length", this.options.size);

      _defineProperty(this, "maxActive", 500);

      _defineProperty(this, "scrollPos", {
        dx: 0,
        dy: 0,
        x: 0,
        y: 0
      });
    }

    jitter(value) {
      return Math.random() * value - value / 2;
    }

    init() {
      this.hair = [];
      const w = this.bb.width - this.padding * 2;
      const h = this.bb.height - this.padding * 2;

      for (var i = 0; i < this.maxActive / 2; i++) {
        let y = this.options.padding + Math.floor(Math.random() * (this.bb.height - this.options.padding * 2));
        this.hair.push({
          v: 0,
          x: this.options.padding + this.jitter(-10),
          x2: -1,
          y: y
        });
        this.hair.push({
          v: 0,
          x: this.bb.width - this.options.padding + this.jitter(10),
          x2: +1,
          y: y
        });
        let x = this.options.padding + Math.floor(Math.random() * (this.bb.width - this.options.padding * 2));
        this.hair.push({
          v: 0,
          x: x,
          x2: x < this.bb.width / 2 ? -1 : 1,
          y: this.options.padding + this.jitter(-10)
        });
        this.hair.push({
          v: 0,
          x: x,
          x2: x < this.bb.width / 2 ? -1 : 1,
          y: this.bb.height - this.options.padding + this.jitter(10)
        });
      }
    }

    scroll(e) {
      this.scrollPos = {
        dx: this.scrollPos.x - window.scrollX,
        dy: this.scrollPos.y - window.scrollY,
        x: window.scrollX,
        y: window.scrollY
      };
      let s = 0;

      if (this.scrollPos.dy > 0) {
        s = this.scrollPos.dy / 100;
      } else {
        s = this.scrollPos.dy / 200;
      }

      this.hair.forEach((m, i) => {
        m.v += s;
      });
    }

    draw() {
      if (this.ctx !== null) {
        const MIN_ANGLE = 0.1;
        const MAX_ANGLE = Math.PI * 0.75;
        this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);

        if (this.hair.length) {
          this.ctx.strokeStyle = 'hsla(0,100%,50%,1)';
          this.hair.forEach((m, i) => {
            if (this.mouseover) {
              let d = Math.hypot(m.x - this.mouse[0], m.y - this.mouse[1]);

              if (d < 100) {
                m.v += 0.3;
              } else {
                m.v -= 0.05;
              }
            } else {
              m.v -= 0.05;
            }

            if (m.v < MIN_ANGLE) {
              m.v = MIN_ANGLE;
            } else if (m.v > MAX_ANGLE) {
              m.v = MAX_ANGLE;
            }

            const x2 = m.x + this.length * m.x2 * Math.sin(m.v);
            const y2 = m.y + this.length * Math.cos(m.v);
            this.ctx.beginPath();
            this.ctx.moveTo(m.x, m.y);
            this.ctx.lineTo(x2, y2);
            this.ctx.stroke();
          });
        }
      }

      this.raf = requestAnimationFrame(this.draw);
    }

  }

  /**
  *
  * Heatmap is a very basic map of the positions where the user has clicked.
  *
  **/

  class Heatmap extends Fx {
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

  /**
  *
  * A light shining from the center of the component that follows the user's mouse
  *
  **/

  class Light extends Fx {
    /**
    *
    * clamp is a utility that takes a value, min and max, and returns the min if it's less than the min and the
    * max if it's greater than the max, or just the initial value if they're not.
    *
    **/
    clamp(x, min, max) {
      return Math.min(Math.max(x, min), max);
    }

    draw() {
      if (this.ctx !== null) {
        /**
        *
        * Clear the canvas
        *
        **/
        this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);
        /**
        *
        * Get a normalized mouse position (-1 to 1)
        *
        **/

        const lx = this.mouse[0] / this.bb.width * 2 - 1;
        const ly = this.mouse[1] / this.bb.height * 2 - 1;
        /**
        *
        * Precalculate some values for 1/2 and 1/3 sizes. More to make the code nicer
        * than any sort of optimization.
        *
        **/

        const halfWidth = this.bb.width / 2;
        const thirdWidth = this.bb.width / 3;
        const halfHeight = this.bb.height / 2;
        const thirdHeight = this.bb.height / 3;
        /**
        *
        * Create a radial gradient from the center to the mouse position. Note that the gradient
        * needs to be limited to less than the 'radius' of the component (minimum side / 2).
        *
        **/

        let g = this.ctx.createRadialGradient(halfWidth, halfHeight, 0, halfWidth + this.clamp(lx * thirdWidth, -1 * thirdWidth, thirdWidth), halfHeight + this.clamp(ly * thirdHeight, -1 * thirdHeight, thirdHeight), halfHeight);
        g.addColorStop(0, this.options.startColor);
        g.addColorStop(1, this.options.endColor);
        /**
        *
        * Fill the canvas with the gradient
        *
        **/

        this.ctx.fillStyle = g;
        this.ctx.fillRect(0, 0, this.bb.width, this.bb.height);
      }

      this.raf = requestAnimationFrame(this.draw);
    }

  }

  class Neon extends Fx {
    constructor(options) {
      super(options);

      _defineProperty(this, "flicker", 0);

      _defineProperty(this, "randFlicker", 0);

      _defineProperty(this, "color", 0);

      _defineProperty(this, "saturation", '0%');

      _defineProperty(this, "lightness", '50%');

      _defineProperty(this, "onoff", true);

      if (!options.padding) {
        this.options.padding = options.size;
      }
    }

    intersect(c) {
      if (c[0].intersectionRatio === 1) {
        this.onoff = true;
        this.randFlicker = 0;
      } else {
        this.onoff = false;
      }
    }

    draw() {
      if (this.ctx !== null) {
        this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);
        this.ctx.globalCompositeOperation = "lighter";
        let color = this.color;
        let saturation = this.saturation;
        let lightness = this.lightness;

        if (this.onoff) {
          if (this.flicker++ > this.randFlicker) {
            if (this.saturation === '100%') {
              this.saturation = '0%';
              this.lightness = '20%';
              this.randFlicker = Math.floor(Math.random() * 30);
            } else {
              this.saturation = '100%';
              this.lightness = '50%';
              this.randFlicker = Math.floor(Math.random() * 200);
            }

            this.flicker = 0;
          }
        } else {
          this.saturation = '0%';
          this.lightness = '20%';
        }

        const ps = this.options.padding - this.options.size;
        const itl = {
          x: this.options.padding,
          y: this.options.padding
        };
        const itr = {
          x: this.bb.width - this.options.padding,
          y: this.options.padding
        };
        const ibl = {
          x: this.options.padding,
          y: this.bb.height - this.options.padding
        };
        const ibr = {
          x: this.bb.width - this.options.padding,
          y: this.bb.height - this.options.padding
        };
        const otl = {
          x: ps,
          y: ps
        };
        const otr = {
          x: this.bb.width - ps,
          y: ps
        };
        const obl = {
          x: ps,
          y: this.bb.height - ps
        }; // const obr = { x: this.bb.width - ps, y: this.bb.height - ps };

        const iw = this.bb.width - this.options.padding * 2;
        const ih = this.bb.height - this.options.padding * 2;
        const ow = this.bb.width;
        const oh = this.bb.height;
        let g = this.ctx.createLinearGradient(otl.x, otl.y, itl.x, otl.y);
        g.addColorStop(0, 'hsla(' + color + ',' + saturation + ',' + lightness + ',0)');
        g.addColorStop(1, 'hsla(' + color + ',' + saturation + ',' + lightness + ',1)');
        this.ctx.fillStyle = g;
        this.ctx.fillRect(otl.x, itl.y, itl.x, ih);
        g = this.ctx.createLinearGradient(itr.x, otr.y, otr.x, otr.y);
        g.addColorStop(0, 'hsla(' + color + ',' + saturation + ',' + lightness + ',1)');
        g.addColorStop(1, 'hsla(' + color + ',' + saturation + ',' + lightness + ',0)');
        this.ctx.fillStyle = g;
        this.ctx.fillRect(itr.x, itr.y, itl.x, ih);
        g = this.ctx.createLinearGradient(itl.x, itl.y, itl.x, otl.y);
        g.addColorStop(0, 'hsla(' + color + ',' + saturation + ',' + lightness + ',1)');
        g.addColorStop(1, 'hsla(' + color + ',' + saturation + ',' + lightness + ',0)');
        this.ctx.fillStyle = g;
        this.ctx.fillRect(itl.x, otl.y, iw, itl.y);
        g = this.ctx.createLinearGradient(ibl.x, ibl.y, ibl.x, obl.y);
        g.addColorStop(0, 'hsla(' + color + ',' + saturation + ',' + lightness + ',1)');
        g.addColorStop(1, 'hsla(' + color + ',' + saturation + ',' + lightness + ',0)');
        this.ctx.fillStyle = g;
        this.ctx.fillRect(ibl.x, ibl.y, iw, oh);
        g = this.ctx.createRadialGradient(itl.x, itl.y, 0, itl.x, itl.y, this.options.size);
        g.addColorStop(0, 'hsla(' + color + ',' + saturation + ',' + lightness + ',1)');
        g.addColorStop(1, 'hsla(' + color + ',' + saturation + ',' + lightness + ',0)');
        this.ctx.fillStyle = g;
        this.ctx.fillRect(otl.x, otl.y, this.options.size, this.options.size);
        g = this.ctx.createRadialGradient(itr.x, itr.y, 0, itr.x, itr.y, this.options.size);
        g.addColorStop(0, 'hsla(' + color + ',' + saturation + ',' + lightness + ',1)');
        g.addColorStop(1, 'hsla(' + color + ',' + saturation + ',' + lightness + ',0)');
        this.ctx.fillStyle = g;
        this.ctx.fillRect(itr.x, otr.y, this.options.size, this.options.size);
        g = this.ctx.createRadialGradient(ibl.x, ibl.y, 0, ibl.x, ibl.y, this.options.size);
        g.addColorStop(0, 'hsla(' + color + ',' + saturation + ',' + lightness + ',1)');
        g.addColorStop(1, 'hsla(' + color + ',' + saturation + ',' + lightness + ',0)');
        this.ctx.fillStyle = g;
        this.ctx.fillRect(obl.x, ibl.y, this.options.size, this.options.size);
        g = this.ctx.createRadialGradient(ibr.x, ibr.y, 0, ibr.x, ibr.y, this.options.size);
        g.addColorStop(0, 'hsla(' + color + ',' + saturation + ',' + lightness + ',1)');
        g.addColorStop(1, 'hsla(' + color + ',' + saturation + ',' + lightness + ',0)');
        this.ctx.fillStyle = g;
        this.ctx.fillRect(ibr.x, ibr.y, this.options.size, this.options.size);
        this.ctx.clearRect(this.options.padding, this.options.padding, this.bb.width - this.options.padding * 2, this.bb.height - this.options.padding * 2);
      }

      this.raf = requestAnimationFrame(this.draw);
    }

  }

  /**
  *
  * Basic particles radiating from the user's mouse, with more when the user clicks.
  *
  **/

  class Particles extends Fx {
    constructor() {
      super();
      /**
      *
      * particles is an array that holds the current particles that are on the canvas
      * particleCount is the number of particles that are added when the mouse is moved
      *
      **/

      this.particles = [];
      this.particleCount = 4;
    }

    draw() {
      if (this.ctx !== null) {
        /**
        *
        * Clear the canvas.
        *
        **/
        this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);
        /**
        *
        * If there aren't any particles then skip handling them entirely
        *
        **/

        if (this.particles.length) {
          /**
          *
          * Loop through the current particles
          *
          **/
          this.particles.forEach((m, i) => {
            /**
            *
            * If the lifetime is less than zero after being decremented then remove the particle from
            * the particles array
            *
            **/
            if (--m[4] < 0) {
              this.particles.splice(i, 1);
            }
            /**
            *
            * Set the fill style to be white with an opacity that's inversely related to the age, so it
            * fades away.
            *
            **/


            this.ctx.fillStyle = 'hsla(0,100%,100%,' + m[4] / 100 + ')';
            /**
            *
            * Draw the particle
            *
            **/

            this.ctx.beginPath();
            this.ctx.arc(m[0], m[1], 2, 0, 2 * Math.PI);
            this.ctx.fill();
            /**
            *
            * Move the particle based on it's x and y velocity values
            *
            **/

            m[0] += Math.sin(Math.PI * 2 * m[2]);
            m[1] += Math.cos(Math.PI * 2 * m[3]);
          });
        }
      }

      this.raf = requestAnimationFrame(this.draw);
    }

    listeners(el) {
      /**
      *
      * Add a custom listener that creates particules when the mouse moves.
      * Each particle is an array of [ x position, y position, x velocity, y velocity, lifetime]
      *
      **/
      el.addEventListener('mousemove', e => {
        for (let x = 0; x < this.particleCount; x++) {
          this.particles.push([e.x - this.bb.left + e.view.scrollX, e.y - this.bb.top + e.view.scrollY, Math.random(), Math.random(), 50 + Math.random() * 100]);
        }
      });
      /**
      *
      * Add more particles on a mouse click
      *
      **/

      el.addEventListener('click', e => {
        for (let x = 0; x < this.particleCount * 4; x++) {
          this.particles.push([e.x - this.bb.left + e.view.scrollX, e.y - this.bb.top + e.view.scrollY, Math.random(), Math.random(), 50 + Math.random() * 100]);
        }
      });
    }

  }

  class Shader extends Fx {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "context", 'webgl');
    }

    init() {
      this.programInfo = twgl.createProgramInfo(this.ctx, [this.options.vs, this.options.fs]);
      let arrays = {
        position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]
      };
      this.bufferInfo = twgl.createBufferInfoFromArrays(this.ctx, arrays);
    }

    draw(time) {
      if (this.ctx !== null) {
        twgl.resizeCanvasToDisplaySize(this.ctx.canvas);
        this.ctx.viewport(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
        var uniforms = {
          u_time: time * 0.001,
          u_resolution: [this.ctx.canvas.width, this.ctx.canvas.height]
        };
        this.ctx.useProgram(this.programInfo.program);
        twgl.setBuffersAndAttributes(this.ctx, this.programInfo, this.bufferInfo);
        twgl.setUniforms(this.programInfo, uniforms);
        twgl.drawBufferInfo(this.ctx, this.bufferInfo);
      }

      this.raf = requestAnimationFrame(this.draw);
    }

  }

  class Light$1 extends Fx {
    draw() {
      if (this.ctx !== null) ;

      this.raf = requestAnimationFrame(this.draw);
    }

  }

  /**
  *
  * Snow is a particle system that draws a fixed number of particles that move across the canvas a
  * bit like it's snowing.
  *
  **/

  class Snow extends Fx {
    /**
    *
    * Set up some defaults. These should really come from amn options config object...
    * TODO: Use options.
    *
    **/
    constructor() {
      super();
      this.wind = 2;
      this.maxActive = 200;
      this.snowflakes = [];
    }
    /**
    *
    * init() runs when the effect is added to the DOM.
    * Create all the snowflakes at the start in random positions around the canvas, with
    * a random downward velocity (vy).
    *
    **/


    init() {
      this.snowflakes = [];

      for (var i = 0; i < this.maxActive; i++) {
        var x = Math.floor(Math.random() * this.bb.width);
        var y = Math.floor(Math.random() * this.bb.height);
        this.snowflakes.push({
          x: x,
          y: y,
          vy: 1 + Math.random() * 3
        });
      }
    }

    draw() {
      /**
      *
      * Only draw if there's a canvas to draw on..
      *
      **/
      if (this.ctx !== null) {
        /**
        *
        * Clear the canvas every frame
        *
        **/
        this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);
        /**
        *
        * Set the style for the snowflake
        *
        **/

        this.ctx.fillStyle = 'hsla(0,100%,100%,1)';
        /**
        *
        * Loop through the snowflakes array and draw each one.
        *
        **/

        this.snowflakes.forEach(f => {
          /**
          *
          * Move the snowflake downwards by it's velocity
          *
          **/
          f.y += f.vy;
          /**
          *
          * If the snowflake has reached the bottom for the canvas move it back to the top,
          * and move it to a random horizontal position.
          *
          **/

          if (f.y > this.bb.height) {
            f.y = 0;
            f.x = Math.floor(Math.random() * this.bb.width);
          }
          /**
          *
          * Update the x position based on a wind factor and some random jittering.
          *
          **/


          f.x += this.wind + (Math.random() * 2 - 1);
          /**
          *
          * As the snowflakes can be affected by a wind factor check to see if they've gone over
          * the edge of the canvas. If they have, move it back to the other side.
          *
          **/

          if (f.x > this.bb.width) {
            f.x = 0;
          } else if (f.x < 0) {
            f.x = this.bb.width;
          }
          /**
          *
          * Draw the snowflake as a small white circle.
          *
          **/


          this.ctx.beginPath();
          this.ctx.arc(f.x, f.y, 2, 0, 2 * Math.PI);
          this.ctx.fill();
        });
      }

      this.raf = requestAnimationFrame(this.draw);
    }

  }

  class Sparks extends Fx {
    constructor(...args) {
      super(...args);

      _defineProperty(this, "particles", []);

      _defineProperty(this, "particleCount", 40);

      _defineProperty(this, "sparkState", false);
    }

    draw() {
      if (this.ctx !== null) {
        this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);

        if (this.particles.length) {
          this.ctx.lineWidth = 3;
          this.particles.forEach((m, i) => {
            if (--m[4] < 0) {
              this.particles.splice(i, 1);
            }

            const px = m[0];
            const py = m[1];
            m[0] += m[2];
            m[1] += m[3];
            this.ctx.strokeStyle = 'hsla(192,100%,50%,' + m[4] / 100 + ')';
            this.ctx.beginPath();
            this.ctx.moveTo(px, py);
            this.ctx.lineTo(m[0], m[1]);
            this.ctx.stroke();
          });
        }
      }

      this.raf = requestAnimationFrame(this.draw);
    }

    listeners(el) {
      el.addEventListener('mousemove', e => {
        const a = {
          x: e.x - this.bb.left + e.view.scrollX,
          y: e.y - this.bb.top + e.view.scrollY,
          width: 1,
          height: 1
        };
        const b = {
          x: this.childPositions[0].x,
          y: this.childPositions[0].y,
          width: this.childPositions[0].width,
          height: this.childPositions[0].height
        };
        const spark = a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.height + a.y > b.y;

        if (spark !== this.sparkState) {
          this.sparkState = spark;
          let m = Math.atan2(e.movementX, e.movementY);

          if (m < 0) {
            m += 2 * Math.PI;
          }

          for (let x = 0; x < this.particleCount; x++) {
            this.particles.push([a.x, a.y, 2 * (Math.sin(m) + (-0.5 + Math.random())), 2 * (Math.cos(m) + (-0.5 + Math.random())), Math.random() * 100]);
          }
        }
      });
    }

  }

  /**
  *
  * This effect leverages the React-Neon FX base class from https://github.com/onion2k/react-neon
  *
  **/

  class Torch extends Fx {
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

  const fx = {
    Bokeh: Bokeh,
    Fuzz: Fuzz,
    Heatmap: Heatmap,
    Light: Light,
    Neon: Neon,
    Particles: Particles,
    Shader: Shader,
    Shadows: Light$1,
    Snow: Snow,
    Sparks: Sparks,
    Torch: Torch
  };
  Object.freeze(fx);
  /**
  *
  * The withNeon HoC wrapper.
  * Neon works by taking a React component and returning a new component that includes a canvas element as well.
  * This should really be using a portal though, so expect it to change soon.
  *
  **/

  const withNeon = (NeonComponent, effect) => {
    return class extends React.Component {
      /**
      *
      * Use React's nice new createRef() method to generate some refs for the component and canvas
      *
      **/

      /**
      *
      * The resize callback needs to run in the context of this class
      *
      **/
      constructor(props) {
        super(props);
        /**
        *
        * The effect plugin that's passed in from the withNeon HoC
        *
        **/

        _defineProperty(this, "componentref", React__default.createRef());

        _defineProperty(this, "canvasref", React__default.createRef());

        _defineProperty(this, "resize", this.resize.bind(this));

        _defineProperty(this, "intersect", this.intersect.bind(this));

        this.fx = effect;
        /**
        *
        * ro is a resizeObserver. This calls the resize callback once the page is ready, and again
        * every time the component is resized (eg by the window changing, or the content)
        *
        **/

        this.ro = new window.ResizeObserver(this.resize);
      }
      /**
      *
      * The intersect callback takes a parameter, c, that contains the current component element (in an array).
      *
      **/


      intersect(c) {
        this.fx.intersect(c);
      }
      /**
      *
      * The resize callback takes a parameter, c, that contains the current component element (in an array).
      *
      **/


      resize(c) {
        /**
        *
        * Stop the current animation, otherwise it'll be run twice when the resize event completes
        *
        **/
        this.fx.cancel();
        /**
        *
        * getBoundingClientRect() returns an immutable DOMRect object, so we need to get the data from the
        * DOM and then turn it in to a more useful set of properties. Destructuring for the win.
        *
        **/

        const bb = c[0].target.getBoundingClientRect();
        let {
          top,
          left,
          width,
          height
        } = bb;
        /**
        *
        * If the page is reloaded the scroll position is retained, which breaks positioning. Add the starting
        * scroll position to the left and top to fix.
        *
        **/

        left += window.scrollX;
        top += window.scrollY;
        /**
        *
        * If the effect needs to draw outside of the region defined by the component it'll have a padding
        * value set. We double the padding (so it's equal on all sides) and then subtract the padding from
        * the top and left to move the origin to the right position.
        *
        **/

        if (this.fx.options.padding > 0) {
          width += this.fx.options.padding * 2;
          height += this.fx.options.padding * 2;
          top -= this.fx.options.padding;
          left -= this.fx.options.padding;
        }
        /**
        *
        * Update the CSS styles of the canvas using the new size and position data.
        * NOTE: This is what makes the canvas visible (display: 'block').
        * NOTE: The pointerEvents: 'none' setting stops the canvas getting any mouse events.
        *
        **/


        Object.assign(this.canvasref.current.style, {
          display: 'block',
          position: 'absolute',
          width: width + 'px',
          height: height + 'px',
          top: top + 'px',
          left: left + 'px',
          zIndex: 999,
          pointerEvents: 'none'
        });
        /**
        *
        * HTML5's canvas element uses the width and height attributes to define what size canvas we can draw on.
        * If these are different to the element's CSS style we get horrible rescaling artefacts.
        *
        **/

        this.canvasref.current.width = width;
        this.canvasref.current.height = height;
        /**
        *
        * Right now we use a 2d context for everything, but in the future this will change to a value defined
        * by the plugin so we can have 3d contexts for shaders.
        *
        **/

        const ctx = this.canvasref.current.getContext(this.fx.context);
        /**
        *
        * Finally we attach to the effect passing in the component element, the canvas context and the 
        * bounding box data.
        *
        **/

        this.fx.attach(ReactDOM.findDOMNode(this.componentref.current), ctx, {
          top,
          left,
          width,
          height
        });
        this.fx.draw();
      }
      /**
      *
      * componentDidMount() runs when the element has been attached to the DOM. At this point we can set up our
      * event listeners (eg clicking and mouse movement on the component). We couldn't do that until the element
      * is part of the DOM.
      * We also need to set the ResizeObserver to observe the new element. When this happens the resize callback
      * runs which does things like updating the CSS styles to make the canvas visible.
      *
      **/


      componentDidMount() {
        const componentCurrentDOMEl = ReactDOM.findDOMNode(this.componentref.current);
        this.fx.listeners(componentCurrentDOMEl);
        this.ro.observe(componentCurrentDOMEl);

        if (this.fx.options.obsIntersection) {
          let thresholds = [];
          let numSteps = 50;

          for (let i = 1.0; i <= numSteps; i++) {
            let ratio = i / numSteps;
            thresholds.push(ratio);
          }

          thresholds.push(0);
          const options = {
            threshold: thresholds
          };
          this.io = new window.IntersectionObserver(this.intersect, options);
          this.io.observe(componentCurrentDOMEl);
        }
      }
      /**
      *
      * The withNeon render() function renders the component that's being wrapped along with a canvas. The canvas
      * isn't displayed to start with - we want it to only be visible once the resize observer has been run.
      *
      **/


      render() {
        // How to do this through a portal?
        return React__default.createElement("div", null, React__default.createElement(NeonComponent, {
          ref: this.componentref
        }), React__default.createElement("canvas", {
          ref: this.canvasref,
          style: {
            display: 'none'
          }
        }));
      }

    };
  };

  exports.default = withNeon;
  exports.fx = fx;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
