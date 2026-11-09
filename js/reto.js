// reto.js — Cajero automático

// 1. Referencias
let formulario = document.getElementById("formulario");
let mensaje = document.getElementById("mensaje");
let historial = document.getElementById("historial");
let titularTexto = document.getElementById("titular");
let saldoFinalTexto = document.getElementById("saldoFinal");
let totalDepositadoTexto = document.getElementById("totalDepositado");
let totalRetiradoTexto = document.getElementById("totalRetirado");
let operacionesTexto = document.getElementById("operaciones");

// 3. Lógica
formulario.addEventListener("submit", procesarFormulario);

function procesarFormulario(evento) {
    evento.preventDefault();

  // Validar titular y saldo
    let titular = document.getElementById("titularEntrada").value.trim();
    let saldo = parseFloat(document.getElementById("saldoEntrada").value);
    let operacionesPendientes = document.getElementById("operacionesEntrada").value.trim();
    historial.innerHTML = "";

    if (titular === "" || Number.isNaN(saldo) || saldo < 0) {
    mensaje.textContent = "Ingresa un titular y un saldo inicial válido (0 o mayor).";
    return;
    }
    if (operacionesPendientes === "") {
    mensaje.textContent = "No hay operaciones para procesar.";
    return;
    }

  // Saldos y contadores
    let totalDepositado = 0;
    let totalRetirado = 0;
    let operaciones = 0;
    let opcion = 0;

    do {
    // Extraer la siguiente operación (sin arreglos)
    let posicionPuntoComa = operacionesPendientes.indexOf(";");
    let textoOperacion = "";

    if (posicionPuntoComa === -1) {
        textoOperacion = operacionesPendientes.trim();
        operacionesPendientes = "";
    } else {
        textoOperacion = operacionesPendientes.slice(0, posicionPuntoComa).trim();
        operacionesPendientes = operacionesPendientes.slice(posicionPuntoComa + 1).trim();
    }

    // Opción y monto
    opcion = parseInt(textoOperacion, 10);
    let monto = NaN;
    let posicionDosPuntos = textoOperacion.indexOf(":");
    if (posicionDosPuntos !== -1) {
        monto = parseFloat(textoOperacion.slice(posicionDosPuntos + 1));
    }

    let fila = document.createElement("li");

    if (opcion === 1) {
        operaciones++;
        fila.textContent = "Consulta: saldo actual $" + saldo.toLocaleString("es-CO");
    } else if (opcion === 2) {
        if (Number.isNaN(monto) || monto <= 0) {
        fila.textContent = "Depósito inválido: el monto debe ser mayor a 0.";
        } else {
        saldo += monto;
        totalDepositado += monto;
        operaciones++;
        fila.textContent = "Depósito: $" + monto.toLocaleString("es-CO") + ". Saldo: $" + saldo.toLocaleString("es-CO");
        }
    } else if (opcion === 3) {
        if (Number.isNaN(monto) || monto <= 0) {
        fila.textContent = "Retiro inválido: el monto debe ser mayor a 0.";
        } else if (monto > saldo) {
        fila.textContent = "Retiro rechazado: fondos insuficientes.";
        } else {
        saldo -= monto;
        totalRetirado += monto;
        operaciones++;
        fila.textContent = "Retiro: $" + monto.toLocaleString("es-CO") + ". Saldo: $" + saldo.toLocaleString("es-CO");
        }
    } else if (opcion === 4) {
        fila.textContent = "Salir: sesión finalizada.";
    } else {
        fila.textContent = "Opción inválida: " + textoOperacion;
    }

    historial.appendChild(fila);
    } while (opcion !== 4 && operacionesPendientes !== "");

  // Resumen final
    titularTexto.textContent = titular;
    saldoFinalTexto.textContent = "$" + saldo.toLocaleString("es-CO");
    totalDepositadoTexto.textContent = "$" + totalDepositado.toLocaleString("es-CO");
    totalRetiradoTexto.textContent = "$" + totalRetirado.toLocaleString("es-CO");
    operacionesTexto.textContent = operaciones;
    mensaje.textContent = "Operaciones procesadas.";
}