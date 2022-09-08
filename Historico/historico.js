let historico = window.localStorage.getItem("Histórico");
let arr_historico = JSON.parse(historico);
let tableBody = $('#table');
let todosJogosButton = $("#todosJogos");
let jogoGaloButton = $("#JogoGalo");
let quatroLinhaButton = $("#QuatroLinha");
let jogoMemoriaButton = $("#JogoMemoria");


todosJogosButton.on("click", getAllGames);
jogoGaloButton.on("click", getGaloGames);
quatroLinhaButton.on("click", getQuatroLinhaGames);
jogoMemoriaButton.on("click", getMemoriaGames);


function getGaloGames(){
    tableBody.empty();

    let arr_jogosGalo = arr_historico.filter(function (arrHistoricoElement) {
        return arrHistoricoElement.jogo === "Jogo Do Galo";
    })

    tableBody.append(`
        <thead>
            <tr>
                <th scope="col">Jogo</th>
                <th scope="col">Nome do Vencedor</th>
                <th scope="col">Nome do Vencido</th>
                <th scope="col">Rondas</th>
                <th scope="col">Resultados</th>
                <th scope="col">Tempo</th>
                <th scope="col">Data</th>
            </tr>
        </thead>
        <tbody>
    `)

    for (const jogoGalo of arr_jogosGalo) {
        tableBody.append(
            '<tr>' +
            `<th scope="row">${jogoGalo.jogo}</th>` +
            `<td>${jogoGalo.vencedor}</td>` +
            `<td>${jogoGalo.vencido}</td>` +
            `<td>${jogoGalo.rondas}</td>` +
            `<td>${jogoGalo.resultados}</td>` +
            `<td>${jogoGalo.tempo}</td>` +
            ` <td>${jogoGalo.data}</td>` +
            '</tr>'
        )
    }
    tableBody.append(`
            </tbody>
    `)
}

function getQuatroLinhaGames(){
    tableBody.empty();

    let arr_jogosQuatroemLinha = arr_historico.filter(function (arrHistoricoElement) {
        return arrHistoricoElement.jogo === "4EmLinha";
    })
    tableBody.append(`
        <thead>
            <tr>
                <th scope="col">Jogo</th>
                <th scope="col">Nome do Vencedor</th>
                <th scope="col">Tempo</th>
                <th scope="col">Data</th>
            </tr>
        </thead>
        <tbody>
    `)

    for (const quatroEmLinha of arr_jogosQuatroemLinha) {
        tableBody.append(
            '<tr>' +
            `<th scope="row">${quatroEmLinha.jogo}</th>` +
            `<td>${quatroEmLinha.vencedor}</td>` +
            `<td>${quatroEmLinha.tempo}</td>` +
            ` <td>${quatroEmLinha.data}</td>` +
            '</tr>'
        )
    }
    tableBody.append(`
            </tbody>
    `)
}

function getMemoriaGames() {
    tableBody.empty();

    let arr_jogosMemoria = arr_historico.filter(function (arrHistoricoElement) {
        return arrHistoricoElement.jogo === "Memória";
    })
    tableBody.append(`
        <thead>
            <tr>
                <th scope="col">Jogo</th>
                <th scope="col">Nome do Vencedor</th>
                <th scope="col">Nº de Tentativas</th>
                <th scope="col">Dimensão do Jogo</th>
                <th scope="col">Tempo</th>
                <th scope="col">Data</th>
            </tr>
        </thead>
        <tbody>
    `)

    for (const jogoMemoria of arr_jogosMemoria) {
        tableBody.append(
            '<tr>' +
            `<th scope="row">${jogoMemoria.jogo}</th>` +
            `<td>${jogoMemoria.vencedor}</td>` +
            `<td>${jogoMemoria.tentativas}</td>` +
            `<td>${jogoMemoria.dimensao}</td>` +
            `<td>${jogoMemoria.tempo}</td>` +
            ` <td>${jogoMemoria.data}</td>` +
            '</tr>'
        )
    }

    tableBody.append(`
            </tbody>
    `)
}

function getAllGames() {
    tableBody.empty();
    tableBody.append(`
        <thead>
            <tr>
                <th scope="col">Jogo</th>
                <th scope="col">Nome do Vencedor</th>
                <th scope="col">Tempo</th>
                <th scope="col">Data</th>
            </tr>
        </thead>
        <tbody>
    `)

    for (const arrHistoricoElement of arr_historico) {
        tableBody.append(
            '<tr>' +
            `<th scope="row">${arrHistoricoElement.jogo}</th>` +
            `<td>${arrHistoricoElement.vencedor}</td>` +
            `<td>${arrHistoricoElement.tempo}</td>` +
            ` <td>${arrHistoricoElement.data}</td>` +
            '</tr>'
        )
    }

    tableBody.append(`
            </tbody>
    `)

}


