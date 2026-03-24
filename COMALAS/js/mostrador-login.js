function mlTogglePass() {
  const input = document.getElementById("passwordMostrador")
  const btn   = document.querySelector(".ml-eye")
  if (input.type === "password") {
    input.type = "text"
    btn.style.opacity = "0.9"
  } else {
    input.type = "password"
    btn.style.opacity = "0.35"
  }
}

class MostradorLogin {
  constructor() {
    this.form     = document.getElementById("mostradorLoginForm")
    this.usuario  = document.getElementById("usuarioMostrador")
    this.password = document.getElementById("passwordMostrador")
    this.mensaje  = document.getElementById("mensajeMostrador")

    this.form.addEventListener("submit", (e) => this.iniciarSesion(e))
  }

  mostrarMensaje(texto, ok = false) {
    this.mensaje.textContent = texto
    this.mensaje.className = "ml-mensaje" + (ok ? " ok" : "")
  }

  validarCampos() {
    if (!this.usuario.value.trim() || !this.password.value.trim()) {
      this.mostrarMensaje("Completa todos los campos")
      return false
    }
    return true
  }

  iniciarSesion(e) {
    e.preventDefault()
    if (!this.validarCampos()) return

    const u = this.usuario.value.trim()
    const p = this.password.value.trim()

    // Verificar contra admins registrados en localStorage
    const admins = JSON.parse(localStorage.getItem("adminsPizzaGo") || "[]")
    const encontrado = admins.find(a =>
      (a.correo === u || a.empleadoId === u) && a.password === p
    )

    // También verificar credencial por defecto
    const esPorDefecto = (u === "mostrador@pizzago.com" && p === "12345")

    if (encontrado || esPorDefecto) {
      this.mostrarMensaje("Acceso correcto. Entrando al panel...", true)
      localStorage.setItem("sesionMostrador", "activa")
      if (encontrado) localStorage.setItem("adminActual", JSON.stringify(encontrado))
      setTimeout(() => { window.location.href = "mostrador.html" }, 900)
      return
    }

    this.mostrarMensaje("Usuario o contraseña incorrectos")
  }
}

document.addEventListener("DOMContentLoaded", () => new MostradorLogin())