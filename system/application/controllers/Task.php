<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Task extends CI_Controller {

	function __construct(){
		parent::__construct();
	}

	public function index(){

	}

	public function criarTarefa(){
		$dataTarefa;
		$data = json_decode(file_get_contents("php://input"));
		$this->load->library('tarefa');
		$this->tarefa->setProjetoId($data->data->projectId);
		$this->tarefa->setUsuarioId($data->data->participantsId);
		$this->tarefa->setTitulo($data->data->taskTitle);
		$this->tarefa->setDataEntrega($data->data->taskDate);
		$this->tarefa->setDescricao($data->data->taskDescription);
   
		$dataTarefa = $this->tarefa->criarTarefa();
    
		$this->load->library('participante');
    $this->participante->setTarefaId($dataTarefa['tarefaId']);
    $this->participante->setParticipante($data->data->participantsId);
		$dataParticipante = $this->participante->adicionarATarefa();

    if($dataParticipante['auth']){
		  $this->tarefa->setTarefaId($dataTarefa['tarefaId']);
			$this->tarefa->setUsuarioId($data->data->participantsId);
			$this->tarefa->setProjetoId($data->data->projectId);
      $dataTarefa = $this->tarefa->enviarNotificacao();
    }
		echo json_encode($dataTarefa);
	}
	public function pesquisarTarefa(){
		$projetoId = $_GET['projetoId'];

		$this->load->library('tarefa');
		$this->tarefa->setProjetoId($projetoId);
		$dataTarefa = $this->tarefa->pesquisarTarefa();
		echo json_encode($dataTarefa);
	}
}
