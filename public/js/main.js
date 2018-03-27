var tinicial = $("#tempo").text();
var textarea = $(".campo-digitacao");

$(document).ready(function(){
    atualizarFrase();
    inicializaContadores();
    inicializaTempo();
    inicializaMarcadores();
    $("#btn-reiniciar").click(reiniciaGame);
    atualizaPlacar();
    $("#usuarios").selectize({
      create: true,
      sortField: 'text'
    });

    $('.tooltip').tooltipster({
      trigger: 'custom'
    });
});

function atualizaTempo(tempo){
    tinicial= tempo;
    $("#tempo").text(tempo);
}

function atualizarFrase(){
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamanhoFrase = $("#tfrase");
    tamanhoFrase.text(numPalavras);
}

function inicializaContadores(){
    textarea.on("input", function(){
    var valorTextarea = textarea.val();
    var quantPalavra = valorTextarea.split(/\S+/).length - 1;
    $("#contador-palavra").text(quantPalavra);
    var quantCaracter = valorTextarea.length;
    $("#contador-caracter").text(quantCaracter);
});
}


function inicializaMarcadores(){
textarea.on("input", function(){
    var frase = $(".frase").text();
    var digitado = textarea.val();
    var comparavel = frase.substr(0,digitado.length);
    if(digitado == comparavel){
       $("textarea").css("background-color","green");
    }else{
       $("textarea").css("background-color","red");
    }
});
}

function inicializaTempo(){
    textarea.one("focus", function(){
        var tempo = $("#tempo").text();
        var id = setInterval(function(){
            tempo --;
            $("#tempo").text(tempo);
            if(tempo == 0){
                clearInterval(id);
                finalizaJogo();
            }
        },1000)
    });
}

function finalizaJogo(){
    textarea.attr("disabled", true);
    inserePlacar();
}

function reiniciaGame(){
    textarea.attr("disabled", false);
    textarea.val("");
    $("#contador-palavra").text("0");
    $("#contador-caracter").text("0");
    $("#tempo").text(tinicial);
    inicializaTempo();
    $("textarea").css("background-color","white");
}
