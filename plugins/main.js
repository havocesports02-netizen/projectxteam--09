'use strict';

/*

Main javascript functions to init most of the elements

#1. CHAT APP
#2. CALENDAR INIT
#3. FORM VALIDATION
#4. DATE RANGE PICKER
#5. DATATABLES
#6. EDITABLE TABLES
#7. FORM STEPS FUNCTIONALITY
#8. SELECT 2 ACTIVATION
#9. CKEDITOR ACTIVATION
#10. CHARTJS CHARTS http://www.chartjs.org/
#11. MENU RELATED STUFF
#12. CONTENT SIDE PANEL TOGGLER
#13. EMAIL APP
#14. FULL CHAT APP
#15. CRM PIPELINE
#16. OUR OWN CUSTOM DROPDOWNS 
#17. BOOTSTRAP RELATED JS ACTIVATIONS
#18. TODO Application
#19. Fancy Selector
#20. SUPPORT SERVICE
#21. Onboarding Screens Modal
#22. Colors Toggler
#23. Auto Suggest Search
#24. Element Actions

*/
 
function mudaEvento(id, area){
  if (area == 'B') {
    var r = confirm("Tem certeza que deseja excluir o cliente?");
  } else if (area == 'T') {
    var r = confirm("Tem certeza que deseja transferir esse login para você?");
  } else if (area == 'E') {
    var r = confirm("Tem certeza que deseja excluir o vendedor?");
  }

  if (r == true) {
    $.post(
      './Controller/editaEstado.php',
      {
       id: id,
       area: area,
       token: localStorage.getItem('token')
      },
       function (r) {
        r = r.trim();
        if (r == 'SUCCESS') {
          alertSuccess('#alerta-evento', 'Dados alterados com sucesso.');	
          document.location.reload(true);
        } else if (r == 'ERROR') {
          alertError('#alerta-evento', 'Erro ao alterar dados.');                                 
        } else {
          alertError('#alerta-evento', 'Erro ao processar.');
        }
       }
     );
  }
}

function DeletaCliente(id){
  var r = confirm("Tem certeza que deseja excluir o cliente?");

  if (r == true) {
    $.post(
      './Controller/RemoverCliente.php',
      {
       id: id,
       token: localStorage.getItem('token')
      },
       function (r) {
        r = r.trim();
        if (r == 'SUCCESS') {
          alertSuccess('#alerta-cliente', 'Dados removidos com sucesso.');	
          document.location.reload(true);
        } else if (r == 'ERROR') {
          alertError('#alerta-cliente', 'Erro ao alterar dados.');                                 
        } else {
          alertError('#alerta-cliente', 'Erro ao processar.');
        }
       }
     );
  } 
}

function AlterarStatus(){
  var r = confirm("Tem certeza que deseja alterar isso?");

  if (r == true) {
    $.post(
      './Controller/editarGame.php',
      {
       token: localStorage.getItem('token')
      },
       function (r) {
        r = r.trim();
        if (r == 'SUCCESS') {
          document.location.reload(true);
        }
       }
     );
  } 
}

function DeletaRevendedor(id, area){
  var r = confirm("Tem certeza que deseja excluir o vendedor?");

  if (r == true) {
    $.post(
      './Controller/ExcluirRevendedor.php',
      {
       id: id,
       token: localStorage.getItem('token')
      },
       function (r) {
        r = r.trim();
        if (r == 'SUCCESS') {
          alertSuccess('#alerta-revenda', 'Dados alterados com sucesso.');	
          document.location.reload(true);
        } else if (r == 'ERROR') {
          alertError('#alerta-revenda', 'Erro ao alterar dados.');                                 
        } else {
          alertError('#alerta-revenda', 'Erro ao processar.');
        }
       }
     );
  }
}
 
function aceitaEvento(id){

  var r = confirm("Tem certeza que deseja aceitar a solicitação do vendedor?");
  if (r == true) {
    $.post(
      './Controller/editaEstado.php',
      {
       id: id,
       area: 'B',
       aceitaEvento: true,
       token: localStorage.getItem('token')
      },
       function (r) {
          document.location.reload(true);
       }
     );
  }
}

function reset(){
  var r = confirm("Tem certeza que deseja resetar o imei de todos usuários?");
  if (r == true) {
    $.post(
      './Controller/resetarImei.php',
      {
       token: localStorage.getItem('token')
      },
       function (r) {
        document.location.reload(true);
       }
     );
  }
}
 
function excluir(){
  var r = confirm("Tem certeza que deseja excluir os usuários vencidos?");
  if (r == true) {
    $.post(
      './Controller/excluirUsuariosVencidos.php',
      {
       token: localStorage.getItem('token')
      },
       function (r) {
        document.location.reload(true);
       }
     );
  } 
}

function resetarImei(id){
  $.post(
    './Controller/editaEstado.php',
    {
     id: id,
     area: 'TOKENRESET',
     token: localStorage.getItem('token')
    },
     function (r) {
      document.location.reload(true);
     }
   );
}

function editarEvento(id){
  $.post(
   './Model/Evento_model.php',
   {
    id: id,
    token: localStorage.getItem('token')
   },
    function (r) {
      r = JSON.parse(r);
      $("#id").val(r.id);
      $("#user_name").val(r.nome);
      $("#user_id").val(r.usuario);
      $("#user_password").val(r.senha);
      $("#user_credito").val(r.credito);
      $("#user_celular").val(r.celular);
      $("#user_responsavel").val(r.responsavel);
      $("#user_color").val(r.cor);
      
      var games = r.permissoes;
      $(".games").prop("checked", false);
      games.map(function(game, i) {
        $("#"+game.legenda).prop("checked", true);
      })
    }
  );
}

function editarApp(id){
  $.post(
    './Model/Conf_model.php',
    {
     id: id,
     token: localStorage.getItem('token')
    },
     function (r) {
       r = JSON.parse(r);
       $("#id").val(r.id);
       $("#user_nome").val(r.nome);
       $("#user_versao").val(r.versao);
     }
   );
}

function alterar(id, versao) {
  $("#formEditFile").trigger("reset");
  $("#id_arq").val(id);
  $("#titulo_arq").html('Alterar arquivo da versão : '+versao);
  $('.bd-downloads-sm').modal('show');

}

function gerenciarApp(status, id_arq) {
  let mensagem = "habilitar";

  if(status == 0) {
    mensagem = 'desabilitar';
  }

  if (confirm("Tem certeza que deseja "+mensagem+" esta versão?")) {
    $.post(
      './Controller/editarApp.php',
      {
      id: id_arq,
      status: status,
      area: 'status',
      token: localStorage.getItem('token')
      },
      function (r) {
        document.location.reload(true);
      }
    );
  }
}

function acessPanel(id) {
  if (confirm("Tem certeza que deseja acessar o painel? Você será automaticamente deslogado do seu painel.")) {
    $.post(
      './Controller/loginPanel.php',
      {
      id: id,
      token: localStorage.getItem('token')
      },
      function (r) {
        r = r.trim();
        var obj = JSON.parse(r);

        if (obj.result == 'SUCCESS') {
         window.localStorage.setItem('token',obj.jwt);
         window.location.href = './gerenciar_cliente.php';

        }else if (r == 'ERROPARAMETRO') {
          alertError('#alerta-login', 'Informe usuário e senha.');
        } else if (r == 'SENHA_INVALIDA') {
          alertError('#alerta-login', 'Usuário ou senha incorretos. Tente novamente.');                         
        } else {
          alertError('#alerta-login', 'Erro ao fazer login');
        }
      }
    );
  }
}

function editarRevendedor(id){
  $.post(
   './Model/Revendedor_model.php',
   {
    id: id,
    token: localStorage.getItem('token')
   },
    function (r) {
      r = JSON.parse(r);
      $("#id").val(r.id);
      $("#user_name").val(r.nome);
      $("#user_id").val(r.usuario);
      $("#user_password").val(r.senha);
      $("#user_credito").val(r.credito);
      $("#user_color").val(r.cor);
    }
  );
}

function adicionarCredito(id, credito){
  $("#id_creditos").val(id);
  $("#formEditCreditos #area").val('adicionarCredito');
  $("#labelCreditos").html("Vendedor possui "+credito+" credito(s).");
  $("#inputCredito").html("Quanto você quer adicionar?")
}

function removerCredito(id, credito){
  $("#id_creditos").val(id);
  $("#formEditCreditos #area").val('removerCredito');
  $("#labelCreditos").html("Vendedor possui "+credito+" credito(s).");
  $("#inputCredito").html("Quanto você quer remover?")
}


function editarBanner(id){
  $.post(
   './Model/Banner_model.php',
   {
    id: id,
    token: localStorage.getItem('token')
   },
    function (r) {
      r = JSON.parse(r);
      $("#user_id").val(r.user_id);
      $("#user_password").val(r.user_password);
      $("#user_celular").val(r.celular);
      $("#user_color").val(r.cor_linha);

      $("#id").val(r.id);
      $("#user_imei").val(r.user_imei);
      $("#user_vendedor").val(r.user_vendedor);
      $('#select_game').html('');


      if(r.tipo == "VENDEDOR"){
        $("#user_dt_expira").val(r.user_dt_expira);
        if(r.id_game == 1) {
          $('#select_game').append('<option value="1" checked>Free Fire</option>');
        } else if(r.id_game == 2) {
          $('#select_game').append('<option value="2" checked>Champions Legion</option>');
        } else if(r.id_game == 3) {
          $('#select_game').append('<option value="3" checked>League of Legends</option>');  
        }

      }else{
        var splits = r.user_dt_expira.split('T');
        $("#user_dt_expira").val(splits[0]);
        $("#user_dt_expira").show();

        if(r.id_game == 1) {
          $('#select_game').append('<option value="1" checked>Free Fire</option>');
          $('#select_game').append('<option value="2">Champions Legion</option>');
          $('#select_game').append('<option value="3">League of Legends</option>');  
        } else if(r.id_game == 2) {
          $('#select_game').append('<option value="2" checked>Champions Legion</option>');
          $('#select_game').append('<option value="1">Free Fire</option>');
          $('#select_game').append('<option value="3">League of Legends</option>');  
        } else if(r.id_game == 3) {
          $('#select_game').append('<option value="3" checked>League of Legends</option>');  
          $('#select_game').append('<option value="1">Free Fire</option>');
          $('#select_game').append('<option value="2">Champions Legion</option>');
        }

      }
    }
  );
}

function editarGerenciamentoVendedor(id, id_vendedor){
   $.ajax({
          url: "./Model/Vendedores.php",
          type: "POST",
          data: { token: localStorage.getItem('token'), area: 'lista' },
          dataType: "html"
      }).done(function(resposta) {
      $("#id_cliente_vendedor").val(id);
      $("#select_vendedor").html(resposta);
      $("#select_vendedor").val(id_vendedor);

      }).fail(function(jqXHR, textStatus ) {
        localStorage.removeItem("token");
            window.location.href = '../index.php';
    });
}

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

	//$(selector).effect('shake', { direction: 'left', distance: 2, times: 3 }, "slow");
	
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
	
		//$(selector).effect('shake', { direction: 'left', distance: 2, times: 3 }, "slow");
		
		/*setInterval(function(){
			alertRemove(selector);
		}, 40000);*/
	//}
}

function alertRemove(selector){
	$(selector).hide('slow').html('');
}

// ------------------------------------
// HELPER FUNCTIONS TO TEST FOR SPECIFIC DISPLAY SIZE (RESPONSIVE HELPERS)
// ------------------------------------

function is_display_type(display_type) {
  return $('.display-type').css('content') == display_type || $('.display-type').css('content') == '"' + display_type + '"';
}
function not_display_type(display_type) {
  return $('.display-type').css('content') != display_type && $('.display-type').css('content') != '"' + display_type + '"';
}

// Initiate on click and on hover sub menu activation logic
function os_init_sub_menus() {

  // INIT MENU TO ACTIVATE ON HOVER
  var menu_timer;
  $('.menu-activated-on-hover').on('mouseenter', 'ul.main-menu > li.has-sub-menu', function () {
    var $elem = $(this);
    clearTimeout(menu_timer);
    $elem.closest('ul').addClass('has-active').find('> li').removeClass('active');
    $elem.addClass('active');
  });

  $('.menu-activated-on-hover').on('mouseleave', 'ul.main-menu > li.has-sub-menu', function () {
    var $elem = $(this);
    menu_timer = setTimeout(function () {
      $elem.removeClass('active').closest('ul').removeClass('has-active');
    }, 30);
  });

  // INIT MENU TO ACTIVATE ON CLICK
  $('.menu-activated-on-click').on('click', 'li.has-sub-menu > a', function (event) {
    var $elem = $(this).closest('li');
    if ($elem.hasClass('active')) {
      $elem.removeClass('active');
    } else {
      $elem.closest('ul').find('li.active').removeClass('active');
      $elem.addClass('active');
    }
    return false;
  });
}

$(function () {

  // #1. CHAT APP

  $('.floated-chat-btn, .floated-chat-w .chat-close').on('click', function () {
    $('.floated-chat-w').toggleClass('active');
    return false;
  });

  $('.message-input').on('keypress', function (e) {
    if (e.which == 13) {
      $('.chat-messages').append('<div class="message self"><div class="message-content">' + $(this).val() + '</div></div>');
      $(this).val('');
      var $messages_w = $('.floated-chat-w .chat-messages');
      $messages_w.scrollTop($messages_w.prop("scrollHeight"));
      $messages_w.perfectScrollbar('update');
      return false;
    }
  });

  $('.floated-chat-w .chat-messages').perfectScrollbar();

  // #2. CALENDAR INIT

  if ($("#fullCalendar").length) {
    var calendar, d, date, m, y;

    date = new Date();

    d = date.getDate();

    m = date.getMonth();

    y = date.getFullYear();

    calendar = $("#fullCalendar").fullCalendar({
      header: {
        left: "prev,next today",
        center: "title",
        right: "month,agendaWeek,agendaDay"
      },
      selectable: true,
      selectHelper: true,
      select: function select(start, end, allDay) {
        var title;
        title = prompt("Event Title:");
        if (title) {
          calendar.fullCalendar("renderEvent", {
            title: title,
            start: start,
            end: end,
            allDay: allDay
          }, true);
        }
        return calendar.fullCalendar("unselect");
      },
      editable: true,
      events: [{
        title: "Long Event",
        start: new Date(y, m, 3, 12, 0),
        end: new Date(y, m, 7, 14, 0)
      }, {
        title: "Lunch",
        start: new Date(y, m, d, 12, 0),
        end: new Date(y, m, d + 2, 14, 0),
        allDay: false
      }, {
        title: "Click for Google",
        start: new Date(y, m, 28),
        end: new Date(y, m, 29),
        url: "http://google.com/"
      }]
    });
  }

  // #3. FORM VALIDATION

  if ($('#formValidate').length) {
    $('#formValidate').validator();
  }

  // #4. DATE RANGE PICKER

  $('input.single-daterange').daterangepicker({ "singleDatePicker": true,   dateFormat: "dd-mm-yy"});
  $('input.multi-daterange').daterangepicker({ "startDate": "28/03/2017", "endDate": "04/06/2017" });
  // #5. DATATABLES

  if ($('#formValidate').length) {
    $('#formValidate').validator();
  }
  if ($('#dataTable1').length) {
    $('#dataTable1').DataTable({ buttons: ['copy', 'excel', 'pdf'] });
  }
  // #6. EDITABLE TABLES

  if ($('#editableTable').length) {
    $('#editableTable').editableTableWidget();
  }

  // #7. FORM STEPS FUNCTIONALITY

  $('.step-trigger-btn').on('click', function () {
    var btn_href = $(this).attr('href');
    $('.step-trigger[href="' + btn_href + '"]').click();
    return false;
  });

  $("#formEditFile").submit(function(e) {
    e.preventDefault(); 
    var formData = new FormData(this);
    formData.append('token', localStorage.getItem('token'));

    $.ajax({
        url: './Controller/setFile.php',
        type: 'POST',
        data: formData,
        success: function(r) {
          r = r.trim();

          if (r == 'SUCCESS') {
            alertSuccess('#alerta-file', 'Dados editados com sucesso.');	
            document.location.reload(true);
          } else if (r == 'ERRORFORMAT') {
            alertError('#alerta-file', 'Arquivo não suportado. Informe um arquivo com o tipo aceito');
          } else if (r == 'ERRORUPLOAD') {
            alertError('#alerta-file', 'Erro ao fazer upload. Tente novamente.');  
          } else if (r == 'ERROR') {
            alertError('#alerta-file', 'Erro ao editar.');                                 
          } else {
            alertError('#alerta-file', 'Erro ao editar os dados.');
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

  $("#formEdit").submit(function(e) {
    e.preventDefault(); 
    var formData = new FormData(this);
    formData.append('token', localStorage.getItem('token'));

    $.ajax({
        url: './Controller/editarDados.php',
        type: 'POST',
        data: formData,
        success: function(r) {
          r = r.trim();
          if (r == 'SUCCESS') {
            alertSuccess('#alerta-evento', 'Dados editados com sucesso.');	
            document.location.reload(true);
          } else if (r == 'ERRORFORMAT') {
            alertError('#alerta-evento', 'Arquivo não suportado. Informe um arquivo com o tipo (jpeg|jpeg|png|gif|bmp)');
          } else if (r == 'ERRORIMAGE') {
            alertError('#alerta-evento', 'Erro ao editar imagem. Tente novamente.');
          } else if (r == 'ERRO_PARAMETROS_SIZE') {
            alertError('#alerta-evento', 'Preencha os campos usuário e senha com até 8 caracteres cada.');   
          } else if (r == 'ERRO_USER_EXIST') {
            alertError('#alerta-evento', 'Usuário já existe. Tente um novo nome.');   
          } else if (r == 'ERROR') {
            alertError('#alerta-evento', 'Erro ao editar.');                                 
          } else {
            alertError('#alerta-evento', 'Erro ao editar os dados.');
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

  $("#formEditApp").submit(function(e) {
    e.preventDefault(); 
    var formData = new FormData(this);
    formData.append('token', localStorage.getItem('token'));

    $.ajax({
        url: './Controller/editarApp.php',
        type: 'POST',
        data: formData,
        success: function(r) {
          r = r.trim();
          if (r == 'SUCCESS') {
            alertSuccess('#alerta-app', 'Dados editados com sucesso.');	
            document.location.reload(true);
          } else if (r == 'ERRORUPDATE') {
            alertError('#alerta-app', 'Erro ao alterar dados');
          } else if (r == 'ERROR') {
            alertError('#alerta-app', 'Erro ao editar.');                                 
          } else {
            alertError('#alerta-app', 'Erro ao editar os dados.');
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

  $("#formEditCreditos").submit(function(e) {
    e.preventDefault(); 
    var formData = new FormData(this);
    formData.append('token', localStorage.getItem('token'));

    $.ajax({
        url: './Controller/editarDados.php',
        type: 'POST',
        data: formData,
        success: function(r) {
          r = r.trim();
          if (r == 'SUCCESS') {
            alertSuccess('#alerta-credito', 'Dados editados com sucesso.');	
            document.location.reload(true);
          } else if (r == 'ERRORFORMAT') {
            alertError('#alerta-credito', 'Arquivo não suportado. Informe um arquivo com o tipo (jpeg|jpeg|png|gif|bmp)');
          } else if (r == 'ERRORIMAGE') {
            alertError('#alerta-credito', 'Erro ao editar imagem. Tente novamente.');
          } else if (r == 'ERRO_PARAMETROS_SIZE') {
            alertError('#alerta-credito', 'Preencha os campos usuário e senha com até 8 caracteres cada.');   
          } else if (r == 'ERROR') {
            alertError('#alerta-credito', 'Erro ao editar.');                                 
          } else {
            alertError('#alerta-credito', 'Erro ao editar os dados.');
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

  $("#formEditMudarVendedor").submit(function(e) {
    e.preventDefault(); 

    var formData = new FormData(this);
    formData.append('token', localStorage.getItem('token'));
    formData.append('area', 'mudarVendedor');

    $.ajax({
        url: './Controller/editarDados.php',
        type: 'POST',
        data: formData,
        success: function(r) {
          r = r.trim();
          if (r == 'SUCCESS') {
            alertSuccess('#alerta-evento', 'Dados editados com sucesso.');	
            document.location.reload(true);
          } else if (r == 'ERRORFORMAT') {
            alertError('#alerta-evento', 'Arquivo não suportado. Informe um arquivo com o tipo (jpeg|jpeg|png|gif|bmp)');
          } else if (r == 'ERRORIMAGE') {
            alertError('#alerta-evento', 'Erro ao editar imagem. Tente novamente.');
          } else if (r == 'ERRO_PARAMETROS_SIZE') {
            alertError('#alerta-evento', 'Preencha os campos usuário e senha com até 8 caracteres cada.');   
          } else if (r == 'ERROR') {
            alertError('#alerta-evento', 'Erro ao editar.');                                 
          } else {
            alertError('#alerta-evento', 'Erro ao editar os dados.');
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

  $("#formValidateEvento").submit(function(e) {
    e.preventDefault(); 
    var formData = new FormData(this);
    formData.append('token', localStorage.getItem('token'));

    $.ajax({
        url: './Controller/InsereEvento.php',
        type: 'POST',
        data: formData,
        success: function(r) {
          r = r.trim();
          if (r == 'SUCCESS') {
            alertSuccess('#alerta-evento', 'Evento inserido com sucesso');	
            //Limpa o formulário.
            document.getElementById("formValidateEvento").reset();
          } else if (r == 'ERRORFORMAT') {
            alertError('#alerta-evento', 'Arquivo não suportado. Informe um arquivo com o tipo (jpeg|jpeg|png|gif|bmp)');
          } else if (r == 'ERRORIMAGE') {
            alertError('#alerta-evento', 'Erro ao inserir imagem. Tente novamente.');
          } else if (r == 'ERROR') {
            alertError('#alerta-evento', 'Erro ao cadastrar evento.');   
          } else if (r == 'ERRO_JWT') {
            alertError('#alerta-evento', 'Erro jwt');     
            localStorage.removeItem("token");
            window.location.href = '../index.php';  
          } else if (r == 'ERRO_PARAMETROS') { 
            alertError('#alerta-evento', 'Preencha todos os campos');
          } else {
            alertError('#alerta-evento', 'Erro ao gravar os dados');
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

  $("#formValidateRevendedor").submit(function(e) {
    e.preventDefault(); 
    var formData = new FormData(this);
    formData.append('token', localStorage.getItem('token'));

    $.ajax({
        url: './Controller/InsereRevendedor.php',
        type: 'POST',
        data: formData,
        success: function(r) {
          r = r.trim();
          if (r == 'SUCCESS') {
            alertSuccess('#alerta-revendedor', 'Evento inserido com sucesso');	
            //Limpa o formulário.
            document.getElementById("formValidateRevendedor").reset();
          } else if (r == 'ERRORFORMAT') {
            alertError('#alerta-revendedor', 'Arquivo não suportado. Informe um arquivo com o tipo (jpeg|jpeg|png|gif|bmp)');
          } else if (r == 'ERRORIMAGE') {
            alertError('#alerta-revendedor', 'Erro ao inserir imagem. Tente novamente.');
          } else if (r == 'ERROR') {
            alertError('#alerta-revendedor', 'Erro ao cadastrar evento.');   
          } else if (r == 'ERRO_JWT') {
            alertError('#alerta-revendedor', 'Erro jwt');     
            localStorage.removeItem("token");
            window.location.href = '../index.php';  
          } else if (r == 'ERRO_PARAMETROS') { 
            alertError('#alerta-revendedor', 'Preencha todos os campos');
          } else {
            alertError('#alerta-revendedor', 'Erro ao gravar os dados');
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

  $("#formValidateBanner").submit(function(e) {
    e.preventDefault(); 
    var formData = new FormData(this);
    formData.append('token', localStorage.getItem('token'));

    $.ajax({
        url: './Controller/InsereCliente.php',
        type: 'POST',
        data: formData,
        success: function(r) {
          r = r.trim();
          if (r == 'SUCCESS') {
            alertSuccess('#alerta-banner', 'Cliente inserido com sucesso');	
            //Limpa o formulário.
            document.getElementById("formValidateBanner").reset();
          } else if (r == 'ERROR') {
            alertError('#alerta-banner', 'Erro ao cadastrar cliente.');     
          } else if (r == 'ERRO_PARAMETROS') {
            alertError('#alerta-banner', 'Preencha todos os campos obrigatórios e tente novamente.');    
          } else if (r == 'ERRO_PARAMETROS_SIZE') {
            alertError('#alerta-banner', 'Preencha os campos usuário e senha com até 8 caracteres cada.');      
          } else if (r == 'ERRO_SELECT') {
            alertError('#alerta-banner', 'Erro ao buscar usuários, Atualize a página e tente novamente.');     
          } else if (r == 'ERRO_DATA_MENOR') {
            alertError('#alerta-banner', 'Data menor que hoje. Não é permitido.');        
          } else if (r == 'ERRO_USER_EXIST') {
            alertError('#alerta-banner', 'Nome de Usuário informado já existe.');      
          } else if (r == 'SEMCREDITOS') {
            alertError('#alerta-banner', 'Você não possui créditos. Recarregue seu painel.');      
          } else if (r == 'ERRO_30') {
            alertError('#alerta-banner', 'Data superior a 30 dias. Não é permitido.');     
          } else if (r == 'ERRO_JWT') {
            alertError('#alerta-banner', 'Erro jwt');     
            localStorage.removeItem("token");
            window.location.href = '../index.php';

          } else {
            alertError('#alerta-banner', 'Erro interno. Contate a equipe tecnica.');
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

  $("#formEditResetCliente").submit(function(e) {
    e.preventDefault(); 
    var formData = new FormData(this);
    formData.append('token', localStorage.getItem('token'));

    $.ajax({
        url: './Controller/resetarClientesVendedores.php',
        type: 'POST',
        data: formData,
        success: function(r) {
          r = r.trim();
          if (r == 'SUCCESS') {
            alertSuccess('#alerta-reset', 'Reset feito com sucesso');	
            document.location.reload(true);
          } else if (r == 'ERROR') {
            alertError('#alerta-reset', 'Erro ao resetar clientes.');     
          } else if (r == 'ERROPARAMETRO') {
            alertError('#alerta-reset', 'Preencha o captcha obrigatório e tente novamente.'); 
          } else if (r == 'ERRO_JWT') {
            alertError('#alerta-reset', 'Erro jwt');     
            localStorage.removeItem("token");
            window.location.href = '../index.php';

          } else {
            alertError('#alerta-reset', 'Erro interno. Contate a equipe tecnica.');
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

  $("#formValidateAviso").submit(function(e) {
    e.preventDefault(); 
    var formData = new FormData(this);
    formData.append('token', localStorage.getItem('token'));

    $.ajax({
        url: './Controller/InsereAviso.php',
        type: 'POST',
        data: formData,
        success: function(r) {
          r = r.trim();
          if (r == 'SUCCESS') {
            alertSuccess('#alerta-banner', 'Aviso inserido com sucesso');	
            //Limpa o formulário.
            document.getElementById("formValidateAviso").reset();
          } else if (r == 'ERROR') {
            alertError('#alerta-banner', 'Erro ao cadastrar aviso.');     
          } else if (r == 'ERRO_PARAMETROS') {
            alertError('#alerta-banner', 'Preencha todos os campos obrigatórios e tente novamente.'); 
          } else if (r == 'ERRO_JWT') {
            alertError('#alerta-banner', 'Erro jwt');     
            localStorage.removeItem("token");
            window.location.href = '../index.php';

          } else {
            alertError('#alerta-banner', 'Erro interno. Contate a equipe tecnica.');
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

  // FORM STEP CLICK
  $('.step-trigger').on('click', function () {
    var prev_trigger = $(this).prev('.step-trigger');
    if (prev_trigger.length && !prev_trigger.hasClass('active') && !prev_trigger.hasClass('complete')) return false;
    var content_id = $(this).attr('href');
    $(this).closest('.step-triggers').find('.step-trigger').removeClass('active');
    $(this).prev('.step-trigger').addClass('complete');
    $(this).addClass('active');
    $('.step-content').removeClass('active');
    $('.step-content' + content_id).addClass('active');
    return false;
  });
  // END STEPS FUNCTIONALITY


  // #8. SELECT 2 ACTIVATION

  if ($('.select2').length) {
    $('.select2').select2();
  }

  // #9. CKEDITOR ACTIVATION

  if ($('#ckeditor1').length) {
    CKEDITOR.replace('ckeditor1');
  }

  // #10. CHARTJS CHARTS http://www.chartjs.org/

  if (typeof Chart !== 'undefined') {

    var fontFamily = '"Proxima Nova W01", -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
    // set defaults
    Chart.defaults.global.defaultFontFamily = fontFamily;
    Chart.defaults.global.tooltips.titleFontSize = 14;
    Chart.defaults.global.tooltips.titleMarginBottom = 4;
    Chart.defaults.global.tooltips.displayColors = false;
    Chart.defaults.global.tooltips.bodyFontSize = 12;
    Chart.defaults.global.tooltips.xPadding = 10;
    Chart.defaults.global.tooltips.yPadding = 8;

    // init lite line chart if element exists

    if ($("#liteLineChart").length) {
      var liteLineChart = $("#liteLineChart");

      var liteLineGradient = liteLineChart[0].getContext('2d').createLinearGradient(0, 0, 0, 200);
      liteLineGradient.addColorStop(0, 'rgba(30,22,170,0.08)');
      liteLineGradient.addColorStop(1, 'rgba(30,22,170,0)');

      var chartData = [13, 28, 19, 24, 43, 49];

      if (liteLineChart.data('chart-data')) chartData = liteLineChart.data('chart-data').split(',');

      // line chart data
      var liteLineData = {
        labels: ["January 1", "January 5", "January 10", "January 15", "January 20", "January 25"],
        datasets: [{
          label: "Sold",
          fill: true,
          lineTension: 0.4,
          backgroundColor: liteLineGradient,
          borderColor: "#8f1cad",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "#fff",
          pointBackgroundColor: "#2a2f37",
          pointBorderWidth: 2,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: "#FC2055",
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 2,
          pointRadius: 4,
          pointHitRadius: 5,
          data: chartData,
          spanGaps: false
        }]
      };

      // line chart init
      var myLiteLineChart = new Chart(liteLineChart, {
        type: 'line',
        data: liteLineData,
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: false,
              ticks: {
                fontSize: '11',
                fontColor: '#969da5'
              },
              gridLines: {
                color: 'rgba(0,0,0,0.0)',
                zeroLineColor: 'rgba(0,0,0,0.0)'
              }
            }],
            yAxes: [{
              display: false,
              ticks: {
                beginAtZero: true,
                max: 55
              }
            }]
          }
        }
      });
    }

    // init lite line chart V2 if element exists

    if ($("#liteLineChartV2").length) {
      var liteLineChartV2 = $("#liteLineChartV2");

      var liteLineGradientV2 = liteLineChartV2[0].getContext('2d').createLinearGradient(0, 0, 0, 100);
      liteLineGradientV2.addColorStop(0, 'rgba(40,97,245,0.1)');
      liteLineGradientV2.addColorStop(1, 'rgba(40,97,245,0)');

      var chartDataV2 = [13, 28, 19, 24, 43, 49, 40, 35, 42, 46];

      if (liteLineChartV2.data('chart-data')) chartDataV2 = liteLineChartV2.data('chart-data').split(',');

      // line chart data
      var liteLineDataV2 = {
        labels: ["1", "3", "6", "9", "12", "15", "18", "21", "24", "27"],
        datasets: [{
          label: "Balance",
          fill: true,
          lineTension: 0.35,
          backgroundColor: liteLineGradientV2,
          borderColor: "#2861f5",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "#2861f5",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 2,
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "#FC2055",
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 10,
          data: chartDataV2,
          spanGaps: false
        }]
      };

      // line chart init
      var myLiteLineChartV2 = new Chart(liteLineChartV2, {
        type: 'line',
        data: liteLineDataV2,
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              ticks: {
                fontSize: '10',
                fontColor: '#969da5'
              },
              gridLines: {
                color: 'rgba(0,0,0,0.0)',
                zeroLineColor: 'rgba(0,0,0,0.0)'
              }
            }],
            yAxes: [{
              display: false,
              ticks: {
                beginAtZero: true,
                max: 55
              }
            }]
          }
        }
      });
    }

    // init lite line chart V2 if element exists

    if ($("#liteLineChartV3").length) {
      var liteLineChartV3 = $("#liteLineChartV3");

      var liteLineGradientV3 = liteLineChartV3[0].getContext('2d').createLinearGradient(0, 0, 0, 70);
      liteLineGradientV3.addColorStop(0, 'rgba(40,97,245,0.2)');
      liteLineGradientV3.addColorStop(1, 'rgba(40,97,245,0)');

      var chartDataV3 = [13, 28, 19, 24, 43, 49, 40, 35, 42, 46, 38];

      if (liteLineChartV3.data('chart-data')) chartDataV3 = liteLineChartV3.data('chart-data').split(',');

      // line chart data
      var liteLineDataV3 = {
        labels: ["", "FEB", "", "MAR", "", "APR", "", "MAY", "", "JUN", "", "JUL", ""],
        datasets: [{
          label: "Balance",
          fill: true,
          lineTension: 0.15,
          backgroundColor: liteLineGradientV3,
          borderColor: "#2861f5",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "#2861f5",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 2,
          pointHoverRadius: 3,
          pointHoverBackgroundColor: "#FC2055",
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 0,
          pointRadius: 0,
          pointHitRadius: 10,
          data: chartDataV3,
          spanGaps: false
        }]
      };

      // line chart init
      var myLiteLineChartV3 = new Chart(liteLineChartV3, {
        type: 'line',
        data: liteLineDataV3,
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              ticks: {
                fontSize: '10',
                fontColor: '#969da5'
              },
              gridLines: {
                color: 'rgba(0,0,0,0.0)',
                zeroLineColor: 'rgba(0,0,0,0.0)'
              }
            }],
            yAxes: [{
              display: false,
              ticks: {
                beginAtZero: true,
                max: 55
              }
            }]
          }
        }
      });
    }

    // init line chart if element exists
    if ($("#lineChart").length) {
      var lineChart = $("#lineChart");

      // line chart data
      var lineData = {
        labels: ["1", "5", "10", "15", "20", "25", "30", "35"],
        datasets: [{
          label: "Visitors Graph",
          fill: false,
          lineTension: 0.3,
          backgroundColor: "#fff",
          borderColor: "#047bf8",
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: "#fff",
          pointBackgroundColor: "#141E41",
          pointBorderWidth: 3,
          pointHoverRadius: 10,
          pointHoverBackgroundColor: "#FC2055",
          pointHoverBorderColor: "#fff",
          pointHoverBorderWidth: 3,
          pointRadius: 5,
          pointHitRadius: 10,
          data: [27, 20, 44, 24, 29, 22, 43, 52],
          spanGaps: false
        }]
      };

      // line chart init
      var myLineChart = new Chart(lineChart, {
        type: 'line',
        data: lineData,
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              ticks: {
                fontSize: '11',
                fontColor: '#969da5'
              },
              gridLines: {
                color: 'rgba(0,0,0,0.05)',
                zeroLineColor: 'rgba(0,0,0,0.05)'
              }
            }],
            yAxes: [{
              display: false,
              ticks: {
                beginAtZero: true,
                max: 65
              }
            }]
          }
        }
      });
    }

    // init donut chart if element exists
    if ($("#barChart1").length) {
      var barChart1 = $("#barChart1");
      var barData1 = {
        labels: ["January", "February", "March", "April", "May", "June"],
        datasets: [{
          label: "My First dataset",
          backgroundColor: ["#5797FC", "#629FFF", "#6BA4FE", "#74AAFF", "#7AAEFF", '#85B4FF'],
          borderColor: ['rgba(255,99,132,0)', 'rgba(54, 162, 235, 0)', 'rgba(255, 206, 86, 0)', 'rgba(75, 192, 192, 0)', 'rgba(153, 102, 255, 0)', 'rgba(255, 159, 64, 0)'],
          borderWidth: 1,
          data: [24, 42, 18, 34, 56, 28]
        }]
      };
      // -----------------
      // init bar chart
      // -----------------
      new Chart(barChart1, {
        type: 'bar',
        data: barData1,
        options: {
          scales: {
            xAxes: [{
              display: false,
              ticks: {
                fontSize: '11',
                fontColor: '#969da5'
              },
              gridLines: {
                color: 'rgba(0,0,0,0.05)',
                zeroLineColor: 'rgba(0,0,0,0.05)'
              }
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true
              },
              gridLines: {
                color: 'rgba(0,0,0,0.05)',
                zeroLineColor: '#6896f9'
              }
            }]
          },
          legend: {
            display: false
          },
          animation: {
            animateScale: true
          }
        }
      });
    }

    // init pie chart if element exists
    if ($("#pieChart1").length) {
      var pieChart1 = $("#pieChart1");

      // pie chart data
      var pieData1 = {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
        datasets: [{
          data: [300, 50, 100, 30, 70],
          backgroundColor: ["#5797fc", "#7e6fff", "#4ecc48", "#ffcc29", "#f37070"],
          hoverBackgroundColor: ["#5797fc", "#7e6fff", "#4ecc48", "#ffcc29", "#f37070"],
          borderWidth: 0
        }]
      };

      // -----------------
      // init pie chart
      // -----------------
      new Chart(pieChart1, {
        type: 'pie',
        data: pieData1,
        options: {
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 15,
              fontColor: '#3e4b5b'
            }
          },
          animation: {
            animateScale: true
          }
        }
      });
    }

    // -----------------
    // init donut chart if element exists
    // -----------------
    if ($("#donutChart").length) {
      var donutChart = $("#donutChart");

      // donut chart data
      var data = {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
        datasets: [{
          data: [300, 50, 100, 30, 70],
          backgroundColor: ["#5797fc", "#7e6fff", "#4ecc48", "#ffcc29", "#f37070"],
          hoverBackgroundColor: ["#5797fc", "#7e6fff", "#4ecc48", "#ffcc29", "#f37070"],
          borderWidth: 0
        }]
      };

      // -----------------
      // init donut chart
      // -----------------
      new Chart(donutChart, {
        type: 'doughnut',
        data: data,
        options: {
          legend: {
            display: false
          },
          animation: {
            animateScale: true
          },
          cutoutPercentage: 80
        }
      });
    }

    // -----------------
    // init donut chart if element exists
    // -----------------
    if ($("#donutChart1").length) {
      var donutChart1 = $("#donutChart1");

      // donut chart data
      var data1 = {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
        datasets: [{
          data: [300, 50, 100, 30, 70],
          backgroundColor: ["#5797fc", "#7e6fff", "#4ecc48", "#ffcc29", "#f37070"],
          hoverBackgroundColor: ["#5797fc", "#7e6fff", "#4ecc48", "#ffcc29", "#f37070"],
          borderWidth: 6,
          hoverBorderColor: 'transparent'
        }]
      };

      // -----------------
      // init donut chart
      // -----------------
      new Chart(donutChart1, {
        type: 'doughnut',
        data: data1,
        options: {
          legend: {
            display: false
          },
          animation: {
            animateScale: true
          },
          cutoutPercentage: 80
        }
      });
    }
  }

  // #11. MENU RELATED STUFF

  // INIT MOBILE MENU TRIGGER BUTTON
  $('.mobile-menu-trigger').on('click', function () {
    $('.menu-mobile .menu-and-user').slideToggle(200, 'swing');
    return false;
  });

  os_init_sub_menus();

  // #12. CONTENT SIDE PANEL TOGGLER

  $('.content-panel-toggler, .content-panel-close, .content-panel-open').on('click', function () {
    $('.all-wrapper').toggleClass('content-panel-active');
  });

  // #13. EMAIL APP 

  $('.more-messages').on('click', function () {
    $(this).hide();
    $('.older-pack').slideDown(100);
    $('.aec-full-message-w.show-pack').removeClass('show-pack');
    return false;
  });

  $('.ae-list').perfectScrollbar({ wheelPropagation: true });

  $('.ae-list .ae-item').on('click', function () {
    $('.ae-item.active').removeClass('active');
    $(this).addClass('active');
    return false;
  });

  // CKEDITOR ACTIVATION FOR MAIL REPLY
  if (typeof CKEDITOR !== 'undefined') {
    CKEDITOR.disableAutoInline = true;
    if ($('#ckeditorEmail').length) {
      CKEDITOR.config.uiColor = '#ffffff';
      CKEDITOR.config.toolbar = [['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']];
      CKEDITOR.config.height = 110;
      CKEDITOR.replace('ckeditor1');
    }
  }

  // EMAIL SIDEBAR MENU TOGGLER
  $('.ae-side-menu-toggler').on('click', function () {
    $('.app-email-w').toggleClass('compact-side-menu');
  });

  // EMAIL MOBILE SHOW MESSAGE
  $('.ae-item').on('click', function () {
    $('.app-email-w').addClass('forse-show-content');
  });

  if ($('.app-email-w').length) {
    if (is_display_type('phone') || is_display_type('tablet')) {
      $('.app-email-w').addClass('compact-side-menu');
    }
  }

  // #14. FULL CHAT APP
  function add_full_chat_message($input) {
    $('.chat-content').append('<div class="chat-message self"><div class="chat-message-content-w"><div class="chat-message-content">' + $input.val() + '</div></div><div class="chat-message-date">1:23pm</div><div class="chat-message-avatar"><img alt="" src="img/avatar1.jpg"></div></div>');
    $input.val('');
    var $messages_w = $('.chat-content-w');
    $messages_w.scrollTop($messages_w[0].scrollHeight);
  }

  $('.chat-btn a').on('click', function () {
    add_full_chat_message($('.chat-input input'));
    return false;
  });
  $('.chat-input input').on('keypress', function (e) {
    if (e.which == 13) {
      add_full_chat_message($(this));
      return false;
    }
  });

  // #15. CRM PIPELINE
  if ($('.pipeline').length) {
    // INIT DRAG AND DROP FOR PIPELINE ITEMS
    var dragulaObj = dragula($('.pipeline-body').toArray(), {}).on('drag', function () {}).on('drop', function (el) {}).on('over', function (el, container) {
      $(container).closest('.pipeline-body').addClass('over');
    }).on('out', function (el, container, source) {

      var new_pipeline_body = $(container).closest('.pipeline-body');
      new_pipeline_body.removeClass('over');
      var old_pipeline_body = $(source).closest('.pipeline-body');
    });
  }

  // #16. OUR OWN CUSTOM DROPDOWNS 
  $('.os-dropdown-trigger').on('mouseenter', function () {
    $(this).addClass('over');
  });
  $('.os-dropdown-trigger').on('mouseleave', function () {
    $(this).removeClass('over');
  });

  // #17. BOOTSTRAP RELATED JS ACTIVATIONS

  // - Activate tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // - Activate popovers
  $('[data-toggle="popover"]').popover();

  // #18. TODO Application

  // Tasks foldable trigger
  $('.tasks-header-toggler').on('click', function () {
    $(this).closest('.tasks-section').find('.tasks-list-w').slideToggle(100);
    return false;
  });

  // Sidebar Sections foldable trigger
  $('.todo-sidebar-section-toggle').on('click', function () {
    $(this).closest('.todo-sidebar-section').find('.todo-sidebar-section-contents').slideToggle(100);
    return false;
  });

  // Sidebar Sub Sections foldable trigger
  $('.todo-sidebar-section-sub-section-toggler').on('click', function () {
    $(this).closest('.todo-sidebar-section-sub-section').find('.todo-sidebar-section-sub-section-content').slideToggle(100);
    return false;
  });

  // Drag init
  if ($('.tasks-list').length) {
    // INIT DRAG AND DROP FOR Todo Tasks
    var dragulaTasksObj = dragula($('.tasks-list').toArray(), {
      moves: function moves(el, container, handle) {
        return handle.classList.contains('drag-handle');
      }
    }).on('drag', function () {}).on('drop', function (el) {}).on('over', function (el, container) {
      $(container).closest('.tasks-list').addClass('over');
    }).on('out', function (el, container, source) {

      var new_pipeline_body = $(container).closest('.tasks-list');
      new_pipeline_body.removeClass('over');
      var old_pipeline_body = $(source).closest('.tasks-list');
    });
  }

  // Task actions init

  // Complete/Done
  $('.task-btn-done').on('click', function () {
    $(this).closest('.draggable-task').toggleClass('complete');
    return false;
  });

  // Favorite/star
  $('.task-btn-star').on('click', function () {
    $(this).closest('.draggable-task').toggleClass('favorite');
    return false;
  });

  // Delete
  var timeoutDeleteTask;
  $('.task-btn-delete').on('click', function () {
    if (confirm('Are you sure you want to delete this task?')) {
      var $task_to_remove = $(this).closest('.draggable-task');
      $task_to_remove.addClass('pre-removed');
      $task_to_remove.append('<a href="#" class="task-btn-undelete">Undo Delete</a>');
      timeoutDeleteTask = setTimeout(function () {
        $task_to_remove.slideUp(300, function () {
          $(this).remove();
        });
      }, 5000);
    }
    return false;
  });

  $('.tasks-list').on('click', '.task-btn-undelete', function () {
    $(this).closest('.draggable-task').removeClass('pre-removed');
    $(this).remove();
    if (typeof timeoutDeleteTask !== 'undefined') {
      clearTimeout(timeoutDeleteTask);
    }
    return false;
  });

  // #19. Fancy Selector
  $('.fs-selector-trigger').on('click', function () {
    $(this).closest('.fancy-selector-w').toggleClass('opened');
  });

  // #20. SUPPORT SERVICE

  $('.close-ticket-info').on('click', function () {
    $('.support-ticket-content-w').addClass('folded-info').removeClass('force-show-folded-info');
    return false;
  });

  $('.show-ticket-info').on('click', function () {
    $('.support-ticket-content-w').removeClass('folded-info').addClass('force-show-folded-info');
    return false;
  });

  $('.support-index .support-tickets .support-ticket').on('click', function () {
    $('.support-index').addClass('show-ticket-content');
    return false;
  });

  $('.support-index .back-to-index').on('click', function () {
    $('.support-index').removeClass('show-ticket-content');
    return false;
  });

  // #21. Onboarding Screens Modal

  $('.onboarding-modal.show-on-load').modal('show');
  if ($('.onboarding-modal .onboarding-slider-w').length) {
    $('.onboarding-modal .onboarding-slider-w').slick({
      dots: true,
      infinite: false,
      adaptiveHeight: true,
      slidesToShow: 1,
      slidesToScroll: 1
    });
    $('.onboarding-modal').on('shown.bs.modal', function (e) {
      $('.onboarding-modal .onboarding-slider-w').slick('setPosition');
    });
  }



  // #22. Colors Toggler

  $('.floated-colors-btn').on('click', function () {
    if ($('body').hasClass('color-scheme-dark')) {
      $('.menu-w').removeClass('color-scheme-dark').addClass('color-scheme-light').removeClass('selected-menu-color-bright').addClass('selected-menu-color-light');
      $(this).find('.os-toggler-w').removeClass('on');
    } else {
      $('.menu-w, .top-bar').removeClass(function (index, className) {
        return (className.match(/(^|\s)color-scheme-\S+/g) || []).join(' ');
      });
      $('.menu-w').removeClass(function (index, className) {
        return (className.match(/(^|\s)color-style-\S+/g) || []).join(' ');
      });
      $('.menu-w').addClass('color-scheme-dark').addClass('color-style-transparent').removeClass('selected-menu-color-light').addClass('selected-menu-color-bright');
      $('.top-bar').addClass('color-scheme-transparent');
      $(this).find('.os-toggler-w').addClass('on');
    }
    $('body').toggleClass('color-scheme-dark');
    return false;
  });

  // #23. Autosuggest Search
  $('.autosuggest-search-activator').on('click', function () {
    var search_offset = $(this).offset();
    // If input field is in the activator - show on top of it
    if ($(this).find('input[type="text"]')) {
      search_offset = $(this).find('input[type="text"]').offset();
    }
    var search_field_position_left = search_offset.left;
    var search_field_position_top = search_offset.top;
    $('.search-with-suggestions-w').css('left', search_field_position_left).css('top', search_field_position_top).addClass('over-search-field').fadeIn(300).find('.search-suggest-input').focus();
    return false;
  });

  $('.search-suggest-input').on('keydown', function (e) {

    // Close if ESC was pressed
    if (e.which == 27) {
      $('.search-with-suggestions-w').fadeOut();
    }

    // Backspace/Delete pressed
    if (e.which == 46 || e.which == 8) {
      // This is a test code, remove when in real life usage
      $('.search-with-suggestions-w .ssg-item:last-child').show();
      $('.search-with-suggestions-w .ssg-items.ssg-items-blocks').show();
      $('.ssg-nothing-found').hide();
    }

    // Imitate item removal on search, test code
    if (e.which != 27 && e.which != 8 && e.which != 46) {
      // This is a test code, remove when in real life usage
      $('.search-with-suggestions-w .ssg-item:last-child').hide();
      $('.search-with-suggestions-w .ssg-items.ssg-items-blocks').hide();
      $('.ssg-nothing-found').show();
    }
  });

  $('.close-search-suggestions').on('click', function () {
    $('.search-with-suggestions-w').fadeOut();
    return false;
  });

  // #24. Element Actions
  $('.element-action-fold').on('click', function () {
    var $wrapper = $(this).closest('.element-wrapper');
    $wrapper.find('.element-box-tp, .element-box').toggle(0);
    var $icon = $(this).find('i');

    if ($wrapper.hasClass('folded')) {
      $icon.removeClass('os-icon-plus-circle').addClass('os-icon-minus-circle');
      $wrapper.removeClass('folded');
    } else {
      $icon.removeClass('os-icon-minus-circle').addClass('os-icon-plus-circle');
      $wrapper.addClass('folded');
    }
    return false;
  });
});
