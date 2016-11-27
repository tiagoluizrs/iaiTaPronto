angular.module('app').controller('mainController', ['$scope', 'ChatFactory', 'verifyDate3', 'convertReportData', 'convertData', '$rootScope', '$routeParams', '$route', '$window', 'setBackground', 'loadUser', '$location', 'verificarLogin', 'logout', '$http', '$timeout', '$cookies', 'verificarRegras', 'createNewProject', 'createNewTask', 'editProject', 'formatDate', 'verifyDateProjectStatus', 'formatDate2', 'formatTime', 'convertReportDataCircle', 'verifyDate', 'verifyDate2', '$interval', 'verificarSolicitacao', 'verifyDate4', 'formatDateOnlyNew', function($scope, ChatFactory, verifyDate3, convertReportData, convertData, $rootScope, $routeParams, $route, $window, setBackground, loadUser, $location, verificarLogin, logout, $http, $timeout, $cookies, verificarRegras, createNewProject, createNewTask, editProject, formatDate, verifyDateProjectStatus, formatDate2, formatTime, convertReportDataCircle, verifyDate, verifyDate2, $interval, verificarSolicitacao, verifyDate4, formatDateOnlyNew){
	$scope.verificarConexao = function(){
		$scope.$watch('online', function(newStatus) {
			if(!newStatus){
				toastr.error('No momento você está sem conexão.', 'Reconectando...');
				if(newStatus){
					toastr.success('', 'Reconectado');
				}
			}
		});
		$timeout($scope.verificarConexao(), 3000);
	}
	
																							 
  var url = "http://tiagoluizweb.com.br/tcc/system/";
// 		var url = "http://localhost/iaiTaPronto/system/";
  var urlFront = "http://tiagoluizweb.com.br/tcc/app/#/";
//   var urlFront = "http://localhost/iaiTaPronto/app/#/";
  var hashName = $location.path().split('/');

	var verDados = verificarLogin.verificarLogin();
	if(verDados){
		$scope.user = loadUser.loadUser();
		if($scope.user.acesso <= 1){
			$('.modalTutorial').modal('show');
		}
		if($scope.user.estado){
			$('.desativado').addClass('hide-element');
		}else{
			$('.desativado').removeClass('hide-element');
		}
	}
	
	
	$scope.sync = function(){
		$('.sincronizando').removeClass('hide-element');
		setTimeout(function(){
			location.reload();
		}, 4000)
	};
	$scope.menu = [
		{
			title: 'Paneil Principal',
			shortTitle: 'Painel',
			href: 'panel',
			icon: 'dashboard',
		},
		{
			title: 'Meus Projetos',
			shortTitle: 'Projetos',
			href: 'projects',
			icon: 'work',
		},
		{
			title: 'Projetos em Participação',
			shortTitle: 'Projetos em Participação',
			href: 'otherProjects',
			icon: 'thumb_up',
		},
		{
			title: 'Meus Clientes',
			shortTitle: 'Meus Clientes',
			href: 'clients',
			icon: 'supervisor_account',
		},
		{
			title: 'Meus Relatórios',
			shortTitle: 'Relatórios',
			href: 'reports',
			icon: 'insert_chart',
		},
		{
			title: 'Agenda',
			shortTitle: 'Agenda',
			href: 'schendule',
			icon: 'perm_contact_calendar',
		},
		{
			title: 'Editar Perfil',
			shortTitle: 'Editar Perfil',
			href: 'editProfile',
			icon: 'account_circle',
		},
	];	
	if($location.path() == '/edit' || $location.path() == '/edit/' + hashName[2]){
	}else{
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
		$('#qnimateCliente').addClass('popup-box-on');
		$('.btn-scroll').addClass('hide');
		var objDiv = $('#popup-messagesBody');
		objDiv[0].scrollTop = objDiv[0].scrollHeight;
	});	
	$("#closeChat").click(function () {
		$('#qnimateCliente').removeClass('popup-box-on');
	});
                
      $('.button-collapse').sideNav('hide');
      $('.buttonSaveProject').addClass('hide-element');
//       $("html, .body-table, .bodyParticipantsActives").niceScroll({
//           cursorwidth: 10,
//           cursorcolor: '#333'
//       });
			var doc = new jsPDF();
			var specialElementHandlers = {
				'#editor': function (element, renderer) {
						return true;
				}
			};
			datesElements('#projectDate', '#projectTime');
			datesElements('#schenduleDateIn','#schenduleTimeIn');
			datesElements('#schenduleDateOut','#schenduleTimeOut');
			datesElements('#editSchenduleDateIn','#editSchenduleTimeIn');
			datesElements('#editSchenduleDateOut','#editSchenduleTimeOut');			
			datesElements('#taskDate','#taskTime');
			datesElements('#editTaskDate','#editTaskTime');
			datesElements2('.reportDate');
		
			$('#projectStatus').change(function(){
				setStatusProject('#projectStatus');
			})
      if(hashName[1] == 'confirmarEmail'){
      	ativarUsuario(hashName[2]);
      }
      if(hashName[1] == 'editProfile'){
 				$('#qnimateCliente').removeClass('popup-box-on');
				if(hashName[2] != undefined){
      		dadosRecovery(hashName[2]);
				}
      }
      if(hashName[1] == 'schendule'){
				loadEvents();
      }
			if(hashName[1] == 'otherProject'){
				$('#taskButton').addClass('hide-element');
      }
      $("input.inputTag").materialtags('items');
      $(".updateItem").removeClass('open');
		
			$('#profile_image').change( function(e) {
					var img = URL.createObjectURL(e.target.files[0]);
					$('#profile_add').attr('src', img);
			});
 });
	
	$scope.editarTarefa = function(){
				var dataInicio = formatDate.formatDate($('#editTaskDate').val());
				var timeInicio = formatTime.formatTime($('#editTaskTime').val());

				var dataInicioOld = formatDate.formatDate($('#editTaskHiddenDate').val());
				var timeInicioOld = formatTime.formatTime($('#editTaskHiddenTime').val());

				var dataInicioSave = $('#editSaveTaskDateIn').val();

				var dataInicioFinal, timeInicioFinal, dataTerminoFinal, timeTerminoFinal;

				if(dataInicio == dataInicioOld){
					dataInicioFinal = dataInicioSave;
				}else{
					dataInicioFinal = dataInicio;
				}

				if(timeInicio == timeInicioOld){
					timeInicioFinal = timeInicioOld;
				}else{
					timeInicioFinal = formatTime.formatTime(timeInicio);
				}

				if($('#editTaskTitle').val() == '' || $('#editTaskDate').val() == '' || $('#editTaskTime').val() == '' || $('#editTaskDescription').val() == ''){
						toastr.warning('Nenhum campo pode ficar em branco!', 'Campos Necessários!');
				}
				else{				
					var projectUrl;
					var hashName = $location.path().split('/');
					if(hashName[2] == undefined){
						projectUrl = 0;
					}else{
						projectUrl = hashName[2];
					}
					var participantesId = []
					$("input[name='participantesEdit[]']:checked").each(function (){
							participantesId.push(parseInt($(this).val()));
					});
					var data = {
						tarefaId:$('#idTarefa').val(),
						titulo:$('#editTaskTitle').val(),
						dataEntrega: dataInicioFinal+' '+timeInicioFinal,
						descricao: $('#editTaskDescription').val(),
						participantsId: participantesId,
						projectId: projectUrl
					};
					$http({
							method : "POST",
							headers: {'Content-Type': 'application/x-www-form-urlencoded'},
							url : url+'task/editarTarefa',
							data : data,
					}).then(function mySucces(response) {
								var userResult = response.data;
								if(userResult.auth){
										toastr.success('Tarefa editada com sucesso!', 'Sucesso!');
										setTimeout(function(){
											$window.location.reload();
										}, 3000);
								}
					}, function myError(response) {
						console.log(response);
					});
				}
			}
	
  $scope.addParticipant = function(){
     var participantes = $(".inputTag").materialtags('items');
     var projetoId = $routeParams.id;

     var data = {
       participantes: participantes,
       projetoId: projetoId,
     };
     $http({
         method : "POST",
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         url : url+'participant/convidarParticipante',
         data : data,
     }).then(function mySucces(response) {
           var userResult = response.data;
           console.log(userResult);
           $route.reload();
     });
   }
  $scope.removeParticipant = function(participante){
		var projetoId = $routeParams.id;

     var data = {
       participante: participante,
       projetoId: projetoId
     };
     $http({
         method : "POST",
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         url : url+'participant/removerParticipante',
         data : data,
     }).then(function mySucces(response) {
       var userResult = response.data;
       console.log(userResult);
       $route.reload();
     });
   }
	 
	$scope.aceitarProjeto = function(projeto){
     var data = {
       participante: $scope.user.nomeUsuario,
       projetoId: projeto
     };
     $http({
         method : "POST",
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         url : url+'participant/aceitarProjeto',
         data : data,
     }).then(function mySucces(response) {
       var userResult = response.data;
// 			 location.reload();
     });
   }
	$scope.rejeitarProjeto = function(projeto){
		var data = {
       participante: $scope.user.nomeUsuario,
       projetoId: projeto
     };
     $http({
         method : "POST",
         headers: {'Content-Type': 'application/x-www-form-urlencoded'},
         url : url+'participant/rejeitarProjeto',
         data : data,
     }).then(function mySucces(response) {
       var userResult = response.data;
     });
   }

	function ativarUsuario(element){
	  $.ajax({
			method: "POST",
			url : url+'user/ativarUsuario',
			data:{
			    hash: element
			}
		})
		.done(function(response) {
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
  $scope.activeDate = function(element){
    $('#projectEditTime').pickatime({
         darktheme: true,
      });
      $('#projectEditDate').pickadate({
          monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
          monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
          weekdaysFull: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
          weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
          // formatSubmit: 'dd/mm/yyyy',
          format: 'dddd, dd mmmm, yyyy',
          // Buttons
          today: 'Hoje',
          clear: 'Limpar',
          close: 'Fechar',

          // Accessibility labels
          labelMonthNext: 'Próximo mês',
          labelMonthPrev: 'Mês anterioe',
          labelMonthSelect: 'Selecione um mês',
          labelYearSelect: 'Selecione um ano',
      });
  }

	$scope.reloadUpdates = function(){
		location.reload();
	}
	
	var verificarLogin2 = verificarLogin.verificarLogin();
	if($location.path() == '/support' || $location.path() == '/support/' + hashName[2] || $location.path() == '/edit' || $location.path() == '/edit/' + hashName[2]){
	}else{
		if(verificarLogin2){
			$scope.user = loadUser.loadUser();
			if($scope.user != undefined){
				$scope.usuario = {
					nome: $scope.user.nome
				};
				$scope.solicitacaoCheck = verificarSolicitacao;
				if(typeof $scope.solicitacaoCheck.assincVerificacao == 'function' && typeof $scope.solicitacaoCheck.assincConviteAceito == 'function'){
					$scope.solicitacaoCheck.assincVerificacao();
					$scope.solicitacaoCheck.assincConviteAceito();
				}else{
			 		$scope.sync();
				}
			}
		}
	}
	$scope.createNewEvent = function(){
		var dataInicio = formatDate.formatDate($('#schenduleDateIn').val());
		var timeInicio = formatTime.formatTime($('#schenduleTimeIn').val());
		var dataTermino = formatDate.formatDate($('#schenduleDateOut').val());
		var timeTermino = formatTime.formatTime($('#schenduleTimeOut').val());

		if($('#schenduleTitle').val() == '' || $('#selectColor').val() == '' || $('#schenduleDateIn').val() == '' || $('#schenduleTimeIn').val() == '' ||  $('#schenduleDateOut').val() == '' || $('#schenduleTimeOut').val() == ''){
				toastr.warning('Preencha todos os campos!', 'Campos Necessários!');
		}else{
			var data = {
				schenduleTitle:$('#schenduleTitle').val(),
				dataInicio:dataInicio+' '+timeInicio,
				dataTermino:dataTermino+' '+timeTermino,
				selectColor: $('#selectColor').val(),
				userId: $scope.user.id
			};
			$http({
					method : "POST",
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					url : url+'event/criarEvento',
					data : data,
			}).then(function mySucces(response) {
						var userResult = response.data;
						if(userResult.auth){
								toastr.success('Evento criado com sucesso!', 'Sucesso!');
                $('#schenduleModal').modal('hide');
								$route.reload();
						}
			}, function myError(response) {
					toastr.danger('Erro ao criar evento!', 'Erro!');
			});
		}
	}
	
	
	$scope.editEvent = function(){
		var dataInicio = formatDate.formatDate($('#editSchenduleDateIn').val());
		var timeInicio = formatTime.formatTime($('#editSchenduleTimeIn').val());
		var dataTermino = formatDate.formatDate($('#editSchenduleDateOut').val());
		var timeTermino = formatTime.formatTime($('#editSchenduleTimeOut').val());

		var dataInicioOld = formatDate.formatDate($('#editHideSchenduleDateIn').val());
		var timeInicioOld = formatTime.formatTime($('#editHideSchenduleTimeIn').val());
		var dataTerminoOld = formatDate.formatDate($('#editHideSchenduleDateOut').val());
		var timeTerminoOld = formatTime.formatTime($('#editHideSchenduleTimeOut').val());

		var dataInicioSave = $('#editSaveSchenduleDateIn').val();
		var dataTerminoSave = $('#editSaveSchenduleDateOut').val();

		var dataInicioFinal, timeInicioFinal, dataTerminoFinal, timeTerminoFinal;

		if(dataInicio == dataInicioOld){
			dataInicioFinal = dataInicioSave;
		}else{
			dataInicioFinal = dataInicio;
		}

		if(dataTermino == dataTerminoOld){
			dataTerminoFinal = dataTerminoSave;
		}else{
			dataTerminoFinal = dataTermino;
		}

		if(timeInicio == timeInicioOld){
			timeInicioFinal = timeInicioOld;
		}else{
			timeInicioFinal = formatTime.formatTime(timeInicio);
		}

		if(timeTermino == timeTerminoOld){
			timeTerminoFinal = timeTerminoOld;
		}else{
			timeTerminoFinal = formatTime.formatTime(timeTermino)
		}

		if($('#editSchenduleTitle').val() == '' || $('#editSelectColor').val() == '' || $('#editSchenduleDateIn').val() == '' || $('#editSchenduleTimeIn').val() == '' ||  $('#editSchenduleDateOut').val() == '' || $('#editSchenduleTimeOut').val() == ''){
				toastr.warning('Nenhum campo pode ficar em branco!', 'Campos Necessários!');
		}else{
			var data = {
				schenduleId:$('#schenduleId').val(),
				schenduleTitle:$('#editSchenduleTitle').val(),
				dataInicio:dataInicioFinal+' '+timeInicioFinal,
				dataTermino:dataTerminoFinal+' '+timeTerminoFinal,
				selectColor: $('#editSelectColor').val(),
				userId: $scope.user.id
			};
			console.log(data);
			$http({
					method : "POST",
					headers: {'Content-Type': 'application/x-www-form-urlencoded'},
					url : url+'event/editarEvento',
					data : data,
			}).then(function mySucces(response) {
						var userResult = response.data;
						if(userResult.auth){
								toastr.success('Evento editado com sucesso!', 'Sucesso!');
								setTimeout(function(){
									$window.location.reload();
								}, 3000);
						}
			}, function myError(response) {
					toastr.danger('Erro ao editar evento!', 'Erro!');
			});
		}
	}

	if(verificarLogin){
		$scope.salutation = function(){
			var d = new Date();
					var h = d.getHours();
					if(h >= 00 && h <= 12){
						$scope.salutation = 'Bom Dia ';
					}
					else if(h >= 13 && h <= 18){
						$scope.salutation = 'Boa Tarde ';
					}
					else{
						$scope.salutation = 'Boa Noite ';
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
		$scope.switchTarefaStatus = function(element, element2){
	      var html = '';
	      if(element == 0){
	        html += '<div class="switch status">';
	        html += '<label>';
	        html += 'Andamento';
	        html += '<input onchange="setStatusTarefa(this);" value="'+element2+'" type="checkbox" checked="checked">';
	        html += '<span class="lever"></span>';
	        html += 'Finalizado';
	        html += '</label>';
	        html += '</div>';
	      }else{
	        html += '<div class="switch status">';
	        html += '<label>';
	        html += 'Andamento';
	        html += '<input onchange="setStatusTarefa(this);" value="'+element2+'" type="checkbox">';
	        html += '<span class="lever"></span>';
	        html += 'Andamento';
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
		$scope.realClock = function(){
		    $scope.tickInterval = 1000 //ms

		    var tick = function() {
		        $scope.clock = Date.now() // get the current time
		        $timeout(tick, $scope.tickInterval); // reset the timer
		    }

		    $timeout(tick, $scope.tickInterval);
		}
		
	  $scope.$back = function() {
	    window.history.back();
	  }

		$scope.formatDateView = function(dateTimer){
	    var dateTime = dateTimer.split(' ');

	    var timerFormatNew = dateTime[1].split(':');
			var time;
	    switch(timerFormatNew[0]){
	      case '13':
	      time = '01' + ':' + timerFormatNew[1] + 'PM';
	      break;
		
	      case '14':
	      time = '02' + ':' + timerFormatNew[1] + 'PM';
	      break;

	      case '15':
	      time = '03' + ':' + timerFormatNew[1] + 'PM';
	      break;

	      case '16':
	      time = '04' + ':' + timerFormatNew[1] + 'PM';
	      break;

	      case '17':
	      time = '05' + ':' + timerFormatNew[1] + 'PM';
	      break;

	      case '18':
	      time = '06' + ':' + timerFormatNew[1] + 'PM';
	      break;

	      case '19':
	      time = '07' + ':' + timerFormatNew[1] + 'PM';
	      break;

	      case '20':
	      time = '08' + ':' + timerFormatNew[1] + 'PM';
	      break;

	      case '21':
	      time = '09' + ':' + timerFormatNew[1] + 'PM';
	      break;

	      case '22':
	      time = '10' + ':' + timerFormatNew[1] + 'PM';
	      break;

	      case '23':
	      time = '11' + ':' + timerFormatNew[1] + 'PM';
	      break;

	      case '00':
	      time = '12' + ':' + timerFormatNew[1] + 'PM';
	      break;

	      default:
	      time = timerFormatNew[0] + ':' + timerFormatNew[1] + 'AM';
	      break;
	    }

	  	var dateFormatNew = dateTime[0].split('-');
			var date;
	    switch(dateFormatNew[1]){
	      case '01':
	      date = dateFormatNew[2] + ' Janeiro, ' + dateFormatNew[0];
	      break;

	      case '02':
	      date = dateFormatNew[2] + ' Fevereiro, ' + dateFormatNew[0];
	      break;

	      case '03':
	      date = dateFormatNew[2] + ' Março, ' + dateFormatNew[0];
	      break;

	      case '04':
	      date = dateFormatNew[2] + ' Abril, ' + dateFormatNew[0];
	      break;

	      case '05':
	      date = dateFormatNew[2] + ' Maio, ' + dateFormatNew[0];
	      break;

	      case '06':
	      date = dateFormatNew[2] + ' Junho, ' + dateFormatNew[0];
	      break;

	      case '07':
	      date = dateFormatNew[2] + ' Julho, ' + dateFormatNew[0];
	      break;

	      case '08':
	      date = dateFormatNew[2] + ' Agosto, ' + dateFormatNew[0];
	      break;

	      case '09':
	      date = dateFormatNew[2] + ' Setembro, ' + dateFormatNew[0];
	      break;

	      case '10':
	      date = dateFormatNew[2] + ' Outubro, ' + dateFormatNew[0];
	      break;

	      case '11':
	      date = dateFormatNew[2] + ' Novembro, ' + dateFormatNew[0];
	      break;

	      case '12':
	      date = dateFormatNew[2] + ' Dezembro, ' + dateFormatNew[0];
	      break;
	    }

	    var data = {
	        time: time,
	        date: date
	      }
	    return data;
	  }
		$("#projectClient").change(function() {
			var selected = $(' #projectClient option:selected').val();
			if(selected == 0){
				$('#newClientHidden').removeClass('hide-element');
			}else{
				$('#newClientHidden').addClass('hide-element');
			}
		});
	  $scope.createNewProject = function(){
	    var date = formatDate.formatDate($('#projectDate').val());
	    var time = formatTime.formatTime($('#projectTime').val());
			var clientSelected;
			var newCliente;
			
			if($('#projectClient').val() == 0){
				clientSelected = $('#newClientHidden').val();
				newCliente = 1;
			}else{
				clientSelected = $('#projectClient').val();
				newCliente = 0;
			}
			
	    var data = {
	      userId:$('#userId').val(),
	      projectTitle:$('#projectTitle').val(),
	      projectDate:date+' '+time,
	      projectClient:clientSelected,
	      projectDescription:$('#projectDescription').val(),
				newCliente: newCliente
	    }
	    var dateResult = verifyDate.verifyDate(date, time);

	    if(data.projectTitle == '' || data.date == '' || data.time == '' || data.projectClient == ''){
	      $('#projectDate').addClass('inputRequired');
	      $('#projectTime').addClass('inputRequired');
	      $('#projectTitle').addClass('inputRequired');
	      $('#projectClient').addClass('inputRequired');
	      $('.fa-calendar').addClass('iconRequired');
	      $('.fa-clock-o').addClass('iconRequired');

	      toastr.error('Os campos em vermelho não podem ficar em branco', 'Campos Necessários!');
	    }else{
	      $('#projectDate').removeClass('inputRequired');
	      $('#projectTime').removeClass('inputRequired');
	      $('#projectTitle').removeClass('inputRequired');
	      $('#projectClient').removeClass('inputRequired');
	      $('.fa-calendar').removeClass('iconRequired');
	      $('.fa-clock-o').removeClass('iconRequired');

	      if(dateResult.auth){
	        createNewProject.createNewProject(data);
	      }else{
	        switch(dateResult.error){
	          case 1:
	          toastr.error('O ano escolhido já passou. Selecione outro ano.', 'Erro!');
	          break;

	          case 2:
	          toastr.error('O mês escolhido já passou. Selecione outro mês.', 'Erro!');
	          break;

	          case 3:
	          toastr.error('O dia escolhido já passou. Selecione outro dia.', 'Erro!');
	          break;

	          case 4:
	          toastr.error('O horário escolhido já passou ou acontecerá dentro de 1 hora, escolha algo de 1 horas em diante.', 'Erro!');
	          break;

	          case 5:
	          toastr.error('Erro extra.', 'Erro!');
	          break;
	        }
	      }
	    }
	  }
// 		$scope.createNewProject = function(){
// 	    var date = formatDate.formatDate($('#projectDate').val());
// 	    var time = formatTime.formatTime($('#projectTime').val());

// 	    var data = {
// 	      userId:$('#userId').val(),
// 	      projectTitle:$('#projectTitle').val(),
// 	      projectDate:date+' '+time,
// 	      projectClient:$('#projectClient').val(),
// 	      projectDescription:$('#projectDescription').val(),
// 	    }
			
// 	    var dateResult = verifyDate.verifyDate(date, time);

// 	    if(data.projectTitle == '' || data.date == '' || data.time == '' || data.projectClient == ''){
// 	      $('#projectDate').addClass('inputRequired');
// 	      $('#projectTime').addClass('inputRequired');
// 	      $('#projectTitle').addClass('inputRequired');
// 	      $('#projectClient').addClass('inputRequired');
// 	      $('.fa-calendar').addClass('iconRequired');
// 	      $('.fa-clock-o').addClass('iconRequired');

// 	      toastr.error('Os campos em vermelho não podem ficar em branco', 'Campos Necessários!');
// 	    }else{
// 	      $('#projectDate').removeClass('inputRequired');
// 	      $('#projectTime').removeClass('inputRequired');
// 	      $('#projectTitle').removeClass('inputRequired');
// 	      $('#projectClient').removeClass('inputRequired');
// 	      $('.fa-calendar').removeClass('iconRequired');
// 	      $('.fa-clock-o').removeClass('iconRequired');

// 	      if(dateResult.auth){
// 	        createNewProject.createNewProject(data);
// 	      }else{
// 	        switch(dateResult.error){
// 	          case 1:
// 	          toastr.error('O ano escolhido já passou. Selecione outro ano.', 'Erro!');
// 	          break;

// 	          case 2:
// 	          toastr.error('O mês escolhido já passou. Selecione outro mês.', 'Erro!');
// 	          break;

// 	          case 3:
// 	          toastr.error('O dia escolhido já passou. Selecione outro dia.', 'Erro!');
// 	          break;

// 	          case 4:
// 	          toastr.error('O horário escolhido já passou ou acontecerá dentro de 1 hora, escolha algo de 1 horas em diante.', 'Erro!');
// 	          break;

// 	          case 5:
// 	          toastr.error('Erro extra.', 'Erro!');
// 	          break;
// 	        }
// 	      }
// 	    }
// 	  }
	  $scope.manutencaoCliente = function(){
			$http({
	            method : "GET",
	            url : url+'maintenance/carregarManutencao',
	        }).then(function mySucces(response) {
				var manutencao = response.data.data[0];
				if(manutencao.estado == 1){
					$('.manutencao').removeClass('hide-element');
				}else{
					$('.manutencao').addClass('hide-element');
				}
			});
		}
	  	
		$scope.manutencaoCliente();
		$scope.realClock();

		$scope.salutation();
		setBackground.setBackground();
		verificarRegras.verificarRegras();
		if($location.path() == '/panel'){
			$scope.excluirConta = function(){
				var confirm = window.confirm('Ao fazer isso você deleta permanentemente sua conta');
				if(confirm){
					$http({
								method : "POST",
								headers: {'Content-Type': 'application/x-www-form-urlencoded'},
								url : url+'user/desativarCliente',
								data: {
									id: $scope.user.id
								}
							}).then(function mySucces(response) {
								if(response.data.auth){
									var data = {
										codigoConfirmacao: $scope.user.codigoConfirmacao,
										codigoRecuperacao: $scope.user.codigoRecuperacao,
										cpf: $scope.user.cpf,
										dataCadastro: $scope.user.dataCadastro,
										email: $scope.user.email,
										estado: 0,
										funcao: $scope.user.funcao,
										id: $scope.user.id,
										nome: $scope.user.nome,
										nomeUsuario: $scope.user.nomeUsuario,
										senha: $scope.user.senha,
									};
									$scope.saveCookie(data);
									toastr.info('Para ativá-la novamente envie um e-mail para: suporte@iaitapronto.com.br', 'Conta desativada!');
									$('.desativando').removeClass('hide-element');
									$('.bodyDes').removeClass('hide-element');
									$('.bodyDesHide').addClass('hide-element');
									setTimeout(function(){
										$('.bodyDesHide').removeClass('hide-element');
										$('.bodyDes').addClass('hide-element');
									},3000);
								}
							});
					}
				}
		}
		if($location.path() == '/panel' || $location.path() == '/projects' || $location.path() == '/project'){
			if($scope.user.funcao == 3){
				$scope.vericarProjeto = function(){
					$http({
							method : "GET",
							url : url+'project/verificarProjeto',
					}).then(function mySucces(response) {
						console.log(response);
				});
			}
			$scope.vericarProjeto();
			}
	  }

	  if($location.path() == '/reports'){
			$scope.reportDatas = function(data, type){
				var reportValues;
				if(data.auth){
					if(type == 1){
						reportValues = [
							{
								name: 'Andamento',
								value: Object.keys(data.andamento).length,
							},
							{
								name: 'Finalizado',
								value: Object.keys(data.finalizado).length,
							},
							{
								name: 'Cancelado',
								value: Object.keys(data.cancelado).length,
							},
							{
								name: 'Todos',
								value: Object.keys(data.countReport).length,
							}
						];
					}else{	
						reportValues = [
							{
								name: 'Ativo',
								value: Object.keys(data.ativa).length,
							},
							{
								name: 'Inativo',
								value: Object.keys(data.inativa).length,
							},
							{
								name: 'Todos',
								value: Object.keys(data.countReport).length,
							}
						];
					}
				}else{
					if(type == 1){
						reportValues = [
							{
								name: 'Andamento',
								value: 0,
							},
							{
								name: 'Finalizado',
								value: 0,
							},
							{
								name: 'Cancelado',
								value: 0,
							},
							{
								name: 'Todos',
								value: 0,
							}
						];
					}else{	
						reportValues = [
							{
								name: 'Ativo',
								value: 0,
							},
							{
								name: 'Inativo',
								value: 0,
							},
							{
								name: 'Todos',
								value: 0,
							}
						];
					}
				}
				return reportValues;
			}
			$scope.userChart = function(data){
				$scope.myJson = {
					type : "bar",
					title:{
						backgroundColor : "transparent",
						fontColor :"#333",
						text : "Relatório"
					},
					backgroundColor : "white",
					plot:{
						styles:["#154771","#C00", "#2BBBAD", "#F80" ],
					},
					series : [
						{
							values : data,
							backgroundColor : "transparent"
						}
					]
				};
			}
			$scope.userChartCircle = function(data){
				$scope.myJson2 = {
						globals: {
								shadow: false,
								fontFamily: "Verdana",
								fontWeight: "100"
						},
						type: "pie",
						backgroundColor: "transparent",

						legend: {
								layout: "x5",
								position: "50%",
								borderColor: "transparent",
								marker: {
										borderRadius: 10,
										borderColor: "transparent"
								}
						},
						tooltip: {
								text: "%v requests"
						},
						plot: {
								refAngle: "-90",
								borderWidth: "0px",
								valueBox: {
										placement: "in",
										text: "%npv %",
										fontSize: "15px",
										textAlpha: 1,
								}
						},
						series: data
				};
			}
			$scope.atualDate = function(){
				var today = new Date();
				var yyyy = today.getFullYear();
				var mm = today.getMonth()+1;
				var dd = today.getDate();
				var lastYear;
				var lastMonth;
				var mmNew;
				var monthNew;
				
				if(mm == 01 || mm == 1){
					 lastYear = yyyy - 1;
					 lastMonth = 12;
				}else{
					lastYear = yyyy;
					lastMonth = mm - 1;
				}
				if(mm < 10){
					mmNew = '0' + mm;
				}else{
					mmNew = mm;
				}
				if(lastMonth < 10){
					monthNew = '0' + lastMonth;
				}else{
					monthNew = lastMonth;
				}
				var nowDate = yyyy + '-' + mmNew +  '-' + dd;
				var lastDate = lastYear + '-' + monthNew +  '-' + dd;

				var data = {
					nowDate: nowDate,
					lastDate: lastDate
				}
				return data;
			}
			$scope.typeReport = 'Projetos';
			
			
			$scope.downloadReport = function(data){
				var resultData, dataInicio, dataFinal;
				var type = $('#typeValue option:selected').val();
				var todoPeriodo = $('#todoPeriodo:checked').val();
				if(todoPeriodo == '1'){
					resultData = {
						auth: 1
					};
					dataInicio = 0;
					dataFinal = 0;
				}else{
					dataInicio = formatDate.formatDate($('#dataInicioReport').val());
					dataFinal = formatDate.formatDate($('#dataFinalReport').val());
					resultData = verifyDate3.verifyDate3(dataInicio, dataFinal);
					todoPeriodo = 0;
				}
				$http({
						method : "GET",
						url : url+'user/buscarRelatorio?token='+$scope.user.codigoRecuperacao+'&dataInicio='+dataInicio+'&dataFinal='+dataFinal+'&type='+type+'&periodo='+todoPeriodo+'&action=1',
				}).then(function mySucces(response) {
					$scope.generateDownloadPdf(response.data, type);
				});
			}
			$scope.requestReport = function(type, dataInicio, dataFinal, todoPeriodo){
				$('.downloadButtons').attr('href', url+'user/gerarRelatorio?token='+$scope.user.codigoRecuperacao+'&dataInicio='+dataInicio+'&dataFinal='+dataFinal+'&type='+type+'&periodo='+todoPeriodo+'&action=3');
				$('.printButtons').attr('href', url+'user/gerarRelatorio?token='+$scope.user.codigoRecuperacao+'&dataInicio='+dataInicio+'&dataFinal='+dataFinal+'&type='+type+'&periodo='+todoPeriodo+'&action=2');
				console.log(url+'user/buscarRelatorio?token='+$scope.user.codigoRecuperacao+'&dataInicio='+dataInicio+'&dataFinal='+dataFinal+'&type='+type+'&periodo='+todoPeriodo+'&action=1');
				$http({
						method : "GET",
						url : url+'user/buscarRelatorio?token='+$scope.user.codigoRecuperacao+'&dataInicio='+dataInicio+'&dataFinal='+dataFinal+'&type='+type+'&periodo='+todoPeriodo+'&action=1',
				}).then(function mySucces(response) {
					  var reportBar = convertReportData.convertReportData(response.data, type);
					  var reporCircle = convertReportDataCircle.convertReportDataCircle(response.data, type);
 						$scope.userChart(reportBar);
 						$scope.userChartCircle(reporCircle);
						$scope.valueReports = $scope.reportDatas(response.data, type);
				});
			}
			$scope.loadReports = function(){
					$scope.tickInterval = 1000 //ms

					var report = function() {
							$scope.clock = Date.now() // get the current time
							$timeout(console.log('oi'), $scope.tickInterval);
					}

					$timeout(report, $scope.tickInterval);
			}
			$scope.loadReports();
			$scope.relatorioLoadEvent = function(){
				var resultData, dataInicio, dataFinal;
				var type = $('#typeValue option:selected').val();
				var todoPeriodo = $('#todoPeriodo:checked').val();
				if(todoPeriodo == '1'){
					resultData = {
						auth: 1
					};
					dataInicio = 0;
					dataFinal = 0;
				}else{
					dataInicio = formatDate.formatDate($('#dataInicioReport').val());
					dataFinal = formatDate.formatDate($('#dataFinalReport').val());
					resultData = verifyDate3.verifyDate3(dataInicio, dataFinal);
					todoPeriodo = 0;
				}
				if(resultData.auth && todoPeriodo == undefined || todoPeriodo == 0){
					if(type == 0 || type == ''){
						toastr.warning('Selecione o tipo de relatório que deseja gerar.', 'Atenção!');
						$('.printButtons').addClass('hide-elements');
						$('.downloadButtons').addClass('hide-elements');
					}else if(dataInicio == '' || dataFinal == '' || dataInicio == 'undefined--undefined' || dataFinal == 'undefined--undefined'){
						toastr.warning('Nenhum campo de data pode ficar em branco nessa opção.', 'Atenção!');
						$('.printButtons').addClass('hide-elements');
						$('.downloadButtons').addClass('hide-elements');
					}else{
						$('.printButtons').removeClass('hide-elements');
						$('.downloadButtons').removeClass('hide-elements');
						$scope.requestReport(type, dataInicio, dataFinal, todoPeriodo);
					}
				}else if(resultData.auth && todoPeriodo == '1'){
					if(type == 0 || type == ''){
						toastr.warning('Selecione o tipo de relatório que deseja gerar.', 'Atenção!');
						$('.printButtons').addClass('hide-elements');
						$('.downloadButtons').addClass('hide-elements');
					}else{
						$('.printButtons').removeClass('hide-elements');
						$('.downloadButtons').removeClass('hide-elements');
						$scope.requestReport(type, dataInicio, dataFinal, todoPeriodo);
					}
				}else{
					$('.printButtons').addClass('hide-elements');
					$('.downloadButtons').addClass('hide-elements');
					switch(resultData.error){
						case 1:
						toastr.error('O ano escolhido é menor do que a data de início. Selecione outro ano.', 'Erro!');
						break;

						case 2:
						toastr.error('O mês escolhido é menor do que a data de início. Selecione outro mês.', 'Erro!');
						break;

						case 3:
						toastr.error('O dia escolhido é menor do que a data de início. Selecione outro dia.', 'Erro!');
						break;

						case 4:
						toastr.error('Erro extra.', 'Erro!');
						break;
					}
				}
				$('.configReport').removeClass('hide-element');
			}
		}
	  	if($location.path() == '/users' || $location.path() == '/edit'){
			$scope.manutencao = function(){
				$http({
		            method : "GET",
		            url : url+'maintenance/carregarManutencao',
		        }).then(function mySucces(response) {
					var manutencao = response.data.data[0];
					if(manutencao.estado == 1){
						var confirm = window.confirm('Tem certeza que deseja desativar a manutenção do sistema?');
						if(confirm){
							$scope.desativarManutencao();
						}
					}else{
						var confirm = window.confirm('Tem certeza que deseja ativar a manutenção do sistema?');
						if(confirm){
							$scope.ativarManutencao();
						}
					}
				});
			}
			$scope.desativarManutencao = function(){
				$http({
		            method : "GET",
		            url : url+'maintenance/desativarManutencao',
		        }).then(function mySucces(response) {
		        	
					var auth = response.data.auth;
					if(auth){
	                  toastr["warning"]('Manutenção desativada');
					}else{
	                  toastr["error"]('Erro ao desativar manutenção');
					}
				$('.manutencao').addClass('hide-element');	
				});
			}
			$scope.ativarManutencao = function(){
				$http({
		            method : "GET",
		            url : url+'maintenance/ativarManutencao',
		        }).then(function mySucces(response) {
		        	
					var auth = response.data.auth;
					if(auth){
	                  toastr["success"]('Manutenção ativada');
					}else{
	                  toastr["error"]('Erro ao ativar manutenção');
					}
				    $('.manutencao').removeClass('hide-element');
	      		});
			}
		}
			
		if($location.path() == '/users'){
	    $scope.openCreateUser = function(){
	      $('.formNewUser').toggle();
	    }

	    $scope.pesquisar = function(){
	      var user = $('#userSearch').val();
	        $('.body-table .table-users tbody tr').hide();
	        $('.preloaderBody').removeClass('hide-element');
	        $http({
	            method : "GET",
	            url : url+'user/pesquisarUsuario?user='+user+'&id='+$scope.user.id,
	        }).then(function mySucces(response) {
	            $('.body-table .table-users tbody tr').show();
	            $('.preloaderBody').addClass('hide-element');
	            var userResult = response.data;
	              if(userResult.auth){
	                var html = '';
	                for (var i = 0; i < userResult.data.length ; i++) {
	                      html += '<tr>';
	                      html += '<td scope="row">'+userResult.data[i].id+'</td>';
	                      html += '<td>'+userResult.data[i].nome+'</td>';
	                      html += '<td>'+userResult.data[i].nomeUsuario+'</td>';
	                      html += '<td>'+userResult.data[i].email+'</td>';
	                      html += '<td>'+userResult.data[i].dataCadastro+'</td>';
	                      html += '<td>'+$scope.switchStatus(userResult.data[i].estado, userResult.data[i].id)+'</td>';
	                      html += '<td>'+$scope.setFunction(userResult.data[i].funcao)+'</td>';
	                      html += '<td>';
	                      html += '<button onclick="openEditUser('+userResult.data[i].id+');" class="btn btn-sm btn-default waves-light waves-effect" data-toggle="modal" data-target="#userModal" data-toggle="modal" data-target="#userModal"><i class="fa fa-pencil"></i></button>';
	                      html += '</td>';
	                    html += '</tr>';
	                }
	                $('.body-table .table-users tbody').html(html);
	              }else{
	                $('.body-table .table-users tbody').html('Nenhum resultado encontrado');
	              }
	      }, function myError(response) {
	          // $scope.loginAccess = response.statusText;
	          // alert('erro');
	      });
	    }

	    $scope.novoUsuario = function(){
	      var data = {
	        newNameUser:$('#newNameUser').val(),
	        newUsuarioUser:$('#newUsuarioUser').val(),
	        newEmailUser:$('#newEmailUser').val(),
	        newPasswordUser:$('#newPasswordUser').val(),
	        newCpfUser:$('#newCpfUser').val(),
	        newRoleUser:$("#newRoleUser :selected").val(),
	        statusUser:1,
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
	        });
	      }
	    }
			
			$scope.criarConversa = function(element){
				console.log(element);
				$http({
						method : "POST",
	          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	          url : url+'chat/criarConversa',
	          data : element,
	        }).then(function mySucces(response) {
	          
	      }, function myError(response) {
	          console.log(response);
	      });
      }
			
	    $scope.httpNovoUsuario = function(element){
	      $http({
	          method : "POST",
	          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	          url : url+'user/criarUsuario',
	          data : element,
	      }).then(function mySucces(response) {
	            	var userResult = response.data;
	              if(userResult.auth){
										var dataUsuario = {
											id: userResult.id,
											roleUser: userResult.funcao,
										}
	                  $('.cpfExistent').addClass('hide-element');
	                  $('.usernameExistent').addClass('hide-element');
	                  $('.useremailExistent').addClass('hide-element');

	                  $('#newCpfUser').removeClass('existentField');
	                  $('#newEmailUser').removeClass('existentField');
	                  $('#newUsuarioUser').removeClass('existentField');
	                  $('#formRegisterUser input').val('');

	                  $('.labelCpfValid').addClass('hide-element');
	                  $('.labelCpfInvalid').addClass('hide-element');
	                  $('#newCpfUser').removeClass('cpfValid');
	                  $('#newCpfUser').removeClass('cpfInvalid');
										$scope.criarConversa(dataUsuario);
	                  toastr["success"]('Usuário criado com sucesso!');
// 										setTimeout(function(){ location.reload(); }, 3000);
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
	                }else if(userResult.response == 3){
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
					
			$scope.AdminEditarUsuario = function(){
				var data = {
	        editNameUser:$('#AdminEditNameUser').val(),
	        editEmailUser:$('#AdminEditEmailUser').val(),
	        editUsuarioUser:$('#AdminEditUsuarioUser').val(),
	        editPasswordUser:$('#AdminEditPasswordUser').val(),
	        editCode: 0,
	        idUser:$('#AdminIdUserClient').val(),
	        userRole: $('#AdminEditRole option:selected').val(),
	      }
				$scope.httpAdminEditarUsuario(data);
			}
			$scope.httpAdminEditarUsuario = function(data){
				$http({
	        method : "POST",
	        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	        url : url+'user/editarUsuario',
	        data : data,
	      }).then(function mySucces(response) {
						var result = response.data;
					  if(result.auth){
							toastr.success('Sucesso ao editar usuário!', 'Sucesso!');
							location.reload();
						}else{
							switch(result.response){
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
	      }, function myError(result) {
						toastr.error('Erro ao editar usuário!', 'Erro!');
	      });
			}
			
	    $scope.pesquisar();
	  }
	  if($location.path() == '/projects'){
	    $scope.loadProjectUser = function(){
	      var projectSearch = $('#projectSearch').val();
	      $http({
	            method : "GET",
	            url : url+'project/pesquisarProjeto?userId='+$scope.user.id+'&data='+projectSearch,
	        }).then(function mySucces(response) {
	            $scope.projetos = response.data.data;
	        });
	    }
	    $scope.loadProjectsUser = function(){
	      $http({
	            method : "GET",
	            url : url+'project/pesquisarProjeto?userId='+$scope.user.id,
	        }).then(function mySucces(response) {
	            $scope.projetos = response.data.data;
	        });
	    }
	    $scope.loadProjectsUser();
	  }
    if($location.path() == '/otherProjects'){
	    $scope.loadOtherProjectsUser = function(){
	      $http({
	            method : "GET",
	            url : url+'project/pesquisarOutroProjeto?userId='+$scope.user.id,
	        }).then(function mySucces(response) {
							if(response.data.auth){
	            	$scope.projetos = response.data.data;
							}
	        });
	    }
	    $scope.loadOtherProjectsUser();
    }

		$scope.createNewTask = function(){
			var projectUrl;
			var hashName = $location.path().split('/');
			if(hashName[2] == undefined){
				projectUrl = 0;
			}else{
				projectUrl = hashName[2];
			}
			
			var participantesId = []
			$("input[name='participantes[]']:checked").each(function (){
					participantesId.push(parseInt($(this).val()));
			});
			var date = formatDate.formatDate($('#taskDate').val());
			var time = formatTime.formatTime($('#taskTime').val());
			var data = {
				projectId:projectUrl,
				taskTitle:$('#taskTitle').val(),
				taskDate:date+' '+time,
				participantsId:participantesId,
				taskDescription:$('#taskDescription').val(),
			}
				var dateResult = verifyDate4.verifyDate4(date, time);

				if(data.projectTitle == '' || data.date == '' || data.time == '' || data.projectClient == ''){
					$('.formNewTask #projectDate').addClass('inputRequired');
					$('.formNewTask #projectTime').addClass('inputRequired');
					$('.formNewTask #projectTitle').addClass('inputRequired');
					$('.formNewTask #projectClient').addClass('inputRequired');
					$('.formNewTask .fa-calendar').addClass('iconRequired');
					$('.formNewTask .fa-clock-o').addClass('iconRequired');

					toastr.error('Todos os campos não podem ficar em branco', 'Campos Necessários!');
				}else{
					$('#projectDate').removeClass('inputRequired');
					$('#projectTime').removeClass('inputRequired');
					$('#projectTitle').removeClass('inputRequired');
					$('#projectClient').removeClass('inputRequired');
					$('.fa-calendar').removeClass('iconRequired');
					$('.fa-clock-o').removeClass('iconRequired');

					if(dateResult.auth){
						createNewTask.createNewTask(data);
					}else{
						switch(dateResult.error){
							case 1:
							toastr.error('O ano escolhido já passou. Selecione outro ano.', 'Erro!');
							break;

							case 2:
							toastr.error('O mês escolhido já passou. Selecione outro mês.', 'Erro!');
							break;

							case 3:
							toastr.error('O dia escolhido já passou. Selecione outro dia.', 'Erro!');
							break;

							case 4:
							toastr.error('O horário escolhido já passou ou acontecerá dentro de 1 hora, escolha algo de 1 horas em diante.', 'Erro!');
							break;

							case 5:
							toastr.error('Erro extra.', 'Erro!');
							break;
						}
					}
				}
			}
	  if($location.path() == '/otherProject/'+$routeParams.id){
			$scope.loadOtherProjectUser = function(){
	      $http({
	          method : "GET",
	          url : url+'project/pesquisarOutroProjeto?userId='+$scope.user.id+'&data='+$routeParams.id,
	      }).then(function mySucces(response) {
					console.log(response);
						if(response.data.auth){
							$scope.projeto = response.data.data[0];
							var timer = $scope.projeto.dataEntrega;
							var dateTime = $scope.formatDateView(timer);
							$scope.dateFormated = {
								date: dateTime.date,
								time: dateTime.time
							}
							$scope.carregarTarefas();
							$scope.loadStatus();

						}else{
							$location.path('/inexistentParticipantProject');
						}
	      });
	    }
			$scope.loadOtherProjectUser();
			$scope.carregarTarefas = function(){
				$http({
						method : "GET",
						url : url+'task/carregarTarefas?usuarioId='+$scope.user.id+'&projetoId='+hashName[2],
				}).then(function mySucces(response) {
						$scope.tarefas = response.data.tarefas;
				});
			}	
			$scope.pesquisarTarefa = function(element){
				$http({
						method : "GET",
						url : url+'task/pesquisarOutroProjetoTarefa?tarefaId='+element,
				}).then(function mySucces(response) {
						$('#viewTaskTitle').val(response.data.tarefa[0].titulo);
						$('#viewTaskDate').val(formatDateOnlyNew.formatDateOnlyNew(response.data.tarefa[0].dEntrega, 1));
						$('#viewTaskTime').val(formatDateOnlyNew.formatDateOnlyNew(response.data.tarefa[0].dEntrega, 2));
						$('#viewTaskDescription').val(response.data.tarefa[0].titulo);
						var html = '';
					
						for(var i = 0 ; i < response.data.tarefa.length ; i++){
							html += '<span>';
							html += '<input disabled type="checkbox" id="checkbox_'+response.data.tarefa[i].id+'">';
							html += '<label class="disabled" for="checkbox_'+response.data.tarefa[i].id+'">'+response.data.tarefa[i].nomeUsuario+'</label>';
							html += '</span>';
							
						}
						$('#participantesCheck').html(html);
						var switchEstadoTarefa = $scope.switchTarefaStatus(response.data.tarefa[0].t_estado, response.data.tarefa[0].tarefa_id);
						$('.switchBody').html(switchEstadoTarefa);
				});
			}	
			$scope.loadStatus = function(){
	      $http({
	          method : "GET",
	          url : url+'project/pesquisarOutroProjeto?userId='+$scope.user.id+'&data='+$routeParams.id,
	      }).then(function mySucces(response) {
	          $scope.projeto2 = response.data.data[0];
	          var estado = $scope.projeto2.estado;
	          switch (estado) {
	            case '1':
	            $('.statusProject').text(' Em Andamento');
	            break;

	            case '2':
	            $('.statusProject').text(' Análise de Testes');
	            break;

	            case '3':
	            $('.statusProject').text(' Entregue');
	            break;

	            case '4':
	            $('.statusProject').text(' Cancelado');
	            break;

	            case '5':
	            $('.statusProject').text(' Atrasado');
	            break;

	          }
	      });
			}
			
		}
	  if($location.path() == '/project/'+$routeParams.id){
			
			$scope.projectExist = function(){
	      $http({
						method : "GET",
						url : url+'project/pesquisarProjeto?userId='+$scope.user.id+'&data='+hashName[2],
				}).then(function mySucces(response) {
					console.log(response);
						var auth = response.data.auth;
					if(auth == 0){
						$location.path('/inexistentProject');
					}
				});
	    }
			$scope.projectExist();
			
			if(hashName[2] == undefined){
				$scope.projectUrl = 0;
			}else{
				$scope.projectUrl = hashName[2];
			}
			if(verificarLogin2){
				$scope.user = loadUser.loadUser();
				if($scope.user != undefined){
					$scope.usuario = {
						nome: $scope.user.nome
					};
					$scope.solicitacaoCheck = verificarSolicitacao;
					if(typeof $scope.solicitacaoCheck.assincVerificacao == 'function' && typeof 						$scope.solicitacaoCheck.assincConviteAceito == 'function'){
					$scope.solicitacaoCheck.assincVerificacao();
					$scope.solicitacaoCheck.verificarConviteAceito();
					$scope.solicitacaoCheck.assincConviteAceito();
					}else{
							$scope.sync();
					}
				}
			}
			$scope.loadTask = function(){
	      $http({
						method : "GET",
						url : url+'task/pesquisarTarefas?projetoId='+$scope.projectUrl,
				}).then(function mySucces(response) {
						$scope.tarefas = response.data.tarefa;
				});
	    }
			$scope.participantesAtuais = function(){
				$http({
						method : "GET",
						url : url+'participant/pesquisarParticipante?projectId='+$scope.projectUrl,
				}).then(function mySucces(response) {
						var html = '';
						var userHtml = '';
						if(response.data.auth){
							var usuariosProjeto = response.data.dataAtivo;
							for(var i = 0; i < usuariosProjeto.length; i++){
								html += '<span>';
								html += '<input value="'+usuariosProjeto[i].id+'" name="participantes[]" type="checkbox" id="checkbox_'+usuariosProjeto[i].id+'">';
								html += '<label for="checkbox_'+usuariosProjeto[i].id+'">'+usuariosProjeto[i].nomeUsuario+'</label>';
								html += '</span>';
							}
							userHtml += '<span style="display:none">';
							userHtml += '<input value="'+$scope.user.id+'" name="participantes[]" type="checkbox" id="checkbox_user_'+$scope.user.id+'" checked>';
							userHtml += '<label for="checkbox_user_'+$scope.user.id+'">'+$scope.user.nomeUsuario+'</label>';
							userHtml += '</span>';
							$('#areaCheck').html(html+userHtml);
						}else{
							userHtml += '<span style="display:none">';
							userHtml += '<input value="'+$scope.user.id+'" name="participantes[]" type="checkbox" id="checkbox_user_'+$scope.user.id+'" checked>';
							userHtml += '<label for="checkbox_user_'+$scope.user.id+'">'+$scope.user.nomeUsuario+'</label>';
							userHtml += '</span>';
							$('#areaCheck').html(userHtml);
						}
				});
			}
			
			$timeout(function() {
        $scope.participantesAtuais()
    	}, 1000);
			$scope.loadTask();
			
			$scope.loadOtherProjectUser = function(){
	      $http({
	          method : "GET",
	          url : url+'project/pesquisarOutroProjeto?userId='+$scope.user.id+'&data='+$routeParams.id,
	      }).then(function mySucces(response) {
	          $scope.projeto = response.data.data[0];
	          var timer = $scope.projeto.dataEntrega;
	          var dateTime = $scope.formatDateView(timer);
	          $scope.dateFormated = {
	            date: dateTime.date,
	            time: dateTime.time
	          }
	      });
	    }
			$scope.loadStatus = function(){
	      $http({
	          method : "GET",
	          url : url+'project/pesquisarOutroProjeto?userId='+$scope.user.id+'&data='+$routeParams.id,
	      }).then(function mySucces(response) {
	          $scope.projeto2 = response.data.data[0];
	          var estado = $scope.projeto2.estado;
	          switch (estado) {
	            case '1':
	            $('.statusProject').text(' Em Andamento');
	            break;

	            case '2':
	            $('.statusProject').text(' Análise de Testes');
	            break;

	            case '3':
	            $('.statusProject').text(' Entregue');
	            break;

	            case '4':
	            $('.statusProject').text(' Cancelado');
	            break;

	            case '5':
	            $('.statusProject').text(' Atrasado');
	            break;

	          }
	      });
			}
			$scope.pesquisarProjetoTarefa = function(element){
				$http({
						method : "GET",
						url : url+'task/pesquisarProjetoTarefa?tarefaId='+element,
				}).then(function mySucces(response) {
						$('#editTaskTitle').val(response.data.tarefa[0].titulo);
						$('#idTarefa').val(response.data.tarefa[0].tarefa_id);
						$('#editTaskDescription').val(response.data.tarefa[0].descricao);
						$('#editTaskDate').val(formatDateOnlyNew.formatDateOnlyNew(response.data.tarefa[0].dEntrega, 1));
						$('#editTaskTime').val(formatDateOnlyNew.formatDateOnlyNew(response.data.tarefa[0].dEntrega, 2));												$('#editTaskHiddenDate').val(formatDateOnlyNew.formatDateOnlyNew(response.data.tarefa[0].dEntrega, 1));
						$('#editTaskHiddenTime').val(formatDateOnlyNew.formatDateOnlyNew(response.data.tarefa[0].dEntrega, 2));
						$('#editSaveTaskDateIn').val(formatDateOnlyNew.formatDateOnlyNew(response.data.tarefa[0].dEntrega, 3));
					
					
						var html = '';
					
						for(var i = 0 ; i < response.data.participantes.length ; i++){
							html += '<span>';
							html += '<input value="'+response.data.participantes[i].id+'" name="participantesEdit[]" type="checkbox" id="checkbox_editUser_'+response.data.participantes[i].id+'" class="checkboxEdit">';
							html += '<label style="padding-left: 20px;margin-right: 10px;" class="" for="checkbox_editUser_'+response.data.participantes[i].id+'">'+response.data.participantes[i].nomeUsuario+'</label>';
							html += '</span>';
						}
							var userHtml = '';
							userHtml += '<span style="display:none">';
							userHtml += '<input value="'+$scope.user.id+'" class="checkboxEdit" name="participantesEdit[]" type="checkbox" id="checkbox_editUser_'+$scope.user.id+'" checked>';
							userHtml += '<label for="checkbox_editUser_'+$scope.user.id+'">'+$scope.user.nomeUsuario+'</label>';
							userHtml += '</span>';
							$('#participantesCheckEdit').html(html+userHtml);
					
						var switchEstadoTarefa = $scope.switchTarefaStatus(response.data.tarefa[0].t_estado, response.data.tarefa[0].tarefa_id);
						$('.switchBody').html(switchEstadoTarefa);
						$('.checkboxEdit').each(function(){
							var value = $(this).val();
							for(var i = 0 ; i < response.data.participantesTarefas.length ; i++){
								if(value == response.data.participantesTarefas[i].id){
									$(this).attr('checked', 'checked');
								}
							}
						});
				});
			}	
	    $scope.loadProjectUser = function(){
	      $http({
	          method : "GET",
	          url : url+'project/pesquisarProjeto?userId='+$scope.user.id+'&data='+$routeParams.id,
	      }).then(function mySucces(response) {
	          $scope.projeto = response.data.data[0];
	          var timer = $scope.projeto.dataEntrega;
	          var dateTime = $scope.formatDateView(timer);
	          $scope.dateFormated = {
	            date: dateTime.date,
	            time: dateTime.time
	          }
	      });
	    }
	    $scope.loadStatus = function(){
	      $http({
	          method : "GET",
	          url : url+'project/pesquisarProjeto?userId='+$scope.user.id+'&data='+$routeParams.id,
	      }).then(function mySucces(response) {
	          $scope.projeto2 = response.data.data[0];
	          var estado = $scope.projeto2.estado;
	          switch (estado) {
	            case '1':
	            $('.statusProject').text(' Em Andamento');
	            break;

	            case '2':
	            $('.statusProject').text(' Análise de Testes');
	            break;

	            case '3':
	            $('.statusProject').text(' Entregue');
	            break;

	            case '4':
	            $('.statusProject').text(' Cancelado');
	            break;

	            case '5':
	            $('.statusProject').text(' Atrasado');
	            break;

	          }
	      });
	    }
	    $scope.editProject = function(){
	      $('.buttonEditProject').addClass('hide-element');
	      $('.buttonSaveProject').removeClass('hide-element');
	      $('.editProject input, .editProject textarea').attr('readonly', false);
	      $scope.activeDate();
	    }
	    $scope.saveProject = function(){
	      $scope.activeDate();
	      var date = formatDate2.formatDate2($('#projectEditDate').val());
	      var time = formatTime.formatTime($('#projectEditTime').val());
	      var data = {
	        userId: $scope.user.id,
	        projectId: $routeParams.id,
	        projectTitle:$('#ProjectEditTitle').val(),
	        projectDate:date+' '+time,
	        projectClientValue:$('#projectEditClientP').val(),
	        projectDescription:$('#projectEditDescription').val(),
	      }
	      var editTimeResult = verifyDate2.verifyDate2(date, time);
        console.log(editTimeResult);
	      if(data.projectTitle == '' || $('#projectEditDate').val() == '' || $('#projectEditTime').val() == '' || data.projectClientValue == ''){
	        $('#projectEditDate').addClass('inputRequired');
	        $('#projectEditTime').addClass('inputRequired');
	        $('#ProjectEditTitle').addClass('inputRequired');
	        $('#projectEditClientP').addClass('inputRequired');
	        toastr.error('Os campos em vermelho não podem ficar em branco', 'Campos Necessários!');
	      }else{
	        $('#projectEditDate').removeClass('inputRequired');
	        $('#projectEditTime').removeClass('inputRequired');
	        $('#ProjectEditTitle').removeClass('inputRequired');
	        $('#projectEditClientP').removeClass('inputRequired');
	        $('.fa-calendar').removeClass('iconRequired');
	        $('.fa-clock-o').removeClass('iconRequired');
	        console.log(editTimeResult);
	        if(editTimeResult.auth){
		        editProject.editProject(data);
		      }else{
		        switch(editTimeResult.error){
		          case 1:
		          toastr.error('O ano escolhido já passou. Selecione outro ano.', 'Erro!');
		          break;

		          case 2:
		          toastr.error('O mês escolhido já passou. Selecione outro mês.', 'Erro!');
		          break;

		          case 3:
		          toastr.error('O dia escolhido já passou. Selecione outro dia.', 'Erro!');
		          break;

		          case 4:
		          toastr.error('O horário escolhido já passou ou acontecerá dentro desse horário, escolha algo acima do próximo horário.', 'Erro!');
		          break;

		          case 5:
		          toastr.error('Erro extra.', 'Erro!');
		          break;
		        }
		      }

	      $('.buttonEditProject').removeClass('hide-element');
	      $('.buttonSaveProject').addClass('hide-element');
	      $('.editProject input, .editProject textarea').attr('readonly', true);
	      }
	    }
	    $scope.loadProjectUser();
	    $scope.loadStatus();
// 			$scope.loadParticipantProject();
	  }
		if($location.path() == '/editProfile' || $location.path() == '/editProfile/' + $routeParams.id){
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
	        userRole: 3
	      }
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
		if($location.path() == '/edit' || $location.path() == '/edit/' + $routeParams.id){
			if($location.path() == '/edit/' + $routeParams.id){
				toastr.success('Altere sua senha abaixo', 'Sucesso!');
			}
			$scope.editarUsuarioAdministrador = function(){
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
	        userRole: 1
	      }
				$scope.httpEditUsuarioAdministrador(data);
			}
			$scope.httpEditUsuarioAdministrador = function(data){
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
// 							$route.reload();
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
		if($location.path() == '/' || $location.path() == '/register' || $location.path() == '/login' ||  $location.path() == '/support' || $location.path() == '/editSupport'){
		}else{
			$scope.pesquisarEmpresaProjeto = function(){
				var projectClient = '';
				var status = 1;
				var userId = $scope.user.id;
				$http({
						method : "GET",
						url : url+'company/pesquisarEmpresa?client='+projectClient+'&status='+status+'&userId='+userId,
				}).then(function mySucces(response) {
						if(response.data.auth){
							$scope.clients = response.data.data;
						}
				});
			}
			$scope.pesquisarEmpresaProjeto();
		}
	  if($location.path() == '/clients'){

	  $scope.novoCliente = function(){
	      var data = {
	        newNameClient:$('#newNameClient').val(),
	        newEmailClient:$('#newEmailClient').val(),
	        newTelefoneClient:$('#newTelefoneClient').val(),
	        idUser:$('#idUserClient').val(),
	        statusClient:1,
	      }
	      if(data.newNameClient == ''|| data.newEmailClient == '' || data.newTelefoneClient == ''){
	        $('.inputRequired').addClass('blankElement');
	        $('.blankLabel').removeClass('hide-element');
	      }else{
	        $('.inputRequired').removeClass('blankElement');
	        $('.blankLabel').addClass('hide-element');
	        $scope.httpNovoCliente(data);
	      }
	    }

	    $scope.httpNovoCliente = function(element){
	      $http({
	        method : "POST",
	        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	        url : url+'company/criarEmpresa',
	        data : element,
	      }).then(function mySucces(response) {
	           $('.body-table .table-users tbody tr').show();
	           $('.preloaderBody').addClass('hide-element');
	            var userResult = response.data;
	              if(userResult.auth){
	                  	$('#newNameClient').removeClass('existentField');
	                  	$('#newEmailClient').removeClass('existentField');
	                  	$('#newTelefoneClient').removeClass('existentField');
	                  	$('input').val('');
	      				toastr.success('Cliente criado com sucesso!', 'Perfeito!');
								location.reload();
	              }else{
	              	if(userResult.error == 1){
	      				      toastr.error('Esse cliente já existe em sua lista', 'Cliente Já existente');
  		            }else{
      				        toastr.error('Este e-mail já está vinculado à um cliente seu', 'E-mail já existente');
  		            }
	              }
	      }, function myError(response) {
				toastr.error('Erro ao criar usuário!', 'Erro!');
	      });
	    }

	    $scope.switchEmpresaStatus = function(element, element2){
	      var html = '';
	      if(element == 1){
	        html += '<div class="switch status">';
	        html += '<label>';
	        html += 'Inativo';
	        html += '<input onchange="setStatusClient(this);" value="'+element2+'" type="checkbox" checked="checked">';
	        html += '<span class="lever"></span>';
	        html += 'Ativo';
	        html += '</label>';
	        html += '</div>';
	      }else{
	        html += '<div class="switch status">';
	        html += '<label>';
	        html += 'Inativo';
	        html += '<input onchange="setStatusClient(this);" value="'+element2+'" type="checkbox">';
	        html += '<span class="lever"></span>';
	        html += 'Ativo';
	        html += '</label>';
	        html += '</div>';
	      }
	        return html;
	    }
			
	    $scope.openCreateClient = function(){
	      $('.formNewClient').toggle();
	    }

	    $scope.pesquisarEmpresa = function(){
	      var client = $('#clientSearch').val();
	      var status = 0;
	      var userId = $scope.user.id;
	      $('.body-table .table-users tbody tr').hide();
	      $('.preloaderBody').removeClass('hide-element');
	      $http({
	          method : "GET",
	          url : url+'company/pesquisarEmpresa?client='+client+'&status='+status+'&userId='+userId,
	      }).then(function mySucces(response) {
	            $('.body-table .table-users tbody tr').show();
	            $('.preloaderBody').addClass('hide-element');
	            var clientResult = response.data;
	              if(clientResult.auth){
	                console.log();
	                var html = '';
	                for (var i = 0; i < clientResult.data.length ; i++) {
	                      html += '<tr>';
	                      html += '<td scope="row">'+clientResult.data[i].id+'</td>';
	                      html += '<td>'+clientResult.data[i].nome+'</td>';
	                      html += '<td>'+clientResult.data[i].email+'</td>';
	                      html += '<td>'+clientResult.data[i].dataCadastro+'</td>';
	                      html += '<td>'+$scope.switchEmpresaStatus(clientResult.data[i].estado, clientResult.data[i].id)+'</td>';
	                      html += '<td>';
	                      html += '<button onclick="openEditClient('+clientResult.data[i].id+');" class="btn btn-sm btn-default waves-light waves-effect" data-toggle="modal" data-target="#clientModal" data-toggle="modal" data-target="#clientModal"><i class="fa fa-pencil"></i></button>';
	                      html += '</td>';
	                    html += '</tr>';
	                }
	                $('.body-table .table-users tbody').html(html);
	              }else{
	                $('.body-table .table-users tbody').html('Nenhum resultado encontrado');
	              }
	      }, function myError(response) {
	          // $scope.loginAccess = response.statusText;
	          // alert('erro');
	      });
	    }

	    $scope.editarEmpresa = function(){
	      var data = {
	        editNameClient:$('#editNameClient').val(),
	        editEmailClient:$('#editEmailClient').val(),
	        editTelefoneClient:$("#editTelefoneClient").val(),
	        idClient:$("#idClient").val(),
	        idUser: $scope.user.id,
	      }
	      if(data.editNameClient == '' || data.editEmailClient == ''){
	        $('.inputRequired').addClass('blankElement');
	        $('.blankLabel').removeClass('hide-element');
	      }else{
	        $('.inputRequired').removeClass('blankElement');
	        $('.blankLabel').addClass('hide-element');
	        $scope.httpEditarEmpresa(data);
	      }
	    }

	    $scope.httpEditarEmpresa = function(element){
	      $http({
	          method : "POST",
	          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	          url : url+'company/editarEmpresa',
	          data : element,
	      }).then(function mySucces(response) {
	           $('.body-table .table-users tbody tr').show();
	           $('.preloaderBody').addClass('hide-element');
	            var userResult = response.data;
              if(userResult.auth){
                toastr.success('Cliente editado com sucesso!', 'Successo');
							 	location.reload();
              }else{
								if(userResult.error == 1){
									toastr.warning('Uma empresa com o mesmo nome já existe!!', 'Ops!');
								}else{
									toastr.warning('Uma empresa com o mesmo email já existe!!', 'Ops!');
								}
              }
	      }, function myError(response) {
            toastr.danger('Erro ao editar cliente!', 'Erro');
	      });
	    }

	    $scope.pesquisarEmpresa();
	  }
	}
// 	Funcções JQuery
	function dadosRecovery(element){
	    $.ajax({
			method: "POST",
			url : url+'auth/loginRecuperacao',
			data:{
			    hash: element
			}
		})
		.done(function(response) {
			var statusResult = JSON.parse(response);
			if(statusResult.auth){
			    $scope.saveCookie(statusResult.data[0]);
// 					$location.path('/editProfile');
// 					window.location.replace('/tcc/app/#/editProfile');
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
			}
		});
	}
	function setStatusProject(element){
	  var confirm = window.confirm("Deseje mesmo alterar o estado do projeto?");
		if(confirm){
			console.log($(element + ' :selected').val());
			$.ajax({
				method: "POST",
				url : url+'project/alterarEstado',
				data:{
						id: $routeParams.id,
						estado: $(element + ' :selected').val()
				}
			})
			.done(function(response) {
				var statusResult = JSON.parse(response);
				if(statusResult.auth){
						toastr.success('Estado alterado com sucesso!', 'Sucesso!');
				}
				$scope.loadStatus();
				window.location = urlFront + "projects";
			});
		}else{
      location.reload();
    } 
  }
	// 	Refazer esses aqui em Angular
	function loadEvents(){
		var userId = $scope.user.id;
		var resultFinal;
		var dataResult;
		$.ajax({
			method: "POST",
			url : url+'event/carregarEventos',
			data: { userId: userId }
		})
		.done(function(response) {
			var resultResp = JSON.parse(response);
			if(resultResp.auth){
					dataResult = resultResp.data;
					var dateCompleted = [];
					for(var i = 0 ; i < Object.keys(dataResult).length ; i++){
							var dataInicioComp = resultResp.data[i].dataInicio;
							var dataEntregaComp = resultResp.data[i].dataTermino;

							var dataInicio = dataInicioComp.replace(' ', 'T');
							var dataTermino = dataEntregaComp.replace(' ', 'T');

							var arrayElement = {
								id: resultResp.data[i].id,
								title: resultResp.data[i].titulo,
								start: dataInicio,
								end: dataTermino,
								color: JSON.parse(resultResp.data[i].descricao).color,
								backgroundColor: JSON.parse(resultResp.data[i].descricao).backgroundColor,
								borderColor: JSON.parse(resultResp.data[i].descricao).borderColor,
								textColor: JSON.parse(resultResp.data[i].descricao).textColor
							};
							dateCompleted.push(arrayElement);
					}
        fullCalendar(dateCompleted);
			}
		});
	}
	function fullCalendar(elementArray){
		$('#avisoCalendario').addClass('hide-element');
		$('#calendar').fullCalendar({
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay,listWeek'
			},
			navLinks: true, // can click day/week names to navigate views
			editable: true,
			events: elementArray,
// 		events: loadEvents(),
			eventClick:  function(event, jsEvent, view) {
					var startdate = moment(event.start).format('DD-MM-YYYY');
					var starttime = moment(event.start).format('HH:mm:ss');
					var enddate = moment(event.end).format('DD-MM-YYYY');
					var endtime = moment(event.end).format('HH:mm:ss');
					var startdateSave = moment(event.start).format('YYYY-MM-DD');
					var enddateSave = moment(event.end).format('YYYY-MM-DD');
					$('#schenduleId').val(event.id);
					$('#editSchenduleTitle').val(event.title);
					$('#editSchenduleDateIn').val(startdate);
					$('#editSchenduleTimeIn').val(starttime);
					$('#editSchenduleDateOut').val(enddate);
					$('#editSchenduleTimeOut').val(endtime);
					$('#editHideSchenduleDateIn').val(startdate);
					$('#editHideSchenduleTimeIn').val(starttime);
					$('#editHideSchenduleDateOut').val(enddate);
					$('#editHideSchenduleTimeOut').val(endtime);
					$('#editSaveSchenduleDateIn').val(startdateSave);
					$('#editSaveSchenduleDateOut').val(enddateSave);
					$('#editSelectColor option[value="'+event.backgroundColor+'"]').attr('selected', 'selected');
					$('#editEventModal').modal();
        }
		});
		$('#submitButton').on('click', function(e){
			// We don't want this to act as a link so cancel the link action
			e.preventDefault();

			doSubmit();
		});

		function doSubmit(){
			$("#createEventModal").modal('hide');
			console.log($('#apptStartTime').val());
			console.log($('#apptEndTime').val());
			console.log($('#apptAllDay').val());
			alert("form submitted");

			$("#calendar").fullCalendar('renderEvent',
					{
							title: $('#patientName').val(),
							start: new Date($('#apptStartTime').val()),
							end: new Date($('#apptEndTime').val()),
							allDay: ($('#apptAllDay').val() == "true"),
					},
					true);
		 }
		$('#submitButton').on('click', function(e){
			// We don't want this to act as a link so cancel the link action
			e.preventDefault();

			doSubmit();
		});
	}
// 	Até Aqui
	
	function datesElements(element, element2){
		var today = new Date();
		$(element).pickadate({
				monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
				monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
				weekdaysFull: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
				weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
				// formatSubmit: 'dd/mm/yyyy',
				format: 'dddd, dd mmmm, yyyy',
				// Buttonsdo
				today: 'Hoje',
				clear: 'Limpar',
				close: 'Fechar',

				// Accessibility labels
				labelMonthNext: 'Próximo mês',
				labelMonthPrev: 'Mês anterioe',
				labelMonthSelect: 'Selecione um mês',
				labelYearSelect: 'Selecione um ano',
				min: true,
		});
		$(element2).pickatime({
			 darktheme: true
		});
	}
	function datesElements2(element, element2){
		var today = new Date();
		$(element).pickadate({
				monthsFull: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
				monthsShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
				weekdaysFull: ['Domingo', 'Segunda-Feira', 'Terça-Feira', 'Quarta-Feira', 'Quinta-Feira', 'Sexta-Feira', 'Sábado'],
				weekdaysShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
				// formatSubmit: 'dd/mm/yyyy',
				format: 'dddd, dd mmmm, yyyy',
				// Buttons
				today: 'Hoje',
				clear: 'Limpar',
				close: 'Fechar',

				// Accessibility labels
				labelMonthNext: 'Próximo mês',
				labelMonthPrev: 'Mês anterioe',
				labelMonthSelect: 'Selecione um mês',
				labelYearSelect: 'Selecione um ano',
		});
		$(element2).pickatime({
			 darktheme: true
		});
	}
}]);
