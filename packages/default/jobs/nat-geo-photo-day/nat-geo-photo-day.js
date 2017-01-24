/**
 * Job: nat-geo-photo-day
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

var moment = require('moment');


module.exports = {

  /**
   * Executed on job initialisation (only once)
   * @param config
   * @param dependencies
   */
  onInit: function (config, dependencies) {

    /*
    This is a good place for initialisation logic, like registering routes in express:

    dependencies.logger.info('adding routes...');
    dependencies.app.route("/jobs/mycustomroute")
        .get(function (req, res) {
          res.end('So something useful here');
        });
    */
  },

  /**
   * Executed every interval
   * @param config
   * @param dependencies
   * @param jobCallback
   */
  onRun: function (config, dependencies, jobCallback) {
    
    /*
     1. USE OF JOB DEPENDENCIES

     You can use a few handy dependencies in your job:

     - dependencies.easyRequest : a wrapper on top of the "request" module
     - dependencies.request : the popular http request module itself
     - dependencies.logger : atlasboard logger interface

     Check them all out: https://bitbucket.org/atlassian/atlasboard/raw/master/lib/job-dependencies/?at=master

     */

    var logger = dependencies.logger;

    /*

     2. CONFIGURATION CHECK

     You probably want to check that the right configuration has been passed to the job.
     It is a good idea to cover this with unit tests as well (see test/nat-geo-photo-day file)

     Checking for the right configuration could be something like this:

     if (!config.myrequiredConfig) {
     return jobCallback('missing configuration properties!');
     }


     3. SENDING DATA BACK TO THE WIDGET

     You can send data back to the widget anytime (ex: if you are hooked into a real-time data stream and
     don't want to depend on the jobCallback triggered by the scheduler to push data to widgets)

     jobWorker.pushUpdate({data: { title: config.widgetTitle, html: 'loading...' }}); // on Atlasboard > 1.0


     4. USE OF JOB_CALLBACK

     Using nodejs callback standard conventions, you should return an error or null (if success)
     as the first parameter, and the widget's data as the second parameter.

     This is an example of how to make an HTTP call to google using the easyRequest dependency,
     and send the result to the registered widgets.
     Have a look at test/nat-geo-photo-day for an example of how to unit tests this easily by mocking easyRequest calls

     */
    // console.log('natGeoPromise');
    // var findLinkPromise = new Promise(function(resolve, reject){
    //     var reactLink = dependencies.easyRequest.HTML(config.url, function (err, body) {
    //       // logger.trace(html);
    //       var $ = cheerio.load(body);
    //       console.log(typeof($('meta[property="og:url"]')[0].attribs.content));
    //       if ($('meta[property="og:url"]')[0].attribs.content) {
    //         resolve($('meta[property="og:url"]')[0].attribs.content);
    //         console.log('resolved');
    //       }
    //       else {
    //         reject(err);
    //       }
    //     });
    // });
    // var findPhotoPromise = function(url){new Promise(function(resolve, reject){
    //   var photoDayPage = dependencies.easyRequest.HTML(url, function (err, body) {
    //     // logger.trace(html);
    //     var $ = cheerio.load(body);
    //     console.log(body);
    //     // console.log(typeof($('meta[property="og:url"]')[0].attribs.content));
    //     console.log($('picture'));
    //     if ($('picture')) {
    //       resolve($('picture'));
    //       console.log('picture resolved'); // TODO: learned that picture is not rendered yet because Nat Geo uses React, need CasperJS to 'pretend'
    //     }
    //     else {
    //       reject(err);
    //     }
    //   });
    // }).then(function(result){
    //   return result;
    // }, function(error){
    //   return "Error web scraping photo";
    // })};
    // console.log('promise is late');
    // // jobCallback("something", {title: config.widgetTitle, result: "promise is late"});
    //
    // findLinkPromise.then(function(result){
    //   console.log('result' + result);
    //   jobCallback("", {title: config.widgetTitle, result: findPhotoPromise(result)});
    //
    // }, function(error) {
    //   console.log('error' + error);
    //   jobCallback(error, {title: config.widgetTitle, result: "No Photo Today. :("});
    // });
    jobCallback("", {imageDir: "images/potd/" + moment().format("MMM-D-YYYY") + "-potd.png" });

  },
};
