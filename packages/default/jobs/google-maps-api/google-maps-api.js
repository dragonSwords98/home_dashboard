/**
 * Job: google-maps-api
 *
 * Expected configuration:
 *
 * ## PLEASE ADD AN EXAMPLE CONFIGURATION FOR YOUR JOB HERE
 * {
 *   myconfigKey : [
 *     { serverUrl : 'localhost' }
 *   ]
 * }
 */
'use strict'
const googleMapsClient = require('@google/maps').createClient({
  key: "AIzaSyDt-tXs2RTJstBwkEy_5AN0UnncGQ6FYIg"
});
const moment = require('moment')
const _ = require('lodash')

module.exports = {

  /**
   * Executed on job initialisation (only once)
   * @param config
   * @param dependencies
   */
  onInit: function (config, dependencies) {
    this.cachedGoogleObj = {

    }
  },

  /**
   * Executed every interval
   * @param config
   * @param dependencies
   * @param jobCallback
   */
  onRun: function (config, dependencies, jobCallback) {

    var logger = dependencies.logger;

    // TODO: Put map api calls here somehow...
    jobCallback("", {title: config.widgetTitle, user: config.user, origin: config.morningDepart, destination: config.morningArrive, waypoints: config.waypoints, mode: config.travelMode, rush: config.rushHours });

    // if (_.includes(config.rushHours, moment().hour())) {
    //   let w = config.waypoints ? _.reduce(config.waypoints, function(pipedArray, o) { return pipedArray + o.location + "|" }, "").slice(0, -1) : null
    //   googleMapsClient.directions({
    //     origin: config.morningDepart,
    //     destination: config.morningArrive,
    //     waypoints: w,
    //     optimize: true,
    //     mode: config.travelMode.toLowerCase(),
    //     avoid: config.avoid || "tolls"
    //   }, function(err, response) {
    //     if (!err) {
    //       logger.trace(response);
    //       jobCallback("", {title: config.widgetTitle, response: response, key: config.widgetKey, user: config.user, origin: config.morningDepart, destination: config.morningArrive, waypoints: config.waypoints, mode: config.travelMode});
    //     }
    //     else
    //       logger.trace(err)
    //   });
    // }
    // else {
    //   jobCallback("", {title: config.widgetTitle, response: null, key: config.widgetKey, user: config.user, origin: config.morningDepart, destination: config.morningArrive, waypoints: config.waypoints, mode: config.travelMode});
    // }
  }
};
