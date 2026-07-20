// ============================================================
// 🎬 FILMES.JS
// Carregador de filmes do Gabrielzinho
// ============================================================

console.log("🚀 filmes.js carregado!");

const filmes = [
    { arquivo: "windows_popups/gabrielzinho/subpaginas/filmes/filme-3.html", id: "filme-3" },
    { arquivo: "windows_popups/gabrielzinho/subpaginas/filmes/filme-2.html", id: "filme-2" },
    { arquivo: "windows_popups/gabrielzinho/subpaginas/filmes/filme-1.html", id: "filme-1" }
];


async function carregarFilmes(){

    const listaFilmes =
        document.getElementById("listaFilmes");

    const totalFilmes =
        document.getElementById("totalFilmes");


    if(!listaFilmes) return;


    listaFilmes.innerHTML="";


    let total = 0;


    for(const filme of filmes){

        try{

            const resposta =
                await fetch(filme.arquivo);


            if(!resposta.ok)
                throw new Error(resposta.status);


            const html =
                await resposta.text();


            const item =
                document.createElement("article");


            item.className="filme-item";
            item.id=filme.id;


            item.innerHTML=html;


            listaFilmes.appendChild(item);


            total++;


        }catch(erro){

            console.error(
                "Erro ao carregar:",
                filme.arquivo,
                erro
            );


            listaFilmes.innerHTML += `
                <div class="erro-filme">
                    ⚠️ Não foi possível carregar:
                    <br>
                    ${filme.arquivo}
                </div>
            `;

        }

    }


    if(totalFilmes)
        totalFilmes.textContent=total;

}



document.addEventListener(
    "DOMContentLoaded",
    carregarFilmes
);
