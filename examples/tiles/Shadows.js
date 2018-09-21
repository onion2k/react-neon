import React from "react";
import Tile from "../Tile.js";
import withNeon, { fx } from "../../src/index.js";

class ShadowsTile extends React.Component {
  render(){
    return (
      <Tile bgIm="https://source.unsplash.com/random?shadow" className="four">
        <div style={{ backgroundColor: "grey" }}></div>
        <div style={{ backgroundColor: "grey" }}></div>
        <div style={{ backgroundColor: "grey" }}></div>
        <div style={{ backgroundColor: "grey" }}></div>
      </Tile>
    )
  }
};

const effect = new fx.Shadows();
effect.listenMouse()

export default withNeon(ShadowsTile, effect);
