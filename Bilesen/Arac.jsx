var Arac = {
  DegiskenOku: (degiskenAdi, varsayilanDeger) => {
    //var deger = document.cookie
    //if (deger === undefined || deger === "") return varsayilanDeger;
    //var degerler = deger.split(";");
    //degerer.forEach(function(){item});....
    var deger = localStorage.getItem(degiskenAdi);
    if (deger === undefined || deger === "" || deger === null)
      return varsayilanDeger;
    else return deger;
  },

  DegiskenOkuBool: (degiskenAdi, varsayilanDeger) => {
    var deger = localStorage.getItem(degiskenAdi);
    if (deger === undefined || deger === "" || deger === null)
      return varsayilanDeger;
    else return deger != "false";
  },

  DegiskenOkuInt: (degiskenAdi, varsayilanDeger) => {
    try {
      var deger = localStorage.getItem(degiskenAdi);
      if (deger === undefined || deger === "" || deger === null)
        return varsayilanDeger;
      else return parseInt(deger);
    } catch {
      return varsayilanDeger;
    }
  },

  DegiskenYaz: (degiskenAdi, deger) => {
    //document.cookie = degiskenAdi+"="+deger+"; expires=Wed, 1 Jan 2025 12:00:00 UTC; path=/";
    localStorage.setItem(degiskenAdi, deger);
  },

  StrYap: (i) => {
    var str = (i + "").padStart(3, "0");
    return str;
  },

  DiziElemanAl: (str, ind, def) => {
    if (str == undefined || str == null || ind >= str.length) return def;
    return str[ind];
  },

  Rastgele: (kucuk, buyuk) => {
    return kucuk + Math.floor(Math.random() * (buyuk - kucuk));
  },

  RastgeleRenkBul: () => {
    var r = 255 - Arac.Rastgele(0, 16) * 16;
    var g = 255 - Arac.Rastgele(0, 16) * 16;
    var b = 255 - Arac.Rastgele(0, 16) * 16;
    return "rgb(" + r + "," + g + "," + b + ")";
  },
};
export default Arac;
