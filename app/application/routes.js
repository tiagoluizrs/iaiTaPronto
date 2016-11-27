angular.module('app').config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      title : 'Login',
      templateUrl: 'views/login.html',
      controller: 'loginController'
    })
    .when('/login', {
      title : 'Login',
      templateUrl: 'views/login.html',
      controller: 'loginController'
    })
    .when('/register', {
      title : 'Cadastro',
      templateUrl: 'views/user/register.html',
      controller: 'registerController'
    })
    .when('/register/:id', {
      title : 'Cadastro',
      templateUrl: 'views/user/register.html',
      controller: 'registerController'
    })
    .when('/confirmarEmail/:id', {
      title : 'Confirmar Email',
      templateUrl: 'views/user/confirmarEmail.html',
      controller: 'mainController'
    })
    .when('/inexistentProject', {
      title : 'Projeto Inexistente',
      templateUrl: 'views/user/inexistentProject.html',
      controller: 'mainController'
    })
    .when('/inexistentParticipantProject', {
      title : 'Projeto que participo Inexistente',
      templateUrl: 'views/user/inexistentParticipantProject.html',
      controller: 'mainController'
    })
    .when('/editProfile', {
      title : 'Editar Perfil',
      templateUrl: 'views/user/editProfile.html',
      controller: 'mainController'
    })
    .when('/editProfile/:id', {
      title : 'Recuperar Conta (Editar Conta)',
      templateUrl: 'views/user/editProfile.html',
      controller: 'mainController'
    })
    .when('/edit', {
      title : 'Editar Perfil',
      templateUrl: 'views/admin/edit.html',
      controller: 'mainController'
    })
    .when('/edit/:id', {
      title : 'Recuperar Conta (Editar Conta)',
      templateUrl: 'views/user/editProfile.html',
      controller: 'mainController'
    })
    .when('/panel', {
      title : 'Painel Principal',
      templateUrl: 'views/user/panel.html',
      controller: 'mainController'
    })
    .when('/projects', {
      title : 'Meus Projetos',
      templateUrl: 'views/user/projects.html',
      controller: 'mainController'
    })
    .when('/project/:id', {
      title : 'Meu Projeto',
      templateUrl: 'views/user/project.html',
      controller: 'mainController'
    })
    .when('/otherProjects', {
      title : 'Projetos que participo',
      templateUrl: 'views/user/otherProjects.html',
      controller: 'mainController'
    })
    .when('/otherProject/:id', {
      title : 'Projeto que participo',
      templateUrl: 'views/user/otherProject.html',
      controller: 'mainController'
    })
    .when('/reports', {
      title : 'Relatórios',
      templateUrl: 'views/user/reports.html',
      controller: 'mainController'
    })
    .when('/clients', {
      title : 'Empresas',
      templateUrl: 'views/user/clients.html',
      controller: 'mainController'
    })
    .when('/schendule', {
      title : 'Agenda',
      templateUrl: 'views/user/schendule.html',
      controller: 'mainController'
    })
    .when('/admin', {
      title : 'Administração',
      templateUrl: 'views/admin/admin.html',
      controller: 'mainController'
    })
    .when('/adminReports', {
      title : 'Relatórios de Administração',
      templateUrl: 'views/admin/adminReports.html',
      controller: 'mainController'
    })
    .when('/users', {
      title : 'Usuários',
      templateUrl: 'views/admin/users.html',
      controller: 'mainController'
    })
    .when('/support', {
      title : 'Suporte',
      templateUrl: 'views/support/suporte.html',
      controller: 'supController'
    })
    .when('/support/:id', {
      title : 'Suporte',
      templateUrl: 'views/support/suporteId.html',
      controller: 'supController'
    })
    .when('/editSupport', {
      title : 'Editar Perfil',
      templateUrl: 'views/support/edit.html',
      controller: 'supController'
    })
    .when('/editSupport/:id', {
      title : 'Recuperar Conta (Editar Conta)',
      templateUrl: 'views/user/editProfile.html',
      controller: 'mainController'
    })
    .when('/404', {
      title : 'Página não encontrada',
      templateUrl: 'views/404.html',
      controller: 'mainController'
    })
    .otherwise({
      redirectTo: '/404',
    })

}]);
