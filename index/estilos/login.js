$(document).ready(function(){

  function alertSuccess(selector, str){
    $(selector).show('slow').html('<div class="alert alert-success fs-12">'+
                       '<button type="button" class="close" data-dismiss="alert"><i class="fa fa-times"></i></button>'+
                       '<strong>' + str + '</strong>'+
                     '</div>');
  
    $('.scrollup').click();
  
    //$(selector).effect('shake', { direction: 'left', distance: 2, times: 3 }, "slow");
    
    setInterval(function(){
        alertRemove(selector);
    }, 20000);
  }
  
  
  function alertWarning(selector, str){
    if($(selector + ' .alert.alert-warning').length){
      if(!$(selector + ' .alert div').text().match(str)){
        $(selector + ' .alert').append('<div>' + str + '</div>');
      }
    } else {
      $(selector).show('slow').html('<div class="alert alert-warning fs-12">'+
                         '<button type="button" class="close" data-dismiss="alert"><i class="fa fa-times"></i></button>'+
                         '<i class="fa fa-exclamation-circle fa-lg"></i><div>' + str + '</div>'+
                       '</div>');
    }
  
    $('.scrollup').click();
  
    $(selector).effect('shake', { direction: 'left', distance: 2, times: 3 }, "slow");
    
    setInterval(function(){
        alertRemove(selector);
    }, 40000);
  }
  
  
  function alertError(selector, str){
    /*if($(selector + ' .alert.alert-danger').length){
      $(selector + ' .alert').append('<p>' + str + '</p>');
    } else {*/
      $(selector).show('slow').html('<div class="alert alert-danger fs-12">'+
                         '<button type="button" class="close" data-dismiss="alert"><i class="fa fa-times"></i></button>'+
                         '<i class="fa fa-times-circle fa-lg"></i><div>' + str + '</div>'+
                       '</div>');
  
      $('.scrollup').click();
    
      $(selector).effect('shake', { direction: 'left', distance: 2, times: 3 }, "slow");
      
      /*setInterval(function(){
        alertRemove(selector);
      }, 40000);*/
    //}
  }

  
  function alertRemove(selector){
    $(selector).hide('slow').html('');
  }
  
  $("#formValidate").submit(function(e) {
    e.preventDefault(); 
    var formData = new FormData(this);

    $.ajax({
        url: './Controller/login.php',
        type: 'POST',
        data: formData,
        success: function(r) {
          r = r.trim();
          var obj = JSON.parse(r);

          if (obj.result == 'SUCCESS') {
           window.localStorage.setItem('token',obj.jwt);
           window.location.href = './gerenciar_cliente.php';

          }else if (r == 'ERROPARAMETRO') {
            alertError('#alerta-login', 'Informe usuário e senha.');
            window.localStorage.removeItem('token');

          } else if (r == 'SENHA_INVALIDA') {
            alertError('#alerta-login', 'Usuário ou senha incorretos. Tente novamente.');  
            window.localStorage.removeItem('token');
                         
          } else {
            alertError('#alerta-login', 'Erro ao fazer login');
            window.localStorage.removeItem('token');

          }
        },
        cache: false,
        contentType: false,
        processData: false,
        xhr: function() { // Custom XMLHttpRequest
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) { // Avalia se tem suporte a propriedade upload
                myXhr.upload.addEventListener('progress', function() {
                    /* faz alguma coisa durante o progresso do upload */
                }, false);
            }
            return myXhr;
        }
    });
  });

});
