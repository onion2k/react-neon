import React from "react";
import Tile from "../Tile.js";
import withNeon, { fx } from "../../src/index.js";

class NeonTile extends React.Component {
  render(){
    return (
      <Tile bgIm="https://source.unsplash.com/random?neon">
        <div style={{ backgroundColor: "grey" }}></div>
      </Tile>
    )
  }
};

const effect = new fx.Neon();

export default withNeon(NeonTile, effect);
