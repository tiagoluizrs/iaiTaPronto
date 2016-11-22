<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Participant extends CI_Controller {

	function __construct(){
		parent::__construct();
	}

	public function index(){

	}

	public function convidarParticipante(){
		$data = json_decode(file_get_contents("php://input"));
		$this->load->library('participante');
		$this->participante->setProjetoId($data->projetoId);
		$this->participante->setParticipante($data->participantes);

		$data = $this->participante->convidarParticipante();

		echo json_encode($data);
	}
	public function removerParticipante(){
		$data = json_decode(file_get_contents("php://input"));
		$this->load->library('participante');
		$this->participante->setProjetoId($data->projetoId);
		$this->participante->setParticipante($data->participante);

		$data = $this->participante->removerParticipante();

		echo json_encode($data);
	}
	public function pesquisarParticipante(){
		$projectId = $_GET['projectId'];
		$this->load->library('participante');
		$this->participante->setProjetoId($projectId);
		$data = $this->participante->pesquisarParticipante();

		echo json_encode($data);
	}
	public function conviteProjetoPendente(){
		$user = $_GET['user'];
		$this->load->library('participante');
		$this->participante->setParticipante($user);
		$data = $this->participante->conviteProjetoPendente();

		echo json_encode($data);
	}
	public function aceitarProjeto(){
		$data = json_decode(file_get_contents("php://input"));

		$this->load->library('participante');
		$this->participante->setProjetoId($data->projetoId);
		$this->participante->setParticipante($data->participante);

		$data = $this->participante->aceitarProjeto();

		echo json_encode($data);
	}
	public function rejeitarProjeto(){
		$data = json_decode(file_get_contents("php://input"));
		$this->load->library('participante');
		$this->participante->setProjetoId($data->projetoId);
		$this->participante->setParticipante($data->participante);

		$data = $this->participante->rejeitarProjeto();

		echo json_encode($data);
	}
}
