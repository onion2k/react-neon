import React from "react";
import Tile from "./Tile.js";
import withNeon, { Crystal } from "../../src/index.js";

class CrystalTile extends React.Component {
  render(){
    return (
      <Tile bgIm="https://source.unsplash.com/random?crystal" />
    )
  }
};

const fx = new Crystal();

export default withNeon(CrystalTile, fx);
