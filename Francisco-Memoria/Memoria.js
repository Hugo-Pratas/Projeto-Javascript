let logos = [
    "dofus", "candy-crush", "fall-guys", "fortnite", "grand-theft-auto-v", "pokemon-go"
];
console.log()
let inicioContador = 0; //Get the starting time (right now) in seconds
//localStorage.setItem("inicioContador", inicioContador); // Store it if I want to restart the timer on the next page
let intervalo = 0;
let gamerName = "";
let thisGameColumn = 3
let thisGameRow = 4
popUP();

function popUP() {
    $('#submit').click(function aceitarNomes() {
        gamerName = $("#nomejogador1").val();
        let rowNumber = $("#numeroDeLinhas").val();
        let columnNumber = $("#numeroDeColunas").val();
        if (!charIsLetter(Array.from(gamerName))) {
            alert("O nome só pode conter Letras");
            return
        }
        if (rowNumber > 10 || rowNumber < 3) {
            alert("As linhas têm de ser entre 3 e 10");
            return;
        }
        if (rowNumber * columnNumber / 2 % 2 !== 0) {
            alert("A grelha que selecionou não é par, deve ser par para garantir cartas iguais");
            return;
        }
        thisGameColumn = columnNumber;
        thisGameRow = rowNumber;
        addNametoMenu(gamerName);
        inicioContador = Math.floor(Date.now() / 1000);
        clearInterval(intervalo);
        intervalo = setInterval(contadorTempo, 1000);
        $('#form').css("display", "none");
        $('#container').css("display", "none");
        game();
    });
}

function game() {
//falta verificar se os números são validos, a row so pode ser entre 3 e 10 valores

    const totalCards = thisGameRow * thisGameColumn;

    if (logos.length < totalCards / 2) {
        getMoreLogos(totalCards);//popular a lista de logos se tiver logos insuficientes para o numero de cartas
    }
    let thisGameLogos = shuffle(getDuplicatedLogos(logos, totalCards / 2));
    let thisGameMap = [];
    for (let i = 0; i < thisGameLogos.length; i++) {
        thisGameMap.push({
            name: thisGameLogos[i], id: i, won: false
        })
    }
    $("#game").append(populateGridHtml(thisGameColumn, thisGameRow, thisGameMap));
    contadorTempo();
    cardOnClick(thisGameMap);
}

function cardOnClick(thisGameMap) {
    const card = $(".card");
    let previousCardId = -1; //start with value out of the array
    let isFlipping = false; //to prevent multiple flips at the same time
    card.on('click', function (e) {
        if (!isFlipping) {
            let currentCard = $(e.currentTarget);
            let cardId = currentCard.attr('id');
            if (cardId === previousCardId || thisGameMap[cardId].won) { //prevent selecting the same card, or cards already won
                return;
            }
            currentCard.addClass('selected');
            //$(this).addClass('selected');  <- outra maneira de fazer
            if (previousCardId < 0) { //if no card has been input, input this one
                previousCardId = cardId;
                return;
            }
            addTriestoMenu();
            if (thisGameMap[previousCardId].name === thisGameMap[cardId].name) { //previous card = thisCard
                thisGameMap[previousCardId].won = true;
                thisGameMap[cardId].won = true;
                previousCardId = -1;
                checkWin(thisGameMap);
            } else {
                isFlipping = true;
                setTimeout(function () {
                    $('#' + previousCardId).removeClass('selected'); //remove flips
                    currentCard.removeClass('selected');
                    previousCardId = -1;
                    isFlipping = false;
                }, 600)
            }
        }


    });
}

function getMoreLogos(totalCards) {
    let i = logos.length;
    while (logos.length < totalCards / 2) {
        i--;
        logos.push(logos[i])
        if (i === 0) {
            i = logos.length;
        }
    }
}

function charIsLetter(char) {
    for (const charElement of char) {
        if (typeof charElement !== 'string') {
            return false;
        } else if (charElement.toLowerCase() === charElement.toUpperCase()) {
            return false
        }
    }
    return true;
}

function populateGridHtml(column, row, arrayOfLogos) {
    const cards = column * row;
    if (cards % 2 !== 0) { //to prevent errors, maybe remove latter
        return "Not even"
    }
    let finalstring = `<div class="game_box _${row}lines">`

    for (let i = 0; i < cards; i++) {
        finalstring += `
<div class="card" id="${arrayOfLogos[i].id}">
    <div class="card_inner">
        <div class="card_front">
            <h1>?</h1>
        </div>
        <div class="card_back ${arrayOfLogos[i].name}">
        </div>
    </div>
</div>
        `
    }
    return finalstring += `
</div>`;
}

function getDuplicatedLogos(arr_logos, numberOfLogos) {

    let arr_final = [];
    if (arr_logos.length > numberOfLogos) {
        arr_logos = shuffle(arr_logos); //para ter logos diferentes todos os jogos
    }

    for (let i = 0; i < numberOfLogos; i++) {
        arr_final.push(arr_logos[i])
        arr_final.push(arr_logos[i])
    }

    return arr_final;
}

function shuffle(array) { //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
}

function verTempo(i) {
    if (i < 10) {
        i = "0" + i
    }  // add zero in front of numbers < 10
    return i;
}

function contadorTempo() {
    let agora = Math.floor(Date.now() / 1000); // get the time now
    let diferenca = agora - inicioContador; // diff in seconds between now and start
    let m = Math.floor(diferenca / 60); // get minutes value (quotient of diff)
    let s = Math.floor(diferenca % 60); // get seconds value (remainder of diff)
    m = addZeroContador(m); // add a leading zero if it's single digit
    s = addZeroContador(s); // add a leading zero if it's single digit
    document.getElementById("relogio").innerHTML = m + ":" + s; // update the element where the timer will appear
    return [m, s];
    //let t = setTimeout(contadorTempo, 500); // set a timeout to update the timer
}

function addZeroContador(i) {
    if (i < 10) {
        i = "0" + i
    }  // add zero in front of numbers < 10
    return i;
}

function addTriestoMenu() {
    const tentativas = $("#tentativas");
    const tentativas_text = tentativas.html();
    currentTry = Number(tentativas_text.split(" ").at(3));
    tentativas.text(tentativas_text.replace(currentTry, currentTry + 1))
}

function addNametoMenu(nameOfPlayer) {
    const name = $("#nome");
    name.append(" " + nameOfPlayer);
}

function checkWin(map) {
    for (const MapElement of map) { //check if we win
        if (!MapElement.won) { //return function if we not won
            return;
        }
    }
    clearInterval(intervalo);
    sendToLocalStorage();
    setTimeout(() => { //prevent alert hapenning before final card turn
        alert("ganhou");
    }, 200)
}

function sendToLocalStorage() {
    let historicoTempo = contadorTempo().join(":");
    let listaHistorico = {
        vencedor: gamerName,
        tempo: historicoTempo,
        tentativas: Number($("#tentativas").html().split(" ").at(3)),
        jogo: "Memória",
        dimensao: thisGameColumn + "X" + thisGameRow,
        data: new Date().toLocaleDateString()
    };
    let arrayHistorico = [];
    let historico = window.localStorage.getItem("Histórico");
    if (historico !== null) {
        historico = JSON.parse(historico);
        arrayHistorico = historico
    }
    arrayHistorico.push(listaHistorico);
    window.localStorage.setItem("Histórico", JSON.stringify(arrayHistorico));
}

