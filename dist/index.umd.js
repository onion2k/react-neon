(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('react'), require('react-dom'), require('resize-observer'), require('twgl.js')) :
  typeof define === 'function' && define.amd ? define(['exports', 'react', 'react-dom', 'resize-observer', 'twgl.js'], factory) :
  (factory((global.neon = {}),global.React,global.ReactDOM,global.resizeObserver,global.twgl));
}(this, (function (exports,React,ReactDOM,resizeObserver,twgl) { 'use strict';

  var React__default = 'default' in React ? React['default'] : React;
  ReactDOM = ReactDOM && ReactDOM.hasOwnProperty('default') ? ReactDOM['default'] : ReactDOM;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

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

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  /**
  *
  * React Neon FX effect base class.
  * Extend this class to create new effects to use with React Neon.
  *
  **/
  var Fx =
  /*#__PURE__*/
  function () {
    /**
    *
    * mouse, clicks and history hold data about the state of the page to use in the effect
    * mouse - an array that hold the mouse position relative to the component that's wrapper in Neon
    * clicks - an array of mouse positions when the user has clicked
    * history - the last 100 mouse positions
    *
    **/
    function Fx(options) {
      _classCallCheck(this, Fx);

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


    _createClass(Fx, [{
      key: "attach",
      value: function attach(component, ctx, bb) {
        var _this = this;

        this.component = component;
        this.ctx = ctx;
        this.bb = bb;
        this.childPositions = [];
        Array.from(this.component.children).map(function (c) {
          var cbb = c.getBoundingClientRect();
          var cp = {
            _x: cbb.x,
            _y: cbb.y,
            top: cbb.top,
            left: cbb.left,
            width: cbb.width,
            height: cbb.height,
            x: cbb.x - _this.bb.left,
            y: cbb.y - _this.bb.top
          };

          _this.childPositions.push(cp);
        });
        this.init();
      }
      /**
      *
      * Override init() with a function that gets called as soon as the effect has attached to the DOM
      *
      **/

    }, {
      key: "init",
      value: function init() {} // override me do

      /**
      *
      * Override draw() with a function that draws to the canvas on every frame
      *
      **/

    }, {
      key: "draw",
      value: function draw() {} // override this with a draw function

      /**
      *
      * Override intersect() with a function that fires when the component intersection changes
      *
      **/

    }, {
      key: "intersect",
      value: function intersect(c) {}
      /**
      *
      * Override scroll() with a function that fires when the window scrolls
      *
      **/

    }, {
      key: "scroll",
      value: function scroll(e) {}
      /**
      *
      * Cancel stops the requestAnimationFrame callback on a resize so it isn't run twice.
      * Override this if you need to do something before the draw() call runs.
      *
      **/

    }, {
      key: "cancel",
      value: function cancel() {
        if (this.raf) {
          cancelAnimationFrame(this.raf);
        }
      }
      /**
      *
      * Override listeners() if you need to return different data from element event listeners
      *
      **/

    }, {
      key: "listeners",
      value: function listeners(el) {
        var _this2 = this;

        if (this.options.obsMouse === true) {
          el.addEventListener('mousemove', function (e) {
            _this2.mouse = [e.x - _this2.bb.left + e.view.scrollX, e.y - _this2.bb.top + e.view.scrollY];
          });
          el.addEventListener('mouseenter', function (e) {
            _this2.mouseover = true;
          });
          el.addEventListener('mouseout', function (e) {
            _this2.mouseover = false;
          });
        }

        if (this.options.obsHistory === true) {
          el.addEventListener('mousemove', function (e) {
            _this2.history.push([e.x - _this2.bb.left + e.view.scrollX, e.y - _this2.bb.top + e.view.scrollY, Math.random(), Math.random(), 50 + Math.random() * 100]);
          }, {
            passive: true
          });
        }

        if (this.options.obsClick === true) {
          el.addEventListener('click', function (e) {
            _this2.clicks.push([e.x - _this2.bb.left + e.view.scrollX, e.y - _this2.bb.top + e.view.scrollY]);
          });
        }

        if (this.options.obsScroll === true) {
          window.addEventListener('scroll', function (e) {
            // this.history.push([e.x - this.bb.left + e.view.scrollY, e.y - this.bb.top + e.view.scrollY, Math.random(), Math.random(), 50 + Math.random() * 100]);
            _this2.scroll(e);
          });
        }
      }
      /**
      *
      * listenMouse, listenMouseHistory and listenClick are helpers for setting options. They'll probably
      * be removed in a refactor soon because they're not really necessary.
      *
      **/

    }, {
      key: "listenMouse",
      value: function listenMouse(el) {
        // attach mouse listener
        this.options.obsMouse = true;
        return this;
      }
    }, {
      key: "listenMouseHistory",
      value: function listenMouseHistory() {
        // attach position history listener   
        this.options.obsHistory = true;
        return this;
      }
    }, {
      key: "listenClick",
      value: function listenClick() {
        // attach scroll position listener   
        this.options.obsClick = true;
        return this;
      }
    }, {
      key: "listenIntersection",
      value: function listenIntersection() {
        this.options.obsIntersection = true;
        return this;
      }
    }, {
      key: "listenScroll",
      value: function listenScroll() {
        this.options.obsScroll = true;
        return this;
      }
    }]);

    return Fx;
  }();

  var Bokeh =
  /*#__PURE__*/
  function (_Fx) {
    _inherits(Bokeh, _Fx);

    function Bokeh() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, Bokeh);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Bokeh)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "points", [[0.1, 0.3, 3], [0.2, 0.4, 2], [0.3, 0.2, 2], [0.4, 0.4, 1.5], [0.6, 0.2, 2], [-0.1, 0.7, 1.5], [0.75, 0.5, 2]]);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "time", 0);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "mouse", [0, 0]);

      return _this;
    }

    _createClass(Bokeh, [{
      key: "drawShape",
      value: function drawShape(ctx, x, y, points, radius1, radius2, alpha0) {
        var i, angle, radius;

        if (radius2 !== radius1) {
          points = 2 * points;
        }

        for (i = 0; i <= points; i++) {
          angle = i * 2 * Math.PI / points - Math.PI / 2 + alpha0;
          radius = i % 2 === 0 ? radius1 : radius2;
          ctx.lineTo(x + radius * Math.cos(angle), y + radius * Math.sin(angle));
        }
      }
    }, {
      key: "draw",
      value: function draw() {
        var _this2 = this;

        if (this.ctx !== null) {
          this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);
          this.points.forEach(function (p) {
            _this2.ctx.beginPath();

            _this2.ctx.fillStyle = 'hsla(64,' + 30 * p[2] + '%,50%,' + 0.2 * p[2] + ')';

            _this2.drawShape(_this2.ctx, _this2.bb.width * p[0] + _this2.mouse[0] / 6 / p[2], _this2.bb.height * p[1] - _this2.mouse[1] / 6 / p[2], 7, 50 * (4 - p[2]), 50 * (4 - p[2]), 0);

            _this2.ctx.fill();
          });
        }

        this.raf = requestAnimationFrame(this.draw);
      }
    }, {
      key: "listeners",
      value: function listeners(el) {
        var _this3 = this;

        el.addEventListener('mousemove', function (e) {
          _this3.mouse = [e.x - _this3.bb.left, e.y - _this3.bb.top];
        });
      }
    }]);

    return Bokeh;
  }(Fx);

  var Fuzz =
  /*#__PURE__*/
  function (_Fx) {
    _inherits(Fuzz, _Fx);

    function Fuzz() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, Fuzz);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Fuzz)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "hair", []);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "length", _this.options.size);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "maxActive", 500);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "scrollPos", {
        dx: 0,
        dy: 0,
        x: 0,
        y: 0
      });

      return _this;
    }

    _createClass(Fuzz, [{
      key: "jitter",
      value: function jitter(value) {
        return Math.random() * value - value / 2;
      }
    }, {
      key: "init",
      value: function init() {
        this.hair = [];
        var w = this.bb.width - this.options.padding * 2;
        var h = this.bb.height - this.options.padding * 2;

        for (var i = 0; i < this.maxActive / 2; i++) {
          var y = this.options.padding + Math.floor(Math.random() * (this.bb.height - this.options.padding * 2));
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
          var x = this.options.padding + Math.floor(Math.random() * (this.bb.width - this.options.padding * 2));
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
    }, {
      key: "scroll",
      value: function scroll(e) {
        this.scrollPos = {
          dx: this.scrollPos.x - window.scrollX,
          dy: this.scrollPos.y - window.scrollY,
          x: window.scrollX,
          y: window.scrollY
        };
        var s = 0;

        if (this.scrollPos.dy > 0) {
          s = this.scrollPos.dy / 100;
        } else {
          s = this.scrollPos.dy / 200;
        }

        this.hair.forEach(function (m, i) {
          m.v += s;
        });
      }
    }, {
      key: "draw",
      value: function draw() {
        var _this2 = this;

        if (this.ctx !== null) {
          var MIN_ANGLE = 0.1;
          var MAX_ANGLE = Math.PI * 0.75;
          this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);

          if (this.hair.length) {
            this.ctx.strokeStyle = 'hsla(0,100%,50%,1)';
            this.hair.forEach(function (m, i) {
              if (_this2.mouseover) {
                var d = Math.hypot(m.x - _this2.mouse[0], m.y - _this2.mouse[1]);

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

              var x2 = m.x + _this2.length * m.x2 * Math.sin(m.v);
              var y2 = m.y + _this2.length * Math.cos(m.v);

              _this2.ctx.beginPath();

              _this2.ctx.moveTo(m.x, m.y);

              _this2.ctx.lineTo(x2, y2);

              _this2.ctx.stroke();
            });
          }
        }

        this.raf = requestAnimationFrame(this.draw);
      }
    }]);

    return Fuzz;
  }(Fx);

  /**
  *
  * Heatmap is a very basic map of the positions where the user has clicked.
  *
  **/

  var Heatmap =
  /*#__PURE__*/
  function (_Fx) {
    _inherits(Heatmap, _Fx);

    function Heatmap() {
      _classCallCheck(this, Heatmap);

      return _possibleConstructorReturn(this, _getPrototypeOf(Heatmap).apply(this, arguments));
    }

    _createClass(Heatmap, [{
      key: "draw",
      value: function draw() {
        var _this = this;

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
            this.clicks.forEach(function (m, i) {
              _this.ctx.beginPath();

              _this.ctx.arc(m[0], m[1], 6, 0, 2 * Math.PI);

              _this.ctx.fill();
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
    }]);

    return Heatmap;
  }(Fx);

  /**
  *
  * A light shining from the center of the component that follows the user's mouse
  *
  **/

  var Light =
  /*#__PURE__*/
  function (_Fx) {
    _inherits(Light, _Fx);

    function Light() {
      _classCallCheck(this, Light);

      return _possibleConstructorReturn(this, _getPrototypeOf(Light).apply(this, arguments));
    }

    _createClass(Light, [{
      key: "clamp",

      /**
      *
      * clamp is a utility that takes a value, min and max, and returns the min if it's less than the min and the
      * max if it's greater than the max, or just the initial value if they're not.
      *
      **/
      value: function clamp(x, min, max) {
        return Math.min(Math.max(x, min), max);
      }
    }, {
      key: "draw",
      value: function draw() {
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

          var lx = this.mouse[0] / this.bb.width * 2 - 1;
          var ly = this.mouse[1] / this.bb.height * 2 - 1;
          /**
          *
          * Precalculate some values for 1/2 and 1/3 sizes. More to make the code nicer
          * than any sort of optimization.
          *
          **/

          var halfWidth = this.bb.width / 2;
          var thirdWidth = this.bb.width / 3;
          var halfHeight = this.bb.height / 2;
          var thirdHeight = this.bb.height / 3;
          /**
          *
          * Create a radial gradient from the center to the mouse position. Note that the gradient
          * needs to be limited to less than the 'radius' of the component (minimum side / 2).
          *
          **/

          var g = this.ctx.createRadialGradient(halfWidth, halfHeight, 0, halfWidth + this.clamp(lx * thirdWidth, -1 * thirdWidth, thirdWidth), halfHeight + this.clamp(ly * thirdHeight, -1 * thirdHeight, thirdHeight), halfHeight);
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
    }]);

    return Light;
  }(Fx);

  var Neon =
  /*#__PURE__*/
  function (_Fx) {
    _inherits(Neon, _Fx);

    function Neon(options) {
      var _this;

      _classCallCheck(this, Neon);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Neon).call(this, options));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "flicker", 0);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "randFlicker", 0);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "color", 0);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "saturation", '0%');

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "lightness", '50%');

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "onoff", true);

      if (!options.padding) {
        _this.options.padding = options.size;
      }

      return _this;
    }

    _createClass(Neon, [{
      key: "intersect",
      value: function intersect(c) {
        if (c[0].intersectionRatio === 1) {
          this.onoff = true;
          this.randFlicker = 0;
        } else {
          this.onoff = false;
        }
      }
    }, {
      key: "draw",
      value: function draw() {
        if (this.ctx !== null) {
          this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);
          this.ctx.globalCompositeOperation = "lighter";
          var color = this.color;
          var saturation = this.saturation;
          var lightness = this.lightness;

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

          var ps = this.options.padding - this.options.size;
          var itl = {
            x: this.options.padding,
            y: this.options.padding
          };
          var itr = {
            x: this.bb.width - this.options.padding,
            y: this.options.padding
          };
          var ibl = {
            x: this.options.padding,
            y: this.bb.height - this.options.padding
          };
          var ibr = {
            x: this.bb.width - this.options.padding,
            y: this.bb.height - this.options.padding
          };
          var otl = {
            x: ps,
            y: ps
          };
          var otr = {
            x: this.bb.width - ps,
            y: ps
          };
          var obl = {
            x: ps,
            y: this.bb.height - ps
          }; // const obr = { x: this.bb.width - ps, y: this.bb.height - ps };

          var iw = this.bb.width - this.options.padding * 2;
          var ih = this.bb.height - this.options.padding * 2;
          var ow = this.bb.width;
          var oh = this.bb.height;
          var g = this.ctx.createLinearGradient(otl.x, otl.y, itl.x, otl.y);
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
    }]);

    return Neon;
  }(Fx);

  /**
  *
  * Basic particles radiating from the user's mouse, with more when the user clicks.
  *
  **/

  var Particles =
  /*#__PURE__*/
  function (_Fx) {
    _inherits(Particles, _Fx);

    function Particles(options) {
      var _this;

      _classCallCheck(this, Particles);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Particles).call(this, options));
      /**
      *
      * particles is an array that holds the current particles that are on the canvas
      * particleCount is the number of particles that are added when the mouse is moved
      *
      **/

      _this.particles = [];
      _this.particleCount = 4;
      return _this;
    }

    _createClass(Particles, [{
      key: "draw",
      value: function draw() {
        var _this2 = this;

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
            this.particles.forEach(function (m, i) {
              /**
              *
              * If the lifetime is less than zero after being decremented then remove the particle from
              * the particles array
              *
              **/
              if (--m[4] < 0) {
                _this2.particles.splice(i, 1);
              }
              /**
              *
              * Set the fill style to be white with an opacity that's inversely related to the age, so it
              * fades away.
              *
              **/


              _this2.ctx.fillStyle = 'hsla(0,100%,100%,' + m[4] / 100 + ')';
              /**
              *
              * Draw the particle
              *
              **/

              _this2.ctx.beginPath();

              _this2.ctx.arc(m[0], m[1], 2, 0, 2 * Math.PI);

              _this2.ctx.fill();
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
    }, {
      key: "listeners",
      value: function listeners(el) {
        var _this3 = this;

        /**
        *
        * Add a custom listener that creates particules when the mouse moves.
        * Each particle is an array of [ x position, y position, x velocity, y velocity, lifetime]
        *
        **/
        el.addEventListener('mousemove', function (e) {
          for (var x = 0; x < _this3.particleCount; x++) {
            _this3.particles.push([e.x - _this3.bb.left + e.view.scrollX, e.y - _this3.bb.top + e.view.scrollY, Math.random(), Math.random(), 50 + Math.random() * 100]);
          }
        });
        /**
        *
        * Add more particles on a mouse click
        *
        **/

        el.addEventListener('click', function (e) {
          for (var x = 0; x < _this3.particleCount * 4; x++) {
            _this3.particles.push([e.x - _this3.bb.left + e.view.scrollX, e.y - _this3.bb.top + e.view.scrollY, Math.random(), Math.random(), 50 + Math.random() * 100]);
          }
        });
      }
    }]);

    return Particles;
  }(Fx);

  var Shader =
  /*#__PURE__*/
  function (_Fx) {
    _inherits(Shader, _Fx);

    function Shader() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, Shader);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Shader)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "context", 'webgl');

      return _this;
    }

    _createClass(Shader, [{
      key: "init",
      value: function init() {
        this.programInfo = twgl.createProgramInfo(this.ctx, [this.options.vs, this.options.fs]);

        if (this.options.tex) {
          this.channel0 = twgl.createTexture(this.ctx, {
            src: this.options.tex,
            crossOrigin: "",
            mag: this.ctx.LINEAR,
            wrap: this.ctx.REPEAT,
            flipY: false
          });
        }

        var arrays = {
          position: [-1, -1, 0, 1, -1, 0, -1, 1, 0, -1, 1, 0, 1, -1, 0, 1, 1, 0]
        };
        this.bufferInfo = twgl.createBufferInfoFromArrays(this.ctx, arrays);
      }
    }, {
      key: "draw",
      value: function draw(time) {
        if (this.ctx !== null) {
          twgl.resizeCanvasToDisplaySize(this.ctx.canvas);
          this.ctx.viewport(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
          var uniforms = {
            u_time: time * 0.001,
            u_resolution: [this.ctx.canvas.width, this.ctx.canvas.height],
            u_channel0: this.channel0
          };
          this.ctx.useProgram(this.programInfo.program);
          twgl.setBuffersAndAttributes(this.ctx, this.programInfo, this.bufferInfo);
          twgl.setUniforms(this.programInfo, uniforms);
          twgl.drawBufferInfo(this.ctx, this.bufferInfo);
        }

        this.raf = requestAnimationFrame(this.draw);
      }
    }]);

    return Shader;
  }(Fx);

  var Light$1 =
  /*#__PURE__*/
  function (_Fx) {
    _inherits(Light, _Fx);

    function Light() {
      _classCallCheck(this, Light);

      return _possibleConstructorReturn(this, _getPrototypeOf(Light).apply(this, arguments));
    }

    _createClass(Light, [{
      key: "draw",
      value: function draw() {
        if (this.ctx !== null) ;

        this.raf = requestAnimationFrame(this.draw);
      }
    }]);

    return Light;
  }(Fx);

  /**
  *
  * Snow is a particle system that draws a fixed number of particles that move across the canvas a
  * bit like it's snowing.
  *
  **/

  var Snow =
  /*#__PURE__*/
  function (_Fx) {
    _inherits(Snow, _Fx);

    /**
    *
    * Set up some defaults. These should really come from amn options config object...
    * TODO: Use options.
    *
    **/
    function Snow(options) {
      var _this;

      _classCallCheck(this, Snow);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Snow).call(this, options));
      _this.wind = 2;
      _this.maxActive = 200;
      _this.snowflakes = [];
      return _this;
    }
    /**
    *
    * init() runs when the effect is added to the DOM.
    * Create all the snowflakes at the start in random positions around the canvas, with
    * a random downward velocity (vy).
    *
    **/


    _createClass(Snow, [{
      key: "init",
      value: function init() {
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
    }, {
      key: "draw",
      value: function draw() {
        var _this2 = this;

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

          this.snowflakes.forEach(function (f) {
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

            if (f.y > _this2.bb.height) {
              f.y = 0;
              f.x = Math.floor(Math.random() * _this2.bb.width);
            }
            /**
            *
            * Update the x position based on a wind factor and some random jittering.
            *
            **/


            f.x += _this2.wind + (Math.random() * 2 - 1);
            /**
            *
            * As the snowflakes can be affected by a wind factor check to see if they've gone over
            * the edge of the canvas. If they have, move it back to the other side.
            *
            **/

            if (f.x > _this2.bb.width) {
              f.x = 0;
            } else if (f.x < 0) {
              f.x = _this2.bb.width;
            }
            /**
            *
            * Draw the snowflake as a small white circle.
            *
            **/


            _this2.ctx.beginPath();

            _this2.ctx.arc(f.x, f.y, 2, 0, 2 * Math.PI);

            _this2.ctx.fill();
          });
        }

        this.raf = requestAnimationFrame(this.draw);
      }
    }]);

    return Snow;
  }(Fx);

  var Sparks =
  /*#__PURE__*/
  function (_Fx) {
    _inherits(Sparks, _Fx);

    function Sparks() {
      var _getPrototypeOf2;

      var _this;

      _classCallCheck(this, Sparks);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Sparks)).call.apply(_getPrototypeOf2, [this].concat(args)));

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "particles", []);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "particleCount", 40);

      _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "sparkState", false);

      return _this;
    }

    _createClass(Sparks, [{
      key: "draw",
      value: function draw() {
        var _this2 = this;

        if (this.ctx !== null) {
          this.ctx.clearRect(0, 0, this.bb.width, this.bb.height);

          if (this.particles.length) {
            this.ctx.lineWidth = 3;
            this.particles.forEach(function (m, i) {
              if (--m[4] < 0) {
                _this2.particles.splice(i, 1);
              }

              var px = m[0];
              var py = m[1];
              m[0] += m[2];
              m[1] += m[3];
              _this2.ctx.strokeStyle = 'hsla(192,100%,50%,' + m[4] / 100 + ')';

              _this2.ctx.beginPath();

              _this2.ctx.moveTo(px, py);

              _this2.ctx.lineTo(m[0], m[1]);

              _this2.ctx.stroke();
            });
          }
        }

        this.raf = requestAnimationFrame(this.draw);
      }
    }, {
      key: "listeners",
      value: function listeners(el) {
        var _this3 = this;

        el.addEventListener('mousemove', function (e) {
          var a = {
            x: e.x - _this3.bb.left + e.view.scrollX,
            y: e.y - _this3.bb.top + e.view.scrollY,
            width: 1,
            height: 1
          };
          var b = {
            x: _this3.childPositions[0].x,
            y: _this3.childPositions[0].y,
            width: _this3.childPositions[0].width,
            height: _this3.childPositions[0].height
          };
          var spark = a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.height + a.y > b.y;

          if (spark !== _this3.sparkState) {
            _this3.sparkState = spark;
            var m = Math.atan2(e.movementX, e.movementY);

            if (m < 0) {
              m += 2 * Math.PI;
            }

            for (var x = 0; x < _this3.particleCount; x++) {
              _this3.particles.push([a.x, a.y, 2 * (Math.sin(m) + (-0.5 + Math.random())), 2 * (Math.cos(m) + (-0.5 + Math.random())), Math.random() * 100]);
            }
          }
        });
      }
    }]);

    return Sparks;
  }(Fx);

  /**
  *
  * This effect leverages the React-Neon FX base class from https://github.com/onion2k/react-neon
  *
  **/

  var Torch =
  /*#__PURE__*/
  function (_Fx) {
    _inherits(Torch, _Fx);

    function Torch() {
      _classCallCheck(this, Torch);

      return _possibleConstructorReturn(this, _getPrototypeOf(Torch).apply(this, arguments));
    }

    _createClass(Torch, [{
      key: "draw",
      value: function draw() {
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
          var m = this.mouse;
          /**
          *
          * The torch effect is really a circular gradient centered on the mouse position.
          *
          **/

          var gradient = this.ctx.createRadialGradient(m[0], m[1], this.bb.width * 0.375, m[0], m[1], this.bb.width * 0.35);
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
    }]);

    return Torch;
  }(Fx);

  var fx = {
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

  var withNeon = function withNeon(NeonComponent, effect) {
    return (
      /*#__PURE__*/
      function (_Component) {
        _inherits(_class2, _Component);

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
        function _class2(props) {
          var _this;

          _classCallCheck(this, _class2);

          _this = _possibleConstructorReturn(this, _getPrototypeOf(_class2).call(this, props));
          /**
           *
           * The effect plugin that's passed in from the withNeon HoC
           *
           **/

          _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentref", React__default.createRef());

          _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "canvasref", React__default.createRef());

          _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "resize", _this.resize.bind(_assertThisInitialized(_assertThisInitialized(_this))));

          _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "intersect", _this.intersect.bind(_assertThisInitialized(_assertThisInitialized(_this))));

          _this.fx = effect;
          /**
           *
           * ro is a resizeObserver. This calls the resize callback once the page is ready, and again
           * every time the component is resized (eg by the window changing, or the content)
           *
           **/

          _this.ro = typeof window !== "undefined" && new resizeObserver.ResizeObserver(_this.resize);
          return _this;
        }
        /**
         *
         * The intersect callback takes a parameter, c, that contains the current component element (in an array).
         *
         **/


        _createClass(_class2, [{
          key: "intersect",
          value: function intersect(c) {
            this.fx.intersect(c);
          }
          /**
           *
           * The resize callback takes a parameter, c, that contains the current component element (in an array).
           *
           **/

        }, {
          key: "resize",
          value: function resize(c) {
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

            var bb = c[0].target.getBoundingClientRect();
            var top = bb.top,
                left = bb.left,
                width = bb.width,
                height = bb.height;
            /**
             *
             * If the page is reloaded the scroll position is retained, which breaks positioning. Add the starting
             * scroll position to the left and top to fix.
             *
             **/

            left += typeof window !== "undefined" && window.scrollX;
            top += typeof window !== "undefined" && window.scrollY;
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
             * Effects can be fullscreen by setting fullscreen to true. This also sets the effect to be
             * position: fixed
             *
             **/


            if (this.fx.options.fullscreen) {
              var bbFs = document.querySelector("body").getBoundingClientRect();
              width = bbFs.width;
              height = bbFs.height;
              top = 0;
              left = 0;
            }
            /**
             *
             * Update the CSS styles of the canvas using the new size and position data.
             * NOTE: This is what makes the canvas visible (display: 'block').
             * NOTE: The pointerEvents: 'none' setting stops the canvas getting any mouse events.
             *
             **/


            Object.assign(this.canvasref.current.style, {
              display: "block",
              position: "absolute",
              width: width + "px",
              height: height + "px",
              top: top + "px",
              left: left + "px",
              zIndex: 999,
              pointerEvents: "none",
              mixBlendMode: this.props.mixmode ? this.props.mixmode : "normal"
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

            var ctx = this.canvasref.current.getContext(this.fx.context);
            /**
             *
             * Finally we attach to the effect passing in the component element, the canvas context and the
             * bounding box data.
             *
             **/

            this.fx.attach(ReactDOM.findDOMNode(this.componentref.current), ctx, {
              top: top,
              left: left,
              width: width,
              height: height
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

        }, {
          key: "componentDidMount",
          value: function componentDidMount() {
            var componentCurrentDOMEl = ReactDOM.findDOMNode(this.componentref.current);
            this.fx.listeners(componentCurrentDOMEl);
            this.ro.observe(componentCurrentDOMEl);

            if (this.fx.options.obsIntersection) {
              var thresholds = [];
              var numSteps = 50;

              for (var i = 1.0; i <= numSteps; i++) {
                var ratio = i / numSteps;
                thresholds.push(ratio);
              }

              thresholds.push(0);
              var options = {
                threshold: thresholds
              };
              this.io = typeof window !== "undefined" && new window.IntersectionObserver(this.intersect, options);
              this.io.observe(componentCurrentDOMEl);
            }
          }
          /**
           *
           * The withNeon render() function renders the component that's being wrapped along with a canvas. The canvas
           * isn't displayed to start with - we want it to only be visible once the resize observer has been run.
           *
           **/

        }, {
          key: "render",
          value: function render() {
            // How to do this through a portal?
            return React__default.createElement("div", null, React__default.createElement(NeonComponent, {
              ref: this.componentref
            }), React__default.createElement("canvas", {
              ref: this.canvasref,
              style: {
                display: "none"
              }
            }));
          }
        }]);

        return _class2;
      }(React.Component)
    );
  };

  exports.default = withNeon;
  exports.fx = fx;
  exports.Fx = Fx;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
