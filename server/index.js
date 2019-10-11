const http=require('http');
const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const MongoClient=require('mongodb');
const mongoose=require('mongoose');
const RoutingUsuarios=require('./rutasUsuarios.js');
const RoutingEventos=require('./rutasEventos.js');
const session = require('express-session');

const PORT=3000;
const app=express();
const Server=http.createServer(app);

mongoose.connect('mongodb://localhost/agenda')
.then(db => console.log('BD conectada'))
.catch(err => console.log(err))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(session({ //Iniciar modulo de manejo de sesiones
    secret: 'secret-pass',
    cookie: { maxAge: 3600000 },
    resave: false,
    saveUninitialized: true,
  }));

app.use(express.static('client'));
app.use('/',RoutingUsuarios);
app.use('/',RoutingEventos);

Server.listen(PORT,()=>{
  console.log('Servidor escuchando en puerto: '+PORT);
})
