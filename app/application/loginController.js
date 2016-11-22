angular.module('app').controller('loginController', ['$scope', '$timeout', '$rootScope', 'verificarLogin', 'setBackground', '$http', '$location', '$cookies', 'verificarRegras', function($scope, $timeout, $rootScope, verificarLogin, setBackground, $http, $location, $cookies, verificarRegras){

  var url = "http://localhost/iaiTaPronto/system/";

  	// Guardar dados do usuário em cookie
  	$rootScope.activetab = $location.path();

	angular.element(document).ready(function () {
		$('.button-collapse').sideNav('hide');
		$('.areaDesktop').addClass('removePadding');
		$('.topBar').addClass('hide-element');
		$('.sideMenu').addClass('hide-element');
		$('.userTopBar').addClass('hide-element');
		$('.bodyFloatButton').addClass('hide-element');
		$('.clock ').addClass('hide-element');
	});
	$scope.saveCookie = function(data){
		$scope.userDatas = {
	      id: data.id,
	      nome: data.nome,
	      email: data.email,
	      senha: data.senha,
      	cpf: data.cpf,
	      nomeUsuario: data.nomeUsuario,
	      dataCadastro: data.dataCadastro,
	      estado: data.estado,
	      codigoConfirmacao: data.codigoConfirmacao,
	      codigoRecuperacao: data.codigoRecuperacao,
	      funcao: data.funcao,
		}

		var userJson = JSON.stringify($scope.userDatas);

		$cookies.put('userData', userJson);
	}

	// Funçao de login
	$scope.login = function(){
		var email = $('#emailUser').val();
		var senha = $('#senhaUser').val();
		$('.preloader').removeClass('hide-element');

		$http({
		    method : "POST",
		    url : url+"auth/login",
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    data: {
		      email: email,
		      senha: senha
		    }
		}).then(function mySucces(response) {
		    if(response.data.auth){
		      if(response.data.data[0].estado == 0){
		        $location.path('/');
		    		$('.preloader').addClass('hide-element');
		        $('.alert-statusDesabled').removeClass('hide-element');
		      }else{
		        $('.preloader').addClass('hide-element');
		    		$('.alert-loginData').addClass('hide-element');
		    		$('.welcome').removeClass('hide-element');
		    		$timeout(function () {
		    			$('.imagePreloader').addClass('fadeOut animated');
		    			$('.loading').addClass('fadeOut animated');
		    			$timeout(function () {
		    	        $('.welcome-left').addClass('slideOutLeft animated');
		    					$('.welcome-right').addClass('slideOutRight animated');
		    	    }, 500);
		    			$timeout(function () {
		            $location.path('/panel');
		            $scope.saveCookie(response.data.data[0]);
		    	      $('.welcome').css('display', 'none');
		    	    }, 800);
		        }, 2000);
		      }
		    }else{
		      $location.path('/');
		  		$('.preloader').addClass('hide-element');
		      $('.alert-loginData').removeClass('hide-element');
		    }
		}, function myError(response) {
		    $scope.loginAccess = response.statusText;
		});
	}

	// Funçao de recuperar senha
	$scope.recoverPass = function(){
		var email = $('#emailUserRecovery').val();
		toastr.success('Verifique sua caixa de E-mail!', 'Sucesso!');
		$http({
		    method : "POST",
		    url : url+"auth/recuperarSenha",
		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
		    data: {
		      email: email,
		    }
		}).then(function mySucces(response) {
		    console.log(response);
		}, function myError(response) {
		    // $scope.recoverLogin = response.statusText;
		});
	}

	setBackground.setBackground();
	verificarRegras.verificarRegras();

	verificarLogin.verificarLogin();
}]);
