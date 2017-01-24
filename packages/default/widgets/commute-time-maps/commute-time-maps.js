widget = {
  //runs when we receive data from the job
  onData: function (el, data) {
    // let $m = $('#' + data.user + 'Map', el)
    let $m = $('.map', el)
    let $i = $('.info', el)
    $i.empty()
    if (!$m.attr('id')) {
      $m.attr('id', data.user)
    }

    // let $c = $('.content', el)
    // $c.empty()
    // // create map if d.n.e.
    // if ($m.length <= 0) {
    //   $c.prepend("<div class='map' id='"+ data.user+"Map'></div>")
    //   $m = $('#' + data.user + 'Map', el)
    // }
    // else {
    //   $c.prepend($m)
    //   console.log($m)
    //   console.log(this.gmap)
    // }

    //The parameters our job passed through are in the data object
    //el is our widget element, so our actions should all be relative to that
    if (data.title) {
      $('h2', el).text(data.title)
    }

    // if (data.response) {
    //   if (data.response.json.status != "OK")
    //     console.error("Error retrieving directions")
    //
    //   directionServiceResponse = data.response;
    //   directionServiceResponse.json.request = {
    //     destination: data.destination,
    //     origin: data.origin,
    //     travelMode: data.mode,
    //     avoidTolls: true
    //   }
    //   if (data.mode == "DRIVING") {
    //       directionServiceResponse.json.request.drivingOptions = {
    //         departureTime: new Date(),
    //         trafficModel: "pessimistic" //bestguess (Default), optimistic
    //       }
    //   }
    //   $m.removeClass('full')
    //   $c.append($m)
    // }
    // else {
    //   $m.addClass('full')
    //   $c.append($m)
    // }
    // $c.append($i)

    // if (directionServiceResponse)
    this.initMap(data.user, data.rush)
    this.setCommute($i, data.user, data.origin, data.destination, data.waypoints, data.mode, data.rush)
  },

  initMap: function(user, rush) {
    if (!this.gmap && _.includes(rush, moment().hour())) {
      this.gmap = new google.maps.Map($('#' + user + '.map')[0], {
        zoom: 12,
        center: {lat: 43.7532, lng: -79.3932}
      })
      let trafficLayer = new google.maps.TrafficLayer()
      trafficLayer.setMap(this.gmap) // this layer does autoRefresh: true by default
      let transitLayer = new google.maps.TransitLayer()
      transitLayer.setMap(this.gmap)
    }
  },

  setCommute: function($i, user, origin, destination, waypoints, mode, rush) {
    start = origin
    end = destination
    travelMode = mode.toUpperCase()
    if (_.includes(rush, moment().hour())) {
      this.directionsService = new google.maps.DirectionsService
      if (!this.directionsDisplay) {
        this.directionsDisplay = new google.maps.DirectionsRenderer
        this.directionsDisplay.setMap(this.gmap)
      }
      // $('#' + user + '.map').removeClass('full')
      this.calculateAndDisplayRoute($i, start, end, waypoints, travelMode)
    }
    else {
      // $('#' + user + '.map').addClass('full')
      $('#' + user + '.map').empty()
      this.gmap = null
    }
  },

  calculateAndDisplayRoute: function($i, start, end, waypoints, mode) {
    this.directionsService.route({
      origin: start,
      destination: end,
      waypoints: waypoints,
      optimizeWaypoints: true,
      travelMode: mode
    }, function(response, status) {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response)
        let departure_time, arrival_time, duration, distance
        if (mode === "TRANSIT") {
          departure_time = moment(response.routes[0].legs[0].departure_time.value)
          arrival_time = moment(response.routes[0].legs[response.routes[0].legs.length-1].arrival_time.value)
        }
        duration = _.reduce(response.routes[0].legs, function(sum, l) { return sum + l.duration.value }, 0) //seconds
        distance = _.reduce(response.routes[0].legs, function(span, l) { return span + (l.distance.value/1000)}, 0).toFixed(1)
        this.updateInfo($i, departure_time, arrival_time, duration, distance)
      } else {
        console.error('Directions request failed due to ' + status)
      }
    }.bind(this));
  },

  updateInfo: function($i, departure_time, arrival_time, duration, distance) {
    let departDiv, arriveDiv, arriveAt = moment().add(duration, "seconds")
    console.log(arriveAt)
    if (departure_time) {
      departDiv = '<div class="info-card"><div class="info-metric">' +
        departure_time.format('LT') + '</div><div class="info-title">DEPART</div></div>'
    }
    else
    {
      departDiv = '<div class="info-card"><div class="info-metric">' +
        moment().format('LT') + '</div><div class="info-title">DEPART</div></div>'
    }
    $i.append(departDiv)
    if (arrival_time) {
      arriveDiv = '<div class="info-card"><div class="info-metric">' +
        arrival_time.format('LT') +
        '</div><div class="info-title">ARRIVE</div></div>'
    }
    else
    {
      arriveDiv = '<div class="info-card"><div class="info-metric">' +
        arriveAt.format('LT') +
        '</div><div class="info-title">ARRIVE</div></div>'
    }
    $i.append(arriveDiv)
    let distanceDiv = '<div class="info-card"><div class="info-metric">' +
      distance + ' km</div><div class="info-title">DISTANCE</div></div>'
    $i.append(distanceDiv)

    let durationText = ""
    if (duration >= 86400) { // seconds convert to days
      // durationText += Math.floor(duration/86400) + "D "
      // duration -= 86400
      durationText += ">1 Day"
    }
    else {
      if (duration >= 3600) {// seconds convert to hours
        durationText += Math.floor(duration/3600)
        duration -= 3600
      }
      else
        durationText += "0"

      // seconds convert to minutes
      if (duration >= 60) {
        let minutes = Math.ceil(duration/60)
        if (minutes >= 10)
          durationText += ":" + minutes
        else
          durationText += ":0" + minutes
      }
      else
        durationText += ":00"
    }

    let durationDiv = '<div class="info-card"><div class="info-metric">' +
      durationText + '</div><div class="info-title">DURATION</div></div>'
    $i.append(durationDiv)
  }
};
