const http=require('http');
const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const Routing=require('./rutas.js');

const PORT=3000;
const app=express();
const Server=http.createServer(app);

mongoose.connect('mongodb://localhost/agenda')
.then(db => console.log('BD conectada'))
.catch(err => console.log(err))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('client'));
app.use('/',Routing);

Server.listen(PORT,()=>{
  console.log('Servidor escuchando en puerto: '+PORT);
})
