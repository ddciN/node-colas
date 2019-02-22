const socket = io();

const lblTicket1 = $('#lblTicket1');
const lblTicket2 = $('#lblTicket2');
const lblTicket3 = $('#lblTicket3');
const lblTicket4 = $('#lblTicket4');

const lblEscritorio1 = $('#lblEscritorio1');
const lblEscritorio2 = $('#lblEscritorio2');
const lblEscritorio4 = $('#lblEscritorio4');
const lblEscritorio3 = $('#lblEscritorio3');

const tickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];
const escritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

socket.on('estadoActual', function(data) {
    if (data && data.ultimos4) {
        const ultimos4 = data.ultimos4;
        actulizarHtml(ultimos4);
    }
});

socket.on('ultimos4', (datos) => {
    if (datos) actulizarHtml(datos);
});


const actulizarHtml = (ultimos4) => {
    ultimos4.forEach((data, i) => {
        tickets[i].text(`Ticket ${data.numero}`);
        escritorios[i].text(`Escritorio ${data.escritorio}`);
    });
};