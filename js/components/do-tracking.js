Vue.component('do-tracking', {
  props: ['tracking', 'paket', 'pengirimanList'],
  template: '#tpl-tracking',
  data: function() {
    return {
      nomorDO: '',
      hasilTracking: null
    };
  },
  methods: {
    cekTracking: function() {
      this.hasilTracking = this.tracking[this.nomorDO] || null;
    }
  }
});

// add global key handler for Esc to reset tracking input (mounted per component instance)
Vue.component('do-tracking').options.mounted = function() {
  const vm = this;
  this._escHandler = function(e) {
    if (e.key === 'Escape' || e.key === 'Esc') {
      vm.nomorDO = '';
      vm.hasilTracking = null;
    }
  };
  document.addEventListener('keydown', this._escHandler);
};

Vue.component('do-tracking').options.destroyed = function() {
  if (this._escHandler) document.removeEventListener('keydown', this._escHandler);
};