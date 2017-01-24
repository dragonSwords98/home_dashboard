/**
 * Job: speedtest-net
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

const moment = require('moment')
const _ = require('lodash')

module.exports = {

  /**
   * Executed on job initialisation (only once)
   * @param config
   * @param dependencies
   */
  onInit: function (config, dependencies) {
    this.timelineData = []
  },

  /**
   * Executed every interval
   * @param config
   * @param dependencies
   * @param jobCallback
   */
  onRun: function (config, dependencies, jobCallback) {

    // do not retain old entries
    config.storeLimit = config.storeLimit ? config.storeLimit : 20
    let expiryDate = new moment().subtract(config.days, 'days')
    this.timelineData = _.filter(this.timelineData, function(o) { return o.datetime.isSameOrAfter(expiryDate) }) // expire old entries
    this.timelineData = _.drop(this.timelineData, this.timelineData.length > config.storeLimit ? this.timelineData.length - config.storeLimit : 0) // stay under the limit

    var logger = dependencies.logger
    const speedTest = require('speedtest-net')
    const test = speedTest({maxTime: 5000})

    test.on('data', data => {
      let d = new moment()
      data.datetime = d
      this.timelineData.push(data)
      jobCallback(null, {title: config.widgetTitle, data: _.take(this.timelineData, config.widgetLimit), error: null})
    }).on('error', err => {
      console.error(err)
      jobCallback(err, {title: config.widgetTitle, data: null, error: err})
    })
  }
}
