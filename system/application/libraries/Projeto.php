<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Projeto{

  private $CI, $id, $usuarioId, $empresaId, $titulo, $descricao, $dataCadastro, $dataEntrega, $estado;

  public function __construct(){
    $this->CI =& get_instance();
    $this->CI->load->library('email');
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

  public function setEmpresaId($empresaId){
    $this->empresaId = $empresaId;
  }
  public function getEmpresaId(){
    return $this->empresaId;
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

  public function setDataEntrega($dataEntrega = 'NOW()'){
    $this->dataEntrega = $dataEntrega;
  }
  public function getDataEntrega(){
    return $this->dataEntrega;
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

  // Funções de execução
  public function pesquisarProjeto(){
    if(is_null($this->titulo)){
      $query = $this->CI->db->query("SELECT * FROM `data__projeto` WHERE usuario_id = $this->usuarioId ORDER BY dataCadastro DESC");
      if($query->num_rows() > 0){
        return $data = array('data' => $query->result(), 'auth' => 1);
      }else{
        return $data = array('auth' => 0);
      }
    }else{
      if(is_numeric($this->titulo)){
        $query = $this->CI->db->query("SELECT * FROM `data__projeto` WHERE id = $this->titulo AND usuario_id = $this->usuarioId ORDER BY dataCadastro DESC");
      }
      else{
        $query = $this->CI->db->query("SELECT * FROM `data__projeto` WHERE titulo LIKE '%$this->titulo%' AND usuario_id = $this->usuarioId ORDER BY dataCadastro DESC");
      }
      if($query->num_rows() > 0){
        return $data = array('data' => $query->result(), 'auth' => 1);
      }else{
        return $data = array('auth' => 0);
      }
    }
  }

  public function pesquisarOutroProjeto(){
    if(is_null($this->titulo)){
      $sql = "SELECT * FROM `data__participante` as dpa INNER JOIN `data__projeto` as dpro ON dpa.projeto_id=dpro.id WHERE dpa.usuario_id = $this->usuarioId AND dpa.estado = 1 ORDER BY dataCadastro DESC";
      $query = $this->CI->db->query($sql);

      if($query->num_rows() > 0){
        return $data = array('data' => $query->result(), 'auth' => 1);
      }else{
        return $data = array('auth' => 0);
      }
    }else{
      if(is_numeric($this->titulo)){
        $sql = "SELECT * FROM `data__participante` as dpa INNER JOIN `data__projeto` as dpro ON dpa.projeto_id=dpro.id WHERE dpa.projeto_id = $this->titulo AND dpa.usuario_id = $this->usuarioId AND dpa.estado = 1 ORDER BY dataCadastro DESC";
        $query = $this->CI->db->query($sql);
      }
      else{
        $sql  ="SELECT * FROM `data__participante` as dpa INNER JOIN `data__projeto` as dpro ON dpa.projeto_id=dpro.id WHERE dpro.titulo LIKE '%$this->titulo%' AND dpa.usuario_id = $this->usuarioId AND dpa.estado = 1 ORDER BY dataCadastro DESC";
        $query = $this->CI->db->query($sql);
      }
      if($query->num_rows() > 0){
        return $data = array('data' => $query->result(), 'auth' => 1);
      }else{
        return $data = array('auth' => 0);
      }
    }
  }

  public function alterarEstado(){
    $query = $this->CI->db->query("UPDATE `data__projeto` SET estado = $this->estado WHERE id = $this->id;");
    if($this->CI->db->affected_rows() > 0){
      return $data = array('auth' => 1);
    }else{
      return $data = array('auth' => 0);
    }
  }

  public function criarProjeto(){
    $sql = "INSERT INTO `data__projeto` (`id`, `titulo`, `descricao`, `dataCadastro`, `dataEntrega`, `estado`, `usuario_id`, `empresa_id`)
    VALUES (DEFAULT,'$this->titulo', '$this->descricao', now(), '$this->dataEntrega', 1, $this->usuarioId, $this->empresaId)";

    $query = $this->CI->db->query($sql);
    if($query){
      $usuarioSql = "SELECT * FROM `data__usuario` WHERE id = $this->usuarioId";
      $usuarioQuery = $this->CI->db->query($usuarioSql);
      $usuarioResult = $usuarioQuery->result();
      // $this->CI->email->from('tcc@tiagoluizweb.com.br', 'Tiago Luiz - ' . $usuarioResult[0]->nome);
      // $this->CI->email->to($usuarioResult[0]->email);

      // $this->CI->email->subject('Novo projeto Criado');
      // $this->CI->email->message('Olá querido usuário '.$usuarioResult[0]->nome.'. um novo projeto com título ' . $this->titulo . ' foi criado por você em nosso sistema, para acessar utilize seu painel de controle.');
      // $this->CI->email->send();
      return $data = array(
        'auth' => 1
        );
    }else{
      return $data = array('auth' => 0);
    }
  }

  public function editarProjeto(){
    $sql = "UPDATE `data__projeto`
            SET `titulo` = '$this->titulo', `descricao` = '$this->descricao', `dataEntrega` = '$this->dataEntrega', `empresa_id` = $this->empresaId WHERE `id` = $this->id";

    $query = $this->CI->db->query($sql);
    if($query){
      return $data = array('auth' => 1);
    }else{
      return $data = array('auth' => 0);
    }
  }

  public function verificarProjeto(){
    $projetos = $this->CI->db->query("SELECT * FROM `data__projeto` WHERE `dataEntrega` < NOW()");
    
    if($projetos->num_rows() > 0){
      foreach ($projetos->result() as $projeto) {
        $totalTarefasAndamento = $this->CI->db->query("SELECT * FROM `data__tarefa` WHERE `projeto_id` = $projeto->id AND `estado` = 1");

        if($totalTarefasAndamento->num_rows() > 0){
          $estado = 5;
          $msg = 'Atrasado';
        }else{
          $estado = 3;
          $msg = 'Entregue';
        }
        $this->CI->db->query("UPDATE `data__projeto` SET `estado` = $estado WHERE `id` = $projeto->id");

        $usuario = $this->CI->db->query("SELECT * FROM `data__usuario` WHERE `id` = $projeto->usuario_id")->result();

        // $this->CI->email->from('tcc@tiagoluizweb.com.br', 'Tiago Luiz - ' . $participante);
        // $this->CI->email->to($usuario[0]->email);

        // $this->CI->email->subject('Estado do projeto alterado');
        // $this->CI->email->message('Olá querido ' . $usuario[0]->nomeUsuario . '. seu projeto '.$projeto->titulo.' acaba de ser alterado para o estado $msg');
        // $this->CI->email->send();
      }
      if($this->CI->db->affected_rows() > 0){
        return $data = array('auth' => 1);
      }else{
        return $data = array('auth' => 0);
      }
    }
  }
}
?>
