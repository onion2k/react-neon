import React from "react";
import Tile from "./Tile.js";
import withNeon, { fx } from "../../src/index.js";

class ShadowsTile extends React.Component {
  render(){
    return (
      <Tile bgIm="https://source.unsplash.com/random?shadow" />
    )
  }
};

const effect = new fx.Shadows();

export default withNeon(ShadowsTile, effect);
