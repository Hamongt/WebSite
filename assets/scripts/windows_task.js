document.addEventListener("DOMContentLoaded", function () {

    const programas = document.querySelectorAll(".taskbar-program");

    programas.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const caminho = botao.dataset.program;
            const id = botao.dataset.id;

            if (!caminho || !id) {
                console.error(
                    "Programa sem data-program ou data-id:",
                    botao
                );

                return;
            }

            /*
             * Envia uma mensagem para o index.html
             * mesmo estando dentro de um iframe.
             */
            window.parent.postMessage(
                {
                    tipo: "abrirPrograma",
                    caminho: caminho,
                    id: id
                },
                "*"
            );

        });

    });

});