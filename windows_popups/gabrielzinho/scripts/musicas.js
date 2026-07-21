function carregarFeedback(idFilme, artigo){


    const container =
        artigo.querySelector(
            ".feedback-container"
        );


    if(!container)
        return;



    fetch(
    "/WebSite/windows_popups/gabrielzinho/componentes/feedback.html?v=2"
    )

    .then(response=>response.text())

    .then(html=>{


        container.innerHTML =
            html;


        if(typeof iniciarFeedback === "function"){

            iniciarFeedback(
                idFilme,
                container
            );

        }


    });


}