document.addEventListener("DOMContentLoaded", function () {
  var formulario = document.getElementById("form-login");

  const formularioUsuario = {
    nombre: "",
    usuario: "",
    correo: "",
    fechaNacimiento: "",
    pais: "",
    password: "",
  };

  // Elementos de la interfaz del formulario
  var nombreInput = document.getElementById("nombre");
  var usuarioInput = document.getElementById("usuario");
  var emailInput = document.getElementById("correo");
  var fechaNacimientoInput = document.getElementById("fecha de nacimiento");
  var paisInput = document.getElementById("pais");
  var passwordInput = document.getElementById("password");
  var btnSubmit = document.querySelector("input[type=submit]");
  var avatarNombre = document.querySelector(".avatar-nombre");

  // Eventos asignados
  nombreInput.addEventListener("input", validarFormulario);
  nombreInput.addEventListener("input", mostrarNombreAvatar);
  usuarioInput.addEventListener("input", validarFormulario);
  emailInput.addEventListener("input", validarFormulario);
  fechaNacimientoInput.addEventListener("input", validarFormulario);
  paisInput.addEventListener("input", validarFormulario);
  passwordInput.addEventListener("input", validarFormulario);

  // Validación del formulario
  function validarFormulario(evento) {
    if (evento.target.value.trim() === "") {
      mostrarAlerta(
        `El campo ${evento.target.id} es obligatorio`,
        evento.target.parentElement
      );
      formularioUsuario[evento.target.name] = "";
      comprobarFormularioUsuario();
      return;
    }

    if (
      evento.target.id === "usuario" &&
      validarEspaciosUsuario(evento.target.value)
    ) {
      mostrarAlerta(
        `Tu usuario no puede tener espacios`,
        evento.target.parentElement
      );
      formularioUsuario[evento.target.name] = "";
      comprobarFormularioUsuario();
      return;
    }

    if (evento.target.id === "correo" && !validarCorreo(evento.target.value)) {
      mostrarAlerta(
        `El email no tiene el formato correcto`,
        evento.target.parentElement
      );
      formularioUsuario[evento.target.name] = "";
      comprobarFormularioUsuario();
      return;
    }

    if (
      evento.target.id === "fecha de nacimiento" &&
      !validarFormatoFecha(evento.target.value)
    ) {
      mostrarAlerta(
        `La fecha no tiene el formato correcto`,
        evento.target.parentElement
      );
      formularioUsuario[evento.target.name] = "";
      comprobarFormularioUsuario();
      return;
    }

    if (
      evento.target.id === "fecha de nacimiento" &&
      !validarFechaReal(evento.target.value)
    ) {
      mostrarAlerta(
        `La fecha de nacimiento no puede ser una fecha en el futuro`,
        evento.target.parentElement
      );
      formularioUsuario[evento.target.name] = "";
      comprobarFormularioUsuario();
      return;
    }

    limpiarAlerta(evento.target.parentElement);

    // Asignando valores
    formularioUsuario[evento.target.name] = evento.target.value
      .trim()
      .toLowerCase();

    comprobarFormularioUsuario();
  }

  function mostrarNombreAvatar() {
    avatarNombre.textContent = nombreInput.value;
  }

  function mostrarAlerta(mensaje, referencia) {
    limpiarAlerta(referencia);

    // Generar una alerta en HTML
    const error = document.createElement("P");
    error.textContent = mensaje;
    error.classList.add("error");
    referencia.appendChild(error);
  }

  // Limpiar alerta HTML
  function limpiarAlerta(referencia) {
    const alerta = referencia.querySelector(".error");
    if (alerta) {
      alerta.remove();
    }
  }

  function validarEspaciosUsuario(usuario) {
    const resultado = /\s/g.test(usuario);
    return resultado;
  }

  function validarFormatoFecha(fechaNacimiento) {
    const regexFecha =
      /^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$/;
    const resultado = regexFecha.test(fechaNacimiento);
    return resultado;
  }

  function validarFechaReal(fechaNacimiento) {
    const fechaInput = new Date(fechaNacimiento);
    const fechaHoy = new Date();
    const fechaValidada = fechaInput.getTime() <= fechaHoy.getTime();
    return fechaValidada;
  }

  function validarCorreo(email) {
    const regexEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    const resultado = regexEmail.test(email);
    return resultado;
  }

  function comprobarFormularioUsuario() {
    if (Object.values(formularioUsuario).includes("")) {
      btnSubmit.classList.add("opacidad");
      btnSubmit.disabled = true;
      return;
    }

    btnSubmit.classList.remove("opacidad");
    btnSubmit.disabled = false;
  }

  formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();
    window.comunicacion.inicioUsuario(usuarioInput.value);
  });
});
