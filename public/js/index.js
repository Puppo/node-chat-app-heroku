var socket = io();

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  const li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  $('#messages').append(li);
});

socket.on('newLocationMessage', function(message) {
  const a = $('<a></a>')
            .text('My current location')
            .attr('target', '_blank')
            .attr('href', message.url);
  const li = $('<li></li>')
            .text(`${message.from}: `)
            .append(a);

  $('#messages').append(li);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();

  const txtMessage =  $('[name=message]');

  socket.emit('createMessage', {
    from: 'User',
    text: txtMessage.val()
  }, function() {
    txtMessage.val(null);
  });
});

const btnLocation = $('#send-location');
btnLocation.on('click', function(e) {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  let bestPosition, geolocationWatchID;

  const fetchLocation = function(position) {
    if (!bestPosition || bestPosition.coords.accuracy > position.coords.accuracy) {
      bestPosition = position;
    }

    // wifi problem get accuracy geolocation
    if (bestPosition.coords.accuracy <= 40000) {
      navigator.geolocation.clearWatch(geolocationWatchID);
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
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
    alert('Unable to fetch location.');
  });
});
