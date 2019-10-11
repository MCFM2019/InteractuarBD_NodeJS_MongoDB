CrearUsuarioInicial(); //Funcion para verificar si existe el usuario demo

function CrearUsuarioInicial() {
  $.ajax({
    url: '/demo',
    method: 'GET',
    data: {user:'mc'},
    success: function(response) {
      alert(response);
    },
    error: function(){
      alert(response);
    }
  })
}
