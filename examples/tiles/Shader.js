import React from "react";
import Tile from "../Tile.js";
import withNeon, { fx } from "../../src/index.js";

class ShaderTile extends React.Component {
  render(){
    return (
      <Tile bgIm="https://source.unsplash.com/random?heat" />
    )
  }
};

const vs = `attribute vec4 position;
void main() {
  gl_Position = position;
}`;

const fs = `#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main()
{
    vec2 uv = gl_FragCoord.xy / u_resolution;
    uv = uv + vec2(0.5 - cos(uv.y * 8.0), 2.0) * (sin(u_time) * 0.05);
    float cb = floor(uv.x*25.) + floor(uv.y*25.);
    gl_FragColor = vec4(0.0, 0.0, 0.0,mod(cb, 2.0));
}`

const effect = new fx.Shader({ vs: vs, fs: fs });

export default withNeon(ShaderTile, effect);
