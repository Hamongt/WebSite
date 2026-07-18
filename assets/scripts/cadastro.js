console.log('📝 Tela de cadastro carregada!');

// ============================================================
// FUNÇÕES DO BANCO DE DADOS
// ============================================================
function getUsuarios() {
    const dados = localStorage.getItem('usuarios');
    if (dados) {
        return JSON.parse(dados);
    }
    // Cria um usuário padrão se não existir nenhum
    const padrao = {
        'Gabriel': {
            senha: '1234',
            email: 'gabrieltaveira12@gmail.com',
            criadoEm: new Date().toISOString(),
            perfil: {
                nomeExibicao: 'Gabrielzinho!',
                fotoPerfil: 'assets/icones/padrao.png',
                tiktok: '',
                instagram: '',
                linkedin: '',
                discord: ''
            },
            pagina: {
                titulo: 'Bem-vindo ao Mundo do Gabriel! 🌊',
                subtitulo: 'Inspiração Fruit gear aero',
                descricao: '🌊 Frutiger Aero • Windows 7 • Y2K',
                corFundo: '#00b4db'
            }
        }
    };
    localStorage.setItem('usuarios', JSON.stringify(padrao));
    return padrao;
}

function salvarUsuarios(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    console.log('💾 Usuários salvos:', usuarios);
}

// ============================================================
// ELEMENTOS DO FORMULÁRIO
// ============================================================
const cadBtn = document.getElementById('cadBtn');
const cadUser = document.getElementById('cadUser');
const cadEmail = document.getElementById('cadEmail');
const cadPass = document.getElementById('cadPass');
const cadConfirm = document.getElementById('cadConfirm');
const cadNome = document.getElementById('cadNome');
const cadErro = document.getElementById('cadErro');

// ============================================================
// FUNÇÃO DE CADASTRO
// ============================================================
function fazerCadastro() {
    console.log('🔄 Tentando criar conta...');
    
    const usuario = cadUser.value.trim();
    const email = cadEmail.value.trim();
    const senha = cadPass.value.trim();
    const confirm = cadConfirm.value.trim();
    const nomeExibicao = cadNome.value.trim() || usuario;
    
    console.log('📝 Dados do formulário:', { usuario, email, senha, confirm, nomeExibicao });
    
    // ===== VALIDAÇÕES =====
    if (usuario === '' || email === '' || senha === '' || confirm === '') {
        cadErro.textContent = '⚠️ Preencha todos os campos!';
        cadErro.className = 'erro-login aviso';
        console.log('❌ Campos vazios!');
        return;
    }
    
    const usuarios = getUsuarios();
    console.log('📚 Usuários existentes:', Object.keys(usuarios));
    
    if (usuarios[usuario]) {
        cadErro.textContent = '❌ Este usuário já existe! Tente outro.';
        cadErro.className = 'erro-login';
        cadUser.value = '';
        cadUser.focus();
        console.log('❌ Usuário já existe!');
        return;
    }
    
    if (senha !== confirm) {
        cadErro.textContent = '❌ As senhas não coincidem!';
        cadErro.className = 'erro-login';
        cadPass.value = '';
        cadConfirm.value = '';
        cadPass.focus();
        console.log('❌ Senhas não coincidem!');
        return;
    }
    
    if (senha.length < 4) {
        cadErro.textContent = '⚠️ A senha deve ter pelo menos 4 caracteres!';
        cadErro.className = 'erro-login aviso';
        cadPass.value = '';
        cadPass.focus();
        console.log('❌ Senha muito curta!');
        return;
    }
    
    // ===== CRIA O NOVO USUÁRIO =====
    console.log('✅ Criando novo usuário...');
    
    usuarios[usuario] = {
        senha: senha,
        email: email,
        criadoEm: new Date().toISOString(),
        perfil: {
            nomeExibicao: nomeExibicao,
            fotoPerfil: 'assets/icones/padrao.png',
            tiktok: '',
            instagram: '',
            linkedin: '',
            discord: ''
        },
        pagina: {
            titulo: 'Bem-vindo ao mundo de ' + nomeExibicao + '! 🎉',
            subtitulo: 'Minha página personalizada',
            descricao: '🌊 Frutiger Aero • Windows 7 • Y2K',
            corFundo: '#00b4db'
        }
    };
    
    salvarUsuarios(usuarios);
    console.log('✅ Usuário criado com sucesso!');
    
    // ===== LIMPA O FORMULÁRIO =====
    cadErro.textContent = '✅ Conta criada com sucesso! Redirecionando...';
    cadErro.className = 'erro-login sucesso';
    
    cadUser.value = '';
    cadEmail.value = '';
    cadPass.value = '';
    cadConfirm.value = '';
    cadNome.value = '';
    
    // ===== REDIRECIONA PARA O LOGIN =====
    setTimeout(() => {
        console.log('🔄 Redirecionando para o login...');
        window.location.href = 'lo.html';
    }, 1500);
}

// ============================================================
// EVENTOS
// ============================================================
if (cadBtn) {
    cadBtn.addEventListener('click', fazerCadastro);
    console.log('✅ Botão "Criar conta" encontrado!');
} else {
    console.error('❌ Botão "Criar conta" NÃO encontrado!');
}

if (cadConfirm) {
    cadConfirm.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            fazerCadastro();
        }
    });
}

// ============================================================
// VERIFICA SE JÁ ESTÁ LOGADO
// ============================================================
if (localStorage.getItem('logado') === 'true') {
    console.log('👤 Usuário já está logado, redirecionando...');
    window.location.href = 'index.html';
}

// Mostra quantos usuários estão cadastrados
const usuarios = getUsuarios();
console.log('👥 Total de usuários cadastrados:', Object.keys(usuarios).length);