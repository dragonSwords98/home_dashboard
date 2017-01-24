widget = {

  onData: function (el, data) {
    if (data.title) {
      $('h2', el).text(data.title);
    }
    // console.log(el, data);

    var $content = $('.content', el);
    $content.empty();

    if (!data.events || !data.events.length) {
      $content.append($("<div>").html("No events found."));
    } else {
      this.log(data.events.length + ' calendar events found!');

      var currentDate = moment(0).format('ll');

      data.events.forEach(function (event) {
        if (currentDate != event.startDate && currentDate != event.startDate + " - " + event.endDate) {
          dateDiv = $("<div/>").addClass('leave-date');
          if (event.startDate === event.endDate)
            currentDate = event.startDate;
          else
            currentDate = event.startDate + " - " + event.endDate;
          dateDiv.append(currentDate);
          $content.append(dateDiv);
        }
        var eventDiv = $("<div/>").addClass('leave-event');
        $(eventDiv).append($("<div/>").addClass('leave-dates').append(event.startTime + " - " + event.endTime));
        $(eventDiv).append($("<div/>").addClass('leave-summary').append(event.summary));

        $content.append(eventDiv);
      });
    }
  }
};
