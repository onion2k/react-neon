import React from "react";
import Tile from "../Tile.js";
import withNeon, { fx } from "../../src/index.js";

class SparksTile extends React.Component {
  render(){
    return (
        <Tile bgIm="https://source.unsplash.com/random?s" className="one">
          <div style={{ backgroundColor: "grey" }}></div>
        </Tile>
        )
  }
};

const effect = new fx.Sparks();

export default withNeon(SparksTile, effect);
