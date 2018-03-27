$("#btn-placar").click(mostraPlacar);
$("#btn-salvar").click(salvarResultado);

function inserePlacar(){
    var tabela = $(".placar").find("tbody");
    var usuario = $("#usuarios").val();
    var numPalavras = $("#contador-palavra").text();
    var linha = novaLinha(usuario, numPalavras);
    linha.find(".remover").click(removeLinha);
    tabela.prepend(linha);
    $(".placar").slideDown(500);
    scrollPlacar();
}

function scrollPlacar(){
    var posicaoPlacar = $(".placar").offset().top;
    $("body").animate({
        scrollTop: posicaoPlacar + "px"
    },1000);
}


function novaLinha(usuario, palavras){
    var linha = $("<tr>");
    var colunaUsuario = $("<td>").text(usuario);
    var colunaPalavra = $("<td>").text(palavras);
    var colunaRemover = $("<td>");
    var link = $("<a>").addClass("remover").attr("href","#");
    var icon = $("<i>").addClass("material-icons").text("clear");

    link.append(icon);
    colunaRemover.append(link);
    linha.append(colunaUsuario);
    linha.append(colunaPalavra);
    linha.append(colunaRemover);

    return linha;
}

function removeLinha(){
    event.preventDefault();
    var linha = $(this).parent().parent();
    linha.fadeOut();
    setTimeout(function(){
        linha.remove();
    },1000);
}

function mostraPlacar(){
  $(".placar").stop().slideToggle();
}

function salvarResultado(){
  var placar = [];
  var linhas = $("tbody>tr");
  linhas.each(function(){
    var usuario = $(this).find("td:nth-child(1)").text();
    var palavras = $(this).find("td:nth-child(2)").text();

    var score = {
      usuario: usuario,
      pontos: palavras
    }

    placar.push(score);
  });

  var dados = {
    placar: placar
  };
  $.post("http://localhost:3000/placar",dados,function(){
    console.log("salvou...");
    $(".tooltip").tooltipster("open");
  }).fail(function(){
    $(".tooltip").tooltipster("open").tooltipster("Falha ao salvar...");
  }).always(function(){
    setTimeout(function(){
      $(".tooltip").tooltipster("close");
    },1200);
  });
}

function atualizaPlacar(){
  $.get("http://localhost:3000/placar",function(data){
    $(data).each(function(){
      var linha = novaLinha(this.usuario, this.pontos);
      linha.find(".remover").click(removeLinha);
      $("tbody").append(linha);
    })
  });
}
