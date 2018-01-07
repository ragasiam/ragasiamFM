const url = "http://uk1.internet-radio.com:8251-json.xsl";
window.stats = {
  radioName: null,
  listeners: 0,
  // listenerPeak: 0,
  title: null
};
window.jsonUpdate = () =>
  fetch(url)
    .then(response => response.json())
    .then(output => {
      window.json0 = output;
      if (!window.json0.icestats.source.length) {
        window.json1 = window.json0.icestats.source;
      } else {
        for (let i = 0; i < window.json0.icestats.source.length; i += 1) {
          window.source = window.json0.icestats.source[i];
          if (window.source.listenurl === "http://uk1.internet-radio.com:8251/stream") {
          } else if (
            window.source.listenurl === "http://uk1.internet-radio.com:8251/stream" &&
            window.json0.icestats.source[0].stream_start
          ) {
            window.live = true;
            window.json1 = window.source;
          } else if (
            window.source.listenurl === "http://uk1.internet-radio.com:8251/stream" &&
            !window.json0.icestats.source[0].stream_start
          ) {
            window.live = false;
          } else if (
            window.source.listenurl ===
              "http://uk1.internet-radio.com:8251/stream" &&
            !window.live
          ) {
            window.live = false;
            window.json1 = window.source;
          }
        }
      }
      // window.json1 = output.icestats.source;
      window.stats.radioName = window.json1.server_name;
      window.stats.listeners = window.json1.listeners;
      // window.stats.listenerPeak = window.json1.listener_peak;
      window.stats.title = window.json1.title;
      document.title = window.stats.title;
      document.getElementById("statsDiv").innerText = window.stats.title;
      document.getElementById("listenersDiv").innerText = `Oyentes: ${window
        .stats.listeners}`;
    })
    .catch(error => {
      window.stats.title = "Offline";
      // return console.error(error);
    });
window.setInterval(() => window.jsonUpdate(), 8000);
window.onload = () => window.jsonUpdate();
