<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Manutencao{

  private $CI, $estadoManutencao;

  public function __construct(){
    $this->CI =& get_instance();
  }
  public function setEstadoManutencao($estadoManutencao){
    $this->estadoManutencao = $estadoManutencao;
  }
  public function getEstadoManutencao(){
    return $this->estadoManutencao;
  }

  public function carregarManutencao(){
    $query = $this->CI->db->query("SELECT * FROM data__notificacao WHERE tipo = 1");
    $result = $query->result();
    
    if($query->num_rows()){
		return $data = array(
			'auth' => 1,
			'data' => $result
		);
    }else{
    	return $data = array(
    		'auth' => 0
		);
    }
  }
  public function desativarManutencao(){
    $query = $this->CI->db->query("UPDATE data__notificacao SET estado = $this->estadoManutencao WHERE id = 1");
    
    if($this->CI->db->affected_rows() > 0){
		return $data = array(
			'auth' => 1,
			'q' => "UPDATE data__notificacao SET estado = $this->estadoManutencao WHERE id = 1",
		);
    }else{
    	return $data = array(
    		'auth' => 0,
			'q' => "UPDATE data__notificacao SET estado = $this->estadoManutencao WHERE id = 1",
		);
    }
  }
  public function ativarManutencao(){
    $query = $this->CI->db->query("UPDATE data__notificacao SET estado = $this->estadoManutencao WHERE id = 1");
    
    if($this->CI->db->affected_rows() > 0){
		return $data = array(
			'auth' => 1,
			'q' => "UPDATE data__notificacao SET estado = $this->estadoManutencao WHERE id = 1",
		);
    }else{
    	return $data = array(
    		'auth' => 0,
			'q' => "UPDATE data__notificacao SET estado = $this->estadoManutencao WHERE id = 1",
		);
    }
  }
}
