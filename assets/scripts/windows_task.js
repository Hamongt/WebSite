function iniciarWindowsTaskbar() {

    const programas =
        document.querySelectorAll(".taskbar-program");

    console.log(
        "Programas encontrados na taskbar:",
        programas.length
    );

    programas.forEach(function (botao) {

        botao.addEventListener("click", function () {

            const caminho =
                botao.dataset.program;

            const id =
                botao.dataset.id;

            console.log(
                "Abrindo programa:",
                caminho,
                id
            );

            if (!caminho || !id) {

                console.error(
                    "Programa sem caminho ou ID."
                );

                return;
            }

            if (
                typeof window.abrirPrograma ===
                "function"
            ) {

                window.abrirPrograma(
                    caminho,
                    id
                );

            } else {

                console.error(
                    "abrirPrograma() não existe."
                );

            }

        });

    });

}
