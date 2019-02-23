 // create connection
 var socket = io();
 socket.on('connect', () => {
     console.log('Connected to server');

    // after connect send an event back to server
     socket.emit('createMessage', {
        from: 'Jen@example.com',
        text: 'Hey. This is khanh tin'
    });

    socket.on('newMessage', function(newMessage) {
        console.log("new message", newMessage); 
    });
 });


 

 socket.on('disconnect', () => {
     console.log('Disconnect to server');
 });

 