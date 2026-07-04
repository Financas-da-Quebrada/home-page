// ==========================================
// Finanças da Quebrada — Sincroniza o Dashboard
// com os dados salvos na página de Edição
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    // --- Comércio ---

    const comercioSalvo = localStorage.getItem("fdq_comercio");

    if (comercioSalvo) {

        const dados = JSON.parse(comercioSalvo);

        document.getElementById("comercio-nome").textContent = dados.nome;
        document.getElementById("comercio-categoria").textContent = dados.categoria;
        document.getElementById("comercio-telefone").textContent = dados.telefone;
        document.getElementById("comercio-cidade").textContent = dados.cidade;

    }

    // --- Cursos ---

    const cursosSalvos = localStorage.getItem("fdq_cursos");

    if (cursosSalvos) {

        const cursos = JSON.parse(cursosSalvos);
        const container = document.getElementById("cursos-lista-dashboard");

        if (container && cursos.length) {

            container.innerHTML = "";

            cursos.forEach(curso => {

                const card = document.createElement("div");
                card.className = "dashboard-card";

                card.innerHTML = `
                    <h3>${curso.titulo}</h3>
                    <p>${curso.descricao}</p>
                    <a href="cursos.html" class="btn-primary">Começar</a>
                `;

                container.appendChild(card);

            });

        }

    }

});