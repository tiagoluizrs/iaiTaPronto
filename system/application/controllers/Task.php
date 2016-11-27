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
		$this->tarefa->setTitulo($data->data->taskTitle);
		$this->tarefa->setDataEntrega($data->data->taskDate);
		$this->tarefa->setDescricao($data->data->taskDescription);
   
		$dataTarefa = $this->tarefa->criarTarefa();
    
		$this->load->library('participante');
    $this->participante->setTarefaId($dataTarefa['tarefaId']);
    $this->participante->setParticipante($data->data->participantsId);
		$dataParticipante = $this->participante->adicionarATarefa();

    if($dataParticipante['auth']){
		  $this->tarefa->setId($dataTarefa['tarefaId']);
			$this->tarefa->setUsuarioId($data->data->participantsId);
			$this->tarefa->setProjetoId($data->data->projectId);
			
			$html = $this->load->view('tarefaCriada', '', true);
      		$dataTarefa = $this->tarefa->enviarNotificacao($html, 'Nova tarefa criada');
    }
		echo json_encode($dataTarefa);
	}
	public function pesquisarTarefas(){
		$projetoId = $_GET['projetoId'];

		$this->load->library('tarefa');
		$this->tarefa->setProjetoId($projetoId);
		$dataTarefa = $this->tarefa->pesquisarTarefa(1);
		echo json_encode($dataTarefa);
	}
	public function pesquisarOutroProjetoTarefa(){
		$tarefaId = $_GET['tarefaId'];

		$this->load->library('tarefa');
		$this->tarefa->setId($tarefaId);
		$dataTarefa = $this->tarefa->pesquisarTarefa(2);
		echo json_encode($dataTarefa);
	}	
	public function pesquisarProjetoTarefa(){
		$tarefaId = $_GET['tarefaId'];

		$this->load->library('tarefa');
		$this->tarefa->setId($tarefaId);
		$dataTarefa = $this->tarefa->pesquisarTarefa(3);
		echo json_encode($dataTarefa);
	}
	public function carregarTarefas(){
		$usuarioId = $_GET['usuarioId'];
		$projetoId = $_GET['projetoId'];

		$this->load->library('tarefa');
		$this->tarefa->setUsuarioId($usuarioId);
		$this->tarefa->setProjetoId($projetoId);
		$dataTarefa = $this->tarefa->carregarTarefa(1);
		echo json_encode($dataTarefa);
	}
	public function alterarEstado(){
		$id = $this->input->post('id');
		$estado = $this->input->post('estado');

		$this->load->library('tarefa');
		$this->tarefa->setId($id);
		$this->tarefa->setEstado($estado);
		$data = $this->tarefa->alterarEstado();
	
		echo json_encode($data);
	}
	public function editarTarefa(){
		$data = json_decode(file_get_contents("php://input"));
		$this->load->library('tarefa');
		
		$this->tarefa->setId($data->tarefaId);
		$this->tarefa->setUsuarioId($data->participantsId);
		$this->tarefa->setTitulo($data->titulo);
		$this->tarefa->setDataEntrega($data->dataEntrega);
		$this->tarefa->setDescricao($data->descricao);

		$dataTarefa = $this->tarefa->editarTarefa();
		
		$this->load->library('participante');
		$this->participante->setTarefaId($data->tarefaId);
		$this->participante->removerDeTarefa();
		
	    $this->participante->setTarefaId($data->tarefaId);
	    $this->participante->setParticipante($data->participantsId);
		$dataParticipante = $this->participante->adicionarATarefa();

	    if($dataParticipante['auth']){
		  	$this->tarefa->setId($data->tarefaId);
			$this->tarefa->setUsuarioId($data->participantsId);
			$this->tarefa->setProjetoId($data->projectId);
	        $html = $this->load->view('tarefaEditada', '', true);
      		$dataTarefa = $this->tarefa->enviarNotificacao($html, 'Tarefa Editada');
	    }
		echo json_encode($dataTarefa);
	}
}
