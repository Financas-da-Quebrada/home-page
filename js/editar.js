
// ==========================================
// Finanças da Quebrada — Página de Edição
// ==========================================

const COMERCIO_PADRAO = {
    nome: "Mercadinho do Kaio",
    categoria: "Mercado",
    telefone: "(11) 99999-9999",
    cidade: "São Paulo"
};

function getComercio() {
    const salvo = localStorage.getItem("fdq_comercio");
    return salvo ? JSON.parse(salvo) : COMERCIO_PADRAO;
}

function setComercio(dados) {
    localStorage.setItem("fdq_comercio", JSON.stringify(dados));
}

function mostrarToast(mensagem) {
    const toast = document.getElementById("toast");
    toast.textContent = mensagem;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
}

function preencherFormComercio() {
    const dados = getComercio();
    document.getElementById("nome").value = dados.nome;
    document.getElementById("categoria").value = dados.categoria;
    document.getElementById("telefone").value = dados.telefone;
    document.getElementById("cidade").value = dados.cidade;
}

document.getElementById("form-comercio").addEventListener("submit", function (e) {
    e.preventDefault();

    const dados = {
        nome: document.getElementById("nome").value.trim(),
        categoria: document.getElementById("categoria").value,
        telefone: document.getElementById("telefone").value.trim(),
        cidade: document.getElementById("cidade").value.trim()
    };

    setComercio(dados);
    mostrarToast("Dados do comércio salvos!");
});

preencherFormComercio();