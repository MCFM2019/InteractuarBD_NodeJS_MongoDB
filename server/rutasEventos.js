const Router=require('express').Router();
const Eventos=require('./modelEventos.js');
const Usuarios=require('./modelUsuarios.js');
const ObjectId = require('mongoose').Types.ObjectId;

Router.get('/all', function(req, res) {
  req.session.reload(function(err) {
    if(req.session.user){
      if(err){
        res.send('Error al cargar la sesión');
      }else{
        Usuarios.findOne({user:req.session.user}).exec({}, function(error, doc){
          Eventos.find({user: doc._id}).exec(function(err, doc){
            if (err) {
              res.status(500)
              res.json(err)
            }
            res.json(doc)
          })
        })
      }
    }else{
      res.send('Error al cargar la sesión');
    }
  })
})

Router.post('/new', function(req, res) {
  req.session.reload(function(err) {
    if(err){
      res.json("Error al cargar la sesión.");
    }else{
      Usuarios.findOne({user:req.session.user}).exec({}, function(error, doc){
        Eventos.nextCount(function(err, count) { //Se obtiene el valor que será el nuevo Id del evento
          newID = count
        });

        let title = req.body.title,
        start = req.body.start,
        end   = req.body.end,
        // Usuario que inició la sesion
        userId  = doc._id

        let evento = new Eventos({
          title: title,
          start: start,
          end: end,
          user: userId
        })
        evento.save(function(error) {
          if (error) {
            res.status(500)
            res.json(error)
          }
          res.send('Evento N°='+newID+' creado')
        })
      })
    }
  })
})

Router.post('/delete/:_id', function(req, res) {
  let id = req.params._id
  req.session.reload(function(err) {
    Eventos.remove({_id: id}, function(error) {
      if(error) {
        console.log(error)
        res.status(500)
        res.json(error)
      }
      res.send("Evento eliminado")
    })
  })
})

Router.post('/update/:_id&:start&:end', function(req, res) {
  req.session.reload(function(err) {
    Eventos.findOne({_id:req.params._id}).exec((error, result) => {
      let id = req.params._id,
      start = req.params.start,
      end = req.params.end
      if (error){
        res.send(error)
      }else{
        Eventos.update({_id: id}, {start:start, end:end}, (error, result) => {
          if (error){
            res.send(error )
          }else{
            res.send("Evento actualizado")
          }
        })
      }
    })
  })
})

module.exports=Router;
