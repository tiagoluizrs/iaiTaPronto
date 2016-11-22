angular.module('app').controller('supController', ['$scope', 'ChatFactory', 'verifyDate3', 'convertReportData', 'convertData', '$rootScope', '$routeParams', '$route', '$window', 'setBackground', 'loadUser', '$location', 'verificarLogin', 'logout', '$http', '$timeout', '$cookies', 'verificarRegras', 'createNewProject', 'createNewTask', 'editProject', 'formatDate', 'verifyDateProjectStatus', 'formatDate2', 'formatTime', 'convertReportDataCircle', 'verifyDate', 'verifyDate2', '$interval', 'verificarSolicitacao', 'verifyDate4', function($scope, ChatFactory, verifyDate3, convertReportData, convertData, $rootScope, $routeParams, $route, $window, setBackground, loadUser, $location, verificarLogin, logout, $http, $timeout, $cookies, verificarRegras, createNewProject, createNewTask, editProject, formatDate, verifyDateProjectStatus, formatDate2, formatTime, convertReportDataCircle, verifyDate, verifyDate2, $interval, verificarSolicitacao, verifyDate4){

	
  var url = "http://localhost/iaiTaPronto/system/";
  var hashName = $location.path().split('/');

	var verDados = verificarLogin.verificarLogin();
	console.log(verDados);
	if(verDados){
		$scope.user = loadUser.loadUser();
		if($scope.user.acesso <= 1){
			$('.modalTutorial').modal('show');
		}
	}
	
	$scope.sync = function(){
		location.reload();
	};
	if(verDados){
		$scope.user = loadUser.loadUser();
		if($scope.user.nome != undefined){
			$scope.usuario = {
				nome: $scope.user.nome
			};
			if($scope.user.funcao == 2 || $scope.user.funcao == 3){
				$scope.chat = ChatFactory;
				if(typeof $scope.chat.entrar == 'function'){
					$scope.chat.entrar();
					$scope.verifyChat = function(id){
						if(id == $scope.user.id){
							return true;
						}
					}
				}else{
						$scope.sync();
				}
			}
	  }
	}
	$scope.ativarRefresh = function(data) {
		var contador = 5;
		var promise;
		$scope.generateRefresh = function(data){
			contador--;
			if (contador === 0) {
				data;
				contador = 5;
			}
			promise = $timeout($scope.ativarRefresh, 1000);
		}
	}
	
	$scope.carregarUsuariosChat = function(){
		var userChat;
		$http({
         method : "GET",
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         url : url+'chat/usuariosConversa?usuarioId=' + $scope.user.id,
     }).then(function mySucces(response) {
				if(response.data.auth){
					return JSON.stringify(response.data.data);
					console.log(userChat);
				}
     });
	}
	$scope.carregarUsuariosChat();
	$scope.abrirChat = function(element){
		 var usuarioId = element;
     $http({
         method : "GET",
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         url : url+'message/carregarMensagemSuporte?usuarioId=' + usuarioId,
     }).then(function mySucces(response) {
           console.log(response);
     });
	}
  angular.element(document).ready(function () {
			$('#popup-messagesBody').scroll(function (event) {
				var scroll = document.getElementById('popup-messagesBody').scrollTop;
				var altura = document.getElementById('popup-messagesBody').scrollHeight;
				var alturaDiv = document.getElementById('popup-messagesBody').clientHeight;
				if(scroll < (altura - alturaDiv) - 80){
					$('.btn-scroll').removeClass('hide');
				}else{
					$('.btn-scroll').addClass('hide');
				}
			});
			$("#buttonChat").click(function () {
   			$('#qnimate').addClass('popup-box-on');
				$('.btn-scroll').addClass('hide');
				var objDiv = $('#popup-messagesBody');
				objDiv[0].scrollTop = objDiv[0].scrollHeight;
			});
			$("#closeChat").click(function () {
					$('#qnimate').removeClass('popup-box-on');
			});
                
      $('.button-collapse').sideNav('hide');
      $('.buttonSaveProject').addClass('hide-element');
      $("html, .body-table, .bodyParticipantsActives, .bodyUsuariosChat").niceScroll({
          cursorwidth: 10,
          cursorcolor: '#333'
      });
			var doc = new jsPDF();
			var specialElementHandlers = {
				'#editor': function (element, renderer) {
						return true;
				}
			};
			
      if(hashName[1] == 'confirmarEmail'){
      	ativarUsuario(hashName[2]);
      }
      if(hashName[1] == 'editProfile'){
 				$('#qnimate').removeClass('popup-box-on');
				if(hashName[2] != undefined){
      		dadosRecovery(hashName[2]);
				}
      }
      $(".updateItem").removeClass('open');
 });
	
	
	function ativarUsuario(element){
	  $.ajax({
			method: "POST",
			url : url+'user/ativarUsuario',
			data:{
			    hash: element
			}
		})
		.done(function(response) {
			console.log(response);
			var statusResult = JSON.parse(response);
			if(statusResult.auth){
			    toastr.success('Ativadação efetuada com sucesso! Efetue Login para prosseguir', 'Sucesso!');
		    	$location.path('/login');
			}
		});
	}

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

	$scope.reloadUpdates = function(){
		location.reload();
	}
	
	var verificarLogin2 = verificarLogin.verificarLogin();
	if(verificarLogin2){
		$scope.user = loadUser.loadUser();
		if($scope.user != undefined){
			$scope.usuario = {
				nome: $scope.user.nome
			};
			$scope.solicitacaoCheck = verificarSolicitacao;
			if(typeof $scope.solicitacaoCheck.assincUsuarios == 'function'){
					$scope.solicitacaoCheck.assincUsuarios();
			}else{
			 		$scope.sync();
			}
		}
	}

		$scope.logout = function(){
			logout.logout('userData');
			$location.path('/');
		}
		
	  $scope.switchStatus = function(element, element2){
	    var html = '';
	    if(element == 1){
	      html += '<div class="switch status">';
	      html += '<label>';
	      html += 'Inativo';
	      html += '<input onchange="setStatusUser(this);" value="'+element2+'" type="checkbox" checked="checked">';
	      html += '<span class="lever"></span>';
	      html += 'Ativo';
	      html += '</label>';
	      html += '</div>';
	    }else{
	      html += '<div class="switch status">';
	      html += '<label>';
	      html += 'Inativo';
	      html += '<input onchange="setStatusUser(this);" value="'+element2+'" type="checkbox">';
	      html += '<span class="lever"></span>';
	      html += 'Ativo';
	      html += '</label>';
	      html += '</div>';
	    }
	      return html;
	  }
	  $scope.setFunction = function (element){
	    if(element == 1){
	      return 'Administrador';
	    }
	    else if(element == 2){
	      return 'Suporte';
	    }
	    else{
	      return 'Usuário';
	    }
	  }
		
	  $scope.$back = function() {
	    window.history.back();
	  }

		setBackground.setBackground();
		verificarRegras.verificarRegras();
	
		if($location.path() == '/editSupport' || $location.path() == '/editSupport/' + $routeParams.id){
			if($location.path() == '/editProfile/' + $routeParams.id){
				toastr.success('Altere sua senha abaixo', 'Sucesso!');
			}
			$scope.editarUsuario = function(){
				var editCode;
				if($routeParams.id == undefined){
					editCode = 0;
				}else{
					editCode = $routeParams.id;
				}
				var data = {
	        editNameUser:$('#editNameUser').val(),
	        editEmailUser:$('#editEmailUser').val(),
	        editUsuarioUser:$('#editUsuarioUser').val(),
	        editPasswordUser:$('#editPasswordUser').val(),
	        editCode:editCode,
	        idUser:$('#idUserClient').val(),
	        userRole: 2
	      }
				console.log(data);
				$scope.httpEditUsuario(data);
			}
			$scope.httpEditUsuario = function(data){
				$http({
	        method : "POST",
	        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	        url : url+'user/editarUsuario',
	        data : data,
	      }).then(function mySucces(response) {
						var response = response.data;
					  if(response.auth){
							toastr.success('Sucesso ao editar usuário!', 'Sucesso!');
							$scope.saveCookie(response.data[0]);
							$route.reload();
						}else{
							switch(response.response){
								case 1:
								toastr.warning('E-mail já existente!', 'Atenção!');	
								break;
								case 2:
								toastr.warning('Nome de usuário já existente!', 'Atenção!');	
								break;
								case 3:
								toastr.warning('CPF já existente!', 'Atenção!');	
								break;
							}
						}
	      }, function myError(response) {
						toastr.error('Erro ao editar usuário!', 'Erro!');
	      });
			}
		}
	
	function dadosRecovery(element){
	    $.ajax({
			method: "POST",
			url : url+'auth/loginRecuperacao',
			data:{
			    hash: element
			}
		}).done(function(response) {
			var statusResult = JSON.parse(response);				
			if(statusResult.auth){
				$scope.saveCookie(statusResult.data[0]);
				if(statusResult.data[0].funcao == 1){
					window.location.replace('/tcc/app/#/edit');
				}
				if(statusResult.data[0].funcao == 2){
					window.location.replace('/tcc/app/#/editSupport');
				}
				if(statusResult.data[0].funcao == 3){
					window.location.replace('/tcc/app/#/editProfile');
				}
			}
		});
	}
	
}]);
