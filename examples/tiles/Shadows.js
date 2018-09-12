import React from "react";
import Tile from "./Tile.js";
import withNeon, { Shadows } from "../../src/index.js";

class ShadowsTile extends React.Component {
  render(){
    return (
      <Tile bgIm="https://source.unsplash.com/random?shadow" />
    )
  }
};

const fx = new Shadows();

export default withNeon(ShadowsTile, fx);
