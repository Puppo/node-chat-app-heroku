var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createAt).format('h:mm a');
  var li = $('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);

  $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createAt).format('h:mm a');
  var a = $('<a></a>')
            .text('My current location')
            .attr('target', '_blank')
            .attr('href', message.url);
  var li = $('<li></li>')
            .text(`${message.from} ${formattedTime}: `)
            .append(a);

  $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();

  var txtMessage =  $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: txtMessage.val()
  }, function() {
    txtMessage.val(null);
  });
});

var btnLocation = $('#send-location');
btnLocation.on('click', function(e) {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  btnLocation.attr('disabled', 'disabled').text('Sending location');
  let bestPosition, geolocationWatchID;

  var fetchLocation = function(position) {
    if (!bestPosition || bestPosition.coords.accuracy > position.coords.accuracy) {
      bestPosition = position;
    }

    // wifi problem get accuracy geolocation
    if (bestPosition.coords.accuracy <= 40000) {
      navigator.geolocation.clearWatch(geolocationWatchID);
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }, function() {
        btnLocation.removeAttr('disabled').text('Send location');
      });
    }
  };

  navigator.geolocation.getCurrentPosition(function(position) {
    bestPosition = position;
    var geo_options = {
      enableHighAccuracy: true, 
      maximumAge        : 30000, 
      timeout           : 27000
    };
    geolocationWatchID = navigator.geolocation.watchPosition(fetchLocation, null, geo_options);
  }, function(e) {
    btnLocation.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location.');
  });
});
