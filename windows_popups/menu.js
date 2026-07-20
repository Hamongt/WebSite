function iniciarMenuGabrielzinho() {

    const linkConteudos =
        document.getElementById("conteudosLink");

    const icone =
        document.getElementById("iconeConteudo");

    if (!linkConteudos || !icone) {
        return;
    }

    linkConteudos.addEventListener(
        "mouseenter",
        function () {
            icone.src =
                "assets/icones/posts_aberto.png";
        }
    );

    linkConteudos.addEventListener(
        "mouseleave",
        function () {
            icone.src =
                "assets/icones/posts.png";
        }
    );

}

iniciarMenuGabrielzinho();
