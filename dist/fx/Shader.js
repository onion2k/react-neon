function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import * as twgl from 'twgl.js';
import Fx from "../Fx";
export default class Shader extends Fx {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "context", 'webgl');
  }

  init() {
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

}