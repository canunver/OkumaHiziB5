import React, { Component } from "react";
import Zamanlayici from "./Zamanlayici";

class Sacma extends Component {
  constructor(props) {
    super(props);
    this.state = { gorunur: true };

    this.ivme = 1.5;
    this.uzunluk = 10;
    this.zamanlayici = new Zamanlayici(1, 120, this.zamanGecti);
  }

  noktaBul = (uzunluk, sinCos) => {
    return uzunluk * sinCos;
  };

  zamanGecti = (id, gecenSure) => {
    if (gecenSure > this.props.dagilma + this.props.bekleme) {
      this.zamanlayici.bitir();
      this.setState({ gorunur: false });
    } else {
      this.uzunluk *= this.ivme;
      var ivmeAzamla;
      if (gecenSure > this.props.dagilma) ivmeAzamla = 0.8;
      else ivmeAzamla = 0.95;
      this.ivme *= ivmeAzamla;
      this.ciz();
    }
  };

  fisekCiz = (aci) => {
    this.sin = Math.sin(aci);
    this.cos = Math.cos(aci);
    this.x1 = 4 * this.sin;
    this.y1 = 4 * this.cos;

    this.x2 = this.uzunluk * 0.95 * Math.sin(aci - Math.PI / 45);
    this.y2 = this.uzunluk * 0.95 * Math.cos(aci - Math.PI / 45);

    this.x3 = this.uzunluk * this.sin;
    this.y3 = this.uzunluk * this.cos;

    this.x4 = this.uzunluk * 0.95 * Math.sin(aci + Math.PI / 45);
    this.y4 = this.uzunluk * 0.95 * Math.cos(aci + Math.PI / 45);

    // this.x4 = this.x2 + dx;
    // this.y4 = this.y2 + dy;

    this.ctx.beginPath();
    this.ctx.moveTo(this.x1, this.y1);
    this.ctx.lineTo(this.x2, this.y2);
    this.ctx.lineTo(this.x3, this.y3);
    this.ctx.lineTo(this.x4, this.y4);

    // A Noktasına dönüş
    this.ctx.stroke();
    this.ctx.fill();
  };

  ciz = () => {
    this.canvas = document.getElementById(this.props.id);
    this.ctx = this.canvas.getContext("2d");
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = this.props.renk;
    this.ctx.strokeStyle = this.props.renk;

    this.ctx.save();
    this.ctx.translate(60, 60);
    for (let i = 0; i < 18; i++) {
      this.fisekCiz((i * Math.PI) / 9);
    }
    this.ctx.restore();
  };

  componentDidMount = () => {
    this.ciz();
    this.zamanlayici.baslat();
  };

  componentWillUnmount = () => {
    this.zamanlayici.bitir();
  };

  render() {
    if (this.state.gorunur)
      return (
        <canvas
          width="120"
          height="120"
          id={this.props.id}
          style={{
            position: "absolute",
            left: this.props.x - 60 + "px",
            top: this.props.y - 60 + "px",
            opacity: "1",
            zIndex: 20,
          }}
        />
      );
    else return null;
  }
}

export default Sacma;
