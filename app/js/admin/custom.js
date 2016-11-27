var url = "http://tiagoluizweb.com.br/tcc/system/";

$(window).load(function(){
    // $('.mdb-select').material_select();  
});
   
$(document).ready(function(){
    setTimeout(function(){ 
        $(".button-collapse").sideNav({
             closeOnClick: false
        });
    }, 1000);
});
function openEditUser(element){
    var user = element;
    var idAdmin = $('#idAdmin').val();
    $('.modalPreloaderBody').removeClass('hide-element');
            $(".formUser").addClass('hide-element');
    $.ajax({
      method: "GET",
      url : url+'user/pesquisarUsuario?user='+user+'&id='+idAdmin,
    })
    .done(function( response ) {
        var userResult = JSON.parse(response);
        if(userResult.auth){
            $('.modalPreloaderBody').addClass('hide-element');
            $(".formUser").removeClass('hide-element');
            var html = "";
                html += "<div class='form-group col-xs-12 col-sm-12 col-md-4 col-lg-4'>";
                html += "<input type='text' class='form-control inputRequired' id='AdminEditNameUser' value='"+userResult.data[0].nome+"' placeholder='Nome'>";
                html += "</div>";
                html += "<div class='form-group col-xs-12 col-sm-12 col-md-4 col-lg-4'>";
                html += "<input type='email' class='form-control inputRequired' id='AdminEditEmailUser' value='"+userResult.data[0].email+"' placeholder='E-mail'>";
                html += "</div>";
                html += "<div class='form-group col-xs-12 col-sm-12 col-md-4 col-lg-4'>";
                html += "<input type='text' class='form-control inputRequired' id='AdminEditUsuarioUser' value='"+userResult.data[0].nomeUsuario+"' placeholder='Usuário'>";
                html += "</div>";
                html += "<div class='form-group col-xs-12 col-sm-12 col-md-4 col-lg-4'>";
                html += "<input type='text' class='form-control cpfMask' disabled id='editCpfUser' value='"+userResult.data[0].cpf+"' placeholder='Senha'>";
                html += "</div>";
                html += "<div class='form-group col-xs-12 col-sm-12 col-md-4 col-lg-4'>";
                html += "<input type='password' class='form-control' value='"+userResult.data[0].senha+"' id='AdminEditPasswordUser' placeholder='CPF'>";
                html += "</div>";
                html += "<input type='hidden' id='AdminIdUserClient' value='"+userResult.data[0].id+"'>";
                html += "<div class='form-group col-xs-12 col-sm-12 col-md-4 col-lg-4'>";
                html += "<select onchange='chooseRole(this)' id='AdminEditRole' class='mdb-select inputRequired'>";
                html += "<option value='' disabled>Tipo de Usuário</option>";
                html += "<option value='1' "+verifyFunction(userResult.data[0].funcao, 1)+" data-icon='http://mdbootstrap.com/wp-content/uploads/2015/10/avatar-1.jpg' class='img-circle'>Administrador</option>";
                html += "<option value='2' "+verifyFunction(userResult.data[0].funcao, 2)+" data-icon='http://mdbootstrap.com/wp-content/uploads/2015/10/avatar-2.jpg' class='img-circle'>Suporte</option>";
                html += "<option value='3' "+verifyFunction(userResult.data[0].funcao, 3)+" data-icon='http://mdbootstrap.com/wp-content/uploads/2015/10/avatar-3.jpg' class='img-circle'>Usuário</option>";
                html += "</select>";
                html += "</div>";
                $(".formUser").html(html);
        }else{
          alert('Erro ao editar usuário');
        }
    });
}
function verifyFunction(element, element2){
    if(element == element2){
        return "selected='selected'";
    }else{
      return '';
    }
}
function chooseRole(element){
 var role = $(element).val();
 $('#AdminEditRole option[value="'+role+'"]').attr('selected', true);   
 if(role == 1){
   $('#AdminEditRole option[value="2"]').attr('selected', false);    
   $('#AdminEditRole option[value="3"]').attr('selected', false);  
 }else if(role == 2){
   $('#AdminEditRole option[value="1"]').attr('selected', false);    
   $('#AdminEditRole option[value="3"]').attr('selected', false);
 }else{
   $('#AdminEditRole option[value="1"]').attr('selected', false);    
   $('#AdminEditRole option[value="2"]').attr('selected', false);
 }
}
function verifyPhoto(element){
    if(element == ''){
        return 'Nenhuma imagem selecionada';
    }else{
        return element;
    }
}


function setStatusUser(element){
    var selectedStatus = $(element).is(":checked");
    var id = $(element).val();
  
    var confirm;
    if(selectedStatus){
       confirm = window.confirm("Deseja mesmo Ativar o usuário?");
    }else{
       confirm = window.confirm("Deseja mesmo Desativar o usuário?");
    }
    if(confirm){
      if(selectedStatus){
          $.ajax({
            method: "POST",
            url : url+'user/reativarUsuario',
            data:{
                id: id,
            }
          })
          .done(function( response ) {
              var statusResult = JSON.parse(response);
              if(statusResult.auth){
                  toastr["success"]('Usuário ativado com sucesso!');
              }else{
                  toastr["danger"]('Erro ao ativar usuário!');
              }
          });
      }else{
          $.ajax({
            method: "POST",
            url : url+'user/desativarUsuario',
            data:{
                id: id,
            }
          })
          .done(function( response ) {
            console.log(response);
              var statusResult = JSON.parse(response);
              if(statusResult.auth){
                  toastr["warning"]('Usuário desativado com sucesso!');
              }else{
                  toastr["danger"]('Erro ao desativar usuário!');
              }
          });
      }
    }else{
      location.reload();
    } 
}

function openCreateUser(){
    $('.formNewUser').toggle();
}