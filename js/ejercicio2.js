
let formulario = document.getElementById("formulario");
let mensaje = document.getElementById("mensaje");
let listaNotas = document.getElementById("listaNotas");
let promedioTexto = document.getElementById("promedio");
let notasAltasTexto = document.getElementById("notasAltas");
let notaMayorTexto = document.getElementById("notaMayor");
let notaMenorTexto = document.getElementById("notaMenor");

formulario.addEventListener("submit", procesarFormulario);

function procesarFormulario(event){
    event.preventDefault();
    let suma = 0;
    let cantidadValidas = 0;
    let notasAltas = 0;
    let mayor = -1;
    let menor = 6;
    listaNotas.innerHTML = "";

    for (let i = 1; i <= 5; i++) {
        let nota = parseFloat(document.getElementById(`nota${i}`).value);
        let fila = document.createElement("li");
        fila.textContent = `Nota ${i}: ${nota}`;

        if (Number.isNaN(nota) || nota < 0 || nota > 5) {
            fila.textContent += "(invalida)";
        }else {
            suma += nota;
            cantidadValidas++;
            if (nota >= 3) {
                notasAltas++;
            }
            if (nota > mayor) {
                mayor = nota;
            }
            if (nota < menor) {
                menor = nota;
            }
        }
        listaNotas.appendChild(fila);
    }

    if (cantidadValidas === 0) {
        mensaje.textContent = "No se ingreso notas validas.";
        promedioTexto.textContent = "_";
        notasAltasTexto.textContent = "_";
        notaMayorTexto.textContent = "_";
        notaMenorTexto.textContent = "_";
        return;
    }

    let promedio = suma / cantidadValidas;
    promedioTexto.textContent = promedio.toFixed(2);
    notasAltasTexto.textContent = notasAltas;
    notaMayorTexto.textContent = mayor;
    notaMenorTexto.textContent = menor;
    mensaje.textContent = promedio >= 3 ? "Aprobo." : "Reprobo.";
}