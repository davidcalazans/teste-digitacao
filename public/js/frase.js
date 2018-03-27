$("#btn-trocar").click(fraseAleatoria);
$("#btn-busca").click(buscaFrase);

function fraseAleatoria(){
    $("#spinner").toggle();

    $.get("http://localhost:3000/frases", trocarFraseAleatoria).fail(function(){
        $("#erro").show();
        setTimeout(function(){
            $("#erro").hide();
        },3000);
    }).always(function(){
        $("#spinner").toggle();
    });
}

function trocarFraseAleatoria(data){
    var frase = $(".frase");
    var numeroAleatorio = Math.floor(Math.random() * data.length);
    frase.text(data[numeroAleatorio].texto);
    atualizarFrase();
    atualizaTempo(data[numeroAleatorio].tempo);
}

function buscaFrase(){
  $("#spinner").toggle();
  var fraseid = $("#frase-id").val();
  console.log(fraseid);
  var dados = {id: fraseid};
  $.get("http://localhost:3000/frases", dados, trocaFrase).fail(function(){
      $("#erro").show();
      setTimeout(function(){
          $("#erro").hide();
      },2000);
  }).always(function(){
      $("#spinner").toggle();
  });
}

function trocaFrase(data){
  var frase = $(".frase");
  frase.text(data.texto);
  atualizarFrase();
  atualizaTempo(data.tempo);
}
