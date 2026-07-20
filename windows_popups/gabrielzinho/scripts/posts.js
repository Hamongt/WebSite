// ============================================================
// 📝 GERENCIADOR DE POSTS DO GABRIELZINHO
// Caminho:
// windows_popups/gabrielzinho/scripts/posts.js
// ============================================================


// ============================================================
// 1. LISTA DE POSTS
// ============================================================
//
// PARA ADICIONAR UM NOVO POST:
//
// 1. Crie:
//    windows_popups/gabrielzinho/subpaginas/posts/post-4.html
//
// 2. Adicione:
//    { arquivo: "post-4.html", id: "post-4" }
//
// ============================================================

const posts = [
    { arquivo: "post-3.html", id: "post-3" },
    { arquivo: "post-2.html", id: "post-2" },
    { arquivo: "post-1.html", id: "post-1" },
    { arquivo: "post-4.html", id: "post-4" }
];


// ============================================================
// 2. CAMINHO BASE DOS POSTS
// ============================================================
//
// O programa continua rodando dentro do index.html.
// Por isso o fetch usa o caminho completo a partir da raiz
// do site, e não um caminho relativo ao arquivo posts.js.
//
// ============================================================

const CAMINHO_BASE_POSTS =
    "windows_popups/gabrielzinho/subpaginas/posts/";


// ============================================================
// 3. CARREGAR POSTS
// ============================================================

function carregarPosts() {

    const container =
        document.getElementById("postsContainer");

    if (!container) {
        console.warn(
            "⚠️ #postsContainer não encontrado."
        );

        return;
    }


    container.innerHTML = "";


    posts.forEach(function (post) {

        const caminho =
            CAMINHO_BASE_POSTS +
            post.arquivo;


        fetch(caminho)

            .then(function (response) {

                if (!response.ok) {

                    throw new Error(
                        "Erro ao carregar " +
                        post.id +
                        ": " +
                        response.status
                    );

                }

                return response.text();

            })

            .then(function (html) {

                /*
                 * A subpágina pode ter sido fechada
                 * enquanto o fetch estava acontecendo.
                 */
                const containerAtual =
                    document.getElementById(
                        "postsContainer"
                    );

                if (!containerAtual) {
                    return;
                }


                const div =
                    document.createElement(
                        "article"
                    );


                div.className =
                    "post-item";


                div.id =
                    post.id;


                div.innerHTML =
                    html;


                containerAtual.appendChild(
                    div
                );


                console.log(
                    `✅ Post "${post.id}" carregado!`
                );


                inicializarInteracoes(
                    post.id
                );

            })

            .catch(function (error) {

                console.error(
                    `❌ Erro ao carregar ${post.id}:`,
                    error
                );

            });

    });

}


// ============================================================
// 4. DADOS DOS POSTS
// ============================================================

function getDadosPost(postId) {

    const dados =
        localStorage.getItem(
            `post_${postId}`
        );


    if (dados) {

        try {

            return JSON.parse(
                dados
            );

        } catch (erro) {

            console.warn(
                "⚠️ Dados inválidos do post:",
                postId,
                erro
            );

        }

    }


    return {
        curtidas: 0,
        comentarios: []
    };

}


function salvarDadosPost(
    postId,
    dados
) {

    localStorage.setItem(

        `post_${postId}`,

        JSON.stringify(
            dados
        )

    );

}


// ============================================================
// 5. INICIALIZAR INTERAÇÕES
// ============================================================

function inicializarInteracoes(
    postId
) {

    const postElement =
        document.getElementById(
            postId
        );


    if (!postElement) {
        return;
    }


    const dados =
        getDadosPost(
            postId
        );


    // ========================================================
    // CURTIR
    // ========================================================

    const curtirBtn =
        postElement.querySelector(
            ".curtir"
        );


    const contadorCurtidas =
        postElement.querySelector(
            `#curtidas-${postId}`
        );


    if (contadorCurtidas) {

        contadorCurtidas.textContent =
            dados.curtidas;

    }


    if (
        curtirBtn &&
        curtirBtn.dataset.inicializado !==
        "true"
    ) {

        curtirBtn.dataset.inicializado =
            "true";


        curtirBtn.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                const dadosAtuais =
                    getDadosPost(
                        postId
                    );


                dadosAtuais.curtidas +=
                    1;


                salvarDadosPost(
                    postId,
                    dadosAtuais
                );


                if (
                    contadorCurtidas
                ) {

                    contadorCurtidas.textContent =
                        dadosAtuais.curtidas;

                }


                this.classList.add(
                    "ativo"
                );


                setTimeout(
                    () =>
                        this.classList.remove(
                            "ativo"
                        ),
                    400
                );

            }
        );

    }


    // ========================================================
    // COMENTAR
    // ========================================================

    const comentarBtn =
        postElement.querySelector(
            ".comentar"
        );


    const comentarioBox =
        postElement.querySelector(
            `#comentarioBox-${postId}`
        );


    const contadorComentarios =
        postElement.querySelector(
            `#comentarios-${postId}`
        );


    if (
        contadorComentarios
    ) {

        contadorComentarios.textContent =
            dados.comentarios.length;

    }


    if (
        comentarBtn &&
        comentarioBox &&
        comentarBtn.dataset.inicializado !==
        "true"
    ) {

        comentarBtn.dataset.inicializado =
            "true";


        comentarBtn.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();


                const estaAberto =
                    comentarioBox.style.display ===
                    "block";


                document
                    .querySelectorAll(
                        ".comentario-box"
                    )
                    .forEach(
                        function (box) {

                            box.style.display =
                                "none";

                        }
                    );


                comentarioBox.style.display =
                    estaAberto
                        ? "none"
                        : "block";


                if (!estaAberto) {

                    carregarComentarios(
                        postId
                    );

                }

            }
        );

    }


    // ========================================================
    // COMPARTILHAR
    // ========================================================

    const compartilharBtn =
        postElement.querySelector(
            ".compartilhar"
        );


    /*
     * Os posts antigos possuem onclick="copiarLink()".
     * Portanto não adicionamos outro listener aqui,
     * evitando copiar/alertar duas vezes.
     */

}


// ============================================================
// 6. CARREGAR COMENTÁRIOS
// ============================================================

function carregarComentarios(
    postId
) {

    const dados =
        getDadosPost(
            postId
        );


    const lista =
        document.getElementById(
            `listaComentarios-${postId}`
        );


    if (!lista) {
        return;
    }


    lista.innerHTML = "";


    if (
        dados.comentarios.length ===
        0
    ) {

        lista.innerHTML =
            '<p class="sem-comentarios">' +
            'Nenhum comentário ainda. ' +
            'Seja o primeiro!' +
            '</p>';


        return;

    }


    const autoresPermitidos = [

        localStorage.getItem(
            "usuarioLogado"
        ),

        localStorage.getItem(
            "nomeUsuario"
        ),

        "Gabriel Taveira",

        "Gabrielzinho!",

        "Gabriel",

        "Anônimo"

    ];


    dados.comentarios.forEach(
        function (
            comentario,
            index
        ) {

            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "comentario-item";


            const podeDeletar =
                autoresPermitidos.includes(
                    comentario.autor
                );


            /*
             * Mantém compatibilidade com os posts antigos.
             */
            div.innerHTML = `

                <div class="autor">
                    👤 ${comentario.autor || "Anônimo"}
                </div>

                <div class="texto">
                    ${comentario.texto}
                </div>

                <div class="data-comentario">
                    ${comentario.data || ""}
                </div>

                ${
                    podeDeletar

                        ? `<button
                               class="btn-deletar-comentario"
                               onclick="deletarComentario('${postId}', ${index})"
                               title="Apagar comentário"
                           >
                               🗑️
                           </button>`

                        : ""
                }

            `;


            lista.appendChild(
                div
            );

        }
    );

}


// ============================================================
// 7. ADICIONAR COMENTÁRIO
// ============================================================

function adicionarComentario(
    postId
) {

    const input =
        document.getElementById(
            `inputComentario-${postId}`
        );


    if (!input) {
        return;
    }


    const texto =
        input.value.trim();


    if (texto === "") {

        alert(
            "Digite algo antes de comentar!"
        );

        return;

    }


    const dados =
        getDadosPost(
            postId
        );


    const nomeUsuario =

        localStorage.getItem(
            "nomeUsuario"
        )

        ||

        localStorage.getItem(
            "usuarioLogado"
        )

        ||

        "Anônimo";


    const agora =
        new Date();


    dados.comentarios.push({

        autor:
            nomeUsuario,

        texto:
            texto,

        data:
            agora.toLocaleDateString(
                "pt-BR"
            )
            +
            " "
            +
            agora.toLocaleTimeString(
                "pt-BR",
                {
                    hour:
                        "2-digit",

                    minute:
                        "2-digit"
                }
            )

    });


    salvarDadosPost(
        postId,
        dados
    );


    const contadorComentarios =
        document.getElementById(
            `comentarios-${postId}`
        );


    if (
        contadorComentarios
    ) {

        contadorComentarios.textContent =
            dados.comentarios.length;

    }


    input.value =
        "";


    carregarComentarios(
        postId
    );

}


// ============================================================
// 8. DELETAR COMENTÁRIO
// ============================================================

function deletarComentario(
    postId,
    index
) {

    if (
        !confirm(
            "🗑️ Tem certeza que deseja apagar este comentário?"
        )
    ) {

        return;

    }


    const dados =
        getDadosPost(
            postId
        );


    dados.comentarios.splice(
        index,
        1
    );


    salvarDadosPost(
        postId,
        dados
    );


    const contadorComentarios =
        document.getElementById(
            `comentarios-${postId}`
        );


    if (
        contadorComentarios
    ) {

        contadorComentarios.textContent =
            dados.comentarios.length;

    }


    carregarComentarios(
        postId
    );

}


// ============================================================
// 9. FECHAR COMENTÁRIOS
// ============================================================

function fecharComentarios(
    postId
) {

    const box =
        document.getElementById(
            `comentarioBox-${postId}`
        );


    if (box) {

        box.style.display =
            "none";

    }

}


// ============================================================
// 10. COMPARTILHAR
// ============================================================

function copiarLink() {

    const url =
        window.location.href;


    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard
            .writeText(
                url
            )
            .then(
                function () {

                    alert(
                        "🔗 Link copiado para a área de transferência!"
                    );

                }
            )
            .catch(
                function () {

                    copiarLinkFallback(
                        url
                    );

                }
            );


        return;

    }


    copiarLinkFallback(
        url
    );

}


function copiarLinkFallback(
    url
) {

    const input =
        document.createElement(
            "input"
        );


    input.value =
        url;


    document.body.appendChild(
        input
    );


    input.select();


    document.execCommand(
        "copy"
    );


    document.body.removeChild(
        input
    );


    alert(
        "🔗 Link copiado para a área de transferência!"
    );

}


// ============================================================
// IMPORTANTE
// ============================================================
//
// NÃO usamos:
//
// document.addEventListener(
//     "DOMContentLoaded",
//     carregarPosts
// );
//
// A página postagens.html é carregada dinamicamente.
// O assets/scripts/gabrielzinho.js chama carregarPosts()
// depois que:
// 1. postagens.html entra em #paginaGabrielzinho;
// 2. posts.js é carregado.
//
// ============================================================
