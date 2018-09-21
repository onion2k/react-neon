import React from "react";
import Tile from "../Tile.js";
import withNeon, { fx } from "../../src/index.js";

class SparksTile extends React.Component {
  render(){
    return (
        <Tile bg="black" className="one">
          <div style={{ backgroundImage: "url(https://source.unsplash.com/random?s)" }}></div>
        </Tile>
        )
  }
};

const effect = new fx.Sparks();

export default withNeon(SparksTile, effect);
