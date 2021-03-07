import React, { Component } from "react";

class Gosterge extends Component {
  state = {};
  render() {
    return (
      <span
        style={{
          display: "inline-block",
          position: this.props.position ? this.props.position : "absolute",
          cursor: this.props.onClick ? "pointer" : "",
          fontSize: "23px",
          left: this.props.left,
          textAlign: this.props.textAlign ? this.props.textAlign : "center",
          backgroundColor: this.props.arkaRenk
            ? this.props.arkaRenk
            : "#018577",
          color: this.props.yaziRenk ? this.props.yaziRenk : "black",
          width: this.props.width ? this.props.width : "52px",
          paddingBottom: "3px",
          overflow: "hidden",
          fontWeight: "500",
          userSelect: "none",
        }}
        onClick={(e) => {
          if (this.props.onClick) {
            this.props.onClick(this.props.id, e);
          }
        }}
      >
        {this.props.metin}
      </span>
    );
  }
  OnClickEventOl() {}
}

export default Gosterge;
