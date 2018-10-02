import React from "react";
import Tile from "../Tile.js";
import withNeon from "../../src/index.js";
import ParticlesToon from "../../src/effects/ParticlesToon.js";

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

const effect = new ParticlesToon(particlesConfig);

export default withNeon(ParticlesTile, effect);
