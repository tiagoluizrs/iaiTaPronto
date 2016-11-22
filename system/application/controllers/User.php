<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User extends CI_Controller {

	function __construct(){
		parent::__construct();
	}

	public function index(){

	}

	public function pesquisarUsuario(){
		$user = $_GET['user'];
		$id = $_GET['id'];

		$this->load->library('usuario');
		$this->usuario->setNomeUsuario($user);
		$this->usuario->setId($id);
		$data = $this->usuario->pesquisarUsuario();

		echo json_encode($data);
	}

	public function ativarUsuario(){
		$hash = $this->input->post('hash');

		$this->load->library('usuario');
		$this->usuario->setCodigoConfirmacao($hash);
		$data = $this->usuario->ativarUsuario();
		echo json_encode($data);
	}

	public function reativarUsuario(){
		$id = $this->input->post('id');

		$this->load->library('usuario');
		$this->usuario->setId($id);
		$data = $this->usuario->reativarUsuario();

		echo json_encode($data);
	}

	public function desativarUsuario(){
		$id = $this->input->post('id');
		
		$this->load->library('usuario');
		$this->usuario->setId($id);
		$data = $this->usuario->desativarUsuario();

		echo json_encode($data);
	}

	public function verificarCpf(){
		$data = json_decode(file_get_contents("php://input"));
		$this->load->library('usuario');
		$this->usuario->setCpf($data->cpf);
		$data = $this->usuario->verificarCpf();

		echo json_encode($data);
	}

	public function criarUsuario(){
		$data = json_decode(file_get_contents("php://input"));
		$this->load->library('usuario');
		$this->usuario->setNome($data->newNameUser);
		$this->usuario->setNomeUsuario($data->newUsuarioUser);
		$this->usuario->setEmail($data->newEmailUser);
		$this->usuario->setSenha($data->newPasswordUser);
		$this->usuario->setCpf($data->newCpfUser);
		$this->usuario->setFuncao($data->newRoleUser);
		$this->usuario->setEstado($data->statusUser);

		$dataResult = $this->usuario->criarUsuario();
		echo json_encode($dataResult);		
	}

	public function criarUsuarioRegister(){
		$data = json_decode(file_get_contents("php://input"));
		$this->load->library('usuario');

		$this->usuario->setNome($data->newNameUser);
		$this->usuario->setNomeUsuario($data->newUsuarioUser);
		$this->usuario->setEmail($data->newEmailUser);
		$this->usuario->setSenha($data->newPasswordUser);
		$this->usuario->setCpf($data->newCpfUser);
		$this->usuario->setFuncao($data->newRoleUser);
		$this->usuario->setEstado($data->statusUser);

		$dataResult = $this->usuario->criarUsuario();
		if($dataResult['auth'] == 1){
			$verData = $this->usuario->verificarEmail($dataResult['id']);
			if($data->newRoleUser == 3){
				$this->load->library('conversa');
				$this->conversa->setTitulo(md5(date('Y-m-d H:i:s')));
				$this->conversa->setUsuarioId($dataResult['id']);
				$this->conversa->criarConversa();
			}
			if($data->projetoId > 0){
				$this->load->library('participante');
				$this->participante->setProjetoId($data->projetoId);
				$this->participante->setParticipante($data->newEmailUser);
				$teste = $this->participante->convidarParticipante();
			}
		}
		echo json_encode($dataResult);

	}

	public function editarUsuario(){
		$data = json_decode(file_get_contents("php://input"));
		$this->load->library('usuario');
		$this->usuario->setId($data->idUser);
		$this->usuario->setNome($data->editNameUser);
		$this->usuario->setEmail($data->editEmailUser);
		$this->usuario->setNomeUsuario($data->editUsuarioUser);
		$this->usuario->setSenha($data->editPasswordUser);
		$this->usuario->setCodigoRecuperacao($data->editCode);
		$this->usuario->setFuncao($data->userRole);

		$data = $this->usuario->editarUsuario();

		echo json_encode($data);
	}
	public function buscarRelatorio(){
		$this->load->library('usuario');
		
		$token = $_GET['token'];
		$tipo = $_GET['type'];
		$dataInicio = $_GET['dataInicio'];
		$dataFinal = $_GET['dataFinal'];
		$periodo = $_GET['periodo'];
		$this->usuario->setCodigoRecuperacao($token);
		$data = $this->usuario->buscarRelatorio($tipo, $dataInicio, $dataFinal, $periodo);
		echo json_encode($data); 
	}
	public function gerarRelatorio(){
		$this->load->library('usuario');
		
		$token = $_GET['token'];
		$tipo = $_GET['type'];
		$dataInicio = $_GET['dataInicio'];
		$dataFinal = $_GET['dataFinal'];
		$periodo = $_GET['periodo'];
		
		$this->usuario->setCodigoRecuperacao($token);
		$data = $this->usuario->buscarRelatorio($tipo, $dataInicio, $dataFinal, $periodo);

		$content = '';
		switch($tipo){
			case 1:
			$relType = 'projetos';
			$title = 'Projetos';
			$header =  "<th style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>ID</th>
							<th style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>Título</th>
							<th style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>Descrição</th>
							<th style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>Data do Cadastro</th>
							<th style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>Data da Entrega</th>
							<th style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>Estado</th>";
							foreach($data['andamento'] as $andamento){
								$content.= "<tr style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$andamento->id</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$andamento->titulo</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$andamento->descricao</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$andamento->dataCadastro</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$andamento->dataEntrega</td>";
								$content.= "<td style='padding: 0 6px;background-color: #888888;'>Andamento</td>";
								$content.= "</tr>";
							}
							foreach($data['finalizado'] as $finalizado){
								$content.= "<tr style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$finalizado->id</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$finalizado->titulo</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$finalizado->descricao</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$finalizado->dataCadastro</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$finalizado->dataEntrega</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #b3b3b3;'>Finalizado</td>";
								$content.= "</tr>";
							}
							foreach($data['cancelado'] as $cancelado){
								$content.= "<tr style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$cancelado->id</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$cancelado->titulo</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$cancelado->descricao</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$cancelado->dataCadastro</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$cancelado->dataEntrega</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #636363;'>Cancelado</td>";
								$content.= "</tr>";
							}
							$total = "<tr style='border: 1px solid #000;text-align: left;padding: 15px;'>";
							$total.= "<tr style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'>Totais em Andamento</td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'>".count($data['andamento'])."</td>";
							$total.= "</tr>";
							$total.= "</tr>";
							$total.= "<tr style='border: 1px solid #000;text-align: left;padding: 15px;'>";
							$total.= "<tr style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'>Totais Finalizados</td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'>".count($data['finalizado'])."</td>";
							$total.= "</tr>";
							$total.= "</tr>";
							$total.= "<tr style='border: 1px solid #000;text-align: left;padding: 15px;'>";
							$total.= "<tr style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'>Totais Cancelados</td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'>".count($data['cancelado'])."</td>";
							$total.= "</tr>";
							$total.= "</tr>";
							$total.= "<tr style='border: 1px solid #000;text-align: left;padding: 15px;'>";
							$total.= "<tr style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'>Totais</td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'>".count($data['countReport'])."</td>";
							$total.= "</tr>";
							$total.= "</tr>";
			break;
			case 2:
			$relType = 'tarefas';
			$title = 'Tarefas';
			$header =  "<th style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>ID</th>
							<th style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>Título</th>
							<th style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>Descrição</th>
							<th style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>dataCadastro</th>
							<th style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>dataEntrega</th>
							<th style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>Estado</th>";
							foreach($data['ativa'] as $ativa){
								$content.= "<tr style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$ativa->id</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$ativa->titulo</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$ativa->descricao</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$ativa->dataCadastro</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$ativa->dataEntrega</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #888888;'>Ativo</td>";
								$content.= "</tr>";
							}
							foreach($data['inativa'] as $inativa){
								$content.= "<tr style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$inativa->id</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$inativa->titulo</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$inativa->descricao</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$inativa->dataCadastro</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$inativa->dataEntrega</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #b3b3b3;'>Inativo</td>";
								$content.= "</tr>";
							}
							$total = "<tr style='border: 1px solid #000;text-align: left;padding: 15px;'>";
							$total.= "<tr style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'>Totais Ativos</td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'>".count($data['ativa'])."</td>";
							$total.= "</tr>";
							$total.= "</tr>";
							$total.= "<tr style='border: 1px solid #000;text-align: left;padding: 15px;'>";
							$total.= "<tr style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'>Totais Inativos</td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'>".count($data['inativa'])."</td>";
							$total.= "</tr>";
							$total.= "</tr>";
							$total.= "<tr style='border: 1px solid #000;text-align: left;padding: 15px;'>";
							$total.= "<tr style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'>Totais</td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'>".count($data['countReport'])."</td>";
							$total.= "</tr>";
							$total.= "</tr>";
			break;
			case 3:
			$relType = 'empresas';
			$title = 'Empresas';
			$header =  "<th style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>ID</th>
								<th style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>Nome</th>
								<th style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>E-mail</th>
								<th style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>Telefone</th>
								<th style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>Data do Cadastro</th>
								<th style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>Estado</th>";
							foreach($data['ativa'] as $ativa){
								$content.= "<tr style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$ativa->id</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$ativa->nome</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$ativa->email</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$ativa->telefone</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$ativa->dataCadastro</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #888888;'>Ativo</td>";
								$content.= "</tr>";
							}
							foreach($data['inativa'] as $inativa){
								$content.= "<tr style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$inativa->id</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$inativa->nome</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$inativa->email</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$inativa->telefone</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #dddddd;'>$inativa->dataCadastro</td>";
								$content.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #b3b3b3;'>Inativo</td>";
								$content.= "</tr>";
							}
							$total = "<tr style='border: 1px solid #000;text-align: left;padding: 15px;'>";
							$total.= "<tr style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'>Totais Ativos</td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'>".count($data['ativa'])."</td>";
							$total.= "</tr>";
							$total.= "</tr>";
							$total.= "<tr style='border: 1px solid #000;text-align: left;padding: 15px;'>";
							$total.= "<tr style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'>Totais Inativos</td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'>".count($data['inativa'])."</td>";
							$total.= "</tr>";
							$total.= "</tr>";
							$total.= "<tr style='border: 1px solid #000;text-align: left;padding: 15px;'>";
							$total.= "<tr style='border: 1px solid #000;text-align: left;padding: 8px;height: 40px;'>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'></td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'>Totais</td>";
							$total.= "<td style='padding: 0 6px;border: #000 1px solid;background-color: #fff;'>".count($data['countReport'])."</td>";
							$total.= "</tr>";
							$total.= "</tr>";
			break;
		}
		$bgImageRandom = rand (1 , 2);
// 		date_default_timezone_set('America/Sao_Paulo');
		$imageBg = ($bgImageRandom > 1 ? 'http://hdimagesnew.com/wp-content/uploads/2015/11/HD-Business-Backgrounds-3.jpg' : 'http://www.pptback.com/uploads/business-stock%20market2-backgorunds-powerpoint.jpg');
		
		$pdfFilePath = "relatorio_".$relType.".pdf";
		
		$pdf = $this->usuario->gerarRelatorio();

		$paragrafo = "<body style='background-image: url($imageBg);background-position: center; background-size: 100% 100%;'>
										<p style=\"text-align:justify;line-height:150%\">
											<div style='text-align: center;'><img style='max-width: 300px; width: 100%; text-align:center' src='".base_url()."app/images/logo.png'></div>
											<span style='font-size: 12pt;line-height: 150%;font-family: Verdana, sans-serif;color: windowtext;text-align: center;width: 100%;float: left;'>
												Relatorio de $title - " . date("d/m/Y") . ' - ' . (date("H")) . date(":i:s") ."
											</span>
										</p>
									 <table style=' display: table; border-collapse: separate;border-spacing: 2px;border-color: grey; font-family: arial, sans-serif; border-collapse: collapse; width: 100%;'>
											<tr style='border: 1px solid #000;text-align: left;padding: 15px;'>
												$header
											</tr>
											<tr style='border: 1px solid #000;text-align: left;padding: 15px;'>
												$content
											</tr>
											$total
									</table>
									</body>";
		
// 		echo $paragrafo;exit;
		
		$pdf->WriteHTML($paragrafo);
		if($_GET['action'] == 2){
			$pdf->Output($pdfFilePath, "F"); 
		}if($_GET['action'] == 3){
			$pdf->Output($pdfFilePath, "D"); 
		} 
		$pdf->Output();  
	}
}
