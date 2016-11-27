angular.module('app').controller('registerController',  ['$location', '$scope', '$http', '$timeout', '$cookies', 'setBackground', 'verificarRegras', 'verificarLogin', function($location, $scope, $http, $timeout, $cookies, setBackground, verificarRegras, verificarLogin){
    
    var url = "http://tiagoluizweb.com.br/tcc/system/";
// 		var url = "http://localhost/iaiTaPronto/system/";
    var controllerName = $location.path();
    var hashName = $location.path().split('/');
  	$scope.ready = function(){
  		$('body').addClass('bodyLogin');
  	}
    var verDados = verificarLogin.verificarLogin();
    if(verDados){
//       if($scope.user.funcao <= 1){
//         $location.path('/admin')
//       }else if($scope.user.funcao <= 1){
//         $location.path('/support')
//       }else{
//         $location.path('/panel')
//       }
    }
    angular.element(document).ready(function () {
      $('.manutencao').addClass('hide-element');	
      if(controllerName == '/register/'+ hashName[2]){
        $scope.novoUsuario = function(){
          var data = {
            newNameUser:$('#newNameUser').val(),
            newUsuarioUser:$('#newUsuarioUser').val(),
            newEmailUser:$('#newEmailUser').val(),
            newPasswordUser:$('#newPasswordUser').val(),
            newCpfUser:$('#newCpfUser').val(),
            newRoleUser:$("#newRoleUser").val(),
            projetoId: hashName[2],
            statusUser: 0,
          }
          if(data.newNameUser == ''|| data.newUsuarioUser == '' || data.newEmailUser == '' || data.newCpfUser == '' || data.newPasswordUser == '' || data.newRoleUser == 0){
            $('.inputRequired').addClass('blankElement');
            $('.blankLabel').removeClass('hide-element');
            $('.labelCpfValid').addClass('hide-element');
            $('.labelCpfInvalid').addClass('hide-element');
          }else{
            $('.inputRequired').removeClass('blankElement');
            $('.blankLabel').addClass('hide-element');
            $('.labelCpfValid').addClass('hide-element');
            $('.labelCpfInvalid').addClass('hide-element');
            $http({
                method : "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url : url+'user/verificarCpf',
                data: {
                  cpf: data.newCpfUser
                }
            }).then(function mySucces(response) {
                	var userResult = response.data;
                  if(userResult.auth){
                    $('.labelCpfValid').removeClass('hide-element');
                    $('.labelCpfInvalid').addClass('hide-element');
                    $('#newCpfUser').addClass('cpfValid');
                    $('#newCpfUser').removeClass('cpfInvalid');
                    $scope.httpNovoUsuario(data);
                  }else{
                    $('.labelCpfValid').addClass('hide-element');
                    $('.labelCpfInvalid').removeClass('hide-element');
                    $('#newCpfUser').removeClass('cpfValid');
                    $('#newCpfUser').addClass('cpfInvalid');
                  }
            }, function myError(response) {
              console.log(response);
            });
          }
        }
      }else{
        $scope.novoUsuario = function(){
          var data = {
            newNameUser:$('#newNameUser').val(),
            newUsuarioUser:$('#newUsuarioUser').val(),
            newEmailUser:$('#newEmailUser').val(),
            newPasswordUser:$('#newPasswordUser').val(),
            newCpfUser:$('#newCpfUser').val(),
            newRoleUser:$("#newRoleUser").val(),
            projetoId: 0,
            statusUser: 0,
          }
          if(data.newNameUser == ''|| data.newUsuarioUser == '' || data.newEmailUser == '' || data.newCpfUser == '' || data.newPasswordUser == '' || data.newRoleUser == 0){
            $('.inputRequired').addClass('blankElement');
            $('.blankLabel').removeClass('hide-element');
            $('.labelCpfValid').addClass('hide-element');
            $('.labelCpfInvalid').addClass('hide-element');
          }else{
            $('.inputRequired').removeClass('blankElement');
            $('.blankLabel').addClass('hide-element');
            $('.labelCpfValid').addClass('hide-element');
            $('.labelCpfInvalid').addClass('hide-element');
            $http({
                method : "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url : url+'user/verificarCpf',
                data: {
                  cpf: data.newCpfUser
                }
            }).then(function mySucces(response) {
                	var userResult = response.data;
                  if(userResult.auth){
                    $('.labelCpfValid').removeClass('hide-element');
                    $('.labelCpfInvalid').addClass('hide-element');
                    $('#newCpfUser').addClass('cpfValid');
                    $('#newCpfUser').removeClass('cpfInvalid');
                    $scope.httpNovoUsuario(data);
                  }else{
                    $('.labelCpfValid').addClass('hide-element');
                    $('.labelCpfInvalid').removeClass('hide-element');
                    $('#newCpfUser').removeClass('cpfValid');
                    $('#newCpfUser').addClass('cpfInvalid');
                  }
                }, function myError(response) {
              console.log(response);
            });
          }
        }
      }
    });

    $scope.httpNovoUsuario = function(element){
      $http({
          method : "POST",
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
          url : url+'user/criarUsuarioRegister',
          data : element,
          }).then(function mySucces(response) {
                console.log(response);
              	var userResult = response.data;
                  if(userResult.auth){
                      $('.cpfExistent').addClass('hide-element');
                      $('.usernameExistent').addClass('hide-element');
                      $('.useremailExistent').addClass('hide-element');

                      $('#newCpfUser').removeClass('existentField');
                      $('#newEmailUser').removeClass('existentField');
                      $('#newUsuarioUser').removeClass('existentField');
                      $('.formNewUser input').val('');
                      $('.formNewUser select').val('0');

                      $('.labelCpfValid').addClass('hide-element');
                      $('.labelCpfInvalid').addClass('hide-element');
                      $('#newCpfUser').removeClass('cpfValid');
                      $('#newCpfUser').removeClass('cpfInvalid');
                      toastr["success"]('Usuário criado com sucesso! Enviamos um E-mail de confirmação para sua caixa de entrada');
//                       $http({
//                           method : "POST",
//                           headers: {'Content-Type': 'application/x-www-form-urlencoded'},
//                           url : url+'conversa/criarConversa',
//                           data: {
//                             id: userResult.id
//                           }
//                       }).then(function mySucces(response) {
//                             console.log(response);
//                           }, function myError(response) {
//                         //   alert('erro');
//                       });
                  }else{
                    if(userResult.response == 1){
                      $('.useremailExistent').removeClass('hide-element');
                      $('.usernameExistent').addClass('hide-element');
                      $('.cpfExistent').addClass('hide-element');

                      $('#newEmailUser').addClass('existentField');
                      $('#newUsuarioUser').removeClass('existentField');
                      $('#newCpfUser').removeClass('existentField');
                    }else if(userResult.response == 2){
                      $('.usernameExistent').removeClass('hide-element');
                      $('.useremailExistent').addClass('hide-element');
                      $('.cpfExistent').addClass('hide-element');

                      $('#newUsuarioUser').addClass('existentField');
                      $('#newEmailUser').removeClass('existentField');
                      $('#newCpfUser').removeClass('existentField');
                    }else{
                      $('.cpfExistent').removeClass('hide-element');
                      $('.usernameExistent').addClass('hide-element');
                      $('.useremailExistent').addClass('hide-element');

                      $('#newCpfUser').addClass('existentField');
                      $('#newEmailUser').removeClass('existentField');
                      $('#newUsuarioUser').removeClass('existentField');
                      $('.labelCpfValid').addClass('hide-element');
                      $('.labelCpfInvalid').addClass('hide-element');
                      $('#newCpfUser').removeClass('cpfValid');
                      $('#newCpfUser').removeClass('cpfInvalid');
                    }
                  }
          }, function myError(response) {
              console.log(response);
          });
        }
  	// Executar funÃ§Ãµes automÃ¡ticas
  	$scope.ready();

  	setBackground.setBackground();
  	verificarRegras.verificarRegras();

  	verificarLogin.verificarLogin();
}]);
