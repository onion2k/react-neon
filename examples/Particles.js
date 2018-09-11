import React, { Component } from "react";
import Tile from "./Tile.js";
import withNeon from "../src";

const particlesConfig = 4;

export default withNeon(Tile, particlesConfig);
