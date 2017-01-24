widget = {
  //runs when we receive data from the job
  onData: function (el, data) {

    //The parameters our job passed through are in the data object
    //el is our widget element, so our actions should all be relative to that
    if (data.title) {
      $('h2', el).text(data.title);
    }

    for (var i = 0; i < data.entries.length; i++) {
      console.log(data.entries[i].title);
    }
    var $ul = $('ul', el);
    $ul.empty();
    $.each(data.entries, function(index, value) {
      $ul.append("<li>" + value.title + ": " + value.summary + "</li>");
    });
  }
};

// 0 Warnings
// 1 Current Conditions
// 2 tonight OR morning of same day
// 3 - 14: AM : PM, etc.

var weatherReportParser = function(entries) {
  let reportHTML = "";
  if (entries.length === 14)
    $('.alert').append(entries[0].title));
    $('.current>h3').append(entries[1].title);
    $('.current>span').append(entries[1].summary);
};


var addWeatherCard = function(index, entry) {
  var id = "card-" + index;
  $cardClone = $('.card').clone().attr("id", id);
  $("#" + id + " .card-title", $cardClone).html(entry.title);
  $("#" + id + " .card-action", $cardClone).html(entry.summary);
  $('.report').append("<div class='col m3'>" + $cardClone + "</div>");
};
