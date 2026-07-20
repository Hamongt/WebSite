
// ============================================================
// FEEDBACK.JS
// Sistema genérico de curtidas, comentários e compartilhamento
// ============================================================


function iniciarFeedback(id) {

    const container =
        document.querySelector(
            `[data-feedback="${id}"]`
        );

    if(!container) return;


    const chave = `feedback_${id}`;


    function pegarDados(){

        return JSON.parse(
            localStorage.getItem(chave)
        ) || {
            curtidas:0,
            comentarios:[]
        };

    }


    function salvar(dados){

        localStorage.setItem(
            chave,
            JSON.stringify(dados)
        );

    }


    const dados = pegarDados();


    const curtir =
        container.querySelector(".curtir");


    const contadorCurtidas =
        container.querySelector(".contador-curtidas");


    const comentar =
        container.querySelector(".comentar");


    const contadorComentarios =
        container.querySelector(".contador-comentarios");


    const caixa =
        container.querySelector(".feedback-comentarios");


    const lista =
        container.querySelector(".feedback-lista");


    const input =
        container.querySelector(".feedback-input");


    const enviar =
        container.querySelector(".feedback-enviar");


    if(contadorCurtidas)
        contadorCurtidas.textContent =
            dados.curtidas;


    if(contadorComentarios)
        contadorComentarios.textContent =
            dados.comentarios.length;



    if(curtir){

        curtir.onclick = () => {

            let d = pegarDados();

            d.curtidas++;

            salvar(d);

            contadorCurtidas.textContent =
                d.curtidas;

            curtir.classList.add("ativo");

            setTimeout(()=>{
                curtir.classList.remove("ativo");
            },400);

        };

    }



    if(comentar){

        comentar.onclick = ()=>{

            caixa.classList.toggle("ativo");

            carregarComentarios();

        };

    }



    if(enviar){

        enviar.onclick = ()=>{

            if(!input.value.trim())
                return;


            let d = pegarDados();


            d.comentarios.push({

                autor:"Anônimo",

                texto:
                input.value,

                data:
                new Date().toLocaleString("pt-BR")

            });


            salvar(d);


            input.value="";


            contadorComentarios.textContent =
                d.comentarios.length;


            carregarComentarios();

        };

    }



    function carregarComentarios(){

        if(!lista) return;


        lista.innerHTML="";


        let d = pegarDados();


        d.comentarios.forEach((c)=>{


            lista.innerHTML += `

            <div class="feedback-item">

                <div class="autor">
                    👤 ${c.autor}
                </div>

                <div class="texto">
                    ${c.texto}
                </div>

            </div>

            `;

        });

    }



    const compartilhar =
        container.querySelector(".compartilhar");


    if(compartilhar){

        compartilhar.onclick = ()=>{

            navigator.clipboard.writeText(
                window.location.href
            );

            alert("🔗 Link copiado!");

        };

    }

}
