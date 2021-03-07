import React, { Component } from "react";
import AracCubugu from "../Kontroller/AracCubugu";
import TusMetin from "../Kontroller/TusMetin";
class Baslik extends Component {
  state = {};

  onClick = (id, e) => {
    this.props.uygulama.AyarlarAc(true);
  };
  render() {
    return (
      <AracCubugu ustCizgi altCizgi arkaRenk="navy" yaziRenk="yellow">
        <TusMetin metin="&#9776;" onClick={this.onClick} left="5px" />
        <div
          style={{
            display: "inline-block",
            position: "relative",
            left: "27px",
          }}
        >
          {this.props.uygulama.MetinOku("Okuma Hızı")}
        </div>
        <div
          style={{
            display: "inline-block",
            position: "relative",
            right: "25px",
            float: "right",
          }}
        >
          {this.props.uygulama.oyunAyarlar.ad +
            " (" +
            this.props.uygulama.state.skor +
            ")"}
        </div>
      </AracCubugu>
    );
  }
}

export default Baslik;
