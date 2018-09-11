import React, { Component } from "react";
import Tile from "./Tile.js";
import withNeon from "../src";

const lightConfig = {
  type: "light"
};

export default withNeon(Tile, lightConfig);
