const socket = io();

function Mensaje() {
  const room = document.getElementById('room').value;
  const Id = document.getElementById('Id').value;
  const latitud = document.getElementById('latitud').value;
  const longitud = document.getElementById('longitud').value;

  const data = {
    room: room,
    id: Id,
    latitud: latitud,
    longitud: longitud
  };

  socket.emit('mensaje', data);
}

socket.on('mensaje', (data) => {
  console.log('Mensaje recibido:', data);

});

