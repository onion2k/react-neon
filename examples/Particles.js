import React, { Component } from "react";
import Tile from "./Tile.js";
import withNeon from "../src";

const particlesConfig = {
  type: "particles",
  mouseMoveCount: 4,
  clickMoveCount: 4,
  color: ["0", "100%", "100%"]
};

export default withNeon(Tile, particlesConfig);
