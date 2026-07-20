// ============================================================
// 🌸 ANIME.JS - GERENCIADOR DE ANIMES
// ============================================================

console.log("🚀 anime.js carregado!");

// ============================================================
// 1. LISTA DE ANIMES
// ============================================================

const animes = [
    {
        arquivo: "windows_popups/gabrielzinho/subpaginas/animes/anime-2.html",
        id: "anime-2"
    },

    {
        arquivo: "windows_popups/gabrielzinho/subpaginas/animes/anime-1.html",
        id: "anime-1"
    },

    // 👆 ADICIONE NOVOS ANIMES AQUI
];

// ============================================================
// 2. CARREGAR TODOS OS ANIMES
// ============================================================

async function carregarAnimes() {
    const listaAnimes = document.getElementById("listaAnimes");
    const totalAnimes = document.getElementById("totalAnimes");

    if (!listaAnimes) {
        console.error("❌ Elemento #listaAnimes não encontrado.");
        return;
    }

    // Limpa apenas os itens de anime, mantendo os fixos
    listaAnimes.querySelectorAll('.anime-item').forEach(el => el.remove());
    
    // Remove mensagem de carregamento se existir
    const loading = listaAnimes.querySelector('.loading-animes');
    if (loading) loading.remove();

    let animesCarregados = 0;

    // Mostra mensagem de carregamento
    const msgLoading = document.createElement('p');
    msgLoading.className = 'loading-animes';
    msgLoading.style.cssText = 'color: rgba(255,255,255,0.3); text-align: center; padding: 20px;';
    msgLoading.textContent = '🔄 Carregando animes...';
    
    const fixos = listaAnimes.querySelectorAll('.fixo');
    if (fixos.length > 1) {
        listaAnimes.insertBefore(msgLoading, fixos[1]);
    } else {
        listaAnimes.appendChild(msgLoading);
    }

    for (const anime of animes) {
        try {
            const resposta = await fetch(anime.arquivo);

            if (!resposta.ok) {
                throw new Error(
                    `Erro ${resposta.status} ao carregar ${anime.arquivo}`
                );
            }

            const html = await resposta.text();

            const publicacao = document.createElement("article");
            publicacao.classList.add("anime-item");
            publicacao.id = anime.id;
            publicacao.innerHTML = html;

            // Insere antes do rodapé fixo
            const fixos = listaAnimes.querySelectorAll('.fixo');
            if (fixos.length > 1) {
                listaAnimes.insertBefore(publicacao, fixos[1]);
            } else {
                listaAnimes.appendChild(publicacao);
            }

            inicializarInteracoes(anime.id);

            animesCarregados++;

            console.log(`✅ ${anime.arquivo} carregado.`);
            
            // Remove mensagem de carregamento
            const loading = listaAnimes.querySelector('.loading-animes');
            if (loading) loading.remove();
            
        } catch (erro) {
            console.error(`❌ Erro ao carregar ${anime.arquivo}:`, erro);

            const aviso = document.createElement("div");
            aviso.classList.add("erro-anime");

            aviso.innerHTML = `
                <p>⚠️ Não foi possível carregar:</p>
                <strong>${anime.arquivo}</strong>
            `;

            const fixos = listaAnimes.querySelectorAll('.fixo');
            if (fixos.length > 1) {
                listaAnimes.insertBefore(aviso, fixos[1]);
            } else {
                listaAnimes.appendChild(aviso);
            }
        }
    }

    if (totalAnimes) {
        totalAnimes.textContent = animesCarregados;
    }
}

// ============================================================
// 3. LOCALSTORAGE
// ============================================================

function getDadosAnime(animeId) {
    const dadosSalvos = localStorage.getItem(`anime_${animeId}`);

    if (!dadosSalvos) {
        return {
            curtidas: 0,
            comentarios: []
        };
    }

    try {
        return JSON.parse(dadosSalvos);
    } catch (erro) {
        console.error("Erro ao ler dados do anime:", erro);

        return {
            curtidas: 0,
            comentarios: []
        };
    }
}

function salvarDadosAnime(animeId, dados) {
    localStorage.setItem(
        `anime_${animeId}`,
        JSON.stringify(dados)
    );
}

/// ============================================================
// 4. INICIALIZAR INTERAÇÕES (CORRIGIDO)
// ============================================================

function inicializarInteracoes(animeId) {
    const animeElemento = document.getElementById(animeId);

    if (!animeElemento) {
        console.warn(`⚠️ Elemento ${animeId} não encontrado`);
        return;
    }

    const dados = getDadosAnime(animeId);

    const botaoCurtir = animeElemento.querySelector(".curtir");
    const botaoComentar = animeElemento.querySelector(".comentar");
    const botaoCompartilhar = animeElemento.querySelector(".compartilhar");

    // ===== CORREÇÃO: USA ID EM VEZ DE CLASSE =====
    const contadorCurtidas = document.getElementById(`curtidas-${animeId}`);
    const contadorComentarios = document.getElementById(`comentarios-${animeId}`);
    const caixaComentarios = document.getElementById(`comentarioBox-${animeId}`);

    if (contadorCurtidas) {
        contadorCurtidas.textContent = dados.curtidas;
    }

    if (contadorComentarios) {
        contadorComentarios.textContent = dados.comentarios.length;
    }

    // ===== CURTIR =====
    if (botaoCurtir) {
        botaoCurtir.addEventListener("click", function () {
            const dadosAtuais = getDadosAnime(animeId);

            dadosAtuais.curtidas++;

            salvarDadosAnime(animeId, dadosAtuais);

            if (contadorCurtidas) {
                contadorCurtidas.textContent = dadosAtuais.curtidas;
            }

            botaoCurtir.classList.add("ativo");

            setTimeout(() => {
                botaoCurtir.classList.remove("ativo");
            }, 400);
            
            console.log(`❤️ Curtida em ${animeId}: ${dadosAtuais.curtidas}`);
        });
    }

    // ===== COMENTAR =====
    if (botaoComentar && caixaComentarios) {
        botaoComentar.addEventListener("click", function () {
            const estaAberta = caixaComentarios.style.display === "block";

            document.querySelectorAll(".comentario-box").forEach(function (caixa) {
                caixa.style.display = "none";
            });

            caixaComentarios.style.display = estaAberta ? "none" : "block";

            if (!estaAberta) {
                carregarComentarios(animeId);
            }
        });
    }

    // ===== COMPARTILHAR =====
    if (botaoCompartilhar) {
        botaoCompartilhar.addEventListener("click", function () {
            copiarLink(animeId);
        });
    }

    // ===== ENVIAR COMENTÁRIO =====
    const botaoEnviar = animeElemento.querySelector(".enviar-comentario");
    const inputComentario = animeElemento.querySelector(".comentario-input");

    if (botaoEnviar && inputComentario) {
        botaoEnviar.addEventListener("click", function () {
            adicionarComentario(animeId);
        });

        inputComentario.addEventListener("keydown", function (evento) {
            if (evento.key === "Enter") {
                adicionarComentario(animeId);
            }
        });
    }

    // ===== FECHAR COMENTÁRIOS =====
    const botaoFechar = animeElemento.querySelector(".fechar-comentario");

    if (botaoFechar && caixaComentarios) {
        botaoFechar.addEventListener("click", function () {
            caixaComentarios.style.display = "none";
        });
    }
}
// ============================================================
// 5. CARREGAR COMENTÁRIOS
// ============================================================

function carregarComentarios(animeId) {
    const animeElemento = document.getElementById(animeId);

    if (!animeElemento) {
        return;
    }

    const listaComentarios =
        animeElemento.querySelector(".comentario-lista");

    if (!listaComentarios) {
        return;
    }

    const dados = getDadosAnime(animeId);

    listaComentarios.innerHTML = "";

    if (dados.comentarios.length === 0) {
        listaComentarios.innerHTML = `
            <p class="sem-comentarios">
                Nenhum comentário ainda. Seja o primeiro!
            </p>
        `;

        return;
    }

    dados.comentarios.forEach(function (comentario, index) {
        const comentarioElemento =
            document.createElement("div");

        comentarioElemento.classList.add("comentario-item");

        const autor =
            escaparHTML(comentario.autor || "Anônimo");

        const texto =
            escaparHTML(comentario.texto);

        const data =
            escaparHTML(comentario.data || "");

        comentarioElemento.innerHTML = `
            <div class="autor">👤 ${autor}</div>

            <div class="texto">
                ${texto}
            </div>

            <div class="data-comentario">
                ${data}
            </div>

            <button
                type="button"
                class="btn-deletar-comentario"
                title="Apagar comentário"
            >
                🗑️
            </button>
        `;

        const botaoDeletar =
            comentarioElemento.querySelector(
                ".btn-deletar-comentario"
            );

        botaoDeletar.addEventListener("click", function () {
            deletarComentario(animeId, index);
        });

        listaComentarios.appendChild(
            comentarioElemento
        );
    });
}

// ============================================================
// 6. ADICIONAR COMENTÁRIO
// ============================================================

function adicionarComentario(animeId) {
    const animeElemento = document.getElementById(animeId);

    if (!animeElemento) {
        return;
    }

    const input =
        animeElemento.querySelector(".comentario-input");

    if (!input) {
        return;
    }

    const texto = input.value.trim();

    if (texto === "") {
        alert("Digite alguma coisa antes de comentar.");
        return;
    }

    const dados = getDadosAnime(animeId);

    const nomeUsuario =
        localStorage.getItem("nomeUsuario") ||
        localStorage.getItem("usuarioLogado") ||
        "Anônimo";

    const agora = new Date();

    dados.comentarios.push({
        autor: nomeUsuario,
        texto: texto,
        data: agora.toLocaleString("pt-BR", {
            dateStyle: "short",
            timeStyle: "short"
        })
    });

    salvarDadosAnime(animeId, dados);

    input.value = "";

    const contadorComentarios =
        animeElemento.querySelector(
            ".contador-comentarios"
        );

    if (contadorComentarios) {
        contadorComentarios.textContent =
            dados.comentarios.length;
    }

    carregarComentarios(animeId);
}

// ============================================================
// 7. DELETAR COMENTÁRIO
// ============================================================

function deletarComentario(animeId, index) {
    const confirmar = confirm(
        "🗑️ Deseja apagar este comentário?"
    );

    if (!confirmar) {
        return;
    }

    const dados = getDadosAnime(animeId);

    dados.comentarios.splice(index, 1);

    salvarDadosAnime(animeId, dados);

    const animeElemento = document.getElementById(animeId);

    if (animeElemento) {
        const contadorComentarios =
            animeElemento.querySelector(
                ".contador-comentarios"
            );

        if (contadorComentarios) {
            contadorComentarios.textContent =
                dados.comentarios.length;
        }
    }

    carregarComentarios(animeId);
}

// ============================================================
// 8. COMPARTILHAR
// ============================================================

function copiarLink(animeId) {
    const url =
        `${window.location.origin}` +
        `${window.location.pathname}` +
        `#${animeId}`;

    navigator.clipboard.writeText(url)
        .then(function () {
            alert("🔗 Link copiado!");
        })
        .catch(function () {
            alert("Não foi possível copiar o link.");
        });
}

// ============================================================
// 9. SEGURANÇA DOS COMENTÁRIOS
// ============================================================

function escaparHTML(texto) {
    const elemento = document.createElement("div");
    elemento.textContent = texto;
    return elemento.innerHTML;
}

// ============================================================
// 10. PLAYER
// ============================================================

function inicializarPlayer() {
    const audio =
        document.getElementById("musicaAmbiente");

    const botao =
        document.getElementById("playPauseBtn");

    const volume =
        document.getElementById("volumeControl");

    const volumeLabel =
        document.getElementById("volumeLabel");

    if (!audio || !botao) {
        return;
    }

    audio.volume = 0.03;

    if (volume) {
        volume.value = 0.03;
    }

    if (volumeLabel) {
        volumeLabel.textContent = "3%";
    }

    botao.textContent = "▶️";

    botao.addEventListener("click", async function () {
        if (audio.paused) {
            try {
                await audio.play();
                botao.textContent = "⏸️";
            } catch (erro) {
                console.error("Erro ao iniciar áudio:", erro);
            }
        } else {
            audio.pause();
            botao.textContent = "▶️";
        }
    });

    if (volume) {
        volume.addEventListener("input", function () {
            const valor = Number(volume.value);

            audio.volume = valor;

            if (volumeLabel) {
                volumeLabel.textContent =
                    `${Math.round(valor * 100)}%`;
            }
        });
    }
}

// ============================================================
// 11. DATA
// ============================================================

function atualizarData() {
    const elemento =
        document.getElementById("dataAtual");

    if (!elemento) {
        return;
    }

    elemento.textContent =
        new Date().toLocaleDateString("pt-BR");
}

// ============================================================
// 12. CORRIGIR BOTÃO VOLTAR
// ============================================================

function corrigirBotaoVoltar() {
    const btnVoltar = document.querySelector('.btn-voltar');
    if (btnVoltar) {
        btnVoltar.style.textDecoration = 'none';
        btnVoltar.style.border = '1px solid rgba(255,255,255,0.08)';
        btnVoltar.style.borderRadius = '12px';
        btnVoltar.style.background = 'rgba(255,255,255,0.06)';
        btnVoltar.style.padding = '4px 14px';
        btnVoltar.style.color = 'rgba(255,255,255,0.6)';
        btnVoltar.style.transition = 'all 0.3s ease';
        
        btnVoltar.addEventListener('mouseenter', function() {
            this.style.background = 'rgba(255,255,255,0.12)';
            this.style.color = 'white';
            this.style.transform = 'scale(1.02)';
        });
        
        btnVoltar.addEventListener('mouseleave', function() {
            this.style.background = 'rgba(255,255,255,0.06)';
            this.style.color = 'rgba(255,255,255,0.6)';
            this.style.transform = 'scale(1)';
        });
    }
}

// ============================================================
// 13. INICIAR A PÁGINA
// ============================================================

function iniciarAnimes() {
    carregarAnimes();
    inicializarPlayer();
    atualizarData();
    corrigirBotaoVoltar();
}


window.iniciarAnimes = iniciarAnimes;
