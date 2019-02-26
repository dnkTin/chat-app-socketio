 // create connection
 var socket = io();
 socket.on('connect', () => {
     console.log('Connected to server');

    // after connect send an event back to server
    //  socket.emit('createMessage', {
    //     from: 'Jen@example.com',
    //     text: 'Hey. This is khanh tin'
    // }, function() {
    //     console.log('Got it');
    // });
    socket.on('newMessage', (newMessage) => {
        var formattedTime = moment(newMessage.createdAt).format('h:mm a');
        console.log('New message from io: ', newMessage);
        var li = jQuery('<li></li>');
        li.text(`${newMessage.from} ${formattedTime}: ${newMessage.text}`);

        jQuery('#messages').append(li);
    });

    socket.on('newLocationMessage', (message) => {
        var formattedTime = moment(message.createdAt).format('h:mm a');
        console.log('hihihi')
        var li = jQuery('<li></li>');
        var a = jQuery('<a target="_brank">My current location</a>')
        li.text(`${message.from} ${formattedTime}: `);
        a.attr('href', message.url);
        li.append(a);
        jQuery('#messages').append(li);
    });


    var messageTextBox = jQuery('[name=message]');
    jQuery('#message-form').on('submit', function(e) {
        e.preventDefault();  // block any event
        // add an event to this
        socket.emit('createMessage', {
            from: 'User',
            text: messageTextBox.val(),
        }, function() {
            messageTextBox.val('');
        });
     });
 });

var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supportted by your browser');
    }

    locationButton.attr('disabled', 'disabled').text('Sending location ...');
    navigator.geolocation.getCurrentPosition(function(position) {
        console.log(position);
        socket.emit('createLocation', {
            latitude: position.coords.latitude,
            longtitude: position.coords.longitude
        });
        locationButton.removeAttr('disabled').text('Send location');
    }, function() {
        return alert('Geolocation is not supportted by your browser');
    });
})
 

 socket.on('disconnect', () => {
     console.log('Disconnect to server');
 });

 