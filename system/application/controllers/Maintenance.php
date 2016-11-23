<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Maintenance extends CI_Controller {

	function __construct(){
		parent::__construct();
	}

	public function index(){

	}
	// public function convidarParticipante(){
	// 	$data = json_decode(file_get_contents("php://input"));
	// 	$this->load->library('participante');
	// 	$this->participante->setProjetoId($data->projetoId);
	// 	$this->participante->setParticipante($data->participantes);

	// 	$data = $this->participante->convidarParticipante();

	// 	echo json_encode($data);
	// }
	public function carregarManutencao(){
		$this->load->library('manutencao');
		$data = $this->manutencao->carregarManutencao();

		echo json_encode($data);
	}
	public function ativarManutencao(){
		$this->load->library('manutencao');
		$data = $this->manutencao->setEstadoManutencao(1);
		$data = $this->manutencao->ativarManutencao();

		echo json_encode($data);
	}
	public function desativarManutencao(){
		$this->load->library('manutencao');
		$data = $this->manutencao->setEstadoManutencao(0);
		$data = $this->manutencao->desativarManutencao();

		echo json_encode($data);
	}
}
