console.log('🔐 Tela de login carregada!');

function getUsuarios() {
    const dados = localStorage.getItem('usuarios');
    if (dados) {
        return JSON.parse(dados);
    }
    const usuariosPadrao = {
        'Gabriel': {
            senha: '1234',
            nome: 'Gabrielzinho!',
            email: 'gabrieltaveira12@gmail.com',
            criadoEm: new Date().toISOString()
        }
    };
    localStorage.setItem('usuarios', JSON.stringify(usuariosPadrao));
    return usuariosPadrao;
}

const loginBtn = document.getElementById('loginBtn');
const loginUser = document.getElementById('loginUser');
const loginPass = document.getElementById('loginPass');
const loginErro = document.getElementById('loginErro');

function fazerLogin() {
    const usuario = loginUser.value.trim();
    const senha = loginPass.value.trim();
    
    if (usuario === '' || senha === '') {
        loginErro.textContent = '⚠️ Preencha todos os campos!';
        loginErro.className = 'erro-login aviso';
        return;
    }
    
    const usuarios = getUsuarios();
    
    if (usuarios[usuario] && usuarios[usuario].senha === senha) {
        loginErro.textContent = '✅ Login realizado! Redirecionando...';
        loginErro.className = 'erro-login sucesso';
        
        localStorage.setItem('logado', 'true');
        localStorage.setItem('usuarioLogado', usuario);
        localStorage.setItem('nomeUsuario', usuarios[usuario].nome || usuario);
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 800);
    } else {
        loginErro.textContent = '❌ Usuário ou senha incorretos!';
        loginErro.className = 'erro-login';
        loginPass.value = '';
        loginPass.focus();
    }
}

loginBtn.addEventListener('click', fazerLogin);

loginPass.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') fazerLogin();
});

if (localStorage.getItem('logado') === 'true') {
    window.location.href = 'index.html';
}