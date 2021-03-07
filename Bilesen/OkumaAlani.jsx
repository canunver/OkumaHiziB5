import React, { Component } from "react";
import AracCubugu from "../Kontroller/AracCubugu";
import SecimKutusu from "../Kontroller/SecimKutusu";
import YaziAlani from "./YaziAlani";
import Gosterge from "../Kontroller/Gosterge";
import "./OkumaAlani.css";
import Zamanlayici from "./Zamanlayici";
import Arac from "./Arac";
import HavaiFisekAlan from "./HavaiFisekAlan";

class OkumaAlani extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secKelimeTur: this.props.uygulama.state.SonOynananOyun,
      gecenSure: "000",
      okunanKelime: "000",
      havaiFisek: false,
      kelimeBilgi: [
        {
          id: "1",
          harfler: this.props.uygulama.MetinOku("Başla Tuşuna Bas"),
          sinif: "Normal",
        },
      ],
    };

    this.oyunBilgi = {
      gecenSure: 0,
      okunanKelime: 0,
    };

    this.zamanlayici = new Zamanlayici(1, 25, this.zamanGecti);
  }

  KelimeTurleri = () => {
    var dizi = new Array();
    dizi.push({
      value: "Kelime",
      text: this.props.uygulama.MetinOku("Kelime"),
    });
    dizi.push({
      value: "SF",
      text: this.props.uygulama.MetinOku("Sonu Farklı"),
    });
    dizi.push({
      value: "IF",
      text: this.props.uygulama.MetinOku("İlki Farklı"),
    });
    if (this.props.uygulama.state.UygulamaDili == "tr")
      dizi.push({
        value: "Ekli",
        text: this.props.uygulama.MetinOku("Ekli Kelime"),
      });
    dizi.push({
      value: "KH",
      text: this.props.uygulama.MetinOku("Karışan Harfler"),
    });
    dizi.push({
      value: "Hafiza",
      text: this.props.uygulama.MetinOku("Hafıza"),
    });
    if (this.props.uygulama.state.UygulamaDili == "tr")
      dizi.push({
        value: "Hece",
        text: this.props.uygulama.MetinOku("Heceler"),
      });
    return dizi;
  };

  onChange = (id, e) => {
    this.props.uygulama.skorBul(e.target.value);
    this.setState({ secKelimeTur: e.target.value });
  };

  zamanGecti = (id, gecenSure) => {
    var gecenSaniye = Math.trunc(gecenSure / 1000);
    if (this.oyunBilgi.aktifYer < this.oyunBilgi.kelime.kelime.length) {
      this.oyunBilgi.aktifYer++;
      try {
        this.setState({ kelimeBilgi: this.kelimedenKelimeBilgiye() });
      } catch {}
    }
    if (gecenSaniye > this.oyunBilgi.gecenSure) {
      this.oyunBilgi.gecenSure = gecenSaniye;
      this.setState({ gecenSure: Arac.StrYap(gecenSaniye) });
      if (this.oyunBilgi.gecenSure >= 6) this.oyunBitir();
    }
  };

  onClick = (id, e) => {
    if (id === "gstDevam") this.sonrakiKelime();
    else this.kelimeleriAlOyunaBasla();
  };

  oyunBitir = () => {
    this.zamanlayici.bitir();
    this.props.uygulama.OyundaYap(false);

    if (this.props.uygulama.skorKontrol(this.oyunBilgi.okunanKelime))
      this.setState({ havaiFisek: true });
  };

  kelimeAl = () => {
    var ind = this.oyunBilgi.okunanKelime % this.oyunBilgi.kelimeler.length;
    return this.oyunBilgi.kelimeler[ind];
  };

  stilBul = (hece, vrg) => {
    var ek;
    if (vrg == "1") ek = " Vurgulu";
    else ek = "";
    if (hece == "2") return "Renkli" + ek;
    else return "Normal" + ek;
  };

  kelimeBilgiDizisineEkle = (kelimeBilgiDizisi, oncHarfler, oncStil) => {
    kelimeBilgiDizisi.push({
      id: kelimeBilgiDizisi.length,
      harfler: oncHarfler,
      sinif: oncStil,
    });
  };

  kelimedenKelimeBilgiye = () => {
    var kelimeBilgiDizisi = new Array();
    //Harf harf aktifleri al ve stilleri ayarlar
    var oncHarfler = "";
    var oncStil = "";
    for (
      let index = 0;
      index <
      Math.min(this.oyunBilgi.aktifYer, this.oyunBilgi.kelime.kelime.length);
      index++
    ) {
      var harf = Arac.DiziElemanAl(this.oyunBilgi.kelime.kelime, index, "");
      var hece = Arac.DiziElemanAl(this.oyunBilgi.kelime.heceler, index, "1");
      var vrg = Arac.DiziElemanAl(this.oyunBilgi.kelime.vurgu, index, "0");
      if (harf != "") {
        var simdStil = this.stilBul(hece, vrg);
        if (simdStil != oncStil) {
          if (oncHarfler != "") {
            this.kelimeBilgiDizisineEkle(
              kelimeBilgiDizisi,
              oncHarfler,
              oncStil
            );
          }
          oncHarfler = "";
          oncStil = simdStil;
        }
        oncHarfler += harf;
      }
    }
    if (oncHarfler != "") {
      this.kelimeBilgiDizisineEkle(kelimeBilgiDizisi, oncHarfler, oncStil);
    }

    //aktiften sonraki tüm harfleri diziye ekle;
    if (this.oyunBilgi.aktifYer < this.oyunBilgi.kelime.kelime.length) {
      this.kelimeBilgiDizisineEkle(
        kelimeBilgiDizisi,
        this.oyunBilgi.kelime.kelime.substring(this.oyunBilgi.aktifYer),
        "Pasif"
      );
    }
    return kelimeBilgiDizisi;
  };

  kelimeAta = () => {
    this.oyunBilgi.aktifYer = 0;
    this.oyunBilgi.kelime = this.kelimeAl();
    this.setState({ kelimeBilgi: this.kelimedenKelimeBilgiye() });
  };

  sonrakiKelime = () => {
    this.oyunBilgi.okunanKelime++;
    this.setState({ okunanKelime: Arac.StrYap(this.oyunBilgi.okunanKelime) });
    this.kelimeAta();
  };

  kelimeleriAlOyunaBasla = () => {
    var sonuc = fetch("http://localhost/Uretec/Uretec/Kelimeler.aspx?tur=12")
      .then(
        (res) => res.json(),
        (e) => {
          console.log("1.e");
          console.log(e);
        }
      )
      .then(
        (gelenKelimeler) => {
          this.oyunaBasla(gelenKelimeler.kelimeler);
        },
        (e) => {
          console.log("2.e");
          console.log(e);
        }
      );
  };

  oyunaBasla = (gelenKelimeler) => {
    this.oyunBilgi.kelimeler = gelenKelimeler;
    //Eğer okundu ise
    if (this.oyunBilgi.kelimeler.length > 0) {
      //İlk kelimeye ayarla;
      this.props.uygulama.OyundaYap(true);
      //Kelimeleri sunucudan okumak
      this.oyunBilgi.gecenSure = 0;
      this.oyunBilgi.okunanKelime = 0;
      this.oyunBilgi.aktifYer = 0;
      this.setState({ gecenSure: "000", okunanKelime: "000" });
      this.kelimeAta();
      this.zamanlayici.baslat();
    }
  };

  onHavaiFisekClick = (e) => this.setState({ havaiFisek: false });
  havaiFisekBaslat = (e) => this.setState({ havaiFisek: true });

  render() {
    return (
      <React.Fragment>
        <YaziAlani
          uygulama={this.props.uygulama}
          kelimeBilgi={this.state.kelimeBilgi}
        />
        <AracCubugu arkaRenk="white" height="29px" marginTop="2px">
          <Gosterge
            metin={this.state.gecenSure}
            left="10px"
            yaziRenk="#003D36"
          />
          <Gosterge
            metin={this.state.okunanKelime}
            left="72px"
            yaziRenk="#003D36"
            onClick={this.havaiFisekBaslat}
          />
          {this.props.uygulama.state.oyunda ? (
            <Gosterge
              id="gstDevam"
              metin={this.props.uygulama.MetinOku("DEVAM")}
              left="200px"
              yaziRenk="#cc0029"
              width="97px"
              onClick={this.onClick}
            />
          ) : (
            ""
          )}
        </AracCubugu>
        <AracCubugu arkaRenk="white" height="33px" marginTop="2px">
          <Gosterge
            arkaRenk="white"
            metin={this.props.uygulama.MetinOku("Kelime Tür") + ":"}
            left="10px"
            yaziRenk="black"
            width="140px"
            textAlign="left"
            position="relative"
          />
          <SecimKutusu
            id="skKelimeTur"
            value={this.state.secKelimeTur}
            etiket=""
            height="30px"
            liste={this.KelimeTurleri()}
            etiketGenislik="0px"
            onChange={this.onChange}
            position="relative"
            className="SecimKutusuBuyuk"
            kontrolGenislik="190px"
            ayniSatir
          />
          {!this.props.uygulama.state.oyunda ? (
            <Gosterge
              id="gstBasla"
              metin={this.props.uygulama.MetinOku("BAŞLA")}
              left="30px"
              yaziRenk="#cc0029"
              width="97px"
              position="relative"
              onClick={this.onClick}
            />
          ) : (
            ""
          )}
        </AracCubugu>
        {this.state.havaiFisek ? (
          <HavaiFisekAlan onClick={this.onHavaiFisekClick} />
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

export default OkumaAlani;
