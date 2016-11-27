<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Company extends CI_Controller {

	function __construct(){
		parent::__construct();
	}

	public function index(){

	}

	public function pesquisarEmpresa(){
		$client = $_GET['client'];
		$status = $_GET['status'];
		$userId = $_GET['userId'];

		$this->load->library('empresa');
		$this->empresa->setNome($client);
		$this->empresa->setEstado($status);
		$this->empresa->setUsuarioId($userId);
		$data = $this->empresa->pesquisarEmpresa();
	
		echo json_encode($data);
	}

	public function reativarEmpresa(){
		$id = $this->input->post('id');

		$this->load->library('empresa');
		$this->empresa->setId($id);
		$data = $this->empresa->reativarEmpresa();

		echo json_encode($data);
	}

	public function desativarEmpresa(){
		$id = $this->input->post('id');

		$this->load->library('empresa');
		$this->empresa->setId($id);
		$data = $this->empresa->desativarEmpresa();
	
		echo json_encode($data);
	}

	public function criarEmpresa(){
		$data = json_decode(file_get_contents("php://input"));
		$this->load->library('empresa');
		
		$this->empresa->setUsuarioId($data->idUser);
		$this->empresa->setNome($data->newNameClient);
		$this->empresa->setEmail($data->newEmailClient);
		$this->empresa->setTelefone($data->newTelefoneClient);
		$this->empresa->setEstado($data->statusClient);
		
		$data = $this->empresa->criarEmpresa(1);
		
		echo json_encode($data);
	}

	public function editarEmpresa(){
		$data = json_decode(file_get_contents("php://input"));
		$this->load->library('empresa');
		
		$this->empresa->setId($data->idClient);
		$this->empresa->setNome($data->editNameClient);
		$this->empresa->setEmail($data->editEmailClient);
		$this->empresa->setTelefone($data->editTelefoneClient);
		$this->empresa->setUsuarioId($data->idUser);
		
		$data = $this->empresa->editarEmpresa();
		
		echo json_encode($data);
	}
}
