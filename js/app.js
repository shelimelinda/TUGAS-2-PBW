// Load templates and data, then mount Vue app
Api.loadTemplates().then(() => {
  Api.loadData().then(data => {
    new Vue({
      el: '#app',
      data: {
        tab: 'dashboard',
        state: {
          upbjjList: data.upbjjList || [],
          kategoriList: data.kategoriList || [],
          pengirimanList: data.pengirimanList || [],
          paket: data.paket || [],
          stok: data.stok || [],
          tracking: {}
        }
      },
      created() {
        // convert tracking array into keyed object
        if (Array.isArray(data.tracking)) {
          data.tracking.forEach(item => {
            const key = Object.keys(item)[0];
            this.state.tracking[key] = item[key];
          });
        }
      },
      methods: {
        logout() {
          alert('Logout berhasil!');
        }
      }
    });
  });
});