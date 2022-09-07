//Obtendo os elementos do DOM com que vamos interagir
const casas = document.getElementsByTagName('input'); //lista de casas do tabuleiro do jogo
const botaoReiniciar = document.getElementById('reiniciar'); //botão de reiniciar
const idJogador = document.getElementById('jogador'); //id do jogador que tem a vez
const idScore1 = document.getElementById('jogador1'); //id do score jogador 1
const idScore2 = document.getElementById('jogador2'); //id do score jogador 2
const resultadoX = document.getElementById('scoreX');
const resultadoO = document.getElementById('scoreO');
//Definindo variáveis do estado do jogo

let jogador = '.'; //Define o jogador atual (. = jogador indefinido; X = jogador X, O = jogador O)
let vencedor = '.'; //Define se há um vencedor ou não (. = indefinido; X = jogador X, O = jogador O)

let inicioContador = Math.floor(Date.now() / 1000); //Get the starting time (right now) in seconds
let intervalo = setInterval(contadorTempo, 1000);
let jogador1;
let jogador2;
let ronda = document.getElementById('contadorRonda');
let rondaN = 1;
let scoreX = 0;
let scoreO = 0;
let nomeJogador = {"O": undefined, "X": undefined};

function verificarNomes() {
    $('#submit').click(function aceitarNomes() {
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
        nomeJogador["O"] = jogador1;
        nomeJogador["X"] = jogador2;
        idScore1.innerText = jogador1;
        idScore2.innerText = jogador2;
        resultadoX.innerText = scoreX;
        resultadoO.innerText = scoreO;
    });
}

verificarNomes();
botoesBrancos();

//Define a resposta ao click aos botoes do jogo
for (let i = 0; i < 9; i++) {
    casas[i].addEventListener('click', (event) => {
        if ((event.target.value === '.') && (vencedor === '.')) {
            event.target.value = jogador;
            event.target.style.color = '#bc5e00';
            vencedor = vitoria();
            contadorJogador(vencedor);
            if (scoreX > 2 || scoreO > 2) {
                sendToLocalStorage();
                clearInterval(intervalo);
                setTimeout(() => {
                    if (confirm("O Vencedor é " + idJogador.innerText)) {
                        resetCounters();
                    }
                }, 200)
            } else {
                trocarJogador();
            }
        }
    });
}

function resetCounters () {
    novaRonda();
    inicioContador = Math.floor(Date.now() / 1000);
    contadorTempo();
    clearInterval(intervalo);
    intervalo = setInterval(contadorTempo, 1000);
    vencedor = '.';
    rondaN = 1;
    ronda.innerText = rondaN;
    scoreX = 0;
    resultadoX.innerText = scoreX;
    scoreO = 0;
    resultadoO.innerText = scoreO;
}

//Sorteia a primeira jogada de cada jogo.
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

function novaRonda () {
    for (let i = 0; i < 9; i++) {
        casas[i].value = '.';
        casas[i].style.color = '#FFFFFF';
        casas[i].style.backgroundColor = '#FFFFFF';
        casas[i].disabled = false;
    }
    vencedor = '.'; //Reset ao vencedor
    sortearJogador(jogador1, jogador2);
}

//Determina tudo o que faz o botão de reiniciar jogo (reset de cor, .value(.,X,O), pára o timer, sorteia novo jogador random)
botaoReiniciar.addEventListener('click', function() {
    if (vencedor !== ".") {
        rondaN++
        ronda.innerText = rondaN;
    }
    novaRonda();
});

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

//Function que encontra vitória ou empate mediante os .value de cada botão das casas.
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
        rondaN++
        ronda.innerText = rondaN;
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

//Confirmar se o user coloca um nome de jogador válido.
function charIsLetter(char) {
    if (char.length === 0) {
        return false;
    }
    for (const charElement of char) {
        if (typeof charElement !== 'string') {
            return false;
        } else if (charElement.toLowerCase() === charElement.toUpperCase()) {
            return false
        }
    }
    return true;
}

//Força os botões das casas a permanecerem brancos, assim que se inicia e reinicia um jogo.
function botoesBrancos() {
    for (let i = 0; i < 9; i++) {
        casas[i].style.color = '#FFFFFF';
        casas[i].style.backgroundColor = '#FFFFFF';
    }
}

//Function que controla o timer.
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

function sendToLocalStorage() {
    let historicoTempo = contadorTempo().join(":");
    let listaHistorico = {
        vencedor: idJogador.innerText,
        tempo: historicoTempo,
        jogo: "Jogo Do Galo",
        data: new Date().toLocaleDateString(),
        rondas: rondaN,
        resultados: scoreX + " : " + scoreO,
    }
    console.log(rondaN);
    let arrayHistorico = [];
    let historico = window.localStorage.getItem("Histórico");
    if (historico !== null) {
        historico = JSON.parse(historico);
        arrayHistorico = historico
    }
    arrayHistorico.push(listaHistorico);
    window.localStorage.setItem("Histórico", JSON.stringify(arrayHistorico));
}

//Resultados de cada ronda
function contadorJogador(vencedor) {
    nomeJogador[vencedor];
    if (vencedor === "X") {
        scoreX++
        resultadoX.innerText = scoreX
    } else if (vencedor === "O") {
        scoreO++
        resultadoO.innerText = scoreO;
    }
}