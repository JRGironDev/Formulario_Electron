let usuario = document.getElementById("usuario");

window.comunicacion.bienvenidoUsuario(
  "bienvenido-usuario",
  function (event, args) {
    console.log(args);
    usuario.textContent = args;
  }
);
