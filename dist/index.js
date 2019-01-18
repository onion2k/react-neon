function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React, { Component } from "react";
import ReactDOM from "react-dom";
import { ResizeObserver } from "resize-observer";
/**
 *
 * Import all the .js files in the /fx directory. This needs a babel plugin to function properly.
 * TODO: Replace with babel-plugin-macros
 *
 **/

import _fx_Bokeh from "./fx/Bokeh.js";
import _fx_Fuzz from "./fx/Fuzz.js";
import _fx_Heatmap from "./fx/Heatmap.js";
import _fx_Light from "./fx/Light.js";
import _fx_Neon from "./fx/Neon.js";
import _fx_Particles from "./fx/Particles.js";
import _fx_Shader from "./fx/Shader.js";
import _fx_Shadows from "./fx/Shadows.js";
import _fx_Snow from "./fx/Snow.js";
import _fx_Sparks from "./fx/Sparks.js";
import _fx_Torch from "./fx/Torch.js";
const fx = {
  Bokeh: _fx_Bokeh,
  Fuzz: _fx_Fuzz,
  Heatmap: _fx_Heatmap,
  Light: _fx_Light,
  Neon: _fx_Neon,
  Particles: _fx_Particles,
  Shader: _fx_Shader,
  Shadows: _fx_Shadows,
  Snow: _fx_Snow,
  Sparks: _fx_Sparks,
  Torch: _fx_Torch
};
Object.freeze(fx);
import Fx from "./Fx";
/**
 *
 * The withNeon HoC wrapper.
 * Neon works by taking a React component and returning a new component that includes a canvas element as well.
 * This should really be using a portal though, so expect it to change soon.
 *
 **/

const withNeon = (NeonComponent, effect) => {
  return class extends Component {
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

      _defineProperty(this, "componentref", React.createRef());

      _defineProperty(this, "canvasref", React.createRef());

      _defineProperty(this, "resize", this.resize.bind(this));

      _defineProperty(this, "intersect", this.intersect.bind(this));

      this.fx = effect;
      /**
       *
       * ro is a resizeObserver. This calls the resize callback once the page is ready, and again
       * every time the component is resized (eg by the window changing, or the content)
       *
       **/

      this.ro = typeof window !== "undefined" && new ResizeObserver(this.resize);
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
        const bbFs = document.querySelector("body").getBoundingClientRect();
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


    render() {
      // How to do this through a portal?
      return React.createElement("div", null, React.createElement(NeonComponent, {
        ref: this.componentref
      }), React.createElement("canvas", {
        ref: this.canvasref,
        style: {
          display: "none"
        }
      }));
    }

  };
};
/**
 *
 * Export the withNeon HoC as the default and the fx library. This way users who have their own effect can import
 * the withNeon function on it's own.
 *
 **/


export { withNeon as default, fx, Fx };