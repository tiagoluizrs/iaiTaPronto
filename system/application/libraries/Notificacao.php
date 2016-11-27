<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Notificacao{

  private $CI, $conversa_id, $usuario_id, $tipo, $dataCadastro, $estado;

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
  public function setConversaId($conversa_id){
    $this->conversa_id = $conversa_id;
  }
  public function getConversaId(){
    return $this->conversa_id;
  } 
  public function setUsuarioId($usuario_id){
    $this->usuario_id = $usuario_id;
  }
  public function getUsuarioId(){
    return $this->usuario_id;
  }
  public function setTipo($tipo){
    $this->tipo = $tipo;
  }
  public function getTipo(){
    return $this->tipo;
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
  
  public function criarNotificacao(){
    $query = $this->CI->db->query("INSERT INTO `data__notificacao`(`id`, `tipo`, `dataCadastro`, `estado`) VALUES (DEFAULT, 2, NOW(), 1)");
    
    $notificacao = $this->CI->db->insert_id();
     
    $usuarios = $this->CI->db->query("SELECT * FROM  `data__usuario_conversa` duc JOIN  `data__usuario` du ON duc.usuario_id = du.id WHERE conversa_id =  $this->conversa_id")->result();
    
    foreach($usuarios as $usuario){
      $this->CI->db->query("INSERT INTO `data__usuario_notificacao`(`usuario_id`, `notificacao_id`) VALUES ($usuario->usuario_id, $notificacao)");
    }
    
    if($this->CI->db->affected_rows() > 0){
      return $data = array('auth' => 1);
    }else{
      return $data = array('auth' => 0);
    }
  }
  public function carregarNotificacao(){
    $sql = "SELECT	b.estado, COUNT( dun.usuario_id ) as count, dun . *, du . nomeUsuario, du . codigoConfirmacao FROM `data__usuario_notificacao` dun, ( SELECT * FROM `data__usuario_notificacao` dun JOIN `data__notificacao` dn ON dun.notificacao_id=dn.id WHERE usuario_id = $this->usuario_id)b, data__usuario du WHERE (b.notificacao_id = dun.notificacao_id AND b.usuario_id <> dun.usuario_id) AND (du.id = dun.usuario_id AND b.estado = 1)GROUP BY(dun.usuario_id);";
    $query = $this->CI->db->query($sql);
    if($query->num_rows() > 0){
      return $data = array(
        'auth' => 1,
        'data' => $query->result()
      );
    }else{
      return $data = array('auth' => 0);
    }
  }
  public function alterarEstado(){
    $resultadoUsuario = $this->CI->db->query("SELECT * FROM data__usuario WHERE codigoConfirmacao = '$this->usuario_id'")->result();
    
    $sql = "SELECT *
FROM `data__usuario_notificacao` dun
JOIN `data__notificacao` as dn
ON dun.notificacao_id=dn.id WHERE usuario_id = ".$resultadoUsuario[0]->id.";";
    $notificacoes = $this->CI->db->query($sql);
    foreach($notificacoes->result() as $notificacao){
      $this->CI->db->query("UPDATE `data__notificacao` SET estado = 0 WHERE id = $notificacao->notificacao_id");
    }
    if($this->CI->db->affected_rows() > 0){
      return $data = array('auth' => 1);
    }else{
      return $data = array('auth' => 0);
    }
  }
}
