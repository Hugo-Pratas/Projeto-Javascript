let historico = window.localStorage.getItem("Histórico");
let arr_historico = JSON.parse(historico);


for (const arrHistoricoElement of arr_historico) {
}

let tabela = $('#table');
console.log(tabela.html())
tabela.append(
    '<tr>'+
        '<th scope="row">1</th>'+
        '<td>Mark</td>'+
        '<td>Otto</td>'+
       ' <td>@mdo</td>'+
    '</tr>'
)
