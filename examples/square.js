import React, { Component } from "react";
import withNeon from "../src";

class Square extends Component {

  render() {
    return (
        <div style={{ width: "200px", height: "200px", backgroundColor: "black" }}>Square</div>
    );
  }
}

export default withNeon(Square, 4);
