var pantalla = document.getElementById("pantalla");

var primero = null;      
var signo = "";          
var nuevoNumero = true;  

function numero(n) {
  if (nuevoNumero) {
    pantalla.value = (n === ".") ? "0." : n;
    nuevoNumero = false;
  } else {
    if (n === "." && pantalla.value.indexOf(".") !== -1) {
      return; 
    }
    pantalla.value += n;
  }
}

function operador(o) {
  if (signo !== "" && !nuevoNumero) {
    calcular(); 
  }
  primero = parseFloat(pantalla.value);
  signo = o;
  nuevoNumero = true;
}

function calcular() {
  if (signo === "" || primero === null) {
    return;
  }
  var segundo = parseFloat(pantalla.value);
  var resultado = 0;

  if (signo === "+") { resultado = primero + segundo; }
  if (signo === "-") { resultado = primero - segundo; }
  if (signo === "*") { resultado = primero * segundo; }
  if (signo === "%") { resultado = primero % segundo; }
  if (signo === "/") {
    if (segundo === 0) {
      pantalla.value = "Error: división por 0";
      primero = null;
      signo = "";
      nuevoNumero = true;
      return;
    }
    resultado = primero / segundo;
  }

  pantalla.value = Math.round(resultado * 1000000) / 1000000;
  primero = null;
  signo = "";
  nuevoNumero = true;
}

function limpiar() {
  pantalla.value = "0";
  primero = null;
  signo = "";
  nuevoNumero = true;
}

function borrar() {
  if (nuevoNumero) {
    return;
  }
  pantalla.value = pantalla.value.slice(0, -1);
  if (pantalla.value === "") {
    pantalla.value = "0";
    nuevoNumero = true;
  }
}
