import React, { Component } from "react";
import "./Ayarlar.css";
import MetinGirisi from "../Kontroller/MetinGirisi";
import IsaretKutusu from "../Kontroller/IsaretKutusu";
import SecimKutusu from "../Kontroller/SecimKutusu";
import TusMetin from "../Kontroller/TusMetin";
import AracCubugu from "../Kontroller/AracCubugu";

class Ayarlar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ad: this.props.uygulama.oyunAyarlar.ad,
      kelimeDili: this.props.uygulama.oyunAyarlar.kelimeDili,
      hiz: this.props.uygulama.oyunAyarlar.hiz,
      harfSayisi: this.props.uygulama.oyunAyarlar.harfSayisi,
      heceRengiOlsun: this.props.uygulama.oyunAyarlar.heceRengiOlsun,
      kayanYaziOlsun: this.props.uygulama.oyunAyarlar.kayanYaziOlsun,
    };
  }

  onChange = (id, e) => {
    if (id === "skUygDil") this.props.uygulama.UygDiliDegistir(e.target.value);
    else if (id === "mgAd") this.setState({ ad: e.target.value });
    else if (id === "skKelDil") this.setState({ kelimeDili: e.target.value });
    else if (id === "skKelDil") this.setState({ kelimeDili: e.target.value });
    else if (id === "skHiz") this.setState({ hiz: e.target.value });
    else if (id === "skHarfSayisi")
      this.setState({ harfSayisi: e.target.value });
    else if (id === "ikHeceRengi")
      this.setState({ heceRengiOlsun: e.target.checked });
    else if (id === "ikKayanYazi")
      this.setState({ kayanYaziOlsun: e.target.checked });
  };

  AyarlariEskiHalineGetir = () => {
    var yeniObje = {
      ad: this.props.uygulama.oyunAyarlar.ad,
      kelimeDili: this.props.uygulama.oyunAyarlar.kelimeDili,
      hiz: this.props.uygulama.oyunAyarlar.hiz,
      harfSayisi: this.props.uygulama.oyunAyarlar.harfSayisi,
      heceRengiOlsun: this.props.uygulama.oyunAyarlar.heceRengiOlsun,
      kayanYaziOlsun: this.props.uygulama.oyunAyarlar.kayanYaziOlsun,
    };

    this.setState(yeniObje);
  };

  onClick = (id, e) => {
    this.AyarlariEskiHalineGetir();
    this.props.uygulama.AyarlarAc(false);
  };

  render() {
    return (
      <div className="Ayarlar">
        <AracCubugu altCizgi>
          <div
            style={{
              display: "inline-block",
              width: "100%",
              textAlign: "center",
            }}
          >
            {this.props.uygulama.MetinOku("Ayarlar")}
          </div>
          <TusMetin metin="X" onClick={this.onClick} right="3px" />
        </AracCubugu>
        <div style={{ margin: "15px 10px" }}>
          <SecimKutusu
            id="skUygDil"
            etiket={this.props.uygulama.MetinOku("UygDil")}
            value={this.props.uygulama.state.UygulamaDili}
            liste={this.props.uygulama.DilListesi()}
            onChange={this.onChange}
          />
          <MetinGirisi
            id="mgAd"
            etiket={this.props.uygulama.MetinOku("KullAd")}
            value={this.state.ad}
            onChange={this.onChange}
            alanGenislik="143px"
          />
          <SecimKutusu
            id="skKelDil"
            onChange={this.onChange}
            etiket={this.props.uygulama.MetinOku("KelimeDil")}
            liste={this.props.uygulama.DilListesi()}
            value={this.state.kelimeDili}
          />
          <SecimKutusu
            id="skHiz"
            onChange={this.onChange}
            etiket={this.props.uygulama.MetinOku("Hiz")}
            liste={this.props.uygulama.Hizlar()}
            value={this.state.hiz}
          />
          <SecimKutusu
            id="skHarfSayisi"
            onChange={this.onChange}
            etiket={this.props.uygulama.MetinOku("HarfSayisi")}
            liste={this.props.uygulama.HarfSayilari()}
            value={this.state.harfSayisi}
          />
          {this.HeceRengiOl()}
          <IsaretKutusu
            id="ikKayanYazi"
            etiket={this.props.uygulama.MetinOku("Kayan Yazı")}
            onChange={this.onChange}
            checked={this.state.kayanYaziOlsun}
          />
        </div>
        <AracCubugu ustCizgi center>
          <button
            onClick={(e) => {
              this.props.uygulama.AyarlariKaydet(this.state);
            }}
          >
            {this.props.uygulama.MetinOku("Kaydet")}
          </button>
        </AracCubugu>
      </div>
    );
  }

  HeceRengiOl = () => {
    if (this.state.kelimeDili === "tr")
      return (
        <IsaretKutusu
          id="ikHeceRengi"
          etiket={this.props.uygulama.MetinOku("Hece Rengi")}
          onChange={this.onChange}
          checked={this.state.heceRengiOlsun}
        />
      );
  };
}

export default Ayarlar;
