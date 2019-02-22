//comando para establece la conexión
var socket = io();

var lblNuevoTicket = $('#lblNuevoTicket')

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('El servidor se ha desconectado');
});

socket.on('error', function(err) {
    console.log(err);
});


socket.on('estadoActual', function(data, callback) {
    if (data) lblNuevoTicket.text(data.actual);

    callback(lblNuevoTicket.text)

});

$('button').on('click', function() {
    console.log('Clicked!!');

    socket.emit('siguienteTicket', 1, function(siguienteTicket) {
        lblNuevoTicket.text(siguienteTicket);
    });

});