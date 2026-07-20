
function mudarIcone(hover) {

    const icone = document.getElementById("iconeConteudo");

    if (hover) {
        icone.src = "../../assets/icones/posts_aberto.png";
    } else {
        icone.src = "../../assets/icones/posts.png";
    }

}
