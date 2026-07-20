console.log("🚀 Gabrielzinho carregado!");

// ============================================================
// INICIALIZAÇÃO DO PROGRAMA GABRIELZINHO
// Como o programa é carregado via fetch(), não usamos
// DOMContentLoaded aqui.
// ============================================================

function iniciarGabrielzinho() {
    iniciarPlayerMusica();
    iniciarDiscordPopup();
    iniciarRelogio();
    carregarSaudacaoUsuario();
    iniciarLogout();
    carregarPerfilUsuario();
    carregarUpdates()
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


    console.log(
        "🎮 Popup do Discord iniciado!"
    );

}


// ============================================================
// RELÓGIO EM TEMPO REAL
// ============================================================

let intervaloRelogioGabrielzinho = null;

function atualizarRelogioGabrielzinho() {
    const agora = new Date();

    const horas =
        String(agora.getHours())
            .padStart(2, "0");

    const minutos =
        String(agora.getMinutes())
            .padStart(2, "0");

    const dia =
        String(agora.getDate())
            .padStart(2, "0");

    const mes =
        String(agora.getMonth() + 1)
            .padStart(2, "0");

    const ano =
        agora.getFullYear();

    const horaAtual =
        document.getElementById("horaAtual");

    const dataAtual =
        document.getElementById("dataAtual");

    if (horaAtual) {
        horaAtual.textContent =
            `${horas}:${minutos}`;
    }

    if (dataAtual) {
        dataAtual.textContent =
            `${dia}/${mes}/${ano}`;
    }
}


function iniciarRelogio() {
    atualizarRelogioGabrielzinho();

    if (intervaloRelogioGabrielzinho) {
        clearInterval(
            intervaloRelogioGabrielzinho
        );
    }

    intervaloRelogioGabrielzinho =
        setInterval(
            atualizarRelogioGabrielzinho,
            1000
        );
}


// ============================================================
// SAUDAÇÃO DO USUÁRIO LOGADO
// ============================================================

function carregarSaudacaoUsuario() {
    const usuarioLogado =
        localStorage.getItem(
            "usuarioLogado"
        );

    const nomeUsuario =
        localStorage.getItem(
            "nomeUsuario"
        ) || usuarioLogado;

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
// BOTÃO DE SAIR / LOGOUT
// ============================================================

function iniciarLogout() {
    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );

    if (!logoutBtn) {
        return;
    }

    // Evita duplicar evento.
    if (
        logoutBtn.dataset.inicializado ===
        "true"
    ) {
        return;
    }

    logoutBtn.dataset.inicializado =
        "true";

    logoutBtn.addEventListener(
        "click",
        function () {
            localStorage.removeItem(
                "logado"
            );

            localStorage.removeItem(
                "usuarioLogado"
            );

            localStorage.removeItem(
                "nomeUsuario"
            );

            window.location.href =
                "lo.html";
        }
    );
}


// ============================================================
// CARREGAR PERFIL DO USUÁRIO
// ============================================================

function carregarPerfilUsuario() {
    const usuarioLogado =
        localStorage.getItem(
            "usuarioLogado"
        );

    let usuarios;

    if (
        typeof getUsuarios ===
        "function"
    ) {
        usuarios = getUsuarios();
    } else {
        usuarios = JSON.parse(
            localStorage.getItem(
                "usuarios"
            ) || "{}"
        );
    }

    if (
        !usuarioLogado ||
        !usuarios[usuarioLogado]
    ) {
        return;
    }

    const perfil =
        usuarios[usuarioLogado]
            .perfil || {};

    // Nome.
    const nomeEl =
        document.getElementById(
            "nomePerfil"
        );

    if (nomeEl) {
        nomeEl.textContent =
            perfil.nomeExibicao ||
            usuarioLogado;
    }

    // Foto.
    const fotoEl =
        document.getElementById(
            "fotoPerfil"
        );

    if (
        fotoEl &&
        perfil.fotoPerfil
    ) {
        fotoEl.src =
            perfil.fotoPerfil;
    }

    // Links sociais dinâmicos.
    const socialContainer =
        document.getElementById(
            "socialLinks"
        );

    if (!socialContainer) {
        return;
    }

    socialContainer.innerHTML = "";

    const links = [
        {
            url: perfil.tiktok,
            icon: "📱",
            nome: "TikTok"
        },
        {
            url: perfil.instagram,
            icon: "📸",
            nome: "Instagram"
        },
        {
            url: perfil.linkedin,
            icon: "💼",
            nome: "LinkedIn"
        },
        {
            url: perfil.discord,
            icon: "🎮",
            nome: "Discord"
        }
    ];

    let temLink = false;

    links.forEach(function (link) {
        if (!link.url) {
            return;
        }

        temLink = true;

        const a =
            document.createElement(
                "a"
            );

        a.href =
            link.url.startsWith(
                "http"
            )
                ? link.url
                : "#" + link.url;

        a.target =
            "_blank";

        a.innerHTML =
            `${link.icon} ${link.nome}`;

        socialContainer.appendChild(
            a
        );
    });

    if (!temLink) {
        const p =
            document.createElement(
                "p"
            );

        p.style.cssText =
            "color: rgba(255,255,255,0.3); font-size: 13px; margin: 5px 0 0 0;";

        p.textContent =
            '✏️ Nenhuma rede social adicionada. Vá em "Tools" para editar seu perfil!';

        socialContainer.appendChild(
            p
        );
    }
}


// ==========================================
// CARREGA UPDATES / CHANGELOG
// ==========================================

function carregarUpdates() {

    const updatesContainer =
        document.getElementById("updates-container");

    if (!updatesContainer) {
        console.warn(
            "⚠️ Container de updates não encontrado."
        );

        return;
    }

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

            updatesContainer.innerHTML =
                html;

            console.log(
                "📌 Updates carregados!"
            );

        })
        .catch(function (error) {

            console.error(
                "❌ Erro ao carregar updates:",
                error
            );

        });

}


// ============================================================
// EXECUTA A INICIALIZAÇÃO
// ============================================================

iniciarGabrielzinho();


