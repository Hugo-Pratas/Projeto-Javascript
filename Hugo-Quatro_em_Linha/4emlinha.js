let ready = $(document).ready(function() {
    let player = 1;
    let winner = 0;
    var colors = {};
    colors[-1] = "yellow";
    colors[1] = "red";
    let count = 0;

    $(".Espaço").each(function () {
        $(this).attr("id", count);
        $(this).attr("data-player", 0);
        count++;

        $(this).click(function () {
            if (isvalid($(this).attr("id"))) {
                $(this).css("background-color", colors[player]);
                $(this).attr("data-player", player);
                if (checkWin(player)) {
                    alert(colors[player] + " Ganhou!")
                    winner = player;
                }

                player *= -1;
            }

        });

    });

    function isvalid(n) {
        var id = parseInt(n);
        if (winner !== 0) {
            return false;
        }
        if ($("#" + id).attr("data-player") === "0") {
            if (id >= 35) {
                return true;
            }
            if ($("#" + (id + 7)).attr("data-player") !== 0) {
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
                if (espaco.attr("data-player") === p) {
                    filas++;
                } else {
                    filas = 0;
                }
                if (filas >= 4) {
                    return true;
                }
            }
            filas = 0;
        }
        filas = 0;
        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 42; j += 7) {
                let espaco = $("#" + (i + j));
                if (espaco.attr("data-player") === p) {
                    filas++;
                } else {
                    filas = 0;
                }
                if (filas >= 4) {
                    return true;
                }
            }
            chain = 0;
        }
        return false;
    }
});


    //checkar colunas
