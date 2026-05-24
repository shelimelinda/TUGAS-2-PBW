var app = new Vue({
  el: '#app',

  data: {
    stok: [
      // data kamu (isi dari dataBahanAjar.js atau tambahkan manual di sini)
    ],

    form: {
      kode: '',
      judul: '',
      qty: ''
    }
  },

  methods: {
    tambahData() {
      // Validasi: pastikan semua field terisi
      if (!this.form.kode || !this.form.judul || this.form.qty === '') {
        alert('Semua field harus diisi!');
        return;
      }

      this.stok.push({
        kode: this.form.kode,
        judul: this.form.judul,
        qty: Number(this.form.qty)
      });

      // Reset form setelah tambah
      this.form.kode = '';
      this.form.judul = '';
      this.form.qty = '';
    },

    logout() {
      // Tambahkan logika logout di sini
      alert('Logout berhasil!');
    }
  },

  computed: {
    totalData() {
      return this.stok.length;
    }
  },

  watch: {
    // Memantau array stok (bukan form.qty) agar alert muncul setelah data benar-benar masuk
    stok: {
      deep: true,
      handler(newStok) {
        newStok.forEach(item => {
          if (item.qty > 0 && item.qty < 5) {
            alert(`Stok "${item.judul}" hampir habis! (sisa ${item.qty})`);
          }
        });
      }
    }
  }
});