// Simple API/service loader for templates and JSON data
const Api = {
  loadTemplates() {
    const files = [
      'templates/stock-table.html',
      'templates/do-tracking.html',
      'templates/order-form.html',
      'templates/status-badge.html',
      'templates/app-modal.html'
    ];

    return Promise.all(files.map(path =>
      fetch(path).then(r => r.text()).then(html => {
        // Inject the template HTML into the document so Vue can use template ids
        const wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        // append children (template elements) into body
        while (wrapper.firstChild) {
          document.body.appendChild(wrapper.firstChild);
        }
      })
    ));
  },

  loadData() {
    return fetch('data/dataBahanAjar.json').then(r => r.json());
  }
};

window.Api = Api;
const ApiService = {
  async getData() {
    const response = await fetch('data/dataBahanAjar.json');
    return await response.json();
  }
};