<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Event extends CI_Controller {

	function __construct(){
		parent::__construct();
	}

	public function index(){

	}

	public function carregarEventos(){
		$userId = $_POST['userId'];

		$this->load->library('evento');
		$this->evento->setUsuarioId($userId);
		$data = $this->evento->carregarEvento();
	
		echo json_encode($data);
	}
	public function criarEvento(){
		$data = json_decode(file_get_contents("php://input"));
		$this->load->library('evento');
		$color = $data->selectColor;
		$descricao = array(
			"color" => $color,
			"backgroundColor" => $color,
			"borderColor" => "#333",
			"textColor" => "#fff"
		);
		$descricao = json_encode($descricao);	
		
		$this->evento->setTitulo($data->schenduleTitle);
		$this->evento->setUsuarioId($data->userId);
		$this->evento->setDataInicio($data->dataInicio);
		$this->evento->setDataTermino($data->dataTermino);
		$this->evento->setDescricao($descricao);
		
		$data = $this->evento->criarEvento();
		
		echo json_encode($data);
	}	
	public function editarEvento(){
		$data = json_decode(file_get_contents("php://input"));
		$this->load->library('evento');
		$color = $data->selectColor;
		$descricao = array(
			"color" => $color,
			"backgroundColor" => $color,
			"borderColor" => "#333",
			"textColor" => "#fff"
		);
		$descricao = json_encode($descricao);	
		
		$this->evento->setId($data->schenduleId);
		$this->evento->setTitulo($data->schenduleTitle);
		$this->evento->setUsuarioId($data->userId);
		$this->evento->setDataInicio($data->dataInicio);
		$this->evento->setDataTermino($data->dataTermino);
		$this->evento->setDescricao($descricao);
		
		$data = $this->evento->editarEvento();
		
		echo json_encode($data);
	}
}