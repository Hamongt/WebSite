console.log('⚙️ Página de edição carregada!');

const usuarioLogado = localStorage.getItem('usuarioLogado');

if (!usuarioLogado) {
    window.location.href = 'lo.html';
}

// ===== FUNÇÕES =====
function getUsuarios() {
    const dados = localStorage.getItem('usuarios');
    if (dados) {
        return JSON.parse(dados);
    }
    // Se não houver dados, cria um padrão
    const padrao = {
        'Gabriel': {
            senha: '1234',
            email: 'gabrieltaveira12@gmail.com',
            criadoEm: new Date().toISOString(),
            perfil: {
                nomeExibicao: 'Gabrielzinho!',
                fotoPerfil: 'assets/icones/Sem título - 17 de julho de 2026 às 17.46.02.png',
                tiktok: 'https://www.tiktok.com/@gabrieltaveira1',
                instagram: 'https://www.instagram.com/gabriel_taveira12/',
                linkedin: 'https://www.linkedin.com/in/gabriel-taveira12',
                discord: '@seu_usuario'
            }
        }
    };
    localStorage.setItem('usuarios', JSON.stringify(padrao));
    return padrao;
}

function salvarUsuarios(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

// ===== CARREGAR DADOS DO USUÁRIO =====
function carregarPerfil() {
    console.log('🔄 Carregando perfil de:', usuarioLogado);
    
    const usuarios = getUsuarios();
    const usuario = usuarios[usuarioLogado];
    
    if (!usuario) {
        console.error('❌ Usuário não encontrado!');
        return;
    }
    
    // Se o usuário não tiver perfil, cria um padrão
    if (!usuario.perfil) {
        usuario.perfil = {
            nomeExibicao: usuarioLogado,
            fotoPerfil: '',
            tiktok: '',
            instagram: '',
            linkedin: '',
            discord: ''
        };
        salvarUsuarios(usuarios);
    }
    
    const perfil = usuario.perfil;
    
    console.log('📝 Dados carregados:', perfil);
    
    // ===== PREENCHE OS CAMPOS =====
    const nomeInput = document.getElementById('editNome');
    const fotoInput = document.getElementById('editFoto');
    const tiktokInput = document.getElementById('editTiktok');
    const instagramInput = document.getElementById('editInstagram');
    const linkedinInput = document.getElementById('editLinkedin');
    const discordInput = document.getElementById('editDiscord');
    
    if (nomeInput) nomeInput.value = perfil.nomeExibicao || usuarioLogado;
    if (fotoInput) fotoInput.value = perfil.fotoPerfil || '';
    if (tiktokInput) tiktokInput.value = perfil.tiktok || '';
    if (instagramInput) instagramInput.value = perfil.instagram || '';
    if (linkedinInput) linkedinInput.value = perfil.linkedin || '';
    if (discordInput) discordInput.value = perfil.discord || '';
    
    // Atualiza pré-visualização
    const previewNome = document.getElementById('previewNome');
    const previewImg = document.getElementById('previewImg');
    if (previewNome) previewNome.textContent = perfil.nomeExibicao || usuarioLogado;
    if (previewImg && perfil.fotoPerfil) {
        previewImg.src = perfil.fotoPerfil;
    }
    
    console.log('✅ Perfil carregado com sucesso!');
}

// ===== SALVAR PERFIL =====
function salvarPerfil() {
    const nomeInput = document.getElementById('editNome');
    const fotoInput = document.getElementById('editFoto');
    const tiktokInput = document.getElementById('editTiktok');
    const instagramInput = document.getElementById('editInstagram');
    const linkedinInput = document.getElementById('editLinkedin');
    const discordInput = document.getElementById('editDiscord');
    
    const nomeExibicao = nomeInput ? nomeInput.value.trim() : '';
    const fotoPerfil = fotoInput ? fotoInput.value.trim() : '';
    const tiktok = tiktokInput ? tiktokInput.value.trim() : '';
    const instagram = instagramInput ? instagramInput.value.trim() : '';
    const linkedin = linkedinInput ? linkedinInput.value.trim() : '';
    const discord = discordInput ? discordInput.value.trim() : '';
    
    console.log('📝 Salvando:', { nomeExibicao, fotoPerfil, tiktok, instagram, linkedin, discord });
    
    // ===== VALIDAÇÃO =====
    if (nomeExibicao === '') {
        document.getElementById('perfilErro').textContent = '⚠️ O nome não pode ficar vazio!';
        document.getElementById('perfilErro').className = 'erro-login aviso';
        return;
    }
    
    const usuarios = getUsuarios();
    
    if (!usuarios[usuarioLogado]) {
        document.getElementById('perfilErro').textContent = '❌ Usuário não encontrado!';
        document.getElementById('perfilErro').className = 'erro-login';
        return;
    }
    
    // ===== SALVA =====
    usuarios[usuarioLogado].perfil = {
        nomeExibicao: nomeExibicao,
        fotoPerfil: fotoPerfil,
        tiktok: tiktok,
        instagram: instagram,
        linkedin: linkedin,
        discord: discord
    };
    
    salvarUsuarios(usuarios);
    
    // Atualiza o nome na sessão
    localStorage.setItem('nomeUsuario', nomeExibicao);
    
    document.getElementById('perfilErro').textContent = '✅ Perfil salvo com sucesso!';
    document.getElementById('perfilErro').className = 'erro-login sucesso';
    
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// ===== EVENTOS =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Página pronta, carregando perfil...');
    carregarPerfil();
    
    const salvarBtn = document.getElementById('salvarPerfilBtn');
    if (salvarBtn) {
        salvarBtn.addEventListener('click', salvarPerfil);
    }
    
    // ===== PRÉ-VISUALIZAÇÃO AO VIVO =====
    const previewImg = document.getElementById('previewImg');
    const previewNome = document.getElementById('previewNome');
    const editNome = document.getElementById('editNome');
    const editFoto = document.getElementById('editFoto');
    
    if (editNome) {
        editNome.addEventListener('input', function() {
            if (previewNome) {
                previewNome.textContent = this.value || 'Seu nome';
            }
        });
    }
    
    if (editFoto) {
        editFoto.addEventListener('input', function() {
            if (previewImg && this.value) {
                previewImg.src = this.value;
                previewImg.onerror = function() {
                    this.src = 'assets/icones/padrao.png';
                };
            }
        });
    }
});// ===== SALVAR PERFIL =====
function salvarPerfil() {
    // ... seu código existente ...

    // ===== SALVA =====
    usuarios[usuarioLogado].perfil = {
        nomeExibicao: nomeExibicao,
        fotoPerfil: fotoPerfil,
        tiktok: tiktok,
        instagram: instagram,
        linkedin: linkedin,
        discord: discord
    };
    
    salvarUsuarios(usuarios);
    
    // ===== ATUALIZA O NOME NA SESSÃO =====
    localStorage.setItem('nomeUsuario', nomeExibicao); // ← ESSA LINHA É CRUCIAL!
    
    // ... resto do código ...
}