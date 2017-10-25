var socket = io();

function scrollToBottom() {
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');

  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage', function(message) {
  var formattedTime = moment(message.createAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createAt: formattedTime
  });
  $('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    url: message.url,
    imageUrl: message.imageUrl,
    from: message.from,
    createAt: formattedTime
  });
  $('#messages').append(html);
  scrollToBottom();
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
