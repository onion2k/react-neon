import React from "react";
import ReactDOM from 'react-dom';
import Fx from "../Fx";

export default class Light extends Fx {

    init() {
        // console.log(this.childPositions);
    }

    draw() {
        if (this.ctx!==null) {

        }
        this.raf = requestAnimationFrame(this.draw);
    }

}