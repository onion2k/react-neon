function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _fx_Bokeh from "./fx/Bokeh.js";
import _fx_Crystal from "./fx/Crystal.js";
import _fx_Heatmap from "./fx/Heatmap.js";
import _fx_Light from "./fx/Light.js";
import _fx_Neon from "./fx/Neon.js";
import _fx_Particles from "./fx/Particles.js";
import _fx_Shadows from "./fx/Shadows.js";
import _fx_Snow from "./fx/Snow.js";
import _fx_Sparks from "./fx/Sparks.js";
import _fx_Torch from "./fx/Torch.js";
const fx = {
  Bokeh: _fx_Bokeh,
  Crystal: _fx_Crystal,
  Heatmap: _fx_Heatmap,
  Light: _fx_Light,
  Neon: _fx_Neon,
  Particles: _fx_Particles,
  Shadows: _fx_Shadows,
  Snow: _fx_Snow,
  Sparks: _fx_Sparks,
  Torch: _fx_Torch
};
Object.freeze(fx);

const withNeon = (NeonComponent, effect) => {
  return class extends Component {
    constructor(props) {
      super(props);

      _defineProperty(this, "ref", React.createRef());

      _defineProperty(this, "canvasref", React.createRef());

      _defineProperty(this, "mouse", []);

      _defineProperty(this, "bb", {});

      _defineProperty(this, "resize", this.resize.bind(this));

      this.fx = effect;
      this.ro = new window.ResizeObserver(this.resize);
    }

    resize(c) {
      this.fx.cancel();
      const bb = c[0].target.getBoundingClientRect();
      let {
        top,
        left,
        width,
        height
      } = bb;

      if (this.fx.padding > 0) {
        width += this.fx.padding * 2;
        height += this.fx.padding * 2;
        top -= this.fx.padding;
        left -= this.fx.padding;
      }

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
      this.canvasref.current.width = width;
      this.canvasref.current.height = height;
      const ctx = this.canvasref.current.getContext('2d');
      this.fx.attach(ReactDOM.findDOMNode(this.ref.current), ctx, {
        top,
        left,
        width,
        height
      });
      this.fx.draw();
    }

    componentDidMount() {
      this.fx.listeners(ReactDOM.findDOMNode(this.ref.current));
      this.ro.observe(ReactDOM.findDOMNode(this.ref.current));
    }

    render() {
      return React.createElement(React.Fragment, null, React.createElement(NeonComponent, {
        ref: this.ref
      }), React.createElement("canvas", {
        ref: this.canvasref,
        style: {
          display: 'none'
        }
      }));
    }

  };
};

export { withNeon as default, fx };