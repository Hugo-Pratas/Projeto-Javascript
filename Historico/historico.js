let historico = window.localStorage.getItem("Histórico");
let arr_historico = JSON.parse(historico);
let tabela = $('#table tbody');

for (const arrHistoricoElement of arr_historico) {
    tabela.append(
        '<tr>'+
        `<th scope="row">${arrHistoricoElement.jogo}</th>`+
        `<td>${arrHistoricoElement.vencedor}</td>`+
        `<td>${arrHistoricoElement.tempo}</td>`+
        ` <td>${arrHistoricoElement.data}</td>`+
        '</tr>'
    )
}


