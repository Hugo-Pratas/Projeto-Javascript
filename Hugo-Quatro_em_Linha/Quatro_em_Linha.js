let logos = [{
    name: "dofus"
}, {
    name: "candy-crush"
}, {
    name: "fall-guys"
}, {
    name: "fortnite"
}, {
    name: "grand-theft-auto-v"
}, {
    name: "pokemon-go"
}];
//falta verificar se os números são validos, a row so pode ser entre 3 e 10 valores
const thisGameColumn = 3
const thisGameRow = 10
const totalCards = thisGameRow * thisGameColumn;

if (logos.length < totalCards / 2) {
    let i = logos.length;
    while (logos.length < totalCards / 2) {
        i--;
        logos.push(logos[i])
        if (i===0){
            i=logos.length;
        }
    }
}
const thisGameLogos = shuffle(getDuplicatedLogos(logos, totalCards / 2));
document.write(populateGridHtml(thisGameColumn, thisGameRow, thisGameLogos))
const card = $(".card");

card.on('click', function (e) {
    $(e.currentTarget).addClass('selected');
    //$(this).addClass('selected');  <- outra maneira de fazer
});


function populateGridHtml(column, row, arrayOfLogos) {
    const cards = column * row;
    if (cards % 2 !== 0) {
        return "Not even"
    }
    let finalstring = `<div class="game_box _${row}lines">`

    for (let i = 0; i < cards; i++) {
        finalstring += `
<div class="card" id="${i}">
    <div class="card_inner">
        <div class="card_front">
            <h1>?</h1>
        </div>
        <div class="card_back">
            <div class="${arrayOfLogos[i]}"></div>
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
    if (arr_logos.length>numberOfLogos){
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