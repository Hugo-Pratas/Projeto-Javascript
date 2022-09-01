let ready = $(document).ready(function(){
    let player= 1;
    let winner = 0;
    let numberOfLines = 7;
    let colunas= 6;
    let colors= {};
    colors[-1]= "yellow";
    colors[1]="red";
    let count = 0;

    $(".Espaço").each(function (){
        $(this).attr("id",count);
        $(this).attr("data-player",0);
        count++;

        $(this).click(function (){
            if(isvalid($(this).attr("id"))){
                const id = Number( $(this).attr("id"))
                const coluna = id % numberOfLines
                const linha = parseInt(id / numberOfLines)
                console.log("linha",linha)
                console.log("coluna",coluna)

                let lastElementAvailable ;
                for(let i = 0 ; i < 6; i++){
                    console.log("index",i)
                    console.log("coluna",coluna)
                    console.log("id",getId(i,coluna))
                    const currentElement = $("#" + getId(i,coluna));
                    if(currentElement.attr("data-player") === "0"){
                        lastElementAvailable = currentElement;
                    }
                }



                console.log(linha)
                console.log(coluna)
                $(lastElementAvailable).css("background-color",colors[player]);
                $(lastElementAvailable).attr("data-player",player);
                if(checkWin(player)){
                    alert(colors[player]+ " Ganhou!")
                    winner = player;
                }

                player *= -1;
            }

        });

    });

    $("#restart").click(function (){
        limparjogo();
    });
    function getId(linha,coluna){
        return linha * numberOfLines + coluna;

    }
    function limparjogo(){
        $(".Espaço").each(function(){
            $(this).attr("data-player",0);
            $(this).css("background-color","white");

            winner= 0
        })
    }
    function isvalid(n){
        let id= parseInt(n);
        if(winner !== 0){
            return false;
        }
        if($("#"+id).attr("data-player")  === "0"){
            if(id <= 42) {
                return true;
            }
            return false;
        }

    }
    function checkWin(p){
        //Checkar filas
        var filas = 0;
        for(let i = 0; i < 42; i+=7){
            for(let j = 0; j < 7; j++){
                let espaco = $("#" +(i + j));
                if(espaco.attr("data-player") == p) {
                    filas++;
                }else{
                    filas = 0;
                }
                if(filas >= 4){
                    return true;
                }
            }
            filas = 0;
        }
        //checkar colunas
        filas = 0;
        for(let i = 0; i < 7; i++){
            for(let j = 0; j < 42; j+=7){
                let espaco = $("#" +(i + j));
                if(espaco.attr("data-player")== p) {
                    filas++;
                }else{
                    filas = 0;
                }
                if(filas >= 4){
                    return true;
                }
            }
            filas = 0;
        }
        //check diagonais
        let topLeft = 0;
        let topRight= topLeft + 3;


        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 4; j++){
                if($("#" + topLeft).attr("data-player") == p
                    && $("#"+ (topLeft + 8)).attr("data-player") == p
                    && $("#"+ (topLeft + 16)).attr("data-player") == p
                    && $("#"+ (topLeft + 24)).attr("data-player") == p) {
                    return true;
                }
                if($("#" + topRight).attr("data-player") == p
                    && $("#"+ (topRight + 6)).attr("data-player") == p
                    && $("#"+ (topRight + 12)).attr("data-player") == p
                    && $("#"+ (topRight + 18)).attr("data-player") == p){
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
