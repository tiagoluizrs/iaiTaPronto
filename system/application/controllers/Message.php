<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Message extends CI_Controller {

	function __construct(){
		parent::__construct();
	}

	public function index(){

	}
	public function criarMensagem(){
		$data = json_decode(file_get_contents("php://input"));
		$this->load->library('mensagem');
		$this->mensagem->setUsuarioId($data->id);
		$this->mensagem->setAlias($data->alias);
		$this->mensagem->setMensagem($data->mensagem);
		
		$resultado = $this->mensagem->criarMensagem();
		
		if($resultado['auth'] == 1){
			$this->load->library('notificacao');
			$this->notificacao->setConversaId($resultado['conversa_id']);
			$this->notificacao->criarNotificacao();
		}
		
		echo json_encode($resultado);
	}
	public function criarMensagemSuporte(){
		$data = json_decode(file_get_contents("php://input"));
		$this->load->library('mensagem');
		$this->mensagem->setUsuarioId($data->id);
		$this->mensagem->setAlias($data->alias);
		$this->mensagem->setClienteId($data->usuarioChat);
		$this->mensagem->setMensagem($data->mensagem);
		$resultado = $this->mensagem->criarMensagemSuporte();
	
		echo json_encode($resultado);
	}	
	public function carregarMensagem(){
		$this->load->library('mensagem');
		$this->mensagem->setUsuarioId($_GET['id']);
		$resultado = $this->mensagem->carregarMensagem();
		echo json_encode($resultado);
	}
	public function carregarMensagemSuporte(){
		$this->load->library('mensagem');
		$this->mensagem->setUsuarioId($_GET['hash']);
		$resultado = $this->mensagem->carregarMensagemSuporte();
		echo json_encode($resultado);
	}	
}
