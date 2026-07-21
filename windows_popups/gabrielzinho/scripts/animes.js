console.log("🚀 animes.js carregado");

const animes = [
    {
        arquivo:"windows_popups/gabrielzinho/subpaginas/animes/anime-2.html",
        id:"anime-2"
    },
    {
        arquivo:"windows_popups/gabrielzinho/subpaginas/animes/anime-1.html",
        id:"anime-1"
    }
];


async function carregarAnimes(){

    const listaAnimes =
        document.getElementById("listaAnimes");

    if(!listaAnimes) return;


    listaAnimes.innerHTML="";


    for(const anime of animes){

        const resposta =
            await fetch(anime.arquivo);

        const html =
            await resposta.text();


        const artigo =
            document.createElement("article");


        artigo.className="anime-item";
        artigo.id=anime.id;
        artigo.innerHTML=html;


        listaAnimes.appendChild(artigo);


        carregarFeedback(
            anime.id,
            artigo
        );

    }

}



function carregarFeedback(idAnime, artigo){

    const container =
        artigo.querySelector(".feedback-container");


    if(!container){

        console.warn(
            "⚠️ Adicione .feedback-container em",
            idAnime
        );

        return;

    }


    fetch(
        "windows_popups/gabrielzinho/componentes/feedback.html"
    )

    .then(r=>r.text())

    .then(html=>{

        container.innerHTML=html;


        if(typeof iniciarFeedback==="function"){

            iniciarFeedback(
                idAnime,
                container
            );

        }

    });

}


window.iniciarAnimes =
    carregarAnimes;
