console.log("Site carregado!");

// ==========================================
// PLAYER DE MÚSICA
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("musicaAmbiente");
    const btnPlay = document.getElementById("playPauseBtn");
    const volumeControl = document.getElementById("volumeControl");
    const volumeLabel = document.getElementById("volumeLabel");

    if (!audio || !btnPlay) {
        console.error("❌ Elementos do player não encontrados!");
        return;
    }

    console.log("✅ Player de música encontrado!");

    // Volume inicial
    audio.volume = 0.03;

    if (volumeControl) volumeControl.value = 0.03;
    if (volumeLabel) volumeLabel.textContent = "3%";

    let tocando = true;

    // Tocar automaticamente
    audio.play().then(() => {
        console.log("🎵 Música tocando!");
    }).catch(() => {
        console.log("⏸️ Autoplay bloqueado. Clique no play.");
        tocando = false;
        btnPlay.textContent = "▶️";
    });

    // Play/Pause
    btnPlay.addEventListener("click", function () {
        if (tocando) {
            audio.pause();
            tocando = false;
            btnPlay.textContent = "▶️";
            console.log("⏸️ Música pausada");
        } else {
            audio.play();
            tocando = true;
            btnPlay.textContent = "⏸️";
            console.log("▶️ Música tocando");
        }
    });

    // Controle de Volume
    if (volumeControl) {
        volumeControl.addEventListener("input", function () {
            const valor = parseFloat(this.value);
            audio.volume = valor;

            const percentual = Math.round(valor * 100);

            if (volumeLabel) {
                volumeLabel.textContent = percentual + "%";
            }

            console.log("🔊 Volume:", percentual + "%");
        });
    }

    // Loop
    audio.addEventListener("ended", function () {
        audio.currentTime = 0;
        audio.play();
        console.log("🔄 Música reiniciou");
    });
});

// ==========================================
// BALÃO DO DISCORD
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
    const discordBtn = document.getElementById("discordBtn");
    const discordPopup = document.getElementById("discordPopup");
    const fecharPopup = document.getElementById("fecharPopup");

    if (discordBtn && discordPopup) {
        discordBtn.addEventListener("click", function (e) {
            e.preventDefault();
            discordPopup.classList.toggle("ativo");
        });

        if (fecharPopup) {
            fecharPopup.addEventListener("click", function (e) {
                e.stopPropagation();
                discordPopup.classList.remove("ativo");
            });
        }

        document.addEventListener("click", function (e) {
            if (
                !discordBtn.contains(e.target) &&
                !discordPopup.contains(e.target)
            ) {
                discordPopup.classList.remove("ativo");
            }
        });

        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                discordPopup.classList.remove("ativo");
            }
        });
    }
});

// ==========================================
// RELÓGIO EM TEMPO REAL
// ==========================================
function atualizarRelogio() {
    const agora = new Date();

    const horas = String(agora.getHours()).padStart(2, "0");
    const minutos = String(agora.getMinutes()).padStart(2, "0");
    const horaFormatada = `${horas}:${minutos}`;

    const dia = String(agora.getDate()).padStart(2, "0");
    const mes = String(agora.getMonth() + 1).padStart(2, "0");
    const ano = agora.getFullYear();
    const dataFormatada = `${dia}/${mes}/${ano}`;

    const horaAtual = document.getElementById("horaAtual");
    const dataAtual = document.getElementById("dataAtual");

    if (horaAtual) horaAtual.textContent = horaFormatada;
    if (dataAtual) dataAtual.textContent = dataFormatada;
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();

console.log("🕐 Relógio iniciado!");
console.log('🚀 Página principal carregada!');

// ============================================================
// 1. VERIFICA LOGIN
// ============================================================
const usuarioLogado = localStorage.getItem('usuarioLogado');
const nomeUsuario = localStorage.getItem('nomeUsuario') || usuarioLogado;

if (usuarioLogado) {
    console.log('👤 Bem-vindo, ' + nomeUsuario + '!');
    
    const saudacao = document.getElementById('saudacao');
    if (saudacao) {
        saudacao.textContent = 'Olá, ' + nomeUsuario + '! 🎉';
    }
}

// ============================================================
// 2. BOTÃO DE SAIR
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logoutBtn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Limpa os dados da sessão
            localStorage.removeItem('logado');
            localStorage.removeItem('usuarioLogado');
            localStorage.removeItem('nomeUsuario');
            
            // Redireciona para a tela de login
            window.location.href = 'lo.html';
        });
    }
});

// ============================================================
// 3. RELÓGIO
// ============================================================
function atualizarRelogio() {
    const agora = new Date();
    
    const horas = String(agora.getHours()).padStart(2, '0');
    const minutos = String(agora.getMinutes()).padStart(2, '0');
    const horaFormatada = horas + ':' + minutos;
    
    const dia = String(agora.getDate()).padStart(2, '0');
    const mes = String(agora.getMonth() + 1).padStart(2, '0');
    const ano = agora.getFullYear();
    const dataFormatada = dia + '/' + mes + '/' + ano;
    
    const horaEl = document.getElementById('horaAtual');
    const dataEl = document.getElementById('dataAtual');
    
    if (horaEl) horaEl.textContent = horaFormatada;
    if (dataEl) dataEl.textContent = dataFormatada;
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio();

// ============================================================
// CARREGAR PERFIL DO USUÁRIO
// ============================================================
function carregarPerfilUsuario() {
    const usuarioLogado = localStorage.getItem('usuarioLogado');
    const usuarios = getUsuarios ? getUsuarios() : JSON.parse(localStorage.getItem('usuarios') || '{}');
    
    if (!usuarioLogado || !usuarios[usuarioLogado]) return;
    
    const perfil = usuarios[usuarioLogado].perfil || {};
    
    // Nome
    const nomeEl = document.getElementById('nomePerfil');
    if (nomeEl) nomeEl.textContent = perfil.nomeExibicao || usuarioLogado;
    
    // Foto
    const fotoEl = document.getElementById('fotoPerfil');
    if (fotoEl && perfil.fotoPerfil) {
        fotoEl.src = perfil.fotoPerfil;
    }
    
    // Links sociais
    const socialContainer = document.getElementById('socialLinks');
    if (socialContainer) {
        socialContainer.innerHTML = '';
        
        const links = [
            { url: perfil.tiktok, icon: '📱', nome: 'TikTok' },
            { url: perfil.instagram, icon: '📸', nome: 'Instagram' },
            { url: perfil.linkedin, icon: '💼', nome: 'LinkedIn' },
            { url: perfil.discord, icon: '🎮', nome: 'Discord' }
        ];
        
        let temLink = false;
        links.forEach(link => {
            if (link.url) {
                temLink = true;
                const a = document.createElement('a');
                a.href = link.url.startsWith('http') ? link.url : '#' + link.url;
                a.target = '_blank';
                a.innerHTML = `${link.icon} ${link.nome}`;
                socialContainer.appendChild(a);
            }
        });
        
        if (!temLink) {
            const p = document.createElement('p');
            p.style.cssText = 'color: rgba(255,255,255,0.3); font-size: 13px; margin: 5px 0 0 0;';
            p.textContent = '✏️ Nenhuma rede social adicionada. Vá em "Tools" para editar seu perfil!';
            socialContainer.appendChild(p);
        }
    }
}

// Chamar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    // ... seu código existente ...
    carregarPerfilUsuario();
});