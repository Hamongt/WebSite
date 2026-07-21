function iniciarFeedback(idAnime, container){

    if(!container) return;

    const chave = `anime_${idAnime}`;

    const caixa = container.querySelector(".comentario-box");
    const comentar = container.querySelector(".comentar");
    const fechar = container.querySelector(".fechar-comentario");
    const curtir = container.querySelector(".curtir");
    const contadorLike = container.querySelector(".contador-curtidas");
    const contadorComentario = container.querySelector(".contador-comentarios");
    const lista = container.querySelector(".comentario-lista");
    const input = container.querySelector(".comentario-input");
    const enviar = container.querySelector(".enviar-comentario");
    const compartilhar = container.querySelector(".compartilhar");


    // começa sempre fechado
    if(caixa){
        caixa.classList.remove("ativo");
        caixa.style.display="none";
    }


    function dados(){

        try{

            return JSON.parse(
                localStorage.getItem(chave)
            ) || {
                curtidas:0,
                comentarios:[]
            };

        }catch{

            return {
                curtidas:0,
                comentarios:[]
            };

        }

    }


    function salvar(d){

        localStorage.setItem(
            chave,
            JSON.stringify(d)
        );

    }



    function atualizar(){

        let d = dados();

        if(contadorLike)
            contadorLike.textContent = d.curtidas;


        if(contadorComentario)
            contadorComentario.textContent =
                d.comentarios.length;

    }




    function escaparHTML(texto){

        const div =
            document.createElement("div");

        div.textContent =
            texto || "";

        return div.innerHTML;

    }




    function carregarComentarios(){

        if(!lista) return;


        const d = dados();


        lista.innerHTML = "";


        if(d.comentarios.length === 0){

            lista.innerHTML = `
                <p class="sem-comentarios">
                    Nenhum comentário ainda. Seja o primeiro!
                </p>
            `;

            return;

        }



        d.comentarios.forEach((comentario,index)=>{


            const div =
                document.createElement("div");


            div.className =
                "comentario-item";


            div.innerHTML = `

                <div class="autor">
                    👤 ${escaparHTML(comentario.autor)}
                </div>

                <div class="texto">
                    ${escaparHTML(comentario.texto)}
                </div>

                <small>
                    ${escaparHTML(comentario.data)}
                </small>

                <button class="btn-deletar-comentario">
                    🗑️
                </button>

            `;



            div.querySelector(
                ".btn-deletar-comentario"
            ).onclick = ()=>{


                const dadosAtuais =
                    dados();


                dadosAtuais.comentarios.splice(
                    index,
                    1
                );


                salvar(
                    dadosAtuais
                );


                atualizar();

                carregarComentarios();

            };


            lista.appendChild(div);


        });

    }





    if(curtir){

        curtir.onclick = ()=>{

            let d = dados();

            d.curtidas++;

            salvar(d);

            atualizar();

        };

    }





    if(comentar){

        comentar.onclick = ()=>{


            if(!caixa)
                return;


            const abrir =
                !caixa.classList.contains("ativo");


            caixa.classList.toggle(
                "ativo",
                abrir
            );


            caixa.style.display =
                abrir ? "block" : "none";



            if(abrir){

                carregarComentarios();

            }


        };

    }





    if(fechar){

        fechar.onclick = ()=>{

            caixa.classList.remove("ativo");

            caixa.style.display="none";

        };

    }





    function adicionar(){

        if(!input)
            return;


        const texto =
            input.value.trim();


        if(!texto)
            return;



        let d = dados();



        d.comentarios.push({

            autor:"Anônimo",

            texto:texto,

            data:
            new Date()
            .toLocaleString("pt-BR")

        });



        salvar(d);


        input.value="";


        atualizar();


        carregarComentarios();

    }





    if(enviar){

        enviar.onclick =
            adicionar;

    }



    if(input){

        input.addEventListener(
            "keydown",
            e=>{

                if(e.key==="Enter"){

                    adicionar();

                }

            }
        );

    }





    if(compartilhar){

        compartilhar.onclick = ()=>{

            navigator.clipboard.writeText(
                location.href+"#"+idAnime
            );

            alert("🔗 Link copiado!");

        };

    }




    atualizar();

}
