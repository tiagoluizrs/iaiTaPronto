<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Mensagem{

  private $CI, $id, $conversaId, $usuarioId, $mensagem, $dataCadastro, $alias, $clienteId;

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
  public function setConversaId($conversaId){
    if(is_null($conversaId) || empty($conversaId) || $conversaId == ''){
      $this->conversaId = 'DEFAULT';
    }else{
      $this->conversaId = $conversaId;
    }
  }
  public function getConversaId(){
    return $this->conversaId;
  }

  public function setClienteId($clienteId){
    if(is_null($clienteId) || empty($clienteId) || $clienteId == ''){
      $this->clienteId = 'DEFAULT';
    }else{
      $this->clienteId = $clienteId;
    }
  }
  public function getClienteId(){
    return $this->clienteId;
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
  public function setMensagem($mensagem){
    $this->mensagem = $mensagem;
  }
  public function getMensagem(){
    return $this->mensagem;
  }
  public function setDataCadastro($dataCadastro = 'NOW()'){
    $this->dataCadastro = $dataCadastro;
  }
  public function getDataCadastro(){
    return $this->dataCadastro;
  }
  public function setAlias($alias){
    $this->alias = $alias;
  }
  public function getAlias(){
    return $this->alias;
  }
  public function criarMensagem(){
    $queryUsuario = $this->CI->db->query("SELECT * FROM data__usuario_conversa as dc INNER JOIN data__usuario as du ON du.id = dc.usuario_id WHERE dc.usuario_id = $this->usuarioId");
    $resultadoUsuario = $queryUsuario->result();
    $sql = "INSERT INTO `data__mensagem`(`id`, `mensagem`, `dataCadastro`, `conversa_id`, `usuario_id`, `alias`) VALUES (DEFAULT, '$this->mensagem', now(), " . $resultadoUsuario[0]->conversa_id . ", $this->usuarioId, '$this->alias')";
    $queryConversa = $this->CI->db->query($sql);
    if($queryConversa){
      return $data = array(
        'auth' => 1
      );
    }else{
      return $data = array(
        'auth' => 0
      );
    }
  }  
  public function criarMensagemSuporte(){
    $usuario = $this->CI->db->query("SELECT * FROM data__usuario WHERE codigoConfirmacao = '$this->clienteId'")->result();
    $queryUsuario = $this->CI->db->query("SELECT * FROM data__usuario_conversa as dc INNER JOIN data__usuario as du ON du.id = dc.usuario_id WHERE dc.usuario_id = ".$usuario[0]->id);

    $resultadoUsuario = $queryUsuario->result();
    $sql = "INSERT INTO `data__mensagem`(`id`, `mensagem`, `dataCadastro`, `conversa_id`, `usuario_id`, `alias`) VALUES (DEFAULT, '$this->mensagem', now(), " . $resultadoUsuario[0]->conversa_id . ", $this->usuarioId, '$this->alias')";
    $queryConversa = $this->CI->db->query($sql);
    if($queryConversa){
      return $data = array(
        'auth' => 1
      );
    }else{
      return $data = array(
        'auth' => 0
      );
    }
  }  
  public function carregarMensagem(){
    $queryUsuario = $this->CI->db->query("SELECT * FROM data__usuario_conversa as dc INNER JOIN data__usuario as du ON du.id = dc.usuario_id WHERE dc.usuario_id = $this->usuarioId");
    $resultadoUsuario = $queryUsuario->result();
      
    
    $innerJoin = "SELECT DISTINCT dm.* FROM data__usuario_conversa as duc 
      INNER JOIN data__usuario as du ON du.id = duc.usuario_id
      INNER JOIN data__conversa as dc ON dc.id=duc.conversa_id
      INNER JOIN data__mensagem as dm ON dm.conversa_id=duc.conversa_id WHERE duc.conversa_id = " . $resultadoUsuario[0]->conversa_id . " ORDER BY dm.dataCadastro ASC ";
    $mensagens = $this->CI->db->query($innerJoin);
    $resultadoMensagens = $mensagens->result();
    if($mensagens->num_rows() > 0){
      return $data = array(
        'auth' => 1,
        'messages' => $resultadoMensagens
      );
    }else{
      return $data = array(
        'auth' => 0
      );
    }
  }
  public function carregarMensagemSuporte(){
    $usuarioHash = $this->CI->db->query("SELECT * FROM data__usuario WHERE codigoConfirmacao = '$this->usuarioId'")->result();

    $queryUsuario = $this->CI->db->query("SELECT * FROM data__usuario_conversa as dc INNER JOIN data__usuario as du ON du.id = dc.usuario_id WHERE dc.usuario_id = ".$usuarioHash[0]->id);
    $resultadoUsuario = $queryUsuario->result();

    $innerJoin = "SELECT DISTINCT dm.* FROM data__usuario_conversa as duc 
      INNER JOIN data__usuario as du ON du.id = duc.usuario_id
      INNER JOIN data__conversa as dc ON dc.id=duc.conversa_id
      INNER JOIN data__mensagem as dm ON dm.conversa_id=duc.conversa_id WHERE duc.conversa_id = " . $resultadoUsuario[0]->conversa_id . " ORDER BY dm.dataCadastro ASC ";
    $mensagens = $this->CI->db->query($innerJoin);
    $resultadoMensagens = $mensagens->result();
    if($mensagens->num_rows() > 0){
      return $data = array(
        'auth' => 1,
        'messages' => $resultadoMensagens
      );
    }else{
      return $data = array(
        'auth' => 0
      );
    }
  }
}
?>
