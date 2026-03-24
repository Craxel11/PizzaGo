function mrTogglePass() {
  const input = document.getElementById("mrPassword")
  const btn   = document.querySelector(".mr-eye")
  if (input.type === "password") {
    input.type = "text"
    btn.style.opacity = "0.9"
  } else {
    input.type = "password"
    btn.style.opacity = "0.35"
  }
}

class MostradorRegistro {
  constructor() {
    this.form     = document.getElementById("mostradorRegistroForm")
    this.nombre   = document.getElementById("mrNombre")
    this.empId    = document.getElementById("mrEmpleadoId")
    this.correo   = document.getElementById("mrCorreo")
    this.rol      = document.getElementById("mrRol")
    this.password = document.getElementById("mrPassword")
    this.mensaje  = document.getElementById("mrMensaje")

    this.form.addEventListener("submit", (e) => this.registrar(e))
  }

  mostrarMensaje(texto, ok = false) {
    this.mensaje.textContent = texto
    this.mensaje.className = "mr-mensaje" + (ok ? " ok" : "")
  }

  validar() {
    const { nombre, empId, correo, rol, password } = this

    if (!nombre.value.trim() || !empId.value.trim() ||
        !correo.value.trim() || !password.value.trim()) {
      this.mostrarMensaje("Completa todos los campos")
      return false
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo.value.trim())) {
      this.mostrarMensaje("Ingresa un correo válido")
      return false
    }

    if (password.value.trim().length < 6) {
      this.mostrarMensaje("La contraseña debe tener al menos 6 caracteres")
      return false
    }

    return true
  }

  registrar(e) {
    e.preventDefault()
    if (!this.validar()) return

    // Guardar admin en localStorage
    const admins = JSON.parse(localStorage.getItem("adminsPizzaGo") || "[]")
    admins.push({
      nombre:     this.nombre.value.trim(),
      empleadoId: this.empId.value.trim(),
      correo:     this.correo.value.trim(),
      rol:        "Administrador",
      password:   this.password.value.trim(),
      fecha:      new Date().toLocaleString()
    })
    localStorage.setItem("adminsPizzaGo", JSON.stringify(admins))
    localStorage.setItem("sesionMostrador", "activa")

    this.mostrarMensaje("Administrador registrado. Entrando al panel...", true)
    setTimeout(() => { window.location.href = "mostrador.html" }, 1100)
  }
}

document.addEventListener("DOMContentLoaded", () => new MostradorRegistro())