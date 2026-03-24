class Login {
  constructor() {
    this.form     = document.getElementById("loginForm");
    this.usuario  = document.getElementById("usuario");
    this.password = document.getElementById("password");
    this.mensaje  = document.getElementById("mensaje");

    this.form.addEventListener("submit", (e) => this.iniciarSesion(e));
  }

  mostrarMensaje(texto, ok = false) {
    this.mensaje.textContent = texto;
    this.mensaje.className = "lg-mensaje" + (ok ? " ok" : "");
  }

  validarCampos() {
    if (!this.usuario.value.trim() || !this.password.value.trim()) {
      this.mostrarMensaje("Completa todos los campos");
      return false;
    }
    return true;
  }

  validarUsuario(valor) {
    const esCorreo   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor);
    const esTelefono = /^[0-9]{10}$/.test(valor);
    return esCorreo || esTelefono;
  }

  iniciarSesion(e) {
    e.preventDefault();
    if (!this.validarCampos()) return;

    const valor = this.usuario.value.trim();
    if (!this.validarUsuario(valor)) {
      this.mostrarMensaje("Ingresa un correo válido o un número de 10 dígitos");
      return;
    }

    this.mostrarMensaje("¡Bienvenido! Redirigiendo...", true);
    setTimeout(() => { window.location.href = "cliente.html"; }, 1000);
  }
}

document.addEventListener("DOMContentLoaded", () => new Login());