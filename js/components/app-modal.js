Vue.component('app-modal', {
  template: '#tpl-modal',
  props: {
    visible: { type: Boolean, default: false },
    title: { type: String, default: '' }
  }
});