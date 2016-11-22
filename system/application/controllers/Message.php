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
		echo json_encode($resultado);
	}	
	public function carregarMensagem(){
		$this->load->library('mensagem');
		$this->mensagem->setUsuarioId($_GET['id']);
		$resultado = $this->mensagem->carregarMensagem();
		echo json_encode($resultado);
	}
	public function carregarMensagemSuporte(){
		echo json_encode($_GET['usuarioId']);
	}	
	public function usuariosChat(){
		
		
	}
}
