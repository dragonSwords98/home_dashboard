widget = {

  //runs when we receive data from the job
  onData: function (el, data) {

    function update() {
      $('#clock').html(moment().format('MMM D HH:mm:ss').toUpperCase());
    }
    //The parameters our job passed through are in the data object
    //el is our widget element, so our actions should all be relative to that
    if (data.title) {
      $('h2', el).text(data.title);
    }
    // console.log(el, data);

    var $clock = $('#clock', el);
    $clock.html(moment(data.time).format('MMM D HH:mm:ss').toUpperCase());

    setInterval(update, 1000);
  }
};
