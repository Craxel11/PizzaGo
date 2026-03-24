function togglePass(id, btn) {
  const input = document.getElementById(id)
  if (input.type === 'password') {
    input.type = 'text'
    btn.style.opacity = '0.9'
  } else {
    input.type = 'password'
    btn.style.opacity = '0.4'
  }
}

class Registro {
  constructor() {
    this.form              = document.getElementById("registroForm")
    this.nombre            = document.getElementById("nombre")
    this.usuario           = document.getElementById("usuario")
    this.password          = document.getElementById("password")
    this.confirmarPassword = document.getElementById("confirmarPassword")
    this.mensaje           = document.getElementById("mensaje")

    this.form.addEventListener("submit", (e) => this.registrar(e))
  }

  mostrarMensaje(texto, ok = false) {
    this.mensaje.textContent = texto
    this.mensaje.className = "rg-mensaje" + (ok ? " ok" : "")
  }

  validarUsuario(valor) {
    const esCorreo   = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)
    const esTelefono = /^[0-9]{10}$/.test(valor)
    return esCorreo || esTelefono
  }

  validarFormulario() {
    const { nombre, usuario, password, confirmarPassword } = this

    if (!nombre.value.trim() || !usuario.value.trim() ||
        !password.value.trim() || !confirmarPassword.value.trim()) {
      this.mostrarMensaje("Completa todos los campos")
      return false
    }

    if (!this.validarUsuario(usuario.value.trim())) {
      this.mostrarMensaje("Ingresa un correo válido o un número de 10 dígitos")
      return false
    }

    if (password.value.trim().length < 6) {
      this.mostrarMensaje("La contraseña debe tener al menos 6 caracteres")
      return false
    }

    if (password.value !== confirmarPassword.value) {
      this.mostrarMensaje("Las contraseñas no coinciden")
      return false
    }

    return true
  }

  registrar(e) {
    e.preventDefault()
    if (!this.validarFormulario()) return

    localStorage.setItem("nombreCliente",     this.nombre.value.trim())
    localStorage.setItem("usuarioCliente",    this.usuario.value.trim())
    localStorage.setItem("passwordCliente",   this.password.value.trim())
    localStorage.setItem("clienteRegistrado", "true")

    this.mostrarMensaje("¡Cuenta creada! Entrando...", true)
    setTimeout(() => { window.location.href = "cliente.html" }, 1200)
  }
}

document.addEventListener("DOMContentLoaded", () => new Registro())