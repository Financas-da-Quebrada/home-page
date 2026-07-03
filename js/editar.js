// ==========================================
// Finanças da Quebrada — Página de Edição
// ==========================================

// --- Dados padrão (usados na primeira vez, quando ainda não existe nada salvo) ---

const COMERCIO_PADRAO = {
    nome: "Mercadinho do Kaio",
    categoria: "Mercado",
    telefone: "(11) 99999-9999",
    cidade: "São Paulo"
};

const CURSOS_PADRAO = [
    { id: 1, titulo: "Educação Financeira", descricao: "Aprenda a organizar seu dinheiro." },
    { id: 2, titulo: "Marketing Digital", descricao: "Divulgue seu comércio." },
    { id: 3, titulo: "Precificação", descricao: "Aprenda a definir preços." }
];

// --- Funções de acesso ao localStorage ---

function getComercio() {
    const salvo = localStorage.getItem("fdq_comercio");
    return salvo ? JSON.parse(salvo) : COMERCIO_PADRAO;
}

function setComercio(dados) {
    localStorage.setItem("fdq_comercio", JSON.stringify(dados));
}

function getCursos() {
    const salvo = localStorage.getItem("fdq_cursos");
    return salvo ? JSON.parse(salvo) : CURSOS_PADRAO;
}

function setCursos(lista) {
    localStorage.setItem("fdq_cursos", JSON.stringify(lista));
}

// --- Toast de confirmação ---

function mostrarToast(mensagem) {
    const toast = document.getElementById("toast");
    toast.textContent = mensagem;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
}

// --- Formulário do Comércio ---

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

// --- Lista de Cursos ---

const listaCursosEl = document.getElementById("cursos-lista");
const modal = document.getElementById("modal-curso");
const modalTitulo = document.getElementById("modal-titulo");
const inputCursoId = document.getElementById("curso-id");
const inputCursoTitulo = document.getElementById("curso-titulo");
const inputCursoDesc = document.getElementById("curso-desc");

function renderCursos() {

    const cursos = getCursos();

    listaCursosEl.innerHTML = "";

    cursos.forEach(curso => {

        const card = document.createElement("div");
        card.className = "dashboard-card curso-card";
        card.dataset.id = curso.id;

        card.innerHTML = `
            <div class="curso-card-actions">
                <button class="btn-icon btn-editar" title="Editar"><i class="fa-solid fa-pen"></i></button>
                <button class="btn-icon btn-excluir" title="Excluir"><i class="fa-solid fa-trash"></i></button>
            </div>
            <h3>${curso.titulo}</h3>
            <p>${curso.descricao}</p>
        `;

        card.querySelector(".btn-editar").addEventListener("click", () => abrirModalEdicao(curso));
        card.querySelector(".btn-excluir").addEventListener("click", () => excluirCurso(curso.id));

        listaCursosEl.appendChild(card);

    });

    // Card de "+ Adicionar curso" ao final da lista

    const addCard = document.createElement("div");
    addCard.className = "add-curso-card";
    addCard.innerHTML = `<i class="fa-solid fa-plus"></i> Adicionar curso`;
    addCard.addEventListener("click", abrirModalNovo);

    listaCursosEl.appendChild(addCard);

}

function abrirModalNovo() {
    modalTitulo.textContent = "Adicionar Curso";
    inputCursoId.value = "";
    inputCursoTitulo.value = "";
    inputCursoDesc.value = "";
    modal.style.display = "flex";
}

function abrirModalEdicao(curso) {
    modalTitulo.textContent = "Editar Curso";
    inputCursoId.value = curso.id;
    inputCursoTitulo.value = curso.titulo;
    inputCursoDesc.value = curso.descricao;
    modal.style.display = "flex";
}

function fecharModal() {
    modal.style.display = "none";
}

function excluirCurso(id) {
    const cursos = getCursos().filter(c => c.id !== id);
    setCursos(cursos);
    renderCursos();
    mostrarToast("Curso removido!");
}

document.getElementById("btn-cancelar-curso").addEventListener("click", fecharModal);

document.getElementById("btn-salvar-curso").addEventListener("click", function () {

    const titulo = inputCursoTitulo.value.trim();
    const descricao = inputCursoDesc.value.trim();

    if (!titulo) {
        alert("Digite um título para o curso.");
        return;
    }

    let cursos = getCursos();
    const idExistente = inputCursoId.value;

    if (idExistente) {
        // Edição
        cursos = cursos.map(c =>
            c.id == idExistente ? { ...c, titulo, descricao } : c
        );
    } else {
        // Novo curso
        const novoId = cursos.length ? Math.max(...cursos.map(c => c.id)) + 1 : 1;
        cursos.push({ id: novoId, titulo, descricao });
    }

    setCursos(cursos);
    renderCursos();
    fecharModal();
    mostrarToast("Curso salvo!");

});

// Fecha o modal clicando fora do card

modal.addEventListener("click", function (e) {
    if (e.target === modal) fecharModal();
});

// --- Inicialização ---

preencherFormComercio();
renderCursos();