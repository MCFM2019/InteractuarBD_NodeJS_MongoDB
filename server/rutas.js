const Router=require('express').Router();

Router.post('/login',function(req,res){
  res.send('Validado')
  // Users.find({}).exec(function(err,docs){
  //   if(err){
  //     res.status(500)
  //     res.json(err)
  //   }
  //   res.json(docs)
  //   res.send('Validado')
  // })
})

module.exports=Router;
