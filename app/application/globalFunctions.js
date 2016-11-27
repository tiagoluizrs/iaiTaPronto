angular.module('app')
.factory("ChatFactory", function($http, $timeout, $cookies) {
	if($cookies.get('userData') == undefined || $cookies.get('userData') == ''){
		return true;
	}else{
		var promise;
		var url = "http://tiagoluizweb.com.br/tcc/system/";
// 		var url = "http://localhost/iaiTaPronto/system/";
		var mensagens = [];
		var aberto = false;
		var contador = 5;
		var usuario = $.parseJSON($cookies.get('userData'));
		return {
			entrar: entrar,
			listar: listar,
			scrollBottom: scrollBottom,
			cadastrar: cadastrar,
			isAberto: isAberto,
			sair: sair,
			getContador: getContador,
			atualizar: atualizar,
		};

		function entrar() {	
			aberto = true;
			ativarRefresh()
		}

		function scrollBottom(){
			var objDiv = $('#popup-messagesBody');
			objDiv[0].scrollTop = objDiv[0].scrollHeight;
		}
	
		function ativarRefresh() {
			contador--;
			if (contador === 0) {
				atualizar();
				contador = 5;
			}
			promise = $timeout(ativarRefresh, 1000);
		}

		function sair() {
			$timeout.cancel(promise);
			aberto = false;
		}
		function atualizar() {
			$http({
	        method : "GET",
	        url : url+'message/carregarMensagem?id='+usuario.id,
	    }).then(function mySucces(response) {
					if(response.data['auth']){
	         	mensagens = response.data['messages'];
	        }
	    });
		}
		function scrollBottom(){
			setTimeout(function(){
					var objDiv = $('#popup-messagesBody');
					objDiv[0].scrollTop = objDiv[0].scrollHeight;
				}, 100);
		}
		function cadastrar(mensagem) {
			console.log('cliente');
			var data = {
				id: usuario.id,
				alias: usuario.nomeUsuario,
				mensagem: mensagem
			}
			 $http({
	          method : "POST",
	          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	          url : url+'message/criarMensagem',
	          data : data,
				    cache: true,
	      }).then(function mySucces(response) {
				 if(response.data['auth'] == 1){
						 $('#status_message').val('');
						setTimeout(function(){
							var objDiv = $('#popup-messagesBody');
							objDiv[0].scrollTop = objDiv[0].scrollHeight;
						}, 300);
					 }
	      }, function myError(response) {
					console.log(response);
	      });
		}

		function getContador() {
			return contador;
		}

		function isAberto() {
			return aberto;
		}

		function listar() {
			return mensagens;
		}	
	}
})
.factory("ChatSupportFactory", function($http, $timeout, $cookies, $location) {
	if($cookies.get('userData') == undefined || $cookies.get('userData') == ''){
		return true;
	}else{
  		var hashName = $location.path().split('/');
		var promise;
		var url = "http://tiagoluizweb.com.br/tcc/system/";
// 		var url = "http://localhost/iaiTaPronto/system/";
		var mensagens = [];
		var mensagensNotificacao = [];
		var aberto = false;
		var contador = 5;
		var usuario = $.parseJSON($cookies.get('userData'));
		return {
			entrar: entrar,
			entrarNotificacao: entrarNotificacao,
			listar: listar,
			listarNotificacao: listarNotificacao,
			scrollBottom: scrollBottom,
			cadastrarSupporte: cadastrarSupporte,
			isAberto: isAberto,
			sair: sair,
			getContador: getContador,
			atualizar: atualizar,
			atualizarNotificacao: atualizarNotificacao,
		};

		function entrar() {
			aberto = true;
			ativarRefresh()
		}
		function entrarNotificacao() {
			aberto = true;
			ativarRefreshNotificacao()
		}

		function scrollBottom(){
			var objDiv = $('#popup-messagesBodySuporte');
			objDiv[0].scrollTop = objDiv[0].scrollHeight;
		}
	
		function ativarRefresh() {
			contador--;
			if (contador === 0) {
				atualizar();
				contador = 5;
			}
			promise = $timeout(ativarRefresh, 1000);
		}
		function ativarRefreshNotificacao() {
			contador--;
			if (contador === 0) {
				atualizarNotificacao();
				contador = 5;
			}
			promise = $timeout(ativarRefreshNotificacao, 1000);
		}

		function sair() {
			$timeout.cancel(promise);
			aberto = false;
		}
		function atualizar() {
			var hashName = $location.path().split('/');
			$http({
	        method : "GET",
	        url : url+'message/carregarMensagemSuporte?hash='+hashName[2],
	    }).then(function mySucces(response) {
			if(response.data['auth']){
					mensagens = response.data['messages'];
					var data = {
						usuarioChat: hashName[2]
					}
					$http({
						method : "POST",
	          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	          url : url+'chat/alterarEstadoNotificacao',
	          data : data,
				    cache: true,
					}).then(function mySucces(response) {
						console.log(response);
					});
				
				}
	    });
		}
		function atualizarNotificacao() {
			var hashName = $location.path().split('/');
			$http({
	        method : "GET",
	        url : url+'chat/carregarNotificacao?usuarioId='+usuario.id,
	    }).then(function mySucces(response) {
			if(response.data['auth']){
					mensagensNotificacao = response.data['data'];
					var count = mensagensNotificacao.length;
					if(count > 0){
						$('.countChat').removeClass('hide-element');
						$('.countChat').text(count);
					}else{
						$('.countChat').addClass('hide-element');
					}
				}else{
						$('.countChat').addClass('hide-element');
				}
	    });
		}
		function scrollBottom(){
			setTimeout(function(){
					var objDiv = $('#popup-messagesBody');
					objDiv[0].scrollTop = objDiv[0].scrollHeight;
				}, 100);
		}
		function cadastrarSupporte(mensagem) {
			var newHash = $location.path().split('/');
			var data = {
				id: usuario.id,
				alias: usuario.nomeUsuario,
				mensagem: mensagem,
				usuarioChat: newHash[2]
			}
			 $http({
	          method : "POST",
	          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	          url : url+'message/criarMensagemSuporte',
	          data : data,
				    cache: true,
	      }).then(function mySucces(response) {
	      			console.log(response);
				 if(response.data['auth'] == 1){
						 $('#status_message').val('');
							setTimeout(function(){
								var objDiv = $('#popup-messagesBody');
								objDiv[0].scrollTop = objDiv[0].scrollHeight;
							}, 300);
					 }
	      }, function myError(response) {
				console.log(response);
	      });
		}

		function getContador() {
			return contador;
		}

		function isAberto() {
			return aberto;
		}

		function listar() {
			return mensagens;
		}	
		function listarNotificacao() {
			return mensagensNotificacao;
		}	
	}
})
.factory("verificarSolicitacao", function($http, $location, $timeout, $cookies, $routeParams) {
	if($cookies.get('userData') == undefined || $cookies.get('userData') == ''){
		return true;
	}else{
		var promise;
		var url = "http://tiagoluizweb.com.br/tcc/system/";
// 		var url = "http://localhost/iaiTaPronto/system/";
		var solicitacaoCheck = [];
		var participantesAtivos = [];
		var participantesInativos = [];
		var userChat = [];
		var assync = false;
		var contador = 5;
		var usuario = $.parseJSON($cookies.get('userData'));
		return {
			verificarConvite: verificarConvite,
			assincVerificacao: assincVerificacao,
			listarConvites: listarConvites,	
			
			verificarConviteAceito: verificarConviteAceito,
			assincConviteAceito: assincConviteAceito,
			assincUsuarios: assincUsuarios,
			listarSolResultsAceito: listarSolResultsAceito,
			listarSolResultsNAceito: listarSolResultsNAceito,
			listarUsuariosChat: listarUsuariosChat,
		};
		
		function assincVerificacao() {
			assync = true;
			solicitacaoRefresh()
		}
		function solicitacaoRefresh() {
			contador--;
			if (contador === 0) {
				verificarConvite();
				contador = 5;
			}
			promise = $timeout(solicitacaoRefresh, 1000);
		}
		
		function assincConviteAceito() {
			assync = true;
			solicitacaoAceitoRefresh()
		}
		function solicitacaoAceitoRefresh() {
			contador--;
			if (contador === 0) {
				verificarConviteAceito();
				contador = 5;
			}
			promise = $timeout(solicitacaoAceitoRefresh, 1000);
		}
		function assincUsuarios() {
			assync = true;
			usuariosRefresh()
		}
		function usuariosRefresh() {
			contador--;
			if (contador === 0) {
				carregarUsuariosChat();
				contador = 5;
			}
			promise = $timeout(usuariosRefresh, 1000);
		}
		
		function verificarConvite(){
			$http({
					method : "GET",
					url : url+'participant/conviteProjetoPendente?user='+usuario.nomeUsuario,
			}).then(function mySucces(response) {
					if(response.data.auth){
						solicitacaoCheck = response.data.data;
					}else{
						$('ul.updateUl').html('<li class="list-group-item dropdown-item waves-effect waves-light">Nenhuma atualização no momento</li>');
					}
			});
		}
		
		function verificarConviteAceito(){
			var projectUrl;
			var hashName = $location.path().split('/');
			if(hashName[2] == undefined){
				projectUrl = 0;
			}else{
				projectUrl = hashName[2];
			}
			$http({
	          method : "GET",
	          url : url+'participant/pesquisarParticipante?projectId='+projectUrl,
	      }).then(function mySucces(response) {
	          participantesAtivos = response.data.dataAtivo;
	          participantesInativos = response.data.dataInativo;
	      });
		}
		function carregarUsuariosChat(){
			$http({
				 method : "GET",
				 headers: {'Content-Type': 'application/x-www-form-urlencoded'},
				 url : url+'chat/usuariosConversa?usuarioId=' + usuario.id,
		 }).then(function mySucces(response) {
				if(response.data.auth){
					$('.preloaderuser').addClass('hide-element');
					$('.userTitleChat').removeClass('hide-element');
					userChat = response.data.data;
				}
			 });
		}
		function listarConvites() {
			return solicitacaoCheck;
		}	
		function listarSolResultsAceito() {
			return participantesAtivos;
		}	
		function listarSolResultsNAceito() {
			return participantesInativos;
		}	
		function listarUsuariosChat() {
			return userChat;
		}	
		function getContador() {
			return contador;
		}
	}
})
.filter('configurarData',function(){
  return function(date, type){
		var dateExplode = date.split(" ");
		var dayExplode = dateExplode[0].split("-");
		var hourExplode = dateExplode[1];
		
		if(type == 'dia'){
   	 return dayExplode[2] + '/' + dayExplode[1] + '/' + dayExplode[0] ;
		}else if(type == 'hora'){
			return hourExplode;
		}else{
			return dayExplode[2] + '/' + dayExplode[1] + '/' + dayExplode[0] + ' - ' + hourExplode;
		}
  };
})
	.filter('primeraLetra',function(){
  return function(data){
		var dateExplode = data.split("");
		var dayExplode = dateExplode[0];
		
		return dayExplode;
  };
})
.directive('ngEnter', function() {
		return function(scope, element, attrs) {
				element.bind("keydown keypress", function(event) {
						if(event.which === 13) {
								scope.$apply(function(){
										scope.$eval(attrs.ngEnter, {'event': event});
								});

								event.preventDefault();
						}
				});
		};
})
.factory('verificarLogin', ['$cookies', '$location', function($cookies, $location, $routeParams){
    return {
        verificarLogin: function() {
          var verificacao = angular.isUndefined($cookies.get('userData'));
          var controllerName = $location.path();
          var hashName = $location.path().split('/');
          if(verificacao){
            if(controllerName == '/confirmarEmail/'+ hashName[2]){
              $location.path('/confirmarEmail/'+ hashName[2]);
            }else if(controllerName == '/editProfile/'+ hashName[2]){
              $location.path('/editProfile/'+ hashName[2]);
            }else{
              if(controllerName == '/'){
                $location.path('/');
                return false;
              }else if(controllerName == '/login'){
                $location.path('/');
                return false;
              }else if(controllerName == '/register/'+ hashName[2]){
                $location.path('/register/'+ hashName[2]);
                return false;
              }else if(controllerName == '/register'){
                $location.path('/register');
                return false;
              }
            }
          }else{
            var userDatas = $.parseJSON($cookies.get('userData'));
            if(userDatas.funcao == 1){
      				if(controllerName == '/' || controllerName == '/register' || controllerName == '/login' || controllerName == '/panel' || controllerName == '/projects' || controllerName == '/project' || controllerName == '/clients' || controllerName == '/reports' || controllerName == '/schendule' || controllerName == '/profile' || controllerName ==  '/confirmarEmail' || controllerName ==  '/editProfile'){
//       				  $location.path('/admin' || controllerName == '/confirmarEmail/'+ hashName[2] || controllerName == '/editProfile/'+ hashName[2] || controllerName == '/editProfile' || controllerName == '/otherProjects/'+ hashName[2] || controllerName == '/otherProjects');
								$location.path('/users');
      				}else{
      					return true;
      				}
            }else if(userDatas.funcao == 2){
								if(controllerName == '/support'){
										$location.path('/support');
									return true;
								}else if(controllerName == '/editSupport'){
										$location.path('/editSupport');
									return true;
								}else if(controllerName == '/support/'+ hashName[2]){
	                $location.path('/support/'+ hashName[2]);
	                return true;
	              }
								else{
										$location.path('/support');
									return true;
								}
            }else{
              if(controllerName == '/' || controllerName == '/register' || controllerName == '/login' ||  controllerName == '/admin' || controllerName == '/users' || controllerName == '/adminReports' || controllerName == '/confirmarEmail' || controllerName ==  '/edit' || controllerName ==  '/inexistentProject' || controllerName ==  '/404' || controllerName == '/inexistentParticipantProject'){
//       				  $location.path('/panel');
								return true;
      				}else{
      					return true;
      				}
              return true;
            }
          }
        }
    };
}])
.factory('verificarRegras', ['$cookies', '$location', function($cookies, $location){
    return {
        verificarRegras: function() {
        var controllerName = $location.path();
        var hashName = $location.path().split('/');
			if(controllerName == '/admin' || controllerName == '/edit' || controllerName == '/' || controllerName == '/register/'+ hashName[2] || controllerName == '/register' || controllerName == '/users' || controllerName == '/adminReports' || controllerName == '/support' || controllerName == '/support/' + hashName[2] || controllerName == '/editSupport'){
				$('.areaDesktop').addClass('removePadding');
				$('.topBar').addClass('hide-element');
				$('.sideMenu').addClass('hide-element');
				$('.userTopBar').addClass('hide-element');
				$('.bodyFloatButton').addClass('hide-element');
				$('.clock ').addClass('hide-element');
				$('.bodyChatButton').addClass('hide-element');
				$('.bodyChatSuporteButton').addClass('hide-element');
				$('#qnimateCliente').removeClass('popup-box-on');
			  if(controllerName == '/' || controllerName == '/login' || controllerName == '/register/'+ hashName[2] || controllerName == '/register'){
			    $('body').removeClass('fixed-sn mdb-skin');
			    $('body').removeClass('bgAdmin');
			    $('.headerAdmin').addClass('hide-element');
			    $('.manutencao').addClass('hide-element');	
			  }else{
			    $('body').addClass('fixed-sn mdb-skin');
			    $('body').addClass('bgAdmin');
			    $('.headerAdmin').removeClass('removePadding');
			    $('.headerAdmin').removeClass('hide-element');
			  }
			}else{
// 				$('#qnimateCliente').addClass('popup-box-on');
				if(controllerName == '/panel'){
// 					$('#qnimateCliente').addClass('popup-box-on');
					$('.bodyChatButton').removeClass('hide-element');	
					$('.bodyChatSuporteButton').addClass('hide-element');		
				}else if(controllerName == '/support' + hashName[2]){	
					$('.bodyChatButton').addClass('hide-element');	
					$('.bodyChatSuporteButton').removeClass('hide-element');
				}	
				$('.headerAdmin').addClass('hide-element');
				$('.areaDesktop').removeClass('removePadding');
				$('.sideMenu').removeClass('hide-element');
				$('.topBar').removeClass('hide-element');
				$('.userTopBar').removeClass('hide-element');
				$('.bodyFloatButton').removeClass('hide-element');
				$('.clock ').removeClass('hide-element');
				if(controllerName == '/schendule'){
					$('.bodyFloatButton ').addClass('hide-element');
					$('.bodySchenduleButton ').removeClass('hide-element');
				}else{
					$('.bodyFloatButton ').removeClass('hide-element');
					$('.bodySchenduleButton ').addClass('hide-element');
				}
			}
			if(controllerName == '/panel'){
				$('.backButton').addClass('hide-element');
				$('.clock ').removeClass('hide-element');
			}else{
				$('.backButton').removeClass('hide-element');
				$('.clock ').addClass('hide-element');
			}
        }

    };
}])
.factory('logout', ['$cookies', '$location', function($cookies, $location){
    return {
      logout: function(cookie){
        $cookies.remove(cookie);
				location.reload();
      }
    };
}])
.factory('setBackground', ['$route', '$location', '$routeParams', function($route, $location, $routeParams){
    return {
      setBackground: function(){
        var controllerName = $location.path();
        var parmeterId = $routeParams.id;
        var hashName = $location.path().split('/');
        if(controllerName == '/panel' || controllerName == '/editProfile' || controllerName == '/editProfile/'+hashName[2] || controllerName == '/projects' || controllerName == '/project/'+parmeterId || controllerName == '/clients' || controllerName == '/reports' || controllerName == '/schendule' || controllerName == '/profile' || controllerName == '/confirmarEmail/'+hashName  || controllerName == '/editProfile/'+hashName || controllerName == '/otherProjects/'+ hashName[2] || controllerName == '/otherProjects' || controllerName == '/otherProject/'+ hashName[2]){
          $('body').addClass('bgPanel');
          $('body').removeClass('bgAdmin');
          $('body').removeClass('bodyLogin');
        }else if(controllerName == '/admin' || controllerName == '/users' || controllerName == '/adminReports'){
          $('body').addClass('bgAdmin');
          $('body').removeClass('bgPanel');
          $('body').removeClass('bodyLogin');
        }else if(controllerName == '/' || controllerName == '/login' || controllerName == '/register/'+ hashName[2] || controllerName == '/register'){
          $('body').addClass('bodyLogin');
          $('body').removeClass('bgPanel');
          $('body').removeClass('bgAdmin');
        }else{
          $('body').removeClass('bodyLogin');
          $('body').removeClass('bgPanel');
          $('body').removeClass('bgAdmin');
        }
      }
    };
}])
.factory('loadUser', ['$cookies', function($cookies){
    return {
      loadUser: function(){
        return $.parseJSON($cookies.get('userData'));
      }
    };
}])
.factory('formatDateOnlyNew', ['$cookies', function($cookies){
    return {
      formatDateOnlyNew: function(date, type){
        if(type == 1){
					var date = date.split(' ');
					date = date[0].split('-');
					date = date[2] + '-' + date[1] + '-' + date[0];
					return date;
				}
				else if(type == 2){
					var date = date.split(' ');
					return date[1];
				}
				else if(type == 3){
					var date = date.split(' ');
					return date[0];
				}
      }
    };
}])
.factory('createNewProject', ['$http', '$route', function($http, $route){
    return {
      createNewProject: function(element){
				var url = "http://tiagoluizweb.com.br/tcc/system/";
// 		var url = "http://localhost/iaiTaPronto/system/";
        $http({
            method : "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            url : url+'project/criarProjeto',
            data: {
              data: element
            }
        }).then(function mySucces(response) {
							console.log(response);
              var userResult = response.data;
              if(userResult.auth){
              	$('.formNewProject input').val('');
                toastr.success('Projeto cadastrado com sucesso!!!', 'Suuuuucesuuuul!');
                $('#schenduleModal').modal('hide');
                location.reload();
              }else{
								if(userResult.error){
                	toastr.warning('Uma empresa com o mesmo nome já existe!!', 'Ops!');
								}
              }
        }, function myError(response) {
						console.log(response);
        });
      }
    };
}])
.factory('createNewTask', ['$http', '$route', function($http, $route){
    return {
      createNewTask: function(element){
				var url = "http://tiagoluizweb.com.br/tcc/system/";
// 		var url = "http://localhost/iaiTaPronto/system/";
        $http({
            method : "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            url : url+'task/criarTarefa',
            data: {
              data: element
            }
        }).then(function mySucces(response) {
							console.log(response);
              var userResult = response.data;
              if(userResult.auth){
                toastr.success('Tarefa cadastrada com sucesso!!!', 'Suuuuucesuuuul!');
                $('#schenduleModal').modal('hide');
                $route.reload();
              }else{
                toastr.error('Erro ao cadastrar tarefa!!!', 'Ops!');
              }
        }, function myError(response) {
					console.log(response);
        });
      }
    };
}])
.factory('editProject', ['$http', '$location', function($http, $location){
    return {
      editProject: function(element){
				var url = "http://tiagoluizweb.com.br/tcc/system/";
// 		var url = "http://localhost/iaiTaPronto/system/";
        $http({
            method : "POST",
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            url : url+'project/editarProjeto',
            data: {
              data: element
            }
        }).then(function mySucces(response) {
              var userResult = response.data;
              if(userResult.auth){
                toastr.success('Projeto editado com sucesso!!!', 'Suuuuucesuuuul!');
								$location.path('/projects');
              }else{
                toastr.error('Erro ao editar projeto!!!', 'Ops!');
              }
        }, function myError(response) {
            // alert('erro');
        });
      }
    };
}])
.factory('convertData', ['$http', function($http){
    return {
      convertData: function(dataEl){
         var data = dataEl.split("-");
				 var month;
				
				 switch(data[2]){
          case '01':
          month = 'Janeiro';
          break;

          case '02':
          month = 'Fevereiro';
          break;

          case '03':
          month = 'Março';
          break;

          case '04':
          month = 'Abril';
          break;

          case '05':
          month = 'Maio';
          break;

          case '06':
          month = 'Junho';
          break;

          case '07':
          month = 'Julho';
          break;

          case '08':
          month = 'Agosto';
          break;

          case '09':
          month = 'Setembro';
          break;

          case '10':
          month = 'Outubro';
          break;

          case '11':
          month = 'Novembro';
          break;

          case '12':
          month = 'Dezembro';
          break;
        }
				return month;
      }
    };
}])
.factory('convertReportData', ['convertData', function(convertData){
    return {
      convertReportData: function(data, type){
				var countReport;
				var jsonConstruct;
				if(data.auth){
					$('.printButtons').removeClass('hide-element');
					$('.downloadButtons').removeClass('hide-element');
					$('.configReport').removeClass('hide-element');
					if(type == 1){
							var andamento = Object.keys(data.andamento).length;
							var finalizado = Object.keys(data.finalizado).length;
							var cancelado = Object.keys(data.cancelado).length;
							countReport = Object.keys(data.countReport).length;					
							jsonConstruct = [ andamento, finalizado , cancelado , countReport ];
						}else{
							var ativa = Object.keys(data.ativa).length;
							var inativa = Object.keys(data.inativa).length;
							countReport = Object.keys(data.countReport).length;
							jsonConstruct = [ ativa , inativa , countReport ]; 
					}
				}else{
					$('.printButtons').addClass('hide-element');
					$('.downloadButtons').addClass('hide-element');
					$('.configReport').addClass('hide-element');
			    toastr.error('Nenhum dado registrado dentro desse período', 'Nada encontrado!');
					if(type == 1){
					jsonConstruct = [ 0 , 0 , 0 , 0 ]; 
						}else{
					jsonConstruct = [ 0 , 0 , 0 ]; 
					}
				}
				return jsonConstruct;
      }
    };
}])
.factory('convertReportDataCircle', ['convertData', function(convertData){
    return {
      convertReportDataCircle: function(data, type){
				var countReport;
				var jsonConstruct = '';
				if(data.auth){
					$('.printButtons').removeClass('hide-element');
					$('.downloadButtons').removeClass('hide-element');
					$('.configReport').removeClass('hide-element');
					if(type == 1){
						var andamento = Object.keys(data.andamento).length;
						var finalizado = Object.keys(data.finalizado).length;
						var cancelado = Object.keys(data.cancelado).length;
						countReport = Object.keys(data.countReport).length;					
						jsonConstruct = [{
								text: 'Em andamento',
								values: [andamento],
								"backgroundColor": "#154771"
						},{
								text: 'Finalizados',
								values: [finalizado],
								"backgroundColor": "#C00"
						},{
								text: 'Cancelados',
								values: [cancelado],
								"backgroundColor": "#F80"
						}];
					}else{
						var ativa = Object.keys(data.ativa).length;
						var inativa = Object.keys(data.inativa).length;
						countReport = Object.keys(data.countReport).length;
						jsonConstruct = [{
								text: 'Ativos',
								values: [ativa],
								"backgroundColor": "#154771"
						},{
								text: 'Inativos',
								values: [inativa],
								"backgroundColor": "#F80"
						}];
				}
				}else{
					$('.printButtons').addClass('hide-element');
					$('.downloadButtons').addClass('hide-element');
					$('.configReport').addClass('hide-element');
					if(type == 1){
							jsonConstruct = [{
									text: 'Em andamento',
									values: 0,
									backgroundColor: "#154771",
							},{
									text: 'Finalizados',
									values: 0,
									backgroundColor: "#C00",
							},{
									text: 'Cancelados',
									values: 0,
									backgroundColor: "#F80",
							}];
						}else{
							jsonConstruct = [{
									text: 'Andamento',
									values: 0,
									backgroundColor: "#154771",
								},{
									text: 'Finalizado',
									values: 0,
									backgroundColor: "#F80",
								}
							];
					}
				}
				console.log(JSON.stringify(jsonConstruct));
				return jsonConstruct;
      }
    };
}])
.factory('formatDate', ['$http', function($http){
    return {
      formatDate: function(element){
        var res = element.split(" ");
        var month = '';

        switch(res[2]){
          case 'Janeiro,':
          month = '01';
          break;

          case 'Fevereiro,':
          month = '02';
          break;

          case 'Março,':
          month = '03';
          break;

          case 'Abril,':
          month = '04';
          break;

          case 'Maio,':
          month = '05';
          break;

          case 'Junho,':
          month = '06';
          break;

          case 'Julho,':
          month = '07';
          break;

          case 'Agosto,':
          month = '08';
          break;

          case 'Setembro,':
          month = '09';
          break;

          case 'Outubro,':
          month = '10';
          break;

          case 'Novembro,':
          month = '11';
          break;

          case 'Dezembro,':
          month = '12';
          break;
        }

        var date = res[3]+'-'+month+'-'+res[1];
        return date;
      }
    };
}])
.factory('formatDate2', ['$http', function($http){
    return {
      formatDate2: function(element){
        var res = element.split(" ");
        var month = '';
        var mes = '';

        if(res[0] == 'Segunda-Feira,' || res[0] == 'Terça-Feira,' || res[0] == 'Quarta-Feira,' || res[0] == 'Quinta-Feira,' || res[0] == 'Sexta-Feira,' || res[0] == 'Sábado,' || res[0] == 'Domingo'){
        	mes = res[2];
        }else{
        	mes = res[1];
        }
        switch(mes){
          case 'Janeiro,':
          month = '01';
          break;

          case 'Fevereiro,':
          month = '02';
          break;

          case 'Março,':
          month = '03';
          break;

          case 'Abril,':
          month = '04';
          break;

          case 'Maio,':
          month = '05';
          break;

          case 'Junho,':
          month = '06';
          break;

          case 'Julho,':
          month = '07';
          break;

          case 'Agosto,':
          month = '08';
          break;

          case 'Setembro,':
          month = '09';
          break;

          case 'Outubro,':
          month = '10';
          break;

          case 'Novembro,':
          month = '11';
          break;

          case 'Dezembro,':
          month = '12';
          break;
        }
        if(res[0] == 'Segunda-Feira,' || res[0] == 'Terça-Feira,' || res[0] == 'Quarta-Feira,' || res[0] == 'Quinta-Feira,' || res[0] == 'Sexta-Feira,' || res[0] == 'Sábado,' || res[0] == 'Domingo'){
        	var date = res[3]+'-'+month+'-'+res[1];
        }else{
        	var date = res[2]+'-'+month+'-'+res[0];
        }
        return date;
      }
    };
}])
.factory('formatTime', ['$http', function($http){
    return {
      formatTime: function(element){
        var res = element.charAt(5);
        var hour1 = element.charAt(0);
        var hour2 = element.charAt(1);
        var min1 = element.charAt(3);
        var min2 = element.charAt(4);
        var time = '';

        if(res == 'P'){
          if(hour1+hour2 == '01'){
            var hour = '13';
          }
          if(hour1+hour2 == '02'){
            var hour = '14';
          }
          if(hour1+hour2 == '03'){
            var hour = '15';
          }
          if(hour1+hour2 == '04'){
            var hour = '16';
          }
          if(hour1+hour2 == '05'){
            var hour = '17';
          }
          if(hour1+hour2 == '06'){
            var hour = '18';
          }
          if(hour1+hour2 == '07'){
            var hour = '19';
          }
          if(hour1+hour2 == '08'){
            var hour = '20';
          }
          if(hour1+hour2 == '09'){
            var hour = '21';
          }
          if(hour1+hour2 == '10'){
            var hour = '22';
          }
          if(hour1+hour2 == '11'){
            var hour = '23';
          }
          if(hour1+hour2 == '12'){
            var hour = '00';
          }
        }else{
          var hour = hour1+hour2;
        }

        var time = hour+':'+min1+min2+':00';
        return time;
      }
    };
}])
.factory('verifyDate', ['$http', function($http){
    return {
      verifyDate: function(date, time){
        // Tempo atual
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = today.getMonth()+1;
        var dd = today.getDate();

        var hr = today.getHours();
        var mi = today.getMinutes();

        if(dd<10) {
            dd='0'+dd;
        }

        if(mm<10) {
            mm='0'+mm;
        }
        // Tempo escolhido
        var date = date.split('-');
        var time = time.split(':');

        // Verificação do tempo
        if(date[0] > yyyy){
          var data = {
            auth: 1,
            error: 0
          }
        }else if(date[0] == yyyy){
          if(date[1] > mm){
            var data = {
              auth: 1,
              error: 0
            }
          }else if(date[1] == mm){
            if(date[2] > dd){
              var data = {
                auth: 1,
                error: 0
              }
            }else if(date[2] == dd){
              if(time[0] > hr && time[1] >= mi){
                var data = {
                  auth: 1,
                  error: 0
                }
              }else{
                var data = {
                  auth: 0,
                  error: 4,
                }
              }
            }else{
              var data = {
                auth: 0,
                error: 3
              }
            }
          }else{
            var data = {
              auth: 0,
              error: 2
            }
          }
        }else{
          var data = {
            auth: 0,
            error: 1
          }
        }
        return data;
      }
    };
}])
.factory('verifyDate2', ['$http', function($http){
    return {
      verifyDate2: function(date, time){
        // Tempo atual
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = today.getMonth()+1;
        var dd = today.getDate();

        var hr = today.getHours();
        var mi = today.getMinutes();

        if(dd<10) {
            dd='0'+dd;
        }

        if(mm<10) {
            mm='0'+mm;
        }
        // Tempo escolhido
        var date = date.split('-');
        var time = time.split(':');
				var data;
        // Verificação do tempo
        if(date[0] > yyyy){
          data = {
            auth: 1,
            error: 0
          }
        }else if(date[0] == yyyy){
          if(date[1] > mm){
            data = {
              auth: 1,
              error: 0
            }
          }else if(date[1] == mm){
            if(date[2] > dd){
              data = {
                auth: 1,
                error: 0
              }
            }else if(date[2] == dd){
              if(time[0] > hr){
                data = {
                  auth: 1,
                  error: 0,
                }
              }else{
                data = {
                  auth: 0,
                  error: 4,
                  atual: hr,
                  escolhido: time
                }
              }
            }else{
              data = {
                auth: 0,
                error: 3
              }
            }
          }else{
            data = {
              auth: 0,
              error: 2
            }
          }
        }else{
          data = {
            auth: 0,
            error: 1
          }
        }
        return data;
      }
    };
}])
.factory('verifyDate3', ['$http', function($http){
    return {
      verifyDate3: function(dataInicioEl, dataFinalEl){
        // Tempo escolhido
        var dataInicio = dataInicioEl.split('-');
        var dataFinal = dataFinalEl.split('-');
				var data;
        // Verificação do tempo
        if(dataFinal[0] > dataInicio[0]){
          data = {
            auth: 1,
            error: 0
          }
        }else if(dataFinal[0] == dataInicio[0]){
          if(dataFinal[1] > dataInicio[1]){
            data = {
              auth: 1,
              error: 0
            }
          }else if(dataFinal[1] == dataInicio[1]){
            if(dataFinal[2] > dataInicio[2]){
              data = {
                auth: 1,
                error: 0
              }
            }else if(dataFinal[2] == dataInicio[2]){
              data = {
                  auth: 1,
                  error: 0,
                }
            }else{
              data = {
                auth: 0,
                error: 3
              }
            }
          }else{
            data = {
              auth: 0,
              error: 2
            }
          }
        }else{
          data = {
            auth: 0,
            error: 1
          }
        }
        return data;
      }
    };
}])
.factory('verifyDate4', ['$http', function($http){
    return {
      verifyDate4: function(date, time){
        // Tempo atual
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = today.getMonth()+1;
        var dd = today.getDate();

        var hr = today.getHours();
        var mi = today.getMinutes();

        if(dd<10) {
            dd='0'+dd;
        }

        if(mm<10) {
            mm='0'+mm;
        }
        // Tempo escolhido
        var date = date.split('-');
        var time = time.split(':');
				console.log(time[1] + ' - ' + mi);
        // Verificação do tempo
        if(date[0] > yyyy){
          var data = {
            auth: 1,
            error: 0
          }
        }else if(date[0] == yyyy){
          if(date[1] > mm){
            var data = {
              auth: 1,
              error: 0
            }
          }else if(date[1] == mm){
            if(date[2] > dd){
              var data = {
                auth: 1,
                error: 0
              }
            }else if(date[2] == dd){
              if(time[0] > hr){
								var data = {
									auth: 1,
									error: 0
								}
              }else{
                var data = {
                  auth: 0,
                  error: 4,
                }
              }
            }else{
              var data = {
                auth: 0,
                error: 3
              }
            }
          }else{
            var data = {
              auth: 0,
              error: 2
            }
          }
        }else{
          var data = {
            auth: 0,
            error: 1
          }
        }
        return data;
      }
    };
}])
.factory('verifyDateProjectStatus', ['$http', function($http){
    return {
      verifyDateProjectStatus: function(date, time){
        // Tempo atual
        var today = new Date();
        var yyyy = today.getFullYear();
        var mm = today.getMonth()+1;
        var dd = today.getDate();

        var hr = today.getHours();
        var mi = today.getMinutes();

        if(dd<10) {
            dd='0'+dd;
        }

        if(mm<10) {
            mm='0'+mm;
        }
        // Tempo escolhido
        var date = date.split('-');
        var time = time.split(':');

        // Verificação do tempo
        if(date[0] > yyyy){
          var data = {
            auth: 1,
            error: 0
          }
        }else if(date[0] == yyyy){
          if(date[1] > mm){
            var data = {
              auth: 1,
              error: 0
            }
          }else if(date[1] == mm){
            if(date[2] > dd){
              var data = {
                auth: 1,
                error: 0
              }
            }else if(date[2] == dd){
              if(time[0] > hr && time[1] >= mi){
                var data = {
                  auth: 1,
                  error: 0
                }
              }else{
                var data = {
                  auth: 0,
                  error: 4
                }
              }
            }else{
              var data = {
                auth: 0,
                error: 3
              }
            }
          }else{
            var data = {
              auth: 0,
              error: 2
            }
          }
        }else{
          var data = {
            auth: 0,
            error: 1
          }
        }
        return data;
      }
    };
}])
.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
