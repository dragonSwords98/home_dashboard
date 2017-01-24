widget = {
  //runs when we receive data from the job
  onData: function (el, data) {
    // console.log("daily-photo");
    // console.log(el, data);
    // console.log(data.imageDir);

    // console.log(data.json);
    var unsplash = data.json;

    //The parameters our job passed through are in the data object
    //el is our widget element, so our actions should all be relative to that
    if (unsplash.user && unsplash.links) {
      $('h2', el).html("<a href='" + unsplash.links.html + "'>" + unsplash.user.name + "</a>/<a href='https://unsplash.com'>Unsplash</a>");
    }
    $('.content', el).html("<img src='" + unsplash.urls.regular + "'></img>");
    // $('.content', el).html("<img src='" + data.imageDir + "'></img>");
  }
};
