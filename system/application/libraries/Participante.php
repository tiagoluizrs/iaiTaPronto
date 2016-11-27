<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Participante{

  private $CI, $participante, $projetoId, $tarefaId;

  public function __construct(){
    $this->CI =& get_instance();
    $config = array (
      'smtp_user' => 'seu@email',
      'smtp_pass' => 'suasenha',
      'mailtype'  => 'html', 
      'charset'   => 'utf-8',
      'protocol' => 'smtp',
      'smtp_host' => 'ssl://smtp.googlemail.com',
      'smtp_port' => 465,
     );
    $this->CI->load->library('email', $config);
    $this->CI->email->set_newline("\r\n");
  }
  public function setProjetoId($projetoId){
    $this->projetoId = $projetoId;
  }
  public function getProjetoId(){
    return $this->projetoId;
  }
  public function setTarefaId($tarefaId){
    $this->tarefaId = $tarefaId;
  }
  public function getTarefaId(){
    return $this->tarefaId;
  }
  public function setParticipante($participante){
    $this->participante = $participante;
  }
  public function getParticipante(){
    return $this->participante;
  }


  public function removerParticipante(){
    $userSql = "SELECT * FROM data__usuario WHERE nomeUsuario = '$this->participante'";
    $queryUsuario = $this->CI->db->query($userSql);
    $usuarioResultado = $queryUsuario->result();
    
    $sql = "DELETE FROM `data__participante` WHERE usuario_id = ".$usuarioResultado[0]->id." AND projeto_id = $this->projetoId";

    $query = $this->CI->db->query($sql);
    if($this->CI->db->affected_rows() > 0){
      return $data = array('auth' => 1);
    }else{
      return $data = array('auth' => 0);
    }
  }

  public function convidarParticipante(){
    $usuarioExist = array();
    if(is_array($this->participante)){
      foreach($this->participante as $participante) {
        if($participante{0} == '@'){
          $nomeUsu = str_replace('@', '', $participante);
          $queryUsuario = $this->CI->db->query("SELECT * FROM data__usuario WHERE nomeUsuario = '".$nomeUsu."'");
          $usuarioResultado = $queryUsuario->result();

          $usuarioExist = $this->CI->db->query("SELECT * FROM data__participante as dp INNER JOIN data__usuario as du ON dp.usuario_id=du.id WHERE dp.usuario_id = " . $usuarioResultado[0]->id . " AND dp.projeto_id = " . $this->projetoId);

          if($usuarioExist->num_rows() > 0){
            array_push($usuarioExist, $usuarioResultado[0]->nomeUsuario);
          }else{
            $existResult = $usuarioExist->result();
            $query = $this->CI->db->query("INSERT INTO `data__participante`(`usuario_id`, `projeto_id`, `estado`) VALUES (".$usuarioResultado[0]->id.", $this->projetoId, DEFAULT)");
          }
        }else{
          $queryUsuario = $this->CI->db->query("SELECT * FROM data__usuario WHERE email = '$participante'");
          if($queryUsuario->num_rows() > 0){
            $usuarioResultado = $queryUsuario->result();

            $usuarioExist = $this->CI->db->query("SELECT * FROM data__participante as dp INNER JOIN data__usuario as du ON dp.usuario_id=du.id WHERE dp.usuario_id = " . $usuarioResultado[0]->id . " AND dp.projeto_id = " . $this->projetoId);

            if($usuarioExist->num_rows() > 0){
              array_push($usuarioExist, $usuarioResultado[0]->nomeUsuario);
            }else{
              $existResult = $usuarioExist->result();
              $query = $this->CI->db->query("INSERT INTO `data__participante`(`usuario_id`, `projeto_id`, `estado`) VALUES (".$usuarioResultado[0]->id.", $this->projetoId, DEFAULT)");
            }
          }else{
            $queryProject = $this->CI->db->query("SELECT * FROM data__projeto WHERE id = $this->projetoId");
            $projectResult = $queryProject->result();

            $this->CI->email->from('tiago@tiagoluizweb.com.br', 'Tiago Luiz - ' . $participante);
            $this->CI->email->to($participante);

            $this->CI->email->subject('Convite para projeto - ' . date("d-m-Y H:i:s"));
            $this->CI->email->message('Olá querido ' . $participante . '. Você recebeu um convite para parcitipar do projeto ' . $projectResult[0]->titulo . ', para isso você precisará se cadastrar em nosso sistema através do link ao lado. '.base_url().'app/#/register/' . $this->projetoId);
            $this->CI->email->send();
          }
        }
      }
    }else{
      $queryUsuario = $this->CI->db->query("SELECT * FROM data__usuario WHERE email = '$this->participante'");
      $usuarioResultado = $queryUsuario->result();
      $this->CI->db->query("INSERT INTO `data__participante`(`usuario_id`, `projeto_id`, `estado`) VALUES (".$usuarioResultado[0]->id.", $this->projetoId, DEFAULT)");
    }
    $usuarioExist;
    if(count($usuarioExist) == 0){
      return $data = array(
        'auth' => 1,
        'error' => 0,
      );
    }else{
      return $data = array(
        'auth' => 1,
        'error' => 1,
        'users' => $usuarioExist
      );
    }
  }

  public function pesquisarParticipante(){
    $sqlAtivo = "SELECT * FROM data__participante as dp INNER JOIN data__usuario as du ON dp.usuario_id=du.id WHERE dp.projeto_id = " . $this->projetoId . " AND dp.estado = 1 ORDER BY du.nome";
    $queryAtiva = $this->CI->db->query($sqlAtivo);
    
    $sqlInativo = "SELECT * FROM data__participante as dp INNER JOIN data__usuario as du ON dp.usuario_id=du.id WHERE dp.projeto_id = " . $this->projetoId . " AND dp.estado = 0 ORDER BY du.nome";
    $queryInativo = $this->CI->db->query($sqlInativo);

    if($queryAtiva->num_rows() > 0 || $queryInativo->num_rows() > 0){
      return $data = array(
        'dataAtivo' => $queryAtiva->result(), 
        'dataInativo' => $queryInativo->result(), 
        'auth' => 1
      );
    }else{
      return $data = array('auth' => 0);
    }
  }
  
  public function conviteProjetoPendente(){
    $userSql = "SELECT * FROM data__usuario WHERE nomeUsuario = '$this->participante'";
    $queryUsuario = $this->CI->db->query($userSql);
    $usuarioResultado = $queryUsuario->result();
    $sql = "SELECT * FROM data__participante as dp INNER JOIN data__usuario as du ON dp.usuario_id=du.id INNER JOIN data__projeto as dpr ON dp.projeto_id=dpr.id  WHERE dp.usuario_id = ".$usuarioResultado[0]->id." AND dp.estado = 0";
    
    $query = $this->CI->db->query($sql);
    if($query->num_rows() > 0){
      return $data = array(
        'data' => $query->result(), 
        'auth' => 1
      );
    }else{
      return $data = array('auth' => 0);
    }
  }
  
  public function aceitarProjeto(){
    $userSql = "SELECT * FROM data__usuario WHERE nomeUsuario = '$this->participante'";
    $queryUsuario = $this->CI->db->query($userSql);
    $usuarioResultado = $queryUsuario->result();
    
    $sql = "UPDATE data__participante SET estado = 1 WHERE usuario_id = ".$usuarioResultado[0]->id." AND projeto_id = $this->projetoId";

    $query = $this->CI->db->query($sql);
    if($this->CI->db->affected_rows() > 0){
      return $data = array('auth' => 1);
    }else{
      return $data = array('auth' => 0);
    }
  }
  public function rejeitarProjeto(){
    $userSql = "SELECT * FROM data__usuario WHERE nomeUsuario = '$this->participante'";
    $queryUsuario = $this->CI->db->query($userSql);
    $usuarioResultado = $queryUsuario->result();
    
    $sql = "DELETE FROM `data__participante` WHERE usuario_id = ".$usuarioResultado[0]->id." AND projeto_id = $this->projetoId";

    $query = $this->CI->db->query($sql);
    if($this->CI->db->affected_rows() > 0){
      return $data = array('auth' => 1);
    }else{
      return $data = array('auth' => 0);
    }
  }
  public function adicionarATarefa(){
    foreach($this->participante as $participante){
      $query = $this->CI->db->query("INSERT INTO `data__usuario_tarefa`(`usuario_id`, `tarefa_id`) VALUES ($participante, $this->tarefaId)");
    } 
    if($query){
      return $data = array('auth' => 1);
    }else{
      return $data = array('auth' => 0);
    }
  }
  public function removerDeTarefa(){
    $query = $this->CI->db->query("DELETE FROM `data__usuario_tarefa` WHERE `tarefa_id` = $this->tarefaId");
     
    if($this->CI->db->affected_rows() > 0){
      return $data = array('auth' => 1);
    }else{
      return $data = array('auth' => 0);
    }
  }
}
