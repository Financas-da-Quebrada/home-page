// ==========================================
// Finanças da Quebrada — Meus Cursos (progresso)
// ==========================================

const CURSOS = [
    { id: 1, titulo: "Educação Financeira", descricao: "Aprenda a organizar seu dinheiro.", icone: "fa-graduation-cap" },
    { id: 2, titulo: "Marketing Digital", descricao: "Divulgue seu comércio.", icone: "fa-bullhorn" },
    { id: 3, titulo: "Precificação", descricao: "Aprenda a definir preços.", icone: "fa-tags" }
];

function getProgresso() {
    const salvo = localStorage.getItem("fdq_progresso");
    return salvo ? JSON.parse(salvo) : {};
}

function setProgresso(dados) {
    localStorage.setItem("fdq_progresso", JSON.stringify(dados));
}

function statusPorPorcentagem(pct) {
    if (pct >= 100) return { label: "Concluído", classe: "status-concluido" };
    if (pct > 0) return { label: "Em andamento", classe: "status-andamento" };
    return { label: "Não iniciado", classe: "status-nao-iniciado" };
}

function renderCursos() {

    const progresso = getProgresso();
    const container = document.getElementById("cursos-progresso");

    container.innerHTML = "";

    CURSOS.forEach(curso => {

        const pct = progresso[curso.id] || 0;
        const status = statusPorPorcentagem(pct);

        const card = document.createElement("div");
        card.className = "dashboard-card curso-progress-card";

        card.innerHTML = `
            <i class="fa-solid ${curso.icone}"></i>
            <h3>${curso.titulo}</h3>
            <p>${curso.descricao}</p>

            <span class="status-badge ${status.classe}">${status.label}</span>

            <div class="progress-bar-track">
                <div class="progress-bar-fill" style="width:${pct}%"></div>
            </div>
            <span class="progress-pct">${pct}%</span>

            <button class="btn-primary btn-continuar" data-id="${curso.id}">
                ${pct >= 100 ? "Revisar curso" : pct > 0 ? "Continuar curso" : "Começar curso"}
            </button>
        `;

        card.querySelector(".btn-continuar").addEventListener("click", () => avancarCurso(curso.id));

        container.appendChild(card);

    });

}

function avancarCurso(id) {

    const progresso = getProgresso();
    const atual = progresso[id] || 0;
    const novo = Math.min(atual + 25, 100);

    progresso[id] = novo;
    setProgresso(progresso);
    renderCursos();

}

renderCursos();