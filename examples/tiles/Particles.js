import React from "react";
import Tile from "./Tile.js";
import withNeon, { Particles } from "../../src/index.js";

class ParticlesTile extends React.Component {
  render(){
    return (
      <Tile bgIm="https://source.unsplash.com/random?a" />
    )
  }
};

const particlesConfig = {
  type: "particles",
  mouseMoveCount: 4,
  clickMoveCount: 4,
  color: ["0", "100%", "100%"]
};

const fx = new Particles(particlesConfig);

export default withNeon(ParticlesTile, fx);
