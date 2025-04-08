const formulario = document.getElementById("formulario");
const listaAparatos = document.getElementById("lista-aparatos");
const totalKwh = document.getElementById("total-kwh");
const costoMensual = document.getElementById("costo-mensual");
const toggleMode = document.getElementById("toggle-mode");
const mainDiv = document.getElementById("mainDiv");

let aparatos = [];
const costoPorKwh = 0.25;

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const potencia = parseFloat(document.getElementById("potencia").value);
  const horas = parseFloat(document.getElementById("horas").value);
  const categoria = document.getElementById("categoria").value;

  const consumo = (potencia * horas * 30) / 1000;

  aparatos.push({ nombre, potencia, horas, consumo, categoria });

  mostrarAparatos();
  calcularTotal();
  formulario.reset();
});

function mostrarAparatos() {
  listaAparatos.innerHTML = "";
  aparatos.forEach((a, i) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${a.nombre}</strong> (${a.categoria}) - ${a.consumo.toFixed(2)} kWh/mes 
      <button onclick="eliminarAparato(${i})">❌</button>
    `;
    listaAparatos.appendChild(div);
  });
}

function eliminarAparato(index) {
  aparatos.splice(index, 1);
  mostrarAparatos();
  calcularTotal();
}

function calcularTotal() {
  const total = aparatos.reduce((acc, item) => acc + item.consumo, 0);
  totalKwh.textContent = total.toFixed(2);
  costoMensual.textContent = (total * costoPorKwh).toFixed(2);
}

// Cambiar entre modo claro y oscuro
toggleMode.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
