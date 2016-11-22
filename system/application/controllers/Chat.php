<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Chat extends CI_Controller {

	function __construct(){
		parent::__construct();
	}

	public function index(){

	}
  
  public function criarConversa(){
		$this->load->library('conversa');
		$data = json_decode(file_get_contents("php://input"));
	 	$id = $data->id;
		$funcao = $data->roleUser;	
		if($funcao == 2){
			$this->conversa->setUsuarioId($id);
			$result = $this->conversa->criarConversaSuporte();
			echo json_encode($result);
		}else if($funcao == 3){
			$this->conversa->setUsuarioId($id);
			$result = $this->conversa->criarConversa();
			echo json_encode($result);
		}
  }
	public function usuariosConversa(){
		$this->load->library('conversa');
		
		$this->conversa->setUsuarioId($_GET['usuarioId']);
		$data = $this->conversa->usuariosConversa();
		echo json_encode($data);
	}
}