console.log("🚀 Gabrielzinho carregado!");

// ============================================================
// INICIALIZAÇÃO DO PROGRAMA GABRIELZINHO
// Como o programa é carregado via fetch(), não usamos
// DOMContentLoaded aqui.
// ============================================================

function iniciarGabrielzinho() {
    carregarScriptMenuGabrielzinho();
    carregarPlayerMusica();
    iniciarDiscordPopup();
    iniciarRelogio();
    carregarSaudacaoUsuario();
    carregarPerfilUsuario();
}



// ============================================================
// CARREGAR SCRIPT DO MENU DO GABRIELZINHO
// ============================================================

function carregarScriptMenuGabrielzinho() {
    const idScript = "scriptMenuGabrielzinho";

    if (document.getElementById(idScript)) {
        return;
    }

    const script = document.createElement("script");
    script.id = idScript;
    script.src =
        "windows_popups/gabrielzinho/scripts/gabrielzinho_menu.js";

    script.onload = function () {
        console.log("✅ Script do menu Gabrielzinho carregado!");
    };

    script.onerror = function () {
        console.error("❌ Erro ao carregar gabrielzinho_menu.js");
    };

    document.body.appendChild(script);
}

// ============================================================
// CARREGAR COMPONENTE DO PLAYER DE MÚSICA
// ============================================================

function carregarPlayerMusica(tentativa = 0) {
    const container = document.getElementById("playerMusicaContainer");

    if (!container) {

        // O main_gabrielzinho.html pode estar entrando via fetch.
        // Aguarda o container do componente aparecer.
        if (tentativa < 20) {
            setTimeout(function () {
                carregarPlayerMusica(tentativa + 1);
            }, 100);
        }

        return;
    }

    // Evita carregar o mesmo componente mais de uma vez.
    if (container.dataset.carregado === "true") {
        iniciarPlayerMusica();
        return;
    }

    // O main_gabrielzinho.html normalmente é inserido dentro do index.html.
    // Já postagens.html é aberto diretamente dentro de windows_popups/gabrielzinho.
    const caminhoPlayer =
        "windows_popups/gabrielzinho/componentes/player_musica.html";

    fetch(caminhoPlayer)
        .then(function (response) {
            if (!response.ok) {
                throw new Error(
                    "Erro ao carregar player: " + response.status
                );
            }

            return response.text();
        })
        .then(function (html) {
            container.innerHTML = html;
            container.dataset.carregado = "true";

            iniciarPlayerMusica();

            console.log("🎵 Player de música carregado!");
        })
        .catch(function (error) {
            console.error(
                "❌ Não foi possível carregar player_musica.html:",
                error
            );
        });
}


// ============================================================
// PLAYER DE MÚSICA
// ============================================================

function iniciarPlayerMusica() {
    const audio = document.getElementById("musicaAmbiente");
    const btnPlay = document.getElementById("playPauseBtn");
    const volumeControl = document.getElementById("volumeControl");
    const volumeLabel = document.getElementById("volumeLabel");

    if (!audio || !btnPlay) {
        console.warn("Player de música ainda não disponível.");
        return;
    }

    // Evita adicionar os mesmos eventos mais de uma vez.
    if (btnPlay.dataset.inicializado === "true") {
        return;
    }

    btnPlay.dataset.inicializado = "true";

    // Volume inicial.
    audio.volume = 0.03;

    if (volumeControl) {
        volumeControl.value = 0.03;
    }

    if (volumeLabel) {
        volumeLabel.textContent = "3%";
    }

    let tocando = false;

    // Tenta iniciar automaticamente.
    audio.play()
        .then(() => {
            tocando = true;
            btnPlay.textContent = "⏸️";
            console.log("🎵 Música tocando!");
        })
        .catch(() => {
            tocando = false;
            btnPlay.textContent = "▶️";
            console.log("⏸️ Autoplay bloqueado. Clique no play.");
        });

    // Play / Pause.
    btnPlay.addEventListener("click", function () {
        if (tocando) {
            audio.pause();
            tocando = false;
            btnPlay.textContent = "▶️";
        } else {
            audio.play()
                .then(() => {
                    tocando = true;
                    btnPlay.textContent = "⏸️";
                })
                .catch((erro) => {
                    console.error("Erro ao reproduzir áudio:", erro);
                });
        }
    });

    // Controle de volume.
    if (volumeControl) {
        volumeControl.addEventListener("input", function () {
            const valor = parseFloat(this.value);

            audio.volume = valor;

            const percentual =
                Math.round(valor * 100);

            if (volumeLabel) {
                volumeLabel.textContent =
                    percentual + "%";
            }
        });
    }

    // Loop manual como segurança extra.
    audio.addEventListener("ended", function () {
        audio.currentTime = 0;

        audio.play().catch(() => {
            tocando = false;
            btnPlay.textContent = "▶️";
        });
    });
}


// ==========================================
// BALÃO DO DISCORD
// ==========================================

function iniciarDiscordPopup() {

    const discordBtn =
        document.getElementById("discordBtn");

    const discordPopup =
        document.getElementById("discordPopup");

    const fecharPopup =
        document.getElementById("fecharPopup");


    // Verifica se os elementos existem
    if (!discordBtn || !discordPopup) {
        console.warn(
            "⚠️ Elementos do Discord não encontrados."
        );

        return;
    }


    // Evita adicionar o evento mais de uma vez
    if (discordBtn.dataset.discordAtivo === "true") {
        return;
    }

    discordBtn.dataset.discordAtivo = "true";


    // ==========================================
    // ABRIR / FECHAR POPUP
    // ==========================================

    discordBtn.addEventListener(
        "click",
        function (e) {

            e.preventDefault();
            e.stopPropagation();

            discordPopup.classList.toggle(
                "ativo"
            );

        }
    );


    // ==========================================
    // BOTÃO X - FECHAR POPUP
    // ==========================================

    if (fecharPopup) {

        fecharPopup.addEventListener(
            "click",
            function (e) {

                e.preventDefault();
                e.stopPropagation();

                discordPopup.classList.remove(
                    "ativo"
                );

            }
        );

    }


    // ==========================================
    // FECHAR CLICANDO FORA
    // ==========================================

    document.addEventListener(
        "click",
        function (e) {

            if (
                !discordBtn.contains(e.target) &&
                !discordPopup.contains(e.target)
            ) {

                discordPopup.classList.remove(
                    "ativo"
                );

            }

        }
    );


    // ==========================================
    // FECHAR COM ESC
    // ==========================================

    document.addEventListener(
        "keydown",
        function (e) {

            if (e.key === "Escape") {

                discordPopup.classList.remove(
                    "ativo"
                );

            }

        }
    );

}

// ============================================================
// SAUDAÇÃO DO USUÁRIO LOGADO
// ============================================================

function carregarSaudacaoUsuario() {
    const usuarioLogado =
        null;

    const nomeUsuario =
        null || usuarioLogado;

    if (!usuarioLogado) {
        return;
    }

    const saudacao =
        document.getElementById(
            "saudacao"
        );

    if (saudacao) {
        saudacao.textContent =
            `Olá, ${nomeUsuario}! 🎉`;
    }
}


// ============================================================
// CARREGAR PERFIL / IMAGEM DO GABRIELZINHO
// ============================================================
//
// Não depende mais de login, usuário ou localStorage.
// A imagem padrão sempre é restaurada quando a Home volta.
//

function carregarPerfilUsuario() {

    const fotoEl =
        document.getElementById(
            "fotoPerfil"
        );


    if (fotoEl) {

        fotoEl.src =
            "../../assets/images/me.png";

    }


    const nomeEl =
        document.getElementById(
            "nomePerfil"
        );


    if (nomeEl) {

        nomeEl.textContent =
            "Gabrielzinho!";

    }


    const socialContainer =
        document.getElementById(
            "socialLinks"
        );


    if (socialContainer) {

        socialContainer.innerHTML =
            "";

    }

}


// ==========================================
// CARREGA UPDATES / CHANGELOG
// ==========================================

function carregarUpdates() {

    const updatesContainer =
        document.getElementById(
            "updates-container"
        );

    if (!updatesContainer) {
        return;
    }

    // Evita vários fetches ao mesmo tempo.
    if (
        updatesContainer.dataset.carregando ===
        "true"
    ) {
        return;
    }

    updatesContainer.dataset.carregando =
        "true";

    fetch(
        "windows_popups/gabrielzinho/updates.html"
    )
        .then(function (response) {

            if (!response.ok) {
                throw new Error(
                    "Erro HTTP: " +
                    response.status
                );
            }

            return response.text();

        })
        .then(function (html) {

            /*
             * O usuário pode ter navegado para outra
             * subpágina enquanto o fetch acontecia.
             */
            const containerAtual =
                document.getElementById(
                    "updates-container"
                );

            if (!containerAtual) {
                return;
            }

            containerAtual.innerHTML =
                html;

            containerAtual.dataset.carregado =
                "true";

            containerAtual.dataset.carregando =
                "false";

            console.log(
                "📌 Updates carregados!"
            );

        })
        .catch(function (error) {

            const containerAtual =
                document.getElementById(
                    "updates-container"
                );

            if (containerAtual) {
                containerAtual.dataset.carregando =
                    "false";
            }

            console.error(
                "❌ Erro ao carregar updates:",
                error
            );

        });

}


// ============================================================
// OBSERVAR O CONTAINER DE UPDATES
// ============================================================
//
// O main_gabrielzinho.html é inserido dinamicamente.
// Este observer fica ativo e carrega updates.html assim que
// #updates-container aparecer no DOM.
//
// Isso também funciona quando:
// - o Gabrielzinho abre pela primeira vez;
// - o usuário entra em Conteúdos;
// - o usuário volta para a Home;
// - a Home é reconstruída com innerHTML.
// ============================================================

function observarContainerUpdates() {

    function tentarCarregarUpdates() {

        const container =
            document.getElementById(
                "updates-container"
            );

        if (
            container &&
            container.dataset.carregado !==
            "true" &&
            container.dataset.carregando !==
            "true"
        ) {
            carregarUpdates();
        }

    }


    // Tenta imediatamente.
    tentarCarregarUpdates();


    // Observa futuras inserções da Home.
    const observer =
        new MutationObserver(
            function () {
                tentarCarregarUpdates();
            }
        );


    observer.observe(
        document.body,
        {
            childList: true,
            subtree: true
        }
    );

}


// Inicia o observador uma única vez.
if (
    !document.body.dataset
        .observerUpdatesGabrielzinho
) {

    document.body.dataset
        .observerUpdatesGabrielzinho =
        "true";

    observarContainerUpdates();

}


// ============================================================
// NAVEGAÇÃO INTERNA DO PROGRAMA GABRIELZINHO
// ============================================================
//
// O Gabrielzinho é carregado dentro do index.html.
// Portanto, as subpáginas NÃO devem usar window.location.href.
// Somente o conteúdo de #paginaGabrielzinho é substituído.
//
// Estrutura:
// index.html
//   -> main_gabrielzinho.html
//       -> #paginaGabrielzinho
//           -> Home / Postagens / Tools / outras subpáginas
// ============================================================

let htmlHomeGabrielzinho = null;
let paginaAtualGabrielzinho = "home";

function salvarHomeGabrielzinho() {
    const container =
        document.getElementById(
            "paginaGabrielzinho"
        );

    if (!container) {
        return;
    }

    /*
     * Salva a Home no momento em que o usuário vai sair dela.
     *
     * Isso é importante porque a Home pode ter sido alterada
     * depois que o HTML inicial entrou no DOM:
     *
     * - foto de perfil carregada pelo JavaScript;
     * - nome do usuário;
     * - links sociais;
     * - updates carregados via fetch();
     * - outras imagens/elementos atualizados dinamicamente.
     *
     * Antes, a Home era salva cedo demais, durante a inicialização.
     * Ao voltar, era restaurada uma versão antiga do HTML.
     */
    if (paginaAtualGabrielzinho === "home") {
        htmlHomeGabrielzinho =
            container.innerHTML;
    }
}


function carregarScriptUmaVez(src, id) {
    return new Promise(function (resolve, reject) {
        const existente = document.getElementById(id);

        if (existente) {
            resolve();
            return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.id = id;
        script.onload = resolve;
        script.onerror = reject;

        document.body.appendChild(script);
    });
}


function carregarCssUmaVez(href, id) {
    if (document.getElementById(id)) {
        return;
    }

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    link.id = id;

    document.head.appendChild(link);
}



// ============================================================
// CARREGAR COMPONENTE VOLTAR
// ============================================================
//
// Subpáginas que quiserem o botão de voltar devem possuir:
//
// <div id="voltarContainer"></div>
//
// O HTML real do botão fica em:
// windows_popups/gabrielzinho/componentes/voltar.html
// ============================================================

function carregarComponenteVoltar() {

    const container =
        document.getElementById(
            "voltarContainer"
        );

    if (!container) {
        return Promise.resolve();
    }

    return fetch(
        "windows_popups/gabrielzinho/componentes/voltar.html"
    )
        .then(function (response) {

            if (!response.ok) {
                throw new Error(
                    "Erro ao carregar voltar.html: " +
                    response.status
                );
            }

            return response.text();

        })
        .then(function (html) {

            const containerAtual =
                document.getElementById(
                    "voltarContainer"
                );

            if (!containerAtual) {
                return;
            }

            containerAtual.innerHTML =
                html;

            console.log(
                "↩️ Componente voltar carregado!"
            );

        })
        .catch(function (erro) {

            console.error(
                "❌ Erro ao carregar componente voltar:",
                erro
            );

        });

}


function abrirSubpaginaGabrielzinho(nomePagina) {
    salvarHomeGabrielzinho();

    const container = document.getElementById("paginaGabrielzinho");

    if (!container) {
        console.error("❌ #paginaGabrielzinho não encontrado.");
        return;
    }

    const paginas = {
        main_gabrielzinho:
            "windows_popups/gabrielzinho/main_gabrielzinho.html",
        postagens:
            "windows_popups/gabrielzinho/subpaginas/postagens.html",

        animes:
            "windows_popups/gabrielzinho/subpaginas/animes.html",

        filmes:
            "windows_popups/gabrielzinho/subpaginas/filmes.html",

        musicas:
            "windows_popups/gabrielzinho/subpaginas/musicas.html",

        series:
            "windows_popups/gabrielzinho/subpaginas/series.html",

        trabalhos:
            "windows_popups/gabrielzinho/subpaginas/trabalhos.html",

        lugares:
            "windows_popups/gabrielzinho/subpaginas/lugares.html",

        momentos:
            "windows_popups/gabrielzinho/subpaginas/momentos.html",

        tools:
            "windows_popups/gabrielzinho/tools.html"
    };

    const caminho = paginas[nomePagina];

    if (!caminho) {
        console.error(
            "❌ Subpágina do Gabrielzinho não cadastrada:",
            nomePagina
        );
        return;
    }

    fetch(caminho)
        .then(function (response) {
            if (!response.ok) {
                throw new Error(
                    "Erro HTTP " +
                    response.status +
                    " ao carregar " +
                    caminho
                );
            }

            return response.text();
        })
        .then(function (html) {
            container.innerHTML = html;
            paginaAtualGabrielzinho = nomePagina;

            // Carrega o componente externo de voltar,
            // caso a subpágina possua #voltarContainer.
            carregarComponenteVoltar();

            // Inicializações específicas de cada subpágina.
            if (nomePagina === "postagens") {
                carregarCssUmaVez(
                    "windows_popups/gabrielzinho/css/posts.css",
                    "gabrielzinhoPostsCss"
                );

                carregarScriptUmaVez(
                    "windows_popups/gabrielzinho/scripts/posts.js",
                    "gabrielzinhoPostsJs"
                )
                    .then(function () {
                        if (
                            typeof carregarPosts ===
                            "function"
                        ) {
                            carregarPosts();
                        }
                    })
                    .catch(function (erro) {
                        console.error(
                            "❌ Erro ao carregar posts.js:",
                            erro
                        );
                    });
            }


            if (nomePagina === "animes") {

                carregarCssUmaVez(
                    "windows_popups/gabrielzinho/css/animes.css",
                    "gabrielzinhoAnimesCss"
                );

                // IMPORTANTE:
                // feedback.js precisa carregar ANTES do animes.js

                carregarScriptUmaVez(
                    "windows_popups/gabrielzinho/scripts/feedback.js",
                    "gabrielzinhoFeedbackJs"
                )
                .then(function(){

                    return carregarScriptUmaVez(
                        "windows_popups/gabrielzinho/scripts/animes.js",
                        "gabrielzinhoAnimesJs"
                    );

                })
                .then(function(){

                    if(typeof carregarAnimes === "function"){
                        carregarAnimes();
                    }

                })
                .catch(function(erro){

                    console.error(
                        "❌ Erro ao carregar sistema de animes:",
                        erro
                    );

                });
            }
            if (nomePagina === "filmes") {

                carregarCssUmaVez(
                    "windows_popups/gabrielzinho/css/filmes.css",
                    "gabrielzinhoFilmesCss"
                );

                // AQUI CARREGA O FEEDBACK COMENTÁRIO
                carregarScriptUmaVez(
                    "windows_popups/gabrielzinho/scripts/feedback.js",
                    "gabrielzinhoFeedbackJs"
                )
                .then(function () {

                    return carregarScriptUmaVez(
                        "windows_popups/gabrielzinho/scripts/filmes.js",
                        "gabrielzinhoFilmesJs"
                    );

                })
                .then(function () {

                    if (
                        typeof carregarFilmes === "function"
                    ) {

                        carregarFilmes();

                    }

                })
                .catch(function (erro) {

                    console.error(
                        "❌ Erro ao carregar sistema de filmes:",
                        erro
                    );

                });

            }

        })
        .catch(function (erro) {
            console.error(
                "❌ Erro ao abrir subpágina:",
                erro
            );
        });
}


function voltarGabrielzinho() {
    const container =
        document.getElementById(
            "paginaGabrielzinho"
        );

    if (
        !container ||
        htmlHomeGabrielzinho === null
    ) {
        return;
    }

    /*
     * Restaura a versão MAIS RECENTE da Home,
     * salva imediatamente antes de abrir a subpágina.
     */
    container.innerHTML =
        htmlHomeGabrielzinho;

    paginaAtualGabrielzinho =
        "home";


    // ========================================================
    // REINICIALIZAR ELEMENTOS RESTAURADOS
    // ========================================================

    iniciarDiscordPopup();

    carregarPerfilUsuario();

    carregarSaudacaoUsuario();

    /*
     * Recarrega os updates para garantir que o conteúdo
     * esteja atualizado depois de voltar.
     */
    carregarUpdates();

    console.log(
        "🏠 Home do Gabrielzinho restaurada!"
    );
}


// ============================================================
// EVENTOS DE NAVEGAÇÃO POR DELEGAÇÃO
// ============================================================
//
// Funciona mesmo que menu/subpáginas tenham sido carregados
// posteriormente por fetch().
// ============================================================

if (!document.body.dataset.navegacaoGabrielzinhoAtiva) {
    document.body.dataset.navegacaoGabrielzinhoAtiva = "true";

    document.addEventListener(
        "click",
        function (event) {

            const linkPagina =
                event.target.closest(
                    "[data-gabrielzinho-pagina]"
                );

            if (linkPagina) {
                event.preventDefault();

                abrirSubpaginaGabrielzinho(
                    linkPagina.dataset.gabrielzinhoPagina
                );

                return;
            }


            const botaoVoltar =
                event.target.closest(
                    "[data-gabrielzinho-voltar]"
                );

            if (botaoVoltar) {
                event.preventDefault();
                voltarGabrielzinho();
            }

        }
    );
}


// ============================================================
// EXECUTA A INICIALIZAÇÃO SOMENTE QUANDO O HTML EXISTIR
// ============================================================
//
// Como main_gabrielzinho.html pode ser inserido via fetch(),
// o JavaScript pode carregar antes de #paginaGabrielzinho.
//
// Esta função garante que a inicialização aconteça somente
// quando a estrutura principal já estiver disponível.
// ============================================================

let gabrielzinhoInicializado =
    false;


function aguardarGabrielzinho() {

    if (gabrielzinhoInicializado) {
        return;
    }


    const pagina =
        document.getElementById(
            "paginaGabrielzinho"
        );


    if (pagina) {

        gabrielzinhoInicializado =
            true;


        iniciarGabrielzinho();

        return;

    }


    const observer =
        new MutationObserver(
            function () {

                const paginaEncontrada =
                    document.getElementById(
                        "paginaGabrielzinho"
                    );


                if (!paginaEncontrada) {
                    return;
                }


                observer.disconnect();


                if (
                    gabrielzinhoInicializado
                ) {
                    return;
                }


                gabrielzinhoInicializado =
                    true;


                iniciarGabrielzinho();

            }
        );


    observer.observe(
        document.body,
        {
            childList: true,
            subtree: true
        }
    );

}


// ============================================================
// INICIA O PROGRAMA
// ============================================================

aguardarGabrielzinho();


