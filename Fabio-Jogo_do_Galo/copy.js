
let casas = document.getElementsByTagName('input'); //botões das casas do tabuleiro do jogo
let botaoReiniciar = document.getElementById('reiniciar'); //botão de reiniciar
let vezJogador = document.getElementById('jogador'); //jogador que tem a vez

let jogador = '_'; //Define o jogador atual (_ = jogador indefinido; X = jogador X, O = jogador O)
let vencedor = '_'; //Define se há um vencedor ou não (_ = indefinido; X = jogador X, O = jogador O)
let finish;

for(let i=0; i<9; i++) {
    casas[i].addEventListener('click', (event) => {
        //se a casa estiver vazia e ninguém tiver vencido a partida
        if( (event.target.value==='_') && (vencedor==='_')) {
            event.target.value=jogador; //preenche a casa com X ou O
            event.target.style.color='#bc5e00'; //torna o valor da casa visível

            trocarJogador(); //função que troca a vez do jogador, a ser definida depois

            vencedor = vitoria(); //Executa a função vitoria() que defineremos depois, ela retorna o vencedor da partida, caso exista.

            //se o vencedor existe, imprime

        }
    });
}

<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>Jogo Do galo</title>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
      rel="stylesheet" integrity="sha384-gH2yIJqKdNHPEq0n4Mqa/HGKIhSkIHeL5AyhkYV8i59U5AR6csBvApHHNl/vI1Bx"
      crossorigin="anonymous">
    <link rel="stylesheet" href="galo.css">
        <script src="galoScript.js"></script>
    </head>
    <body>
    <main>
        <div id="jogo">
            <div> <input class="cima" type="button" value="_"><input class="cima" type="button" value="_"><input class="cima" type="button" value="_"></div>
            <div> <input class="meio" type="button" value="_"><input class="meio" type="button" value="_"><input class="meio" type="button" value="_"> </div>
            <div> <input class="baixo" type="button" value="_"><input class="baixo" type="button" value="_"><input class="baixo" type="button" value="_"> </div>
        </div>
    </main>

    <input type="button" value="Reiniciar" id="reiniciar"> <h1>Jogador <span id="jogador"></span></h1>

    </body>

botaoReiniciar.addEventListener('click', (event) => {
    for(let i=0; i<9; i++) {
        casas[i].value='_'; //Limpa todas as casas
        casas[i].style.color='#F7FE2E'; //Torna o valor _ invisível
        casas[i].style.backgroundColor='#F7FE2E'; //Torna o fundo branco
    }
    vencedor = '_'; //Reseta o vencedor
    sortearJogador(); //Escolhe aleatoriamente qual jogador irá começar
});


let sortearJogador = function() {
    if(Math.floor(Math.random() * 2)===0) {
        jogador = "O"; //define o jogador O como atual
        jogador.innerText="O"; //exibe na página qual é o jogador atual
        jogador.style.color='#ff0000'; //deixa o texto na cor vermelha
    }
    else {
        jogador = "X";//define o jogador X como atual
        jogador.innerText="X"; //exibe na página qual é o jogador atual
        jogador.style.color='#0516ec'; //deixa o texto na cor azul
    }
}
sortearJogador(); //Escolhe aleatoriamento o jogador inicial

let trocarJogador = function() {
    if(jogador==='X') {
        jogador='O';
        jogador.innerText='O';
        jogador.style.color='#ffffff';

    }else{
        jogador='X';
        jogador.innerText='X';
        jogador.style.color='#000000';
    }
}

let vitoria = function() {
    if((casas[0].value===casas[1].value) && (casas[1].value===casas[2].value) && casas[0].value!=='_' ) {
        casas[0].style.backgroundColor='#0F0';
        casas[1].style.backgroundColor='#0F0';
        casas[2].style.backgroundColor='#0F0';

        return casas[0].value;

    }else if((casas[3].value===casas[4].value) && (casas[4].value===casas[5].value) && casas[3].value!=='_' ) {
        casas[3].style.backgroundColor='#0F0';
        casas[4].style.backgroundColor='#0F0';
        casas[5].style.backgroundColor='#0F0';

        return casas[3].value;

    }else if((casas[6].value===casas[7].value) && (casas[7].value===casas[8].value) && casas[6].value!=='_' ) {
        casas[6].style.backgroundColor='#0F0';
        casas[7].style.backgroundColor='#0F0';
        casas[8].style.backgroundColor='#0F0';

        return casas[6].value;

    }else if((casas[0].value===casas[3].value) && (casas[3].value===casas[6].value) && casas[0].value!=='_' ) {
        casas[0].style.backgroundColor='#0F0';
        casas[3].style.backgroundColor='#0F0';
        casas[6].style.backgroundColor='#0F0';

        return casas[0].value;

    }else if((casas[1].value===casas[4].value) && (casas[4].value===casas[7].value) && casas[1].value!=='_' ) {
        casas[1].style.backgroundColor='#0F0';
        casas[4].style.backgroundColor='#0F0';
        casas[7].style.backgroundColor='#0F0';

        return casas[1].value;

    }else if((casas[2].value===casas[5].value) && (casas[5].value===casas[8].value) && casas[2].value!=='_' ) {
        casas[2].style.backgroundColor='#0F0';
        casas[5].style.backgroundColor='#0F0';
        casas[8].style.backgroundColor='#0F0';

        return casas[2].value;
    }else if((casas[0].value===casas[4].value) && (casas[4].value===casas[8].value) && casas[0].value!=='_' ) {
        casas[0].style.backgroundColor='#0F0';
        casas[4].style.backgroundColor='#0F0';
        casas[8].style.backgroundColor='#0F0';

        return casas[0].value;

    }else if((casas[2].value===casas[4].value) && (casas[4].value===casas[6].value) && casas[2].value!=='_' ) {
        casas[2].style.backgroundColor='#0F0';
        casas[4].style.backgroundColor='#0F0';
        casas[6].style.backgroundColor='#0F0';

        return casas[2].value;
    }


    return '_';
}