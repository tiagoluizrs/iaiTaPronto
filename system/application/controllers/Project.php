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
		$this->projeto->setEmpresaId($data->data->projectClient);
		$this->projeto->setUsuarioId($data->data->userId);
		$this->projeto->setTitulo($data->data->projectTitle);
		$this->projeto->setDataEntrega($data->data->projectDate);
		$this->projeto->setDescricao($data->data->projectDescription);

		$data = $this->projeto->criarProjeto();

		echo json_encode($data);
	}
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
}
