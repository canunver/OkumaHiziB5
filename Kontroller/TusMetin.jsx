import React, { Component } from "react";

class TusMetin extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.styleInfo = {
      display: "inline-block",
      position: "absolute",
      cursor: "pointer",
      fontSize: "bigger",
    };

    if (this.props.right) this.styleInfo.right = this.props.right;
    if (this.props.left) this.styleInfo.left = this.props.left;
  }

  render() {
    return (
      <div
        style={this.styleInfo}
        onClick={(e) => {
          this.props.onClick(this.props.id, e);
        }}
        id={this.props.id}
      >
        {this.props.metin}
      </div>
    );
  }
}

export default TusMetin;
