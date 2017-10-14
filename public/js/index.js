var socket = io();
socket.on('connect', function () {
    console.log('connected to server');
}); 

socket.on('disconnect', function () {
    console.log('disconnected from server!!');
})

socket.on('newMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('hh:m a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from:  message.from,
        createdAt: formattedTime
    });
    jQuery('#messages').append(html);
})

socket.on('newLocationMessage', function(message) {
    var formattedTime = moment(message.createdAt).format('hh:m a');

    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        createdAt: formattedTime,
        url: message.url
    })

    jQuery('#messages').append(html);
})


jQuery('#message-form').on('submit', function(e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');
    socket.emit('createMessage', {
        from: "User",
        text: messageTextbox.val() 
    }, function(res) {
        messageTextbox.val('');
    })
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
    if (!navigator.geolocation) {
        alert('geolocation not supported by your browser!');   
    }

    locationButton.attr('disabled','disabled').text('Sending...');

    navigator.geolocation.getCurrentPosition(function(position) {
        locationButton.removeAttr('disabled').text('Send Location');
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    },function(){
        locationButton.removeAttr('disabled').text('Send Location');
        alert('unable to fetch location!');
    });
})