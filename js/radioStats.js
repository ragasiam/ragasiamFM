const url = 'http://192.30.164.78:8000/status-json.xsl';
window.stats = {
  radioName: null,
  listeners: 0,
  listenerPeak: 0,
  title: null,
};
window.jsonUpdate = () => (fetch(url)
  .then(response => response.json())
  .then((output) => {
    window.json0 = output;
    window.json1 = output.icestats.source[0];
    // window.json1 = output.icestats.source;
    window.stats.radioName = window.json1.server_name;
    window.stats.listeners = window.json1.listeners;
    window.stats.listenerPeak = window.json1.listener_peak;
    window.stats.title = window.json1.title;
    document.title = window.stats.title;
    document.getElementById('statsDiv')
      .innerText = window.stats.title;
    document.getElementById('listenersDiv')
      .innerText = `Oyentes: ${window.stats.listeners}`;
  })
  .catch((error) => {
    window.stats.title = 'Offline';
    return console.error(error);
  }));
window.setInterval(() => window.jsonUpdate(), 8000);
window.onload = () => window.jsonUpdate();
