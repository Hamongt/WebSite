console.log("🚀 filmes.js carregado");


const filmes = [
    {
        arquivo:"filme-1.html",
        id:"filme-1"
    }
];


const CAMINHO_BASE_FILMES =
"windows_popups/gabrielzinho/subpaginas/filmes/";


function carregarFilmes(){

    const container =
        document.getElementById("listaFilmes");


    const total =
        document.getElementById("totalFilmes");


    if(!container)
        return;


    container.innerHTML="";


    let quantidade=0;


    filmes.forEach(function(filme){


        fetch(
            CAMINHO_BASE_FILMES + filme.arquivo
        )

        .then(response=>response.text())

        .then(html=>{


            const artigo =
                document.createElement("article");


            artigo.className="filme-item";

            artigo.id =
                filme.id;


            artigo.innerHTML =
                html;


            container.appendChild(
                artigo
            );


            quantidade++;


            if(total)
                total.textContent=quantidade;



            carregarFeedback(
                filme.id,
                artigo
            );


        })

        .catch(erro=>{

            console.error(
                "Erro carregando filme:",
                erro
            );

        });


    });


}



function carregarFeedback(idFilme, artigo){


    const container =
        artigo.querySelector(
            ".feedback-container"
        );


    if(!container)
        return;



    fetch(
    "windows_popups/gabrielzinho/componentes/feedback.html"
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



document.addEventListener(
"DOMContentLoaded",
carregarFilmes
);
