<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Evento{

  private $CI, $id, $usuarioId, $titulo, $descricao, $dataCadastro, $dataInicio, $dataTermino, $estado;

  public function __construct(){
    $this->CI =& get_instance();
  }
  public function setId($id){
    if(is_null($id) || empty($id) || $id == ''){
      $this->id = 'DEFAULT';
    }else{
      $this->id = $id;
    }
  }
  public function getId(){
    return $this->id;
  }
  public function setUsuarioId($usuarioId){
    $this->usuarioId = $usuarioId;
  }
  public function getUsuarioId(){
    return $this->usuarioId;
  }
  public function setTitulo($titulo){
    $this->titulo = $titulo;
  }
  public function getTitulo(){
    return $this->titulo;
  }
  public function setDescricao($descricao){
    $this->descricao = $descricao;
  }
  public function getDescricao(){
    return $this->descricao;
  }
  public function setDataCadastro($dataCadastro = 'NOW()'){
    $this->dataCadastro = $dataCadastro;
  }
  public function getDataCadastro(){
    return $this->dataCadastro;
  }
  public function setDataInicio($dataInicio = 'NOW()'){
    $this->dataInicio = $dataInicio;
  }
  public function getDataInicio(){
    return $this->dataInicio;
  }
  public function setDataTermino($dataTermino = 'NOW()'){
    $this->dataTermino = $dataTermino;
  }
  public function getDataTermino(){
    return $this->dataTermino;
  }
  public function setEstado($estado){
    if(is_null($estado) || empty($estado) || $estado == ''){
      $this->estado = 'DEFAULT';
    }else{
      $this->estado = $estado;
    }
  }
  public function getEstado(){
    return $this->estado;
  }
  
  public function carregarEvento(){
    $query = $this->CI->db->query("SELECT * FROM `data__evento` WHERE usuario_id = $this->usuarioId AND estado = 1");
    
    if($query->num_rows() > 0){
      return $data = array('data' => $query->result(), 'auth' => 1);
    }else{
      return $data = array('auth' => 0);
    }
  }
  public function criarEvento(){
    $sql = "INSERT INTO `data__evento` (`id`, `titulo`, `descricao`, `dataCadastro`, `dataInicio`, `dataTermino`, `estado`, `usuario_id`)
    VALUES (DEFAULT,'$this->titulo', '$this->descricao', now(), '$this->dataInicio', '$this->dataTermino', 1, $this->usuarioId)";

    $query = $this->CI->db->query($sql);
    if($query){
      return $data = array('auth' => 1);
    }else{
      return $data = array('auth' => 0);
    }
  }
  public function editarEvento(){
    $sql = "UPDATE `data__evento`
            SET `titulo` = '$this->titulo', `descricao` = '$this->descricao', `dataInicio` = '$this->dataInicio', `dataTermino` = '$this->dataTermino', `usuario_id` = $this->usuarioId WHERE `id` = $this->id";
    
    $query = $this->CI->db->query($sql);
    if($query){
      return $data = array('auth' => 1);
    }else{
      return $data = array('auth' => 0);
    }
  }
}