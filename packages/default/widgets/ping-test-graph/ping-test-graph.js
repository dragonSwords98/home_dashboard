widget = {
  generateChart: function(ctx, data, options){
    return new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
  },

  generateData: function(data) {

    // datetimestamp
    let datetimestamp = _.map(data, function(element){
      return moment(element.datetime).format('HH:mm');
    });

    // upload
    let up = _.map(data, function(element){
      return element.speeds.upload;
    });
    // TODO: Temporary workaround by setting a hard limit on 15Mbps. Issue: https://github.com/ddsol/speedtest.net/issues/11
    up = _.map(up, function(e){ return e > 15 ? null : e })

    // download
    let down = _.map(data, function(element){
      return element.speeds.download;
    });

    // server ping
    let ping = _.map(data, function(element){
      return element.server.ping;
    })
    // timeouts are not mapped, first timeout usually is startup lag
    let timeouts = -1
    ping = _.map(ping, function(e){ timeouts++; return e >= 3500 ? null : e })

    return {
    labels: datetimestamp,
    datasets: [
        {
            label: "Upload (Mbps)",
            fill: false,
            yAxisID: "y",
            lineTension: 0.1,
            backgroundColor: "rgba(21,101,192,0.4)",
            borderColor: "#82b1ff",
            borderCapStyle: 'butt',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#82b1ff",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#82b1ff",
            pointHoverBorderColor: "#e3f2fd",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: up,
            spanGaps: true,
            steppedLine: true
        },
        {
            label: "Download (Mbps)",
            fill: false,
            yAxisID: "y",
            lineTension: 0.1,
            backgroundColor: "rgba(178, 255, 89, 0.4)",
            borderColor: "#ccff90",
            borderCapStyle: 'butt',
            borderWidth: 2,
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#ccff90",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#ccff90",
            pointHoverBorderColor: "#f1f8e9",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: down,
            spanGaps: true,
            steppedLine: true
        },
        {
            label: "Ping (ms) - timeouts: " + timeouts,
            fill: true,
            yAxisID: "y-ms",
            lineTension: 0.1,
            backgroundColor: "rgba(245, 0, 87, 0.4)",
            borderColor: "#ff80ab",
            borderCapStyle: 'butt',
            borderWidth: 4,
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: "#ff80ab",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "#ff80ab",
            pointHoverBorderColor: "#fce4ec",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: ping,
            spanGaps: true,
            steppedLine: true
        }
      ]
    };
  },

  generateOptions: function() {
    return {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 2
        }
      },
      scales: {
        yAxes: [
          {
            position: "left",
            "id": "y",
            gridLines: {
              display: false
            }
          }, {
            position: "right",
            "id": "y-ms",
            gridLines: {
              display: false
            }
          }
        ],
        xAxes: [{
          gridLines: {
            display: false
          }
        }]
      }
    }
  },

  //runs when we receive data from the job
  onData: function (el, data) {

    Chart.defaults.global.defaultFontColor = "#FFF";
    Chart.defaults.global.defaultFontSize = 12;
    Chart.defaults.global.responsive = false;
    Chart.defaults.global.maintainAspectRatio = false;

    //The parameters our job passed through are in the data object
    //el is our widget element, so our actions should all be relative to that
    if (data.title) {
      $('h2', el).text(data.title)
    }

    var $content = $('.content', el);
    $content.empty();
    $content.html("<canvas class='chart' height='270' width='270'></canvas>");
    this.generateChart($('.chart'), this.generateData(data.data), this.generateOptions());
  }
};
