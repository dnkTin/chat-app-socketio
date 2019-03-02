 // create connection
 var socket = io();


function scrollToBottom() {
// selectors
var messages = jQuery('#messages');
var newMessage = messages.children('li:last-child');
// height
var clientHeight = messages.prop('clientHeight');
var scrollTop = messages.prop('scrollTop');
var scrollHeight = messages.prop('scrollHeight');
var newMessageHeight = newMessage.innerHeight();
var lastMessageHeight = newMessage.prev().innerHeight();
if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
}
}

 socket.on('connect', () => {
     console.log('Connected to server');
    var params = jQuery.deparam(window.location.search);
    socket.emit('join', params, function(err) {
        if (err) {
            alert(err);
            window.location.href = '/'
        } else {
            console.log('No error');
        }
    });
 });


 // after connect send an event back to server
    //  socket.emit('createMessage', {
    //     from: 'Jen@example.com',
    //     text: 'Hey. This is khanh tin'
    // }, function() {
    //     console.log('Got it');
    // });
    socket.on('newMessage', (newMessage) => {
        var template = jQuery('#message-template').html();
        var formattedTime = moment(newMessage.createdAt).format('h:mm a');
        var html = Mustache.render(template,{
            text: newMessage.text,
            from: newMessage.from,
            createdAt: formattedTime
        });

        jQuery('#messages').append(html);
        scrollToBottom();
        // console.log('New message from io: ', newMessage);
        // var li = jQuery('<li></li>');
        // li.text(`${newMessage.from} ${formattedTime}: ${newMessage.text}`);

        // jQuery('#messages').append(li);
    });

    socket.on('newLocationMessage', (message) => {
        var formattedTime = moment(message.createdAt).format('h:mm a');
        var template = jQuery('#location-message-template').html();
        var html = Mustache.render(template, {
            url: message.url,
            from: message.from,
            createdAt: formattedTime
        });
        jQuery('#messages').append(html);
        scrollToBottom();
        // console.log('hihihi')
        // var li = jQuery('<li></li>');
        // var a = jQuery('<a target="_brank">My current location</a>')
        // li.text(`${message.from} ${formattedTime}: `);
        // a.attr('href', message.url);
        // li.append(a);
        // jQuery('#messages').append(li);
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
 
socket.on('updateUserList', function(users) {
    var ol =  jQuery('<ol></ol>');
    users.forEach(function(user) {
        ol.append(jQuery('<li></li>').text(user));
    });
    jQuery('#users').html(ol);
    console.log('User list', users);
})
 socket.on('disconnect', () => {
     console.log('Disconnect to server');
 });



 