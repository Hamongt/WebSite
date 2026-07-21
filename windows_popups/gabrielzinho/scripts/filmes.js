// ============================================================
// 🎬 FILMES.JS
// Carregador de filmes do Gabrielzinho
// ============================================================

console.log("🚀 filmes.js carregado");


const filmes = [
    {
        arquivo: "filme-1.html",
        id: "filme-1"
    }

];



const CAMINHO_BASE_FILMES =
"windows_popups/gabrielzinho/subpaginas/filmes/";



function carregarFilmes(){


    const container =
        document.getElementById(
            "listaFilmes"
        );


    const total =
        document.getElementById(
            "totalFilmes"
        );


    if(!container){

        console.warn(
            "listaFilmes não encontrado"
        );

        return;

    }



    container.innerHTML = "";



    let quantidade = 0;



    filmes.forEach(function(filme){


        const caminho =
            CAMINHO_BASE_FILMES +
            filme.arquivo;



        fetch(caminho)


        .then(function(response){


            if(!response.ok){

                throw new Error(
                    response.status
                );

            }


            return response.text();


        })


        .then(function(html){



            const artigo =
                document.createElement(
                    "article"
                );


            artigo.className =
                "filme-item";


            artigo.id =
                filme.id;



            artigo.innerHTML =
                html;

                

            container.appendChild(
                artigo
            );


            quantidade++;


            if(total){

                total.textContent =
                    quantidade;

            }


            console.log(
                "✅ Filme carregado:",
                filme.id
            );


        })


        .catch(function(erro){


            console.error(
                "❌ Erro:",
                caminho,
                erro
            );


            container.innerHTML += `

            <div class="erro-filme">

                ⚠️ Não foi possível carregar:

                <br>

                ${caminho}

            </div>

            `;


        });



    });


}



document.addEventListener(
    "DOMContentLoaded",
    carregarFilmes
);
