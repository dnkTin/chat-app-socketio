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
        console.log('New message from io: ', newMessage);
        var li = jQuery('<li></li>');
        li.text(`${newMessage.from}: ${newMessage.text}`);

        jQuery('#messages').append(li);
    });


    jQuery('#message-form').on('submit', function(e) {
        e.preventDefault();  // block any event
        // add an event to this
        socket.emit('createMessage', {
            from: 'User',
            text: jQuery('[name=message]').val(),
        }, function() {
    
        });
     });
 });


 

 socket.on('disconnect', () => {
     console.log('Disconnect to server');
 });

 