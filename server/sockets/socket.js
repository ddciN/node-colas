const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control')

const ticketControl = new TicketControl();

//con esto el backend es capaz de saber quién se está conectando. 
//Mediante el parámetro client podemos obtener toda la info de la máquina que se conecta al servidor.
io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        callback(siguiente);
    });


    client.emit('estadoActual', {
        actual: ticketControl.geUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    }, (callback) => {
        if (callback) console.log("NUEVO VALOR:", callback);
    });


    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: true,
                mensaje: 'El escritorio es obligatorio'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);


        callback(atenderTicket);


        //Actualizamos todos los navegadores con los últimos 4.
        const ultimos4 = ticketControl.getUltimos4();
        client.broadcast.emit('ultimos4', ultimos4);

    });

});