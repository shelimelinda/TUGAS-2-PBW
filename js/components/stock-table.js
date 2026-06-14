Vue.component('ba-stock-table', {
  props: ['items', 'upbjjList', 'kategoriList'],
  template: '#tpl-stock',
  data: function() {
    return {
      form: {
        kode: '',
        judul: '',
        qty: ''
      }
    };
  },
  data: function() {
    return {
      form: {
        kode: '',
        judul: '',
        qty: ''
      },
      editingIndex: null,
      selectedUpbjj: '',
      selectedKategori: '',
      sortKey: '',
      sortDir: 'asc',
      searchText: '',
      showDeleteModal: false,
      deleteCandidateIndex: null,
      deleteCandidateKode: '',
      qtyWarning: ''
    };
  },

  methods: {
    submitForm: function() {
      if (this.editingIndex === null) {
        this.tambahData();
      } else {
        this.simpanEdit();
      }
    },

    tambahData: function() {
      if (!this.form.kode || !this.form.judul || this.form.qty === '') {
        alert('Semua field harus diisi!');
        return;
      }

      this.items.push({
        kode: this.form.kode,
        judul: this.form.judul,
        qty: Number(this.form.qty),
        harga: this.form.harga || 0
      });

      this.form.kode = '';
      this.form.judul = '';
      this.form.qty = '';
    },

    startEdit: function(item, idx) {
      // idx is relative to filteredItems; map to actual index in items
      const realIndex = this.items.findIndex(i => i.kode === item.kode);
      if (realIndex === -1) return;
      this.editingIndex = realIndex;
      const i = this.items[realIndex];
      this.form.kode = i.kode;
      this.form.judul = i.judul;
      this.form.qty = i.qty;
    },

    simpanEdit: function() {
      if (this.editingIndex === null) return;
      if (!this.form.kode || !this.form.judul || this.form.qty === '') {
        alert('Semua field harus diisi!');
        return;
      }

      Vue.set(this.items, this.editingIndex, {
        kode: this.form.kode,
        judul: this.form.judul,
        qty: Number(this.form.qty)
      });

      this.editingIndex = null;
      this.form.kode = '';
      this.form.judul = '';
      this.form.qty = '';
    },

    cancelEdit: function() {
      this.editingIndex = null;
      this.form.kode = '';
      this.form.judul = '';
      this.form.qty = '';
    },

    promptDelete: function(idx) {
      // idx is relative to filteredItems; get item kode and map to real index
      const item = this.filteredItems[idx];
      const realIndex = this.items.findIndex(i => i.kode === item.kode);
      this.deleteCandidateIndex = realIndex;
      this.deleteCandidateKode = item.kode;
      this.showDeleteModal = true;
    },

    confirmDelete: function() {
      if (this.deleteCandidateIndex !== null) {
        this.items.splice(this.deleteCandidateIndex, 1);
      }
      this.showDeleteModal = false;
      this.deleteCandidateIndex = null;
      this.deleteCandidateKode = '';
    },

    setSort: function(key) {
      if (this.sortKey === key) {
        this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortDir = 'asc';
      }
    }
  },
  computed: {
    totalData: function() {
      return this.items.length;
    },

    upbjjOptions: function() {
      return this.upbjjList || [];
    },

    // dependent kategori options: if upbjj selected, only categories present in that upbjj
    kategoriOptions: function() {
      const all = this.kategoriList || [];
      if (!this.selectedUpbjj) return all;
      // derive categories from items matching selectedUpbjj
      const set = new Set();
      this.items.forEach(i => {
        if (i.upbjj === this.selectedUpbjj && i.kategori) set.add(i.kategori);
      });
      return Array.from(set).length ? Array.from(set) : all;
    },

    filteredItems: function() {
      let list = this.items.slice();

      if (this.selectedUpbjj) {
        list = list.filter(i => i.upbjj === this.selectedUpbjj);
      }

      if (this.selectedKategori) {
        list = list.filter(i => i.kategori === this.selectedKategori);
      }

      if (this.searchText) {
        const s = this.searchText.toLowerCase();
        list = list.filter(i => (i.judul || '').toLowerCase().includes(s));
      }

      if (this.sortKey) {
        list.sort((a, b) => {
          const av = a[this.sortKey] || 0;
          const bv = b[this.sortKey] || 0;
          if (av === bv) return 0;
          if (this.sortDir === 'asc') return av > bv ? 1 : -1;
          return av < bv ? 1 : -1;
        });
      }

      return list;
    }
  },
  watch: {
    items: {
      deep: true,
      handler: function(newItems) {
        newItems.forEach(item => {
          if (item.qty > 0 && item.qty < 5) {
            alert(`Stok "${item.judul}" hampir habis! (sisa ${item.qty})`);
          }
        });
      }
    },

    // watcher kedua: pantau perubahan pada form.qty untuk memberi peringatan input cepat
    'form.qty': function(newVal) {
      if (newVal === '' || newVal === null) {
        this.qtyWarning = '';
        return;
      }
      const n = Number(newVal);
      if (isNaN(n)) {
        this.qtyWarning = 'Jumlah stok harus angka';
      } else if (n > 0 && n < 5) {
        this.qtyWarning = 'Perhatian: jumlah yang dimasukkan tergolong rendah';
      } else {
        this.qtyWarning = '';
      }
    }
  }
});