<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Project extends CI_Controller {

	function __construct(){
		parent::__construct();
	}

	public function index(){

	}

	public function pesquisarProjeto(){
		$this->load->library('projeto');

		$userId = $_GET['userId'];
		if(isset($_GET['data'])){
			$data = $_GET['data'];
			$this->projeto->setTitulo($data);
		}

		$this->projeto->setUsuarioId($userId);
		$data = $this->projeto->pesquisarProjeto();

		echo json_encode($data);
	}

	public function pesquisarOutroProjeto(){
		$this->load->library('projeto');

		$userId = $_GET['userId'];
		if(isset($_GET['data'])){
			$data = $_GET['data'];
			$this->projeto->setTitulo($data);
		}

		$this->projeto->setUsuarioId($userId);
		$data = $this->projeto->pesquisarOutroProjeto();

		echo json_encode($data);
	}

	public function alterarEstado(){
		$id = $this->input->post('id');
		$estado = $this->input->post('estado');

		$this->load->library('projeto');
		$this->projeto->setId($id);
		$this->projeto->setEstado($estado);
		$data = $this->projeto->alterarEstado();

		echo json_encode($data);
	}

	public function criarProjeto(){
		$data = json_decode(file_get_contents("php://input"));
		$this->load->library('projeto');
		$sucesso;
		$userId = $data->data->userId;
		$projectClient = $data->data->projectClient;
		$newCliente = $data->data->newCliente;
		$userId = $data->data->userId;
		$projectTitle = $data->data->projectTitle;
		$projectDate = $data->data->projectDate;
		$projectDescription = $data->data->projectDescription;
			
		if($newCliente == 1){
			$this->load->library('empresa');
			$this->empresa->setUsuarioId($userId);
			$this->empresa->setNome($projectClient);
			$this->empresa->setEmail('');
			$this->empresa->setTelefone('');
			$this->empresa->setEstado(1);
		
			$data = $this->empresa->criarEmpresa();
			$sucesso = $data['auth'];
			if($sucesso){
				$this->projeto->setEmpresaId($data['id']);
			}
		}else{
			$this->projeto->setEmpresaId($projectClient);
			$sucesso = 1;
		}
			
		if($sucesso){
			$this->projeto->setUsuarioId($userId);
			$this->projeto->setTitulo($projectTitle);
			$this->projeto->setDataEntrega($projectDate);
			$this->projeto->setDescricao($projectDescription);

			$data = $this->projeto->criarProjeto(0, '', '');
			$html = $this->load->view('projetoCriado', $data, true);
			$data = $this->projeto->criarProjeto(1, $html, $data);
		}
			echo json_encode($data);
	}
// 	public function criarProjeto(){
// 		$data = json_decode(file_get_contents("php://input"));
// 		$this->load->library('projeto');
// 		$this->projeto->setEmpresaId($data->data->projectClient);
// 		$this->projeto->setUsuarioId($data->data->userId);
// 		$this->projeto->setTitulo($data->data->projectTitle);
// 		$this->projeto->setDataEntrega($data->data->projectDate);
// 		$this->projeto->setDescricao($data->data->projectDescription);

// 		$data = $this->projeto->criarProjeto();

// 		echo json_encode($data);
// 	}
	public function editarProjeto(){
		$data = json_decode(file_get_contents("php://input"));
		$this->load->library('projeto');

		$this->projeto->setId($data->data->projectId);
		$this->projeto->setEmpresaId($data->data->projectClientValue);
		$this->projeto->setUsuarioId($data->data->userId);
		$this->projeto->setTitulo($data->data->projectTitle);
		$this->projeto->setDataEntrega($data->data->projectDate);
		$this->projeto->setDescricao($data->data->projectDescription);

		$data = $this->projeto->editarProjeto();

		echo json_encode($data);
	}
	public function verificarProjeto(){
		$this->load->library('projeto');
		$html = $this->load->view('estadoProjetoAlterado', '', true);
		$data = $this->projeto->verificarProjeto($html);
		
		echo json_encode($data);
	}
}
