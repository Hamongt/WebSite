console.log("🎵 musicas.js carregado");

const musicas = [
    {
        arquivo: "musica-1.html",
        id: "musica-1"
    }
];

const CAMINHO_BASE_MUSICAS =
    "windows_popups/gabrielzinho/subpaginas/musicas/";

function carregarMusicas() {

    const container =
        document.getElementById("listaMusicas");

    const total =
        document.getElementById("totalMusicas");

    if (!container) {
        console.warn(
            "⚠️ O elemento #listaMusicas ainda não existe."
        );

        return;
    }

    console.log("✅ #listaMusicas encontrado");

    container.innerHTML = "";

    let quantidade = 0;

    musicas.forEach(function (musica) {

        const caminhoCompleto =
            CAMINHO_BASE_MUSICAS + musica.arquivo;

        console.log(
            "🔎 Tentando carregar:",
            caminhoCompleto
        );

        fetch(caminhoCompleto)

            .then(function (response) {

                if (!response.ok) {
                    throw new Error(
                        `Erro HTTP ${response.status} ao carregar ${caminhoCompleto}`
                    );
                }

                return response.text();
            })

            .then(function (html) {

                const artigo =
                    document.createElement("article");

                artigo.className = "musica-item";
                artigo.id = musica.id;
                artigo.innerHTML = html;

                container.appendChild(artigo);

                quantidade++;

                if (total) {
                    total.textContent = quantidade;
                }

                console.log(
                    "✅ Música carregada:",
                    musica.arquivo
                );

                carregarFeedbackMusica(
                    musica.id,
                    artigo
                );
            })

            .catch(function (erro) {

                console.error(
                    "❌ Erro carregando música:",
                    caminhoCompleto,
                    erro
                );

                container.innerHTML += `
                    <div class="erro-carregamento">
                        Não foi possível carregar
                        <strong>${musica.arquivo}</strong>.
                    </div>
                `;
            });
    });
}

function carregarFeedbackMusica(
    idMusica,
    artigo
) {

    const container =
        artigo.querySelector(
            ".feedback-container"
        );

    if (!container) {
        console.warn(
            `A música ${idMusica} não possui .feedback-container`
        );

        return;
    }

    fetch(
        "windows_popups/gabrielzinho/componentes/feedback.html"
    )

        .then(function (response) {

            if (!response.ok) {
                throw new Error(
                    `Erro HTTP ${response.status}`
                );
            }

            return response.text();
        })

        .then(function (html) {

            container.innerHTML = html;

            if (
                typeof iniciarFeedback ===
                "function"
            ) {
                iniciarFeedback(
                    idMusica,
                    container
                );
            }
        })

        .catch(function (erro) {

            console.error(
                "❌ Erro carregando feedback:",
                erro
            );
        });
}

/*
Executa normalmente quando a página inteira abre.
*/
if (document.readyState === "loading") {

    document.addEventListener(
        "DOMContentLoaded",
        carregarMusicas
    );

} else {

    /*
    Executa imediatamente caso o script seja inserido
    depois que a página já terminou de carregar.
    */
    carregarMusicas();
}