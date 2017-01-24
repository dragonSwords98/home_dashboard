widget = {
  //runs when we receive data from the job
  onData: function (el, data) {
    // console.log(el, data);

    if (!data) {
      data.quote = "Exceeded API Data Limit"
      data.author = "QOTD"
    }

    var $content = $('.content', el);
    $content.empty();

    //The parameters our job passed through are in the data object
    //el is our widget element, so our actions should all be relative to that
    if (data.author) {
      $('h2', el).text(data.author);
    }

    size = 1

    if (data.quote.length <= 50) {
      size = 2.2
    }
    else if (data.quote.length <= 70 && data.quote.length > 50) {
      size = 2
    }
    else if (data.quote.length <= 140 && data.quote.length > 70) {
      size = 1.3
    }
    else if (data.quote.length <= 350 && data.quote.length > 140) {
      size = 1
    }
    else if (data.quote.length <= 500 && data.quote.length > 350) {
      size = 0.87
    }
    else if (data.quote.length > 500) {
      size = 0.5
    }

    $content.css("font-size", size.toString() + "em")

    $content.html("\"" + data.quote + "\"");
  }
};
