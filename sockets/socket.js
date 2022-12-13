//Mensajes de sockets

const {io} = require ('../index')

io.on('connection', client => {
    console.log('CLIENTE CONECTADO');

    client.on('disconnect', () => { 
        console.log('CLIENTE DESCONECTADO');
    });


    client.on('mensaje',(payload)=>{
        console.log('mensaje',payload);

        io.emit('mensaje',{admin: 'Nuevo mensaje'});
    })

    
  });