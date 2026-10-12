// Lista de productos (nombre y precio)
var productos = [
  { nombre: "Gaseosa", precio: 1.00 },
  { nombre: "Pan", precio: 0.25 },
  { nombre: "Leche", precio: 1.20 },
  { nombre: "Arroz 1kg", precio: 1.50 },
  { nombre: "Huevos (docena)", precio: 2.80 }
];

var carrito = [];

function mostrarProductos() {
  var html = "";
  for (var i = 0; i < productos.length; i++) {
    html += '<button class="list-group-item list-group-item-action d-flex justify-content-between" onclick="agregar(' + i + ')">' +
            productos[i].nombre + '<span>$' + productos[i].precio.toFixed(2) + '</span></button>';
  }
  document.getElementById("productos").innerHTML = html;
}

function agregar(i) {
  document.getElementById("mensaje").textContent = "";
  for (var j = 0; j < carrito.length; j++) {
    if (carrito[j].nombre === productos[i].nombre) {
      carrito[j].cantidad++;
      mostrarCarrito();
      return;
    }
  }
  carrito.push({ nombre: productos[i].nombre, precio: productos[i].precio, cantidad: 1 });
  mostrarCarrito();
}

function quitar(j) {
  carrito.splice(j, 1);
  mostrarCarrito();
}

function mostrarCarrito() {
  var html = "";
  var total = 0;
  for (var j = 0; j < carrito.length; j++) {
    var subtotal = carrito[j].precio * carrito[j].cantidad;
    total += subtotal;
    html += "<tr><td>" + carrito[j].nombre + "</td><td>" + carrito[j].cantidad +
            "</td><td>$" + subtotal.toFixed(2) + "</td>" +
            '<td><button class="btn btn-sm btn-danger" onclick="quitar(' + j + ')">X</button></td></tr>';
  }
  document.getElementById("carrito").innerHTML = html;
  document.getElementById("total").textContent = total.toFixed(2);
}

document.getElementById("btnCobrar").onclick = function () {
  if (carrito.length === 0) {
    document.getElementById("mensaje").textContent = "El carrito está vacío.";
    return;
  }
  var total = document.getElementById("total").textContent;
  carrito = [];
  mostrarCarrito();
  document.getElementById("mensaje").textContent = "Venta realizada. Total cobrado: $" + total;
};

document.getElementById("btnVaciar").onclick = function () {
  carrito = [];
  mostrarCarrito();
  document.getElementById("mensaje").textContent = "";
};

mostrarProductos();
