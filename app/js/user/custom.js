var url = "http://localhost/iaiTaPronto/system/";
$(window).load(function(){
    setTimeout(function(){
      $('.sideMenu .nav li a').tooltip();
      $('.backButton').tooltip();
    }, 500);
});

function showParticipants(){
    $('.participantBody').addClass('participantBodyShow');
    $('.buttonParticipantOpen').addClass('hide-element');
    $('.buttonParticipantClose').removeClass('hide-element');
}
function hideParticipants(){
    $('.participantBody').removeClass('participantBodyShow');
    $('.buttonParticipantOpen').removeClass('hide-element');
    $('.buttonParticipantClose').addClass('hide-element');
}

function addClientInInput(element){
    var text = $(element).text();
    var value= $(element).val();
    $('#projectClient').text(text);
    $('#projectClient').val(value);
    $('.resultClientsProject li').remove();
}

function addEditClientInInput(element){
    var text = $(element).text();
    var value= $(element).val();
    $('#projectEditClientP').text(text);
    $('#projectEditClientP').val(value);
    $('.resultClientsProject li').remove();
}

function addActive(element){
  $('.sideMenu .nav li a').removeClass('menu-active');
  $(element).addClass('menu-active');
}

function clearClientList(){
  $('.resultClientsProject li').remove('menu-active');
}

function openEditClient(element){
    var client = element;
    var status = 0;
    var userId = $("#idUserClient").val();
    $('.modalPreloaderBody').removeClass('hide-element');
    $(".formClient").addClass('hide-element');
    $.ajax({
      method: "GET",
      url : url+'company/pesquisarEmpresa?client='+client+'&status='+status+'&userId='+userId,
    })
    .done(function( response ) {
        var clientResult = JSON.parse(response);
        if(clientResult.auth){
            $('.modalPreloaderBody').addClass('hide-element');
            $(".formClient").removeClass('hide-element');
            var html = "";
                html += "<div class='form-group col-xs-12 col-sm-12 col-md-4 col-lg-4'>";
                html += "<input type='text' class='form-control inputRequired' id='editNameClient' value='"+clientResult.data[0].nome+"' placeholder='Nome'>";
                html += "<input type='hidden' class='form-control inputRequired' id='idClient' value='"+client+"' placeholder='Nome'>";
                html += "<label class='blankLabel hide-element'>Campo obrigatório</label>";
                html += "</div>";
                html += "<div class='form-group col-xs-12 col-sm-12 col-md-4 col-lg-4'>";
                html += "<input type='text' class='form-control inputRequired' id='editEmailClient' value='"+clientResult.data[0].email+"' placeholder='Nome'>";
                html += "<label class='blankLabel hide-element'>Campo obrigatório</label>";
                html += "</div>";
                html += "<div class='form-group col-xs-12 col-sm-12 col-md-4 col-lg-4'>";
                html += "<input type='text' class='form-control' id='editTelefoneClient' value='"+clientResult.data[0].telefone+"' placeholder='Telefone'>";
                html += "</div>";
                html += "<div class='form-group col-xs-12 col-sm-12 col-md-4 col-lg-4'>";
                html += "<input type='text' class='form-control disabled' id='editdataCadastroClient' value='"+clientResult.data[0].dataCadastro+"' placeholder='Data Cadastro'>";
                html += "</div>";
                $(".formClient").html(html);
        }else{
          alert('Erro ao editar cliente');
        }
    });
}

function setStatusClient(element){
    var selectedStatus = $(element).is(":checked");
    var id = $(element).val();
    
    var confirm;
    if(selectedStatus){
       confirm = window.confirm("Deseja mesmo Ativar o cliente?");
    }else{
       confirm = window.confirm("Deseja mesmo Desativar o cliente?");
    }
  
    if(confirm){
      if(selectedStatus){
        $.ajax({
          method: "POST",
          url : url+'company/reativarEmpresa',
          data:{
              id: id,
          }
        })
        .done(function( response ) {
            var statusResult = JSON.parse(response);
            if(statusResult.auth){
                toastr["success"]('Cliente ativado com sucesso!');
            }else{
                toastr["danger"]('Erro ao ativar cliente!');
            }
        });
      }else{
          $.ajax({
            method: "POST",
            url : url+'company/desativarEmpresa',
            data:{
                id: id,
            }
          })
          .done(function( response ) {
              var statusResult = JSON.parse(response);
              if(statusResult.auth){
                  toastr["warning"]('Cliente desativado com sucesso!');
              }else{
                  toastr["danger"]('Erro ao desativar cliente!');
              }
          });
      }
    }else{
      location.reload();
    } 
    //
}
