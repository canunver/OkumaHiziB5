import React, { Component } from "react";
import Arac from "./Arac";
import Zamanlayici from "./Zamanlayici";
import Sacma from "./Sacma";
class HavaiFisek extends Component {
  xBasGen = 0.54;
  xGvdGen = 0.32;
  xKuyGen = 0.14;

  xBasYuk = 0.2;
  xGvdYuk = 0.56;
  xKuyYuk = 0.24;
  canvas = null;

  constructor(props) {
    super(props);

    this.basGen = this.props.yukseklik * this.xBasGen;
    this.basYuk = this.props.yukseklik * this.xBasYuk;

    this.gvdGen = this.props.yukseklik * this.xGvdGen;
    this.gvdYuk = this.props.yukseklik * this.xGvdYuk;

    this.kuyGen = this.props.yukseklik * this.xKuyGen;
    this.kuyYuk = this.props.yukseklik * this.xKuyYuk;

    this.basGvdFark = (this.basGen - this.gvdGen) / 2;
    this.basKuyFark = (this.basGen - this.kuyGen) / 2;
    this.offsetGen = this.basGen / 2;
    this.offsetYuk = (this.gvdYuk + this.basYuk + this.kuyYuk) / 2;
    this.enBoy = this.props.yukseklik * 1.1;
    this.state = {};
    this.state.x = 400;
    this.state.y = 280;
    this.state.fisekDurum = 1; //1: Havai fişek, 2: saçma

    this.hedefX = Arac.Rastgele(0, this.state.x * 2);
    this.hedefY = Arac.Rastgele(20, 70);

    this.adimSay = Arac.Rastgele(60, 80);

    this.dx = (this.hedefX - this.state.x) / this.adimSay;
    this.dy = (this.hedefY - this.state.y) / this.adimSay;

    this.aci = Math.atan(this.dx / (-1 * this.dy));
    this.renk = Arac.RastgeleRenkBul();
    this.zamanlayici = new Zamanlayici(1, 20, this.zamanGecti);
  }

  zamanGecti = (id, gecenSure) => {
    this.setState({ x: this.state.x + this.dx, y: this.state.y + this.dy });
    if (this.state.y < this.hedefY) {
      this.zamanlayici.bitir();
      this.setState({ fisekDurum: 2 }); //1: Havai fişek, 2: saçma
    }
  };

  componentDidMount = () => {
    this.canvas = document.getElementById("cnv" + this.props.id);
    this.ctx = this.canvas.getContext("2d");
    this.ctx.fillStyle = this.renk;
    this.ctx.strokeStyle = this.renk;

    this.ctx.save();
    this.ctx.translate(this.enBoy / 2, this.enBoy / 2);
    this.ctx.rotate(this.aci);

    this.ctx.beginPath();
    // A Noktası
    this.ctx.moveTo(this.basGen / 2 - this.offsetGen, 0 - this.offsetYuk);

    // B Noktası
    this.ctx.lineTo(this.basGen - this.offsetGen, this.basYuk - this.offsetYuk);

    // C Noktası
    this.ctx.lineTo(
      this.basGen - this.basGvdFark - this.offsetGen,
      this.basYuk - this.offsetYuk
    );

    // Ç Noktası
    this.ctx.lineTo(
      this.basGen - this.basGvdFark - this.offsetGen,
      this.basYuk + this.gvdYuk - this.offsetYuk
    );

    // D Noktası
    this.ctx.lineTo(
      this.basGen - this.basKuyFark - this.offsetGen,
      this.basYuk + this.gvdYuk - this.offsetYuk
    );

    // E Noktası
    this.ctx.lineTo(
      this.basGen - this.basKuyFark - this.offsetGen,
      this.basYuk + this.gvdYuk + this.kuyYuk - this.offsetYuk
    );

    // F Noktası
    this.ctx.lineTo(
      this.basKuyFark - this.offsetGen,
      this.basYuk + this.gvdYuk + this.kuyYuk - this.offsetYuk
    );

    // G Noktası
    this.ctx.lineTo(
      this.basKuyFark - this.offsetGen,
      this.basYuk + this.gvdYuk - this.offsetYuk
    );

    // Ğ Noktası
    this.ctx.lineTo(
      this.basGvdFark - this.offsetGen,
      this.basYuk + this.gvdYuk - this.offsetYuk
    );

    // H Noktası
    this.ctx.lineTo(
      this.basGvdFark - this.offsetGen,
      this.basYuk - this.offsetYuk
    );
    // I Noktası
    this.ctx.lineTo(0 - this.offsetGen, this.basYuk - this.offsetYuk);

    // A Noktasına dönüş
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.restore();
    this.zamanlayici.baslat();
  };

  componentWillUnmount = () => {
    this.zamanlayici.bitir();
  };

  render() {
    if (this.state.fisekDurum == 1) {
      return (
        <canvas
          width={this.enBoy}
          height={this.enBoy}
          id={"cnv" + this.props.id}
          style={{
            position: "absolute",
            left: this.state.x + "px",
            top: this.state.y + "px",
            opacity: "1",
            zIndex: 20,
          }}
        />
      );
    } else if (this.state.fisekDurum == 2) {
      return (
        <Sacma
          id={"sacma" + this.props.id}
          x={this.hedefX}
          y={this.hedefY}
          aci="20"
          renk={this.renk}
          dagilma={1000}
          bekleme={350}
        />
      );
    }
  }
}

export default HavaiFisek;
