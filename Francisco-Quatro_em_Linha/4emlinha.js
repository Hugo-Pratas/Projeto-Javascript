let ready = $(document).ready(function () {
    let jogador1;
    let jogador2;
    let player = 1;
    let winner = 0;
    let numberOfLines = 7;
    let colors = {};
    colors[-1] = "yellow";
    colors[1] = "red";
    let count = 0;
    let dots= [$(".dot")]
    let inicioContador = Math.floor(Date.now() / 1000);
    let intervalo = setInterval(contadorTempo, 1000);
    const idname = $("#name")



    function fillCircle(color) {
        $("#dot").css("background-color",color)


    }


    function verificarNomes() {
        $('#submit').click(function aceitarNomes() {
            jogador1 = document.getElementById("nomejogador1").value
            jogador2 = document.getElementById("nomejogador2").value
            if (!charIsLetter(Array.from(jogador1)) || !charIsLetter(Array.from(jogador2))) {
                return
            }
            fillCircle("red")
            idname.text("Jogador: " + jogador1)
            inicioContador = Math.floor(Date.now() / 1000);
            contadorTempo();
            clearInterval(intervalo);
            intervalo = setInterval(contadorTempo, 1000);
            contadorTempo();
            $('#form').css("display", "none");
            $('#container').css("display", "none");
        });

    }

    verificarNomes()


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

    let trocarJogador = function () {


        if (player === 1) {

            idname.text("Jogador: " + jogador2  )
            fillCircle("yellow")

        } else if (player === -1) {

            idname.text("Jogador: " + jogador1  )
            fillCircle("red")

        }
    }


    function contadorTempo() {
        let agora = Math.floor(Date.now() / 1000); // get the time now
        let diferenca = agora - inicioContador; // diff in seconds between now and start
        let m = Math.floor(diferenca / 60); // get minutes value (quotient of diff)
        let s = Math.floor(diferenca % 60); // get seconds value (remainder of diff)
        m = addZeroContador(m); // add a leading zero if it's single digit
        s = addZeroContador(s); // add a leading zero if it's single digit
        document.getElementById("relogio").innerHTML = m + ":" + s; // update the element where the timer will appear
        return [m,s];
    }

    function addZeroContador(i) {
        if (i < 10) {
            i = "0" + i
        }  // add zero in front of numbers < 10
        return i;
    }


    $(".Espaço").each(function () {
        $(this).attr("id", count);
        $(this).attr("data-player", 0);
        count++;

        $(this).click(function () {
            if (isvalid($(this).attr("id"))) {
                const id = Number($(this).attr("id"))
                const coluna = id % numberOfLines
                const linha = parseInt(id / numberOfLines)
                let lastElementAvailable;

                for (let i = 0; i < 6; i++) {
                    const currentElement = $("#" + getId(i, coluna));
                    if (currentElement.attr("data-player") === "0") {
                        lastElementAvailable = currentElement;
                    }
                }

                $(lastElementAvailable).css("background-color", colors[player]);
                $(lastElementAvailable).attr("data-player", player);

                if (checkWin(player)) {

                    let historicoTempo = contadorTempo().join(":");
                    let listaHistorico = {
                        vencedor: idname.html().split(" ").at(1),
                        tempo: historicoTempo,
                        jogo: "4EmLinha",
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
                    winner = player;
                    setTimeout(() => {alert("Parabéns Ganhou!")
                    }, 1000)
                   return


                }
                trocarJogador()

                player *= -1;

            }



        });

    });


    $("#restart").click(function () {
        inicioContador = Math.floor(Date.now() / 1000); //Get the starting time (right now) in seconds
        contadorTempo();
        clearInterval(intervalo);
        intervalo = setInterval(contadorTempo, 1000);
        limparjogo();
        trocarJogador()
        player *= -1;
    });

    function getId(linha, coluna) {
        return linha * numberOfLines + coluna;

    }

    function limparjogo() {
        $(".Espaço").each(function () {
            $(this).attr("data-player", 0);
            $(this).css("background-color", "white");
            $(this).css("background-color", "");

            winner = 0
        })
    }

    function isvalid(n) {
        let id = parseInt(n);
        if (winner !== 0) {
            return false;
        }
        if ($("#" + id).attr("data-player") === "0") {
            if (id <= 42) {
                return true;
            }
            return false;
        }

    }

    function checkWin(p) {
        //Checkar filas
        var filas = 0;
        for (let i = 0; i < 42; i += 7) {
            for (let j = 0; j < 7; j++) {
                let espaco = $("#" + (i + j));
                if (espaco.attr("data-player") == p) {
                    filas++;
                } else {
                    filas = 0;
                }
                if (filas >= 4) {
                    clearInterval(intervalo)
                    return true;
                }
            }
            filas = 0;
        }
        //checkar colunas
        filas = 0;
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 42; j += 7) {
                let espaco = $("#" + (i + j));
                if (espaco.attr("data-player") == p) {
                    filas++;
                } else {
                    filas = 0;
                }
                if (filas >= 4) {
                    clearInterval(intervalo)
                    return true;
                }
            }
            filas = 0;
        }
        //check diagonais
        let topLeft = 0;
        let topRight = topLeft + 3;


        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 4; j++) {
                if ($("#" + topLeft).attr("data-player") == p
                    && $("#" + (topLeft + 8)).attr("data-player") == p
                    && $("#" + (topLeft + 16)).attr("data-player") == p
                    && $("#" + (topLeft + 24)).attr("data-player") == p) {
                    clearInterval(intervalo)
                    return true;
                }
                if ($("#" + topRight).attr("data-player") == p
                    && $("#" + (topRight + 6)).attr("data-player") == p
                    && $("#" + (topRight + 12)).attr("data-player") == p
                    && $("#" + (topRight + 18)).attr("data-player") == p) {
                    clearInterval(intervalo)
                    return true;
                }

                topLeft++;
                topRight = topLeft + 3;

            }
            topLeft = i * 7 + 7;
            topRight = topLeft + 3;
        }
        return false;
    }

});
