// ===============================
// CHECKLIST DE AÇÕES SUSTENTÁVEIS
// ===============================

const checkboxes = document.querySelectorAll(".acao");
const textoProgresso = document.querySelector("#texto-progresso");
const barraProgresso = document.querySelector("#barra-progresso");

function atualizarProgresso() {
  const total = checkboxes.length;
  const marcadas = document.querySelectorAll(".acao:checked").length;
  const porcentagem = (marcadas / total) * 100;

  textoProgresso.textContent = `${marcadas} de ${total} ações marcadas`;
  barraProgresso.style.width = `${porcentagem}%`;
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", atualizarProgresso);
});


// ===============================
// MURAL DE IDEIAS COM LOCALSTORAGE
// ===============================

const formIdeia = document.querySelector("#form-ideia");
const campoIdeia = document.querySelector("#campo-ideia");
const listaIdeias = document.querySelector("#lista-ideias");
const botaoLimpar = document.querySelector("#limpar-ideias");

let ideias = JSON.parse(localStorage.getItem("ideiasAgrinho")) || [];

function salvarIdeias() {
  localStorage.setItem("ideiasAgrinho", JSON.stringify(ideias));
}

function mostrarIdeias() {
  listaIdeias.innerHTML = "";

  ideias.forEach((ideia) => {
    const item = document.createElement("li");
    item.textContent = ideia;
    listaIdeias.appendChild(item);
  });
}

formIdeia.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const novaIdeia = campoIdeia.value.trim();

  if (novaIdeia === "") {
    return;
  }

  ideias.push(novaIdeia);
  salvarIdeias();
  mostrarIdeias();

  campoIdeia.value = "";
  campoIdeia.focus();
});

botaoLimpar.addEventListener("click", () => {
  ideias = [];
  salvarIdeias();
  mostrarIdeias();
});

mostrarIdeias();
atualizarProgresso();
