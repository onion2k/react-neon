import React from "react";
import Tile from "./Tile.js";
import withNeon, { Sparks } from "../../src/index.js";

class SparksTile extends React.Component {
  render(){
    return (
        <Tile bgIm="https://source.unsplash.com/random?s" />
        )
  }
};

const fx = new Sparks();

export default withNeon(SparksTile, fx);
