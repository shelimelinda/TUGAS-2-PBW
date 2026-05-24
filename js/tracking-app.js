var app = new Vue({
  el: '#app',

  data: {
    nomorDO: '',
    hasilTracking: null,
    tracking: {
      "DO2025-0001": {
        nim: "123456789",
        nama: "Rina Wulandari",
        status: "Dalam Perjalanan",
        statusClass: "proses",
        ekspedisi: "JNE",
        tanggalKirim: "2025-08-25",
        perjalanan: [
          { waktu: "2025-08-25 08:00", keterangan: "Paket diterima di gudang pengirim" },
          { waktu: "2025-08-25 13:30", keterangan: "Paket dalam perjalanan ke hub JNE" },
          { waktu: "2025-08-26 09:15", keterangan: "Paket tiba di hub Jakarta" }
        ]
      }
    }
  },

  methods: {
    cekTracking() {
      this.hasilTracking = this.tracking[this.nomorDO] || null
    }
  }
});