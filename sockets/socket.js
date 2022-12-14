//Mensajes de sockets
const Bands=require('../models/bands');
const BandModel=require('../models/band_model');

const bands = new Bands();

bands.addBand( new BandModel( 'queen'));
bands.addBand( new BandModel( 'bon jovi'));
bands.addBand( new BandModel( 'mana'));
bands.addBand( new BandModel( 'aventura'));


//io es el servidor

//client es el usuario o cliente

console.log(bands);

const {io} = require ('../index')

io.on('connection', client => {

    client.emit('bandas activas', bands.getBands());


    console.log('CLIENTE CONECTADO');

    client.on('disconnect', () => { 
        console.log('CLIENTE DESCONECTADO');
    });


    client.on('mensaje',(payload)=>{
        console.log('mensaje',payload);

        io.emit('mensaje',{admin: 'Nuevo mensaje'});
    });


    client.on('vote-band',(payload)=>{
        bands.voteBand(payload.id);
        io.emit('bandas activas', bands.getBands());
    });

    client.on('add-band',(payload)=>{
        const newBand= new BandModel(payload.name);

        bands.addBand(newBand);
        io.emit('bandas activas', bands.getBands());
    });

    
    client.on('delete-band',(payload)=>{
        bands.deleteBands(payload.id);
        io.emit('bandas activas', bands.getBands());
    });



    // client.on('emitir mensaje', (payload)=>{
    //     // io.emit('emitir', payload);  -> emite a todos los clientes conectados
    //     client.broadcast.emit('emitir mensaje', payload); //-> emite a todos los clientes excepto el que lo esta emitiendo
    // });
    
  });