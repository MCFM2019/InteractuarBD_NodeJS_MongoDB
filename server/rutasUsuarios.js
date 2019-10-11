const Router=require('express').Router();
const Usuarios=require('./modelUsuarios.js');

Router.get('/demo',function(req,res){
  // Si el usuario existe, se envia una alerta al cargar el proyecto, de lo contrario se crea y se envía un mensaje
  Usuarios.find({user: req.query.user}).count({},function(err,registrosDevueltos){
    if(registrosDevueltos>0){//El usuario ya existe en la BD
      res.send('Usuario existente: Usuario=mc, Contraseña=123');
    }
    else{//El usuario 'mc' con pw=123 no existe, se crea
      let user=new Usuarios({
        id:Math.floor(Math.random()*50),
        user:'mc',
        email:'maria@mail',
        password:'123'
      })
      user.save(function(error){
        if(error){
          res.status(500)
          res.json(error)
        }
        res.send('Usuario creado: Usuario=mc, Contraseña=123')
      })
    }
  })
})

Router.post('/login',function(req,res){
  // Se obtienen los datos enviados del formulario e iniciamos la sesion
  let user=req.body.user;
  let password=req.body.pass;
  let sesion=req.session;
  // Se verifica que el usuario ingresado exista, es decir usuario: mc, password:123
  Usuarios.find({user:user}).count({},function(err,registrosDevueltos){
    if(err){
      res.status(500)
      res.json(err)
    }
    else{
      if(registrosDevueltos>0){
        Usuarios.find({user: user, password: password }).count({}, function(err, registrosDevueltos) {
            if(err){
              res.status(500)
              res.json(err)
            }
            else{
              if(registrosDevueltos>0){
                sesion.user = user;
                res.send("Validado")
              }
              else{
                res.send('Contraseña inválida, pruebe con "123".')
              }
            }
        })
      }
      else{
        res.send('Usuario inválido, pruebe con "mc".')
      }
    }
  })
})

module.exports=Router;
