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

// ==========================================
// RELÓGIO DA TASKBAR
// ==========================================

function iniciarRelogioTaskbar() {

    const relogio =
        document.getElementById(
            "windowsTaskbarClock"
        );

    if (!relogio) {
        console.warn(
            "Relógio da taskbar não encontrado."
        );

        return;
    }


    // Atualiza o horário exibido
    function atualizarHorario() {

        const agora =
            new Date();

        const horas =
            String(
                agora.getHours()
            ).padStart(2, "0");

        const minutos =
            String(
                agora.getMinutes()
            ).padStart(2, "0");


        relogio.textContent =
            `${horas}:${minutos}`;

    }


    // Mostra imediatamente
    atualizarHorario();


    // Atualiza automaticamente
    // a cada segundo
    setInterval(
        atualizarHorario,
        1000
    );

}
