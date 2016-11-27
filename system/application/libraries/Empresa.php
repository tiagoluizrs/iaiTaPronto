<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Empresa{

  private $CI, $id, $usuarioId, $nome, $email, $telefone, $dataCadastro, $estado;

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
    if(is_null($usuarioId) || empty($usuarioId) || $usuarioId == ''){
      $this->usuarioId = 'DEFAULT';
    }else{
      $this->usuarioId = $usuarioId;
    }
  }
  public function getUsuarioId(){
    return $this->usuarioId;
  }
  public function setNome($nome){
    if(is_null($nome) || empty($nome) || $nome == ''){
      $this->nome = NULL;
    }else{
      $this->nome = $nome;
    }
  }
  public function getNome(){
    return $this->nome;
  }
  public function setEmail($email){
    if(is_null($email) || empty($email) || $email == '' || $email == 'NULL'){
      $this->email = 'NULL';
    }else{
      $this->email = $email;
    }
  }
  public function getEmail(){
    return $this->email;
  }
  public function setTelefone($telefone){
    if(is_null($telefone) || empty($telefone) || $telefone == '' || $telefone == 'NULL'){
      $this->telefone = 'NULL';
    }else{
      $this->telefone = $telefone;
    }
  }
  public function getTelefone(){
    return $this->telefone;
  }  
  public function setDataCadastro($dataCadastro = 'NOW()'){
    $this->dataCadastro = $dataCadastro;
  }
  public function getDataCadastro(){
    return $this->dataCadastro;
  }
  public function setEstado($estado){
    $this->estado = $estado;
  }
  public function getEstado(){
    return $this->estado;
  }

  // Funções de execução
  public function pesquisarEmpresa(){
    if($this->estado == 1){
      if(is_numeric($this->nome)){
        $query = $this->CI->db->query("SELECT * FROM `data__empresa` WHERE id = $this->nome AND estado = 1 AND usuario_id = $this->usuarioId ORDER BY nome ASC");
      }
      else{
        $query = $this->CI->db->query("SELECT * FROM `data__empresa` WHERE nome LIKE '%$this->nome%' AND estado =1 AND usuario_id = $this->usuarioId ORDER BY nome ASC");
      }
    }else{
      if(is_numeric($this->nome)){
        $query = $this->CI->db->query("SELECT * FROM `data__empresa` WHERE id = $this->nome AND usuario_id = $this->usuarioId ORDER BY nome ASC");
      }
      else{
        $query = $this->CI->db->query("SELECT * FROM `data__empresa` WHERE nome LIKE '%$this->nome%' AND usuario_id = $this->usuarioId ORDER BY nome ASC");
      }
    }
    
    if($query->num_rows() > 0){
      return $data = array('data' => $query->result(), 'auth' => 1);
    }else{
      return $data = array('auth' => 0);
    }
  }

  public function reativarEmpresa(){
    $query = $this->CI->db->query("UPDATE `data__empresa` SET estado = 1 WHERE id = $this->id;");
    
    $query = $this->CI->db->query("UPDATE `data__projeto` SET estado = 1 WHERE empresa_id = $this->id;");
    
    if($this->CI->db->affected_rows() > 0){
      return $data = array('auth' => 1);
    }else{
      return $data = array('auth' => 0);
    }
  }
  public function desativarEmpresa(){
    $query = $this->CI->db->query("UPDATE `data__empresa` SET estado = 0 WHERE id = $this->id;");
    
    $query = $this->CI->db->query("UPDATE `data__projeto` SET estado = 0 WHERE empresa_id = $this->id;");
    
    if($this->CI->db->affected_rows() > 0){
      return $data = array('auth' => 1);
    }else{
      return $data = array('auth' => 0);
    }
  }

  public function criarEmpresa(){
      $query = $this->CI->db->query("SELECT * FROM `data__empresa` WHERE nome = '$this->nome' AND usuario_id = $this->usuarioId");
      if($query->num_rows() > 0){
        return $data = array(
          'auth' => 0,
          'error' => 1
        );
      }else{
        $sql = "INSERT INTO `data__empresa`
            (`id`, `nome`, `email`, `dataCadastro`, `estado`, `telefone`, `usuario_id`) 
            VALUES (DEFAULT, '$this->nome', '$this->email', now(), $this->estado, '$this->telefone', '$this->usuarioId')";

          $query = $this->CI->db->query($sql);
          if($query){
            return $data = array(
              'auth' => 1,
              'id' => $this->CI->db->insert_id()
              );
          }else{
            return $data = array('auth' => 0);
          }
      }
  }

  public function editarEmpresa(){
    $query = $this->CI->db->query("SELECT * FROM `data__empresa` WHERE (nome = '$this->nome' AND usuario_id = $this->usuarioId) AND (id NOT IN ($this->id))");
      if($query->num_rows() > 0){
        return $data = array(
          'auth' => 0,
          'error' => 1
        );
      }else{
        $query = $this->CI->db->query("SELECT * FROM `data__empresa` WHERE (email = '$this->email' AND usuario_id = $this->usuarioId) AND (id NOT IN ($this->id))");
        if($query->num_rows() > 0){
          return $data = array(
            'auth' => 0,
            'error' => 2
          );
        }else{
          $sql = "UPDATE `data__empresa` SET nome = '$this->nome', email = '$this->email', telefone = '$this->telefone' WHERE id = $this->id";
    
          $query = $this->CI->db->query($sql);
          if($query){
            return $data = array('auth' => 1);
          }else{
            return $data = array('auth' => 0);
          }
        }
      }
  }
}
?>
