widget = {
  matchWeatherIcon: function(id, icon) {
    var iconClass =  'wi ';
    switch(icon) {
      case ("01d"): // clear sky day
          iconClass += 'wi-day-sunny';
          break;
      case ("01n"): // clear sky night
          iconClass += 'wi-night-clear';
          break;
      case ("02d"): // few clouds day
          iconClass += 'wi-day-sunny-overcast';
          break;
      case ("02n"): // few clouds night
          iconClass += 'wi-night-partly-cloudy';
          break;
      case ("03d"): // scattered clouds day
          iconClass += 'wi-day-cloudy';
          break;
      case ("03n"): // scattered clouds night
          iconClass += 'wi-night-cloudy';
          break;
      case ("04d"): // broken clouds day
          iconClass += 'wi-cloudy';
          break;
      case ("04n"): // broken clouds night
          iconClass += 'wi-night-alt-cloudy-high';
          break;
      case ("09d"): // shower rain day
          iconClass += 'wi-day-showers';
          break;
      case ("09n"): // shower rain night
          iconClass += 'wi-night-showers';
          break;
      case ("10d"): // rain day
          iconClass += 'wi-day-rain';
          break;
      case ("10n"): // rain night
          iconClass += 'wi-night-rain';
          break;
      case ("11d"): // thunderstorm day
          iconClass += 'wi-day-thunderstorm';
          break;
      case ("11n"): // thunderstorm night
          iconClass += 'wi-night-thunderstorm';
          break;
      case ("13d"): // snow day
          iconClass += 'wi-day-snow';
          break;
      case ("13n"): // snow night
          iconClass += 'wi-night-snow';
          break;
      case ("50d"): // mist
          iconClass += 'wi-day-haze';
          break;
      case ("50n"): // mist
          iconClass += 'wi-night-fog';
          break;
    }
    return iconClass;
  },


  convertWindDeg: function(deg) {
    var cardinal = "";
    switch (true) {
    case (deg > 348.75 || deg <= 11.25):
        cardinal = "<i class='wi wi-wind wi-from-n'></i>"
        break;
    case (deg <= 33.75):
        cardinal = "<i class='wi wi-wind wi-from-nne'></i>"
        break;
    case (deg <= 56.25):
        cardinal = "<i class='wi wi-wind wi-from-ne'></i>"
        break;
    case (deg <= 78.75):
        cardinal = "<i class='wi wi-wind wi-from-ene'></i>"
        break;
    case (deg <= 101.25):
        cardinal = "<i class='wi wi-wind wi-from-e'></i>"
        break;
    case (deg <= 123.75):
        cardinal = "<i class='wi wi-wind wi-from-ese'></i>"
        break;
    case (deg <= 146.25):
        cardinal = "<i class='wi wi-wind wi-from-se'></i>"
        break;
    case (deg <= 168.75):
        cardinal = "<i class='wi wi-wind wi-from-sse'></i>"
        break;
    case (deg <= 191.25):
        cardinal = "<i class='wi wi-wind wi-from-s'></i>"
        break;
    case (deg <= 213.75):
        cardinal = "<i class='wi wi-wind wi-from-ssw'></i>"
        break;
    case (deg <= 236.25):
        cardinal = "<i class='wi wi-wind wi-from-sw'></i>"
        break;
    case (deg <= 258.75):
        cardinal = "<i class='wi wi-wind wi-from-wsw'></i>"
        break;
    case (deg <= 281.25):
        cardinal = "<i class='wi wi-wind wi-from-w'></i>"
        break;
    case (deg <= 303.75):
        cardinal = "<i class='wi wi-wind wi-from-wnw'></i>"
        break;
    case (deg <= 326.25):
        cardinal = "<i class='wi wi-wind wi-from-nw'></i>"
        break;
    case (deg <= 348.75):
        cardinal = "<i class='wi wi-wind wi-from-nnw'></i>"
        break;
    default:
        cardinal = "<i class='wi wi-wind wi-from-n'></i>"
        break;
    }
    return cardinal;
  },

  // get beaufort wind scale, speed is in
  getBeaufort: function(speed) {
    var beaufort = "";
    switch (true) {
    case (speed >= 118):
        beaufort = "<i class='wi wi-wind-beaufort-12'></i> "
        break;
    case (speed >= 103 && speed < 118):
        beaufort = "<i class='wi wi-wind-beaufort-11'></i> "
        break;
    case (speed >= 89 && speed < 103):
        beaufort = "<i class='wi wi-wind-beaufort-10'></i> "
        break;
    case (speed >= 75 && speed < 89):
        beaufort = "<i class='wi wi-wind-beaufort-9'></i> "
        break;
    case (speed >= 62 && speed < 75):
        beaufort = "<i class='wi wi-wind-beaufort-8'></i> "
        break;
    case (speed >= 50 && speed < 62):
        beaufort = "<i class='wi wi-wind-beaufort-7'></i> "
        break;
    case (speed >= 39 && speed < 50):
        beaufort = "<i class='wi wi-wind-beaufort-6'></i> "
        break;
    case (speed >= 29 && speed < 39):
        beaufort = "<i class='wi wi-wind-beaufort-5'></i> "
        break;
    case (speed >= 20 && speed < 29):
        beaufort = "<i class='wi wi-wind-beaufort-4'></i> "
        break;
    case (speed >= 12 && speed < 20):
        beaufort = "<i class='wi wi-wind-beaufort-3'></i> "
        break;
    case (speed >= 6 && speed < 12):
        beaufort = "<i class='wi wi-wind-beaufort-2'></i> "
        break;
    case (speed >= 1 && speed < 6):
        beaufort = "<i class='wi wi-wind-beaufort-1'></i> "
        break;
    case (speed < 1):
        beaufort = "<i class='wi wi-wind-beaufort-0'></i> "
        break;
    default:
        beaufort = "<i class='wi wi-wind-beaufort-0'></i> "
        break;
    }
    return beaufort;
  },

  //runs when we receive data from the job
  onData: function (el, data) {
    // console.log(data.data);
    var report = JSON.parse(data.data);
    // console.log(report);

    //The parameters our job passed through are in the data object
    //el is our widget element, so our actions should all be relative to that
    if (data.title) {
      $('.widget-title', el).html(data.title + ' <small>(' + report.coord.lat + ', ' + report.coord.lon + ')</small>');
    }

    // main
    $('#curr_weather', el).html("<i class='" + this.matchWeatherIcon(report.weather[0].id, report.weather[0].icon) + "'></i> " + report.weather[0].main + "<br/><small>" + report.weather[0].description + "</small>");
    $('#curr_temperature', el).html("<i class='wi wi-thermometer'></i> " + (report.main.temp-273.15).toFixed(1) + "<i class='wi wi-celsius'></i>");
    $('#curr_min', el).html("<i class='wi wi-direction-down'></i> " + (report.main.temp-273.15).toFixed(1) + "<i class='wi wi-celsius'></i>");
    $('#curr_max', el).html("<i class='wi wi-direction-up'></i> " + (report.main.temp-273.15).toFixed(1) + "<i class='wi wi-celsius'></i>");

    if (report.main.sea_level) {
        $('#curr_pressure', el).html("<small> Grd </small>" + (report.main.grnd_level/10).toFixed(1) + "<small> kPa</small><br/><small> Sea </small>" + (report.main.sea_level/10).toFixed(1) + "<small> kPa</small>");
    }
    else
      $('#curr_pressure', el).html("<i class='wi wi-barometer'></i> " + (report.main.pressure/10).toFixed(1) + " <small>kPa</small>");

    $('#curr_humidity', el).html("<i class='wi wi-humidity'></i> " + report.main.humidity);

    // details
    // $('#curr_coord', el).html("<small>Lat </small>" + report.coord.lat + ", <small>Lon </small>" + report.coord.lon);

    var wind = this.getBeaufort(report.wind.speed*3.6) + (report.wind.speed*3.6).toFixed(1);
    if (report.wind.gust)
      wind += " - " + (report.wind.gust*3.6).toFixed(1);
    wind += " <small> kph </small> ";
    if (report.wind.deg)
      wind += this.convertWindDeg(report.wind.deg);
    $('#curr_wind', el).html(wind);

    $('#curr_clouds', el).html("<i class='wi wi-cloud'></i> " + report.clouds.all + " <small>%</small>");

    if (report.visibility <= 400) {
      $('#curr_visibility', el).html("<i class='fa fa-eye-slash'></i> " + report.visibility + " <small>m</small><i class='fa fa-warning'></i>");
      $('#curr_visibility').addClass('red-warn');
    }
    if (report.visibility < 1000)
      $('#curr_visibility', el).html("<i class='fa fa-low-vision'></i> " + report.visibility + " <small>m</small>");
    else if (report.visibility >= 1000)
      $('#curr_visibility', el).html("<i class='fa fa-eye'></i> " + (report.visibility/1000).toFixed(1) + " <small>km</small>");
    else
      $('#curr_visibility', el).html("");

    var precipitation = "<i></i>&nbsp;<small></small>";
    if (report.rain)
      precipitation = "<i class='wi wi-raindrop'></i> " + report.rain['3h'] + " <small>mm</small>";
    else if (report.snow)
      precipitation = "<i class='wi wi-snowflake-cold'></i> " + report.snow['3h'] + " <small>mm</small>";
    $('#curr_precipitation', el).html(precipitation);

    // var sunrise = moment(report.sys.sunrise).format("LTS").replace("PM", "<small>PM</small>").replace("AM", "<small>AM</small>");
    // var sunset = moment(report.sys.sunset).format("LTS").replace("PM", "<small>PM</small>").replace("AM", "<small>AM</small>");
    // $('#curr_sunrise', el).html("<i class='wi wi-sunrise'></i> " + sunrise);
    // $('#curr_sunset', el).html("<i class='wi wi-sunset'></i> " + sunset);

    var last_updated = moment(report.dt).format("HH:mm");
    $('#curr_last_updated', el).html("<small>Last Updated </small>" + last_updated);

  }
};
