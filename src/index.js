import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Particles from "./fx/Particles.js";

const withNeon = (NeonComponent, config) => {
    
    return class extends Component {

        ref = React.createRef();
        canvasref = React.createRef();
        mouse = [];
        particles = [];
        bb = {};

        particleCount = config.mouseMoveCount;
        gravity = 0.5;

        resize = this.resize.bind(this);

        constructor(props) {

            super(props);

            switch (config.type) {
                case "particles":
                    this.fx =  new Particles();
                    break;
            }

        }

        resize(c) {

            this.fx.cancel();

            const bb = c[0].target.getBoundingClientRect();

            Object.assign(this.canvasref.current.style, {
                position: 'absolute',
                width: bb.width+'px',
                height: bb.height+'px',
                top: bb.top+'px',
                left: bb.left+'px',
                zIndex: 999,
                pointerEvents: 'none'
            });

            const ctx = this.canvasref.current.getContext('2d');
            this.canvasref.current.width = bb.width;
            this.canvasref.current.height = bb.height;

            this.fx.attach(ctx, bb);
            this.fx.draw();

        }

        componentDidMount(){

            const ro = new window.ResizeObserver(this.resize);
            ro.observe(ReactDOM.findDOMNode(this.ref.current));
            this.fx.listeners(ReactDOM.findDOMNode(this.ref.current));

        }
        render() {
            return (
                <React.Fragment>
                    <NeonComponent ref={this.ref} />
                    <canvas ref={this.canvasref} />
                </React.Fragment>
            )
        }
    }

}

export default withNeon;
