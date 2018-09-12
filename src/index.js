import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Light from "./fx/Light";
import Particles from "./fx/Particles";
import Heatmap from "./fx/Heatmap";
import Torch from "./fx/Torch";

const withNeon = (NeonComponent, fx) => {
    
    return class extends Component {

        ref = React.createRef();
        canvasref = React.createRef();
        mouse = [];
        bb = {};
        resize = this.resize.bind(this);

        constructor(props) {
            super(props);
            this.fx = fx;
            this.ro = new window.ResizeObserver(this.resize);
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

            this.canvasref.current.width = bb.width;
            this.canvasref.current.height = bb.height;

            const ctx = this.canvasref.current.getContext('2d');
            this.fx.attach(ctx, bb);
            this.fx.draw();

        }

        componentDidMount(){
            this.ro.observe(ReactDOM.findDOMNode(this.ref.current));
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

export { withNeon as default, Light, Particles, Heatmap, Torch };
