//comando para establece la conexión
var socket = io();


var searchParams = new URLSearchParams(window.location.search);

console.log(searchParams.has('escritorio'));

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}
let escritorio = searchParams.get('escritorio');
let label = $('small');

$('h1').text('Escritorio' + escritorio);


$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {
        if (resp === 'No hay tickets') {
            alert(resp);
            label.text(resp);
            return;
        }
        label.text(resp.numero);
    });
});