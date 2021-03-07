import React, { Component } from "react";
import Ayarlar from "./Ayarlar";
import OkumaAlani from "./OkumaAlani";
import Baslik from "./Baslik";
import Metinler from "./Metinler";
import Arac from "./Arac";

class OkumaHiziUyg extends Component {
  state = {};
  oyunAyarlar = {};

  constructor(props) {
    super(props);
    this.state.UygulamaDili = Arac.DegiskenOku("UygulamaDili", "tr");
    this.state.SonOynananOyun = Arac.DegiskenOku("SonOynananOyun", "Kelime");
    this.state.ayarlarAcik = false;
    this.ayarlarRef = React.createRef();
    this.oyunAyarlar = {
      ad: Arac.DegiskenOku("KullAd", this.MetinOku("VarsayilanKulAd")),
      kelimeDili: Arac.DegiskenOku("KelimeDili", "tr"),
      hiz: Arac.DegiskenOku("Hiz", "1"),
      harfSayisi: Arac.DegiskenOku("HarfSayisi", "1"),
      heceRengiOlsun: Arac.DegiskenOkuBool("HeceRengiOlsun", true),
      kayanYaziOlsun: Arac.DegiskenOkuBool("KayanYaziOlsun", true),
    };
    this.state.skor = this.skorOku(this.state.SonOynananOyun);
  }

  skorDegiskenOl = (kelimeTur) => {
    return (
      this.oyunAyarlar.ad +
      "_" +
      kelimeTur +
      "_" +
      this.oyunAyarlar.kelimeDili +
      "_" +
      this.oyunAyarlar.harfSayisi
    );
  };

  skorKontrol = (skor) => {
    if (skor > this.state.skor) {
      Arac.DegiskenYaz(this.skorDegiskenOl(this.state.SonOynananOyun), skor);
      this.setState({ skor: skor });
      return true;
    }
    return false;
  };

  skorOku = (kelimeTur) => {
    return Arac.DegiskenOkuInt(this.skorDegiskenOl(kelimeTur), 0);
  };

  skorBul = (kelimeTur) => {
    var tut = {};
    if (kelimeTur != null) tut.SonOynananOyun = kelimeTur;
    else tut.SonOynananOyun = this.state.SonOynananOyun;
    tut.skor = this.skorOku(tut.SonOynananOyun);
    this.setState(tut);
  };

  OyundaYap = (oyunda) => {
    this.setState({ oyunda: oyunda });
  };

  AyarlarAc = (acik) => {
    this.setState({ ayarlarAcik: acik && !this.state.oyunda });
  };

  AyarlariKaydet = (ayarBilgisi) => {
    Arac.DegiskenYaz("KullAd", ayarBilgisi.ad);
    Arac.DegiskenYaz("KelimeDili", ayarBilgisi.kelimeDili);
    Arac.DegiskenYaz("Hiz", ayarBilgisi.hiz);
    Arac.DegiskenYaz("HarfSayisi", ayarBilgisi.harfSayisi);
    Arac.DegiskenYaz("HeceRengiOlsun", ayarBilgisi.heceRengiOlsun);
    Arac.DegiskenYaz("KayanYaziOlsun", ayarBilgisi.kayanYaziOlsun);

    this.oyunAyarlar.ad = ayarBilgisi.ad;
    this.oyunAyarlar.kelimeDili = ayarBilgisi.kelimeDili;
    this.oyunAyarlar.hiz = ayarBilgisi.hiz;
    this.oyunAyarlar.harfSayisi = ayarBilgisi.harfSayisi;
    this.oyunAyarlar.heceRengiOlsun = ayarBilgisi.heceRengiOlsun;
    this.oyunAyarlar.kayanYaziOlsun = ayarBilgisi.kayanYaziOlsun;
    this.skorBul(null);
    this.AyarlarAc(false);
  };

  UygDiliDegistir = (uygDili) => {
    this.setState({ UygulamaDili: uygDili });
    Arac.DegiskenYaz("UygulamaDili", uygDili);
  };

  MetinOku = (metinKodu) => {
    try {
      var tut = Metinler[this.state.UygulamaDili][metinKodu];
      if (tut === undefined) return metinKodu;
      else return tut;
    } catch (e) {
      console.log(e);
      return metinKodu;
    }
  };

  DilListesi = () => {
    return [
      { value: "tr", text: this.MetinOku("Türkçe") },
      { value: "en", text: this.MetinOku("İngilizce") },
    ];
  };

  Hizlar = () => {
    return [
      { value: "1", text: "30 " + this.MetinOku("keldk") },
      { value: "2", text: "50 " + this.MetinOku("keldk") },
      { value: "3", text: "90 " + this.MetinOku("keldk") },
      { value: "4", text: "150 " + this.MetinOku("keldk") },
      { value: "5", text: "200 " + this.MetinOku("keldk") },
      { value: "6", text: "250 " + this.MetinOku("keldk") },
    ];
  };

  HarfSayilari = () => {
    //this.ayarlarRef.current
    return [
      { value: "1", text: this.MetinOku("Az") },
      { value: "2", text: this.MetinOku("Normal") },
      { value: "3", text: this.MetinOku("Cok") },
    ];
  };

  render() {
    return (
      <React.Fragment>
        {this.state.ayarlarAcik ? (
          <Ayarlar ref={this.ayarlarRef} uygulama={this} />
        ) : (
          ""
        )}
        <Baslik uygulama={this} />
        <OkumaAlani uygulama={this} />
      </React.Fragment>
    );
  }
}

export default OkumaHiziUyg;
