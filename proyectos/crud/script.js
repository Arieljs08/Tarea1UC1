var usuarios = [];
try {
  usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
} catch (e) {
  usuarios = [];
}

var editando = -1;

function guardarLista() {
  try {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  } catch (e) {}
}

function mostrar() {
  var html = "";
  for (var i = 0; i < usuarios.length; i++) {
    html += "<tr><td>" + usuarios[i].nombre + "</td><td>" + usuarios[i].correo + "</td><td>" +
            '<button class="btn btn-sm btn-warning me-1" onclick="editar(' + i + ')">Editar</button>' +
            '<button class="btn btn-sm btn-danger" onclick="eliminar(' + i + ')">Eliminar</button>' +
            "</td></tr>";
  }
  if (usuarios.length === 0) {
    html = '<tr><td colspan="3" class="text-center text-muted">No hay usuarios todavía</td></tr>';
  }
  document.getElementById("tabla").innerHTML = html;
}

document.getElementById("formulario").onsubmit = function (evento) {
  evento.preventDefault();
  var nombre = document.getElementById("nombre").value.trim();
  var correo = document.getElementById("correo").value.trim();

  if (nombre === "" || correo === "") {
    document.getElementById("mensaje").textContent = "Completa todos los campos.";
    return;
  }
  if (correo.indexOf("@") === -1) {
    document.getElementById("mensaje").textContent = "El correo no es válido.";
    return;
  }
  document.getElementById("mensaje").textContent = "";

  if (editando === -1) {
    usuarios.push({ nombre: nombre, correo: correo });   
  } else {
    usuarios[editando] = { nombre: nombre, correo: correo }; 
  }

  guardarLista();
  limpiar();
  mostrar();
};

function editar(i) {
  document.getElementById("nombre").value = usuarios[i].nombre;
  document.getElementById("correo").value = usuarios[i].correo;
  editando = i;
  document.getElementById("btnGuardar").textContent = "Actualizar";
  document.getElementById("btnCancelar").classList.remove("d-none");
}

function eliminar(i) {
  usuarios.splice(i, 1);
  guardarLista();
  limpiar();
  mostrar();
}

function limpiar() {
  document.getElementById("nombre").value = "";
  document.getElementById("correo").value = "";
  editando = -1;
  document.getElementById("btnGuardar").textContent = "Guardar";
  document.getElementById("btnCancelar").classList.add("d-none");
}

document.getElementById("btnCancelar").onclick = limpiar;

mostrar();
