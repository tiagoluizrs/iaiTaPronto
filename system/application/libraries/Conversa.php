<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Conversa{

  private $CI, $id, $usuarioId, $titulo, $dataCadastro, $estado;

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
  public function setTitulo($titulo){
    $this->titulo = $titulo;
  }
  public function getTitulo(){
    return $this->titulo;
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
  public function criarConversa(){
    $sqlSuporte = "SELECT du.`id`, count(du.`id`) FROM `data__usuario_conversa` as duc INNER JOIN `data__conversa` as dc ON dc.`id`=duc.`conversa_id` INNER JOIN `data__usuario` as du ON du.`id`=duc.`usuario_id` WHERE du.`funcao` = 2 GROUP BY du.`id` ORDER BY count(du.`id`) ASC";
    $querySuporte = $this->CI->db->query($sqlSuporte);
    $resultSuport = $querySuporte->result();
    if($querySuporte->num_rows() > 0){
      $suporteId = $resultSuport[0]->id;
    }else{
      $sqlSuporte = "SELECT * FROM data__usuario WHERE funcao = 2 ORDER BY id LIMIT 1";
      $querySuporte = $this->CI->db->query($sqlSuporte);
      $resultSuport = $querySuporte->result();
      $suporteId = $resultSuport[0]->id;
    }
    $sql = "INSERT INTO `data__conversa`(`id`, `titulo`, `dataCadastro`, `estado`) VALUES (DEFAULT,'".md5(date('Y-m-d H:i:s'))."', now(), 1)";
    $query = $this->CI->db->query($sql);
    $conversaId = $this->CI->db->insert_id();

    $usariosId = array(
      $suporteId,
      $this->usuarioId
    );
    foreach($usariosId as $usuarioId){
      $query = $this->CI->db->query("INSERT INTO `data__usuario_conversa`(`conversa_id`, `usuario_id`) VALUES ($conversaId, $usuarioId);");
    }
  }
  public function criarConversaSuporte(){
    $this->CI->db->query("INSERT INTO `data__usuario_conversa`(`conversa_id`, `usuario_id`) VALUES (1, $this->usuarioId);");
  }
  public function usuariosConversa(){
    $sql = "SELECT	uc . *, du . nomeUsuario 
            FROM	data__usuario_conversa uc, 
                    (
                      SELECT	* 
                      FROM	`data__usuario_conversa` 
                WHERE	usuario_id = $this->usuarioId
              )b,
                    data__usuario du
            WHERE	(b.conversa_id = uc.conversa_id AND	b.usuario_id <> uc.usuario_id) AND du.id = uc.usuario_id;";
    
    $query = $this->CI->db->query($sql);
    if($query->num_rows() > 0){
      return $data = array('data' => $query->result(), 'auth' => 1);
    }else{
      return $data = array('auth' => 0);
    }
  }
}
?>
