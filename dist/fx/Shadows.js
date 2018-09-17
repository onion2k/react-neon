import React from "react";
import ReactDOM from 'react-dom';
import Fx from "../Fx";
export default class Light extends Fx {
  constructor() {
    super();
    this.mouse = [0, 0];
  }

  draw() {
    if (this.ctx !== null) {}

    this.raf = requestAnimationFrame(this.draw);
  }

  attach(component, ctx, bb) {
    Array.from(component.children).map(c => {
      const bb = c.getBoundingClientRect();
    });
    this.ctx = ctx;
    this.bb = bb;
  }

  listeners(el) {
    el.addEventListener('mousemove', e => {
      this.mouse = [e.x - this.bb.left, e.y - this.bb.top];
    });
  }

}