//Obtendo os elementos do DOM com que vamos interagir
const casas = document.getElementsByTagName('input'); //lista de casas do tabuleiro do jogo
const botaoReiniciar = document.getElementById('reiniciar'); //botão de reiniciar
const idJogador = document.getElementById('jogador'); //id do jogador que tem a vez

//Definindo variáveis do estado do jogo

let jogador = '.'; //Define o jogador atual (. = jogador indefinido; X = jogador X, O = jogador O)
let vencedor = '.'; //Define se há um vencedor ou não (. = indefinido; X = jogador X, O = jogador O)

let inicioContador = Math.floor(Date.now() / 1000); //Get the starting time (right now) in seconds
let intervalo = setInterval(contadorTempo, 1000);
let jogador1;
let jogador2;


function verificarNomes () {
        $('#submit').click(function aceitarNomes () {
            jogador1 = document.getElementById("nomejogador1").value
            jogador2 = document.getElementById("nomejogador2").value
            if (!charIsLetter(Array.from(jogador1)) || !charIsLetter(Array.from(jogador2))) {
                return
            }
            inicioContador = Math.floor(Date.now() / 1000);
            contadorTempo();
            clearInterval(intervalo);
            intervalo = setInterval(contadorTempo, 1000);
            $('#form').css("display", "none");
            $('#container').css("display", "none");
            sortearJogador(jogador1, jogador2);
        });
}
verificarNomes()

function charIsLetter(char) {
    for (const charElement of char) {
        if (typeof charElement !== 'string') {
            return false;
        } else if (charElement.toLowerCase() === charElement.toUpperCase()) {
            return false;
        }
    }
    return true;
}

function contadorTempo() {
    let agora = Math.floor(Date.now() / 1000); // get the time now
    let diferenca = agora - inicioContador; // diff in seconds between now and start
    let m = Math.floor(diferenca / 60); // get minutes value (quotient of diff)
    let s = Math.floor(diferenca % 60); // get seconds value (remainder of diff)
    m = addZeroContador(m); // add a leading zero if it's single digit
    s = addZeroContador(s); // add a leading zero if it's single digit
    document.getElementById("relogio").innerHTML = m + ":" + s; // update the element where the timer will appear
    return [m, s]
}

function addZeroContador(i) {
    if (i < 10) {
        i = "0" + i
    }
    return i;
}


function botoesBrancos() {
    for (let i = 0; i < 9; i++) {
        casas[i].style.color = '#FFFFFF';
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
            vencedor = vitoria(); //Executa a função vitoria()
            if (vencedor !== ".") {
                let historicoTempo = contadorTempo().join(":");
                let listaHistorico = {
                    vencedor: idJogador.innerText,
                    tempo: historicoTempo,
                    jogo: "Jogo Do Galo",
                    data: new Date().toLocaleDateString(),
                }
                let arrayHistorico = [];
                let historico = window.localStorage.getItem("Histórico");
                if (historico !== null) {
                    historico = JSON.parse(historico);
                    arrayHistorico = historico
                }
                arrayHistorico.push(listaHistorico);
                window.localStorage.setItem("Histórico", JSON.stringify(arrayHistorico));
                clearInterval(intervalo);
                setTimeout(() => {
                    alert("O Vencedor é " + idJogador.innerText);
                }, 200)
            } else trocarJogador();
        }
    });
}

//Decide aleatoriamente o jogador a fazer a primeira jogada
let sortearJogador = function (nomeJogador1, nomeJogador2) {
    if (Math.floor(Math.random() * 2) === 0) {
        jogador = "O";
        idJogador.innerText = nomeJogador1 + " (" + jogador + ") ";
        idJogador.style.color = '#ffffff';
    } else {
        jogador = "X"
        idJogador.innerText = nomeJogador2 + " (" + jogador + ") ";
        idJogador.style.color = '#ffffff';
    }
}
sortearJogador();

botaoReiniciar.addEventListener('click', (function () {
    for (let i = 0; i < 9; i++) {
        casas[i].value = '.';
        casas[i].style.color = '#FFFFFF';
        casas[i].style.backgroundColor = '#FFFFFF';
        casas[i].disabled = false;
    }
    inicioContador = Math.floor(Date.now() / 1000);
    contadorTempo();
    clearInterval(intervalo);
    intervalo = setInterval(contadorTempo, 1000);
    vencedor = '.'; //Reset ao vencedor
    sortearJogador(jogador1, jogador2);
}));


let trocarJogador = function () {
    if (jogador === 'X') {
        jogador = 'O';
        idJogador.innerText = jogador1 + " (" + jogador + ") ";
        idJogador.style.color = '#ffffff';

    } else {
        jogador = 'X';
        idJogador.innerText = jogador2 + " (" + jogador + ") ";
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

    } else if (casas[0].value !== '.' && casas[1].value !== '.' && casas[2].value !== '.' && casas[3].value !== '.' && casas[4].value !== '.'
        && casas[5].value !== '.' && casas[6].value !== '.' && casas[7].value !== '.' && casas[8].value !== '.') {
        for (let i = 0; i < 9; i++) {
            casas[i].value = '.';
            casas[i].style.color = "#8E1600";
            casas[i].style.backgroundColor = "#8E1600";
            casas[i].disabled = true;
            clearInterval(intervalo);
        }
    }
    return '.';
}
