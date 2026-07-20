// ============================================================
// MENU DO GABRIELZINHO
// Hover do ícone "Conteúdos"
// ============================================================

console.log("✅ gabrielzinho_menu.js executado!");

document.addEventListener("mouseover", function (event) {
    const botao = event.target.closest("#conteudosLink");
    if (!botao) return;

    const icone = botao.querySelector("#iconeConteudo");
    if (!icone) return;

    icone.src = "assets/icones/posts_aberto.png";
});

document.addEventListener("mouseout", function (event) {
    const botao = event.target.closest("#conteudosLink");
    if (!botao) return;

    if (
        event.relatedTarget &&
        botao.contains(event.relatedTarget)
    ) {
        return;
    }

    const icone = botao.querySelector("#iconeConteudo");
    if (!icone) return;

    icone.src = "assets/icones/posts.png";
});
