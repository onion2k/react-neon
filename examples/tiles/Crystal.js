import React from "react";
import Tile from "../Tile.js";
import withNeon, { fx } from "../../src/index.js";

class CrystalTile extends React.Component {
  render(){
    return (
      <Tile bgIm="https://source.unsplash.com/random?crystal" />
    )
  }
};

const effect = new fx.Crystal();

export default withNeon(CrystalTile, effect);
