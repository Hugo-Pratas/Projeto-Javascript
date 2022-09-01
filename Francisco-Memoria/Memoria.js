let logos = [{
    name: "dofus",
}, {
    name: "candy-crush",

}, {
    name: "fall-guys",

}, {
    name: "fortnite",

}, {
    name: "grand-theft-auto-v",

}, {
    name: "pokemon-go",
}];
//falta verificar se os números são validos, a row so pode ser entre 3 e 10 valores
const thisGameColumn = 3
const thisGameRow = 4
const totalCards = thisGameRow * thisGameColumn;

if (logos.length < totalCards / 2) { //popular a lista de logos se tiver logos insuficientes para o numero de cartas
    let i = logos.length;
    while (logos.length < totalCards / 2) {
        i--;
        logos.push(logos[i])
        if (i === 0) {
            i = logos.length;
        }
    }
}

let thisGameLogos = shuffle(getDuplicatedLogos(logos, totalCards / 2));
let thisGameMap = [];
for (let i = 0; i < thisGameLogos.length; i++) {
    thisGameMap.push({
        name: thisGameLogos[i],
        id: i,
        won: false
    })
}

$("#game").append(populateGridHtml(thisGameColumn, thisGameRow, thisGameMap));

let inicioContador = Math.floor(Date.now() / 1000); //Get the starting time (right now) in seconds
//localStorage.setItem("inicioContador", inicioContador); // Store it if I want to restart the timer on the next page
//contadorTempo();

const card = $(".card");
let previousCardId = -1;
let isFlipping = false;

card.on('click', function (e) {
    if (!isFlipping) {
        let currentCard = $(e.currentTarget);
        let cardId = currentCard.attr('id');

        if (cardId===previousCardId || thisGameMap[cardId].won){
            return;
        }
        currentCard.addClass('selected');
        //$(this).addClass('selected');  <- outra maneira de fazer


        if (previousCardId < 0) {
            previousCardId = cardId;
        } else {
            if (thisGameMap[previousCardId].name===thisGameMap[cardId].name){
                thisGameMap[previousCardId].won=true;
                thisGameMap[cardId].won=true;
                previousCardId = -1;
                for (const thisGameMapElement of thisGameMap) {
                    if (!thisGameMapElement.won){
                        return;
                    }
                }

                setTimeout(() => {
                    alert("ganhou");
                },200)
            }else {
                isFlipping = true;
                setTimeout(function () {
                    $('#' + previousCardId).removeClass('selected');
                    currentCard.removeClass('selected');
                    previousCardId = -1;
                    isFlipping=false;
                }, 600)
            }
        }
    }

});

function populateGridHtml(column, row, arrayOfLogos) {
    const cards = column * row;
    if (cards % 2 !== 0) {
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
        arr_final.push(arr_logos[i].name)
        arr_final.push(arr_logos[i].name)
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
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}



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