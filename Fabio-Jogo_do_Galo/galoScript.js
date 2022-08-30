//Obtendo os elementos do DOM com que vamos interagir
const casas = document.getElementsByTagName('input'); //lista de casas do tabuleiro do jogo
const botaoReiniciar = document.getElementById('reiniciar'); //botão de reiniciar
const idJogador = document.getElementById('jogador'); //id do jogador que tem a vez

//Definindo variáveis do estado do jogo

let jogador = '.'; //Define o jogador atual (. = jogador indefinido; X = jogador X, O = jogador O)
let vencedor = '.'; //Define se há um vencedor ou não (. = indefinido; X = jogador X, O = jogador O)

let inicioContador = Math.floor(Date.now() / 1000); //Get the starting time (right now) in seconds
//localStorage.setItem("inicioContador", inicioContador); // Store it if I want to restart the timer on the next page

function contadorTempo() {
    let agora = Math.floor(Date.now() / 1000); // get the time now
    let diferenca = agora - inicioContador; // diff in seconds between now and start
    let m = Math.floor(diferenca / 60); // get minutes value (quotient of diff)
    let s = Math.floor(diferenca % 60); // get seconds value (remainder of diff)
    m = verTempo(m); // add a leading zero if it's single digit
    s = verTempo(s); // add a leading zero if it's single digit
    document.getElementById("relogio").innerHTML = m + ":" + s; // update the element where the timer will appear
    let t = setTimeout(contadorTempo, 500); // set a timeout to update the timer
}

function verTempo(i) {
    if (i < 10) {
        i = "0" + i
    }  // add zero in front of numbers < 10
    return i;
}

contadorTempo();

//Área do jogo toda com fundo branco e texto branco para não se ver
function botoesBrancos() {
    for (let i = 0; i < 9; i++) {
        casas[i].style.color = '#FFFFFF'; //Torna o valor _ invisível
        casas[i].style.backgroundColor = '#FFFFFF';
    }
}
botoesBrancos();

//Define a resposta ao click aos botoes do jogo
for (let i = 0; i < 9; i++) {
    casas[i].addEventListener('click', (event) => {
        //se a casa estiver vazia e ninguém tiver vencido a partida
        if ((event.target.value === '.') && (vencedor === '.')) {
            event.target.value = jogador; //preenche a casa com X ou O
            event.target.style.color = '#bc5e00'; //torna o valor da casa visível (X ou O)
            trocarJogador(); //função que troca a vez do jogador
            vencedor = vitoria(); //Executa a função vitoria() que defineremos depois
        }
    });
}

//Decide aleatoriamente o jogador a fazer a primeira jogada
let sortearJogador = function () {
    if (Math.floor(Math.random() * 2) === 0) {
        jogador = "O";
        idJogador.innerText = "O";
        idJogador.style.color = '#ffffff';
    } else {
        jogador = "X";
        idJogador.innerText = "X";
        idJogador.style.color = '#ffffff';
    }
}
sortearJogador(); //Escolhe aleatoriamento o jogador inicial

botaoReiniciar.addEventListener('click', (event) = function () {
    for (let i = 0; i < 9; i++) {
        casas[i].value = '.'; //Limpa todas as casas
        casas[i].style.color = '#FFFFFF'; //Torna o valor . invisível (branco)
        casas[i].style.backgroundColor = '#FFFFFF'; //Torna o fundo branco
    }
    inicioContador = Math.floor(Date.now() / 1000); //Get the starting time (right now) in seconds
    contadorTempo();
    vencedor = '.'; //Reset ao vencedor
    sortearJogador(); //Escolhe aleatoriamente que jogador irá começar
});

//Alterna a vez entre os jogadores X e Y (preenche dentro de cada botão A BRANCO, com a letra do jogador correspondente)
let trocarJogador = function () {
    if (jogador === 'X') {
        jogador = 'O';
        idJogador.innerText = 'O';
        idJogador.style.color = '#ffffff';

    } else {
        jogador = 'X';
        idJogador.innerText = 'X';
        idJogador.style.color = '#ffffff';
    }
}

let vitoria = function () {
    if ((casas[0].value === casas[1].value) && (casas[1].value === casas[2].value) && casas[0].value !== '.') {
        casas[0].style.backgroundColor = '#0F0';
        casas[1].style.backgroundColor = '#0F0';
        casas[2].style.backgroundColor = '#0F0';

        return casas[0].value;

    } else if ((casas[3].value === casas[4].value) && (casas[4].value === casas[5].value) && casas[3].value !== '.') {
        casas[3].style.backgroundColor = '#0F0';
        casas[4].style.backgroundColor = '#0F0';
        casas[5].style.backgroundColor = '#0F0';

        return casas[3].value;

    } else if ((casas[6].value === casas[7].value) && (casas[7].value === casas[8].value) && casas[6].value !== '.') {
        casas[6].style.backgroundColor = '#0F0';
        casas[7].style.backgroundColor = '#0F0';
        casas[8].style.backgroundColor = '#0F0';

        return casas[6].value;

    } else if ((casas[0].value === casas[3].value) && (casas[3].value === casas[6].value) && casas[0].value !== '.') {
        casas[0].style.backgroundColor = '#0F0';
        casas[3].style.backgroundColor = '#0F0';
        casas[6].style.backgroundColor = '#0F0';

        return casas[0].value;

    } else if ((casas[1].value === casas[4].value) && (casas[4].value === casas[7].value) && casas[1].value !== '.') {
        casas[1].style.backgroundColor = '#0F0';
        casas[4].style.backgroundColor = '#0F0';
        casas[7].style.backgroundColor = '#0F0';


        return casas[1].value;

    } else if ((casas[2].value === casas[5].value) && (casas[5].value === casas[8].value) && casas[2].value !== '.') {
        casas[2].style.backgroundColor = '#0F0';
        casas[5].style.backgroundColor = '#0F0';
        casas[8].style.backgroundColor = '#0F0';

        return casas[2].value;
    } else if ((casas[0].value === casas[4].value) && (casas[4].value === casas[8].value) && casas[0].value !== '.') {
        casas[0].style.backgroundColor = '#0F0';
        casas[4].style.backgroundColor = '#0F0';
        casas[8].style.backgroundColor = '#0F0';

        return casas[0].value;

    } else if ((casas[2].value === casas[4].value) && (casas[4].value === casas[6].value) && casas[2].value !== '.') {
        casas[2].style.backgroundColor = '#0F0';
        casas[4].style.backgroundColor = '#0F0';
        casas[6].style.backgroundColor = '#0F0';

        return casas[2].value;
        //Arranjar maneira de simplificar esta parte de baixo (por exemplo fazer function à parte e invocá-la aqui).
    } else if (casas[0].value !== '.' && casas[1].value !== '.' && casas[2].value !== '.' && casas[3].value !== '.' && casas[4].value !== '.'
        && casas[5].value !== '.' && casas[6].value !== '.' && casas[7].value !== '.' && casas[8].value !== '.') {
        for (let i = 0; i < 9; i++) {
            casas[i].value = '.'; //Limpa todas as casas
            casas[i].style.color = "#8E1600"; //Torna o valor . invisível
            casas[i].style.backgroundColor = "#8E1600"; //Torna o fundo vermelho
        }
    }
    return '.';
}
