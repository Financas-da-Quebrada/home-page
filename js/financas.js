// ==========================================
// Finanças da Quebrada — Registrar Receitas e Despesas
// ==========================================

const FINANCAS_PADRAO = { receitas: 12500, despesas: 6400 };

const MOVIMENTACOES_PADRAO = [
    { id: 1, tipo: "receita", descricao: "Venda de Produtos", valor: 850, data: "2026-07-02" },
    { id: 2, tipo: "despesa", descricao: "Compra de Mercadorias", valor: 300, data: "2026-07-01" },
    { id: 3, tipo: "despesa", descricao: "Pagamento de Energia", valor: 180, data: "2026-06-30" }
];

function getFinancas() {
    const salvo = localStorage.getItem("fdq_financas");
    return salvo ? JSON.parse(salvo) : FINANCAS_PADRAO;
}

function setFinancas(dados) {
    localStorage.setItem("fdq_financas", JSON.stringify(dados));
}

function getMovimentacoes() {
    const salvo = localStorage.getItem("fdq_movimentacoes");
    return salvo ? JSON.parse(salvo) : MOVIMENTACOES_PADRAO;
}

function setMovimentacoes(lista) {
    localStorage.setItem("fdq_movimentacoes", JSON.stringify(lista));
}

function formatarMoeda(valor) {
    return "R$ " + valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 });
}

function formatarData(dataISO) {
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
}

function renderCards() {

    const financas = getFinancas();
    const saldo = financas.receitas - financas.despesas;

    const elReceitas = document.getElementById("valor-receitas");
    const elDespesas = document.getElementById("valor-despesas");
    const elSaldo = document.getElementById("valor-saldo");

    if (elReceitas) elReceitas.textContent = formatarMoeda(financas.receitas);
    if (elDespesas) elDespesas.textContent = formatarMoeda(financas.despesas);
    if (elSaldo) elSaldo.textContent = formatarMoeda(saldo);

}

function renderTabela() {

    const tbody = document.getElementById("tabela-movimentacoes");
    if (!tbody) return;

    const movimentacoes = getMovimentacoes();

    tbody.innerHTML = "";

    movimentacoes.forEach(mov => {

        const tr = document.createElement("tr");
        const sinal = mov.tipo === "receita" ? "+" : "-";
        const cor = mov.tipo === "receita" ? "green" : "red";

        tr.innerHTML = `
            <td>${formatarData(mov.data)}</td>
            <td>${mov.descricao}</td>
            <td style="color:${cor};">${sinal} ${formatarMoeda(mov.valor)}</td>
        `;

        tbody.appendChild(tr);

    });

}

// --- Modal ---

const modalFinanca = document.getElementById("modal-financa");
const modalFinancaTitulo = document.getElementById("modal-financa-titulo");
const inputFinancaTipo = document.getElementById("financa-tipo");
const inputFinancaDescricao = document.getElementById("financa-descricao");
const inputFinancaValor = document.getElementById("financa-valor");

function abrirModalFinanca(tipo) {
    inputFinancaTipo.value = tipo;
    inputFinancaDescricao.value = "";
    inputFinancaValor.value = "";
    modalFinancaTitulo.textContent = tipo === "receita" ? "Registrar Receita" : "Registrar Despesa";
    modalFinanca.style.display = "flex";
}

function fecharModalFinanca() {
    modalFinanca.style.display = "none";
}

function mostrarToastFinanca(mensagem) {
    const toast = document.getElementById("toast-financa");
    toast.textContent = mensagem;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
}

document.getElementById("btn-registrar-receita").addEventListener("click", function (e) {
    e.preventDefault();
    abrirModalFinanca("receita");
});

document.getElementById("btn-registrar-despesa").addEventListener("click", function (e) {
    e.preventDefault();
    abrirModalFinanca("despesa");
});

document.getElementById("btn-cancelar-financa").addEventListener("click", fecharModalFinanca);

modalFinanca.addEventListener("click", function (e) {
    if (e.target === modalFinanca) fecharModalFinanca();
});

document.getElementById("btn-salvar-financa").addEventListener("click", function () {

    const tipo = inputFinancaTipo.value;
    const descricao = inputFinancaDescricao.value.trim();
    const valor = parseFloat(inputFinancaValor.value);

    if (!descricao || !valor || valor <= 0) {
        alert("Preencha a descrição e um valor válido.");
        return;
    }

    const movimentacoes = getMovimentacoes();
    const hoje = new Date().toISOString().split("T")[0];
    const novoId = movimentacoes.length ? Math.max(...movimentacoes.map(m => m.id)) + 1 : 1;

    movimentacoes.unshift({ id: novoId, tipo, descricao, valor, data: hoje });
    setMovimentacoes(movimentacoes);

    const financas = getFinancas();
    if (tipo === "receita") {
        financas.receitas += valor;
    } else {
        financas.despesas += valor;
    }
    setFinancas(financas);

    renderCards();
    renderTabela();
    fecharModalFinanca();
    mostrarToastFinanca(tipo === "receita" ? "Receita registrada!" : "Despesa registrada!");

});

// --- Inicialização ---

renderCards();
renderTabela();