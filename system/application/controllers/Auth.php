<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Auth extends CI_Controller {

	function __construct(){
		parent::__construct();
	}

	public function index(){

	}
	public function login(){
		header('Access-Control-Allow-Origin: *');
		$data = json_decode(file_get_contents("php://input"));
		$this->load->library('autenticacao');
		$this->autenticacao->setEmail($data->email);
		$this->autenticacao->setSenha($data->senha);
		$data = $this->autenticacao->login();

		echo json_encode($data);
	}
	
	public function recuperarSenha(){
		$data = json_decode(file_get_contents("php://input"));
		
		$this->load->library('autenticacao');
		$this->autenticacao->setEmail($data->email);
		$data = $this->autenticacao->recuperarSenha(0, '', '');
		$html = $this->load->view('recuperarSenha', $data, true);
		$data = $this->autenticacao->recuperarSenha(1, $html, $data);
		
		echo json_encode($data);
	}
	
	public function loginRecuperacao(){
		$hash = $this->input->post('hash');

		$this->load->library('autenticacao');
		$this->autenticacao->setCodigoRecuperacao($hash);  
		$data = $this->autenticacao->loginRecuperacao();

		echo json_encode($data);
	}
}
