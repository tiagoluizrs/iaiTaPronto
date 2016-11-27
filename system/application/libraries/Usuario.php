<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Usuario{
  private $CI, $id, $nome, $email, $nomeUsuario, $senha, $dataCadastro, $cpf, $funcao, $estado, $codigoConfirmacao, $codigoRecuperacao, $tipoRelatorio;

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
    if(is_null($email) || empty($email) || $email == ''){
      $this->email = NULL;
    }else{
      $this->email = $email;
    }
  }
  public function getEmail(){
    return $this->email;
  }
  public function setNomeUsuario($nomeUsuario){
    if(is_null($nomeUsuario) || empty($nomeUsuario) || $nomeUsuario == ''){
      $this->nomeUsuario = NULL;
    }else{
      $this->nomeUsuario = $nomeUsuario;
    }
  }
  public function getNomeUsuario(){
    return $this->nomeUsuario;
  }
  public function setSenha($senha){
    if(is_null($senha) || empty($senha) || $senha == ''){
      $this->senha = NULL;
    }else{
      $this->senha = $senha;
    }
  }
  public function getSenha(){
    return $this->senha;
  }
  public function setCpf($cpf){
    if(is_null($cpf) || empty($cpf) || $cpf == ''){
      $this->cpf = NULL;
    }else{
      $this->cpf = $cpf;
    }
  }
  public function getCpf(){
    return $this->cpf;
  }
  public function setFuncao($funcao){
    if(is_null($funcao) || empty($funcao) || $funcao == ''){
      $this->funcao = NULL;
    }else{
      $this->funcao = $funcao;
    }
  }
  public function getFuncao(){
    return $this->funcao;
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
  public function setDataCadastro($dataCadastro = 'NOW()'){
    $this->dataCadastro = $dataCadastro;
  }
  public function getDataCadastro(){
    return $this->dataCadastro;
  }
  public function setCodigoConfirmacao($codigoConfirmacao){
    $this->codigoConfirmacao = $codigoConfirmacao;
  }
  public function getCodigoConfirmacao(){
    return $this->codigoConfirmacao;
  }
  public function setCodigoRecuperacao($codigoRecuperacao){
    $this->codigoRecuperacao = $codigoRecuperacao;
  }
  public function getCodigoRecuperacao(){
    return $this->codigoRecuperacao;
  }
  // Funções de execução
  public function pesquisarUsuario(){
    if(is_numeric($this->nomeUsuario)){
      $query = $this->CI->db->query("SELECT * FROM `data__usuario` WHERE id = $this->nomeUsuario AND id NOT IN ($this->id)");
    }
    else{
      $query = $this->CI->db->query("SELECT * FROM `data__usuario` WHERE (nome LIKE '%$this->nomeUsuario%' OR nomeUsuario LIKE '%$this->nomeUsuario%') AND (id NOT IN ($this->id))");
    }
    if($query->num_rows() > 0){
      return $data = array('data' => $query->result(), 'auth' => 1);
    }else{
      return $data = array('auth' => 0);
    }
  }

  public function ativarUsuario(){
    $query = $this->CI->db->query("UPDATE `data__usuario` SET estado = 1 WHERE codigoConfirmacao = '$this->codigoConfirmacao'");
    if($this->CI->db->affected_rows() > 0){
      $query = $this->CI->db->query("SELECT * FROM `data__usuario` WHERE codigoConfirmacao = '$this->codigoConfirmacao'");
      return $data = array(
        'auth' => 1,
        'data' => $query->result()
        );
    }else{
      return $data = array('auth' => 0);
    }
  }

  public function reativarUsuario(){
    $query = $this->CI->db->query("UPDATE `data__usuario` SET estado = 1 WHERE id = $this->id;");
    if($this->CI->db->affected_rows() > 0){
      return $data = array('auth' => 1);
    }else{
      return $data = array('auth' => 0);
    }
  }

  public function desativarUsuario(){
    $queryUser = $this->CI->db->query("SELECT * FROM `data__usuario` WHERE id = $this->id")->result();
    if($queryUser[0]->funcao == 2){
      $queryConversas = $this->CI->db->query("SELECT * FROM `data__usuario_conversa` WHERE usuario_id = $this->id AND conversa_id  NOT IN (1)")->result();
      
      $sqlSuporte = "SELECT du.`id`, du.`nomeUsuario`, count(du.`id`) FROM `data__usuario_conversa` as duc INNER JOIN `data__conversa` as dc ON dc.`id`=duc.`conversa_id` INNER JOIN `data__usuario` as du ON du.`id`=duc.`usuario_id` WHERE du.`funcao` = 2 AND du.`id` NOT IN ($this->id)GROUP BY du.`id` ORDER BY count(du.`id`) ASC";
      $querySuporte = $this->CI->db->query($sqlSuporte);
      $resultSuport = $querySuporte->result();
       
      $countSup = count($resultSuport);
      $countConv = count($queryConversas);
      
      if($countSup == $countConv || $countSup > $countConv){
        $i = 0;
        foreach($queryConversas as $conversa){
           $this->CI->db->query("UPDATE `data__usuario_conversa` SET usuario_id = ".$resultSuport[$i]->id." WHERE (conversa_id = $conversa->conversa_id AND conversa_id NOT  IN ( 1 )) AND usuario_id = $this->id");
          
           $this->CI->db->query("UPDATE `data__mensagem` SET usuario_id = ".$resultSuport[$i]->id.", alias = '".$resultSuport[$i]->nomeUsuario."' WHERE (conversa_id = $conversa->conversa_id AND conversa_id NOT  IN ( 1 )) AND usuario_id = $this->id");
          $i++;
        }
      }else{
        $i = 0;
        foreach($queryConversas as $conversa){
           $this->CI->db->query("UPDATE `data__usuario_conversa` SET usuario_id = ".$resultSuport[$i]->id." WHERE (conversa_id = $conversa->conversa_id AND conversa_id NOT  IN ( 1 )) AND usuario_id = $this->id");
          
          $this->CI->db->query("UPDATE `data__mensagem` SET usuario_id = ".$resultSuport[$i]->id.", alias = '".$resultSuport[$i]->nomeUsuario."' WHERE (conversa_id = $conversa->conversa_id AND conversa_id NOT  IN ( 1 )) AND usuario_id = $this->id");
          if($i < ($countSup - 1)){
            $i++;
          }else{
            $i = 0;
          }
        }
      }
    }else{
      $funcao = 'Outros';
    }
    
    $query = $this->CI->db->query("UPDATE `data__usuario` SET estado = 0 WHERE id = $this->id;");
    if($this->CI->db->affected_rows() > 0){
      return $data = array(
        'auth' => 1
      );
    }else{
      return $data = array(
        'auth' => 0
      );
    }
  }

  public function criarUsuario(){
    $codigoConfirmacao = md5(date("Y-m-d H:i:s").$this->senha);
    $codigoRecuperacao = md5(date("Y-m-d H:i:s").$this->senha.date("H:i:s Y-m-d").$this->senha);
    $senha = md5($this->senha);

    $sql = "INSERT INTO `data__usuario`
    (`id`, `nome`, `email`, `nomeUsuario`, `senha`, `dataCadastro`, `estado`, `cpf`, `codigoConfirmacao`, `codigoRecuperacao`, `funcao`)
    VALUES (DEFAULT,'$this->nome', '$this->email', '$this->nomeUsuario', '$senha', now(), $this->estado,
    '$this->cpf', '$codigoConfirmacao', '$codigoRecuperacao', $this->funcao)";

    $query = $this->CI->db->query("SELECT * FROM `data__usuario` WHERE email = '$this->email'");
    if($query->num_rows() > 0){
      return $data = array('auth' => 0, 'response' => 1);
    }else{
      $query = $this->CI->db->query("SELECT * FROM `data__usuario` WHERE nomeUsuario = '$this->nomeUsuario'");
      if($query->num_rows() > 0){
        return $data = array('auth' => 0, 'response' => 2);
      }else{
        $query = $this->CI->db->query("SELECT * FROM `data__usuario` WHERE cpf = '$this->cpf'");
        if($query->num_rows() > 0){
          return $data = array('auth' => 0, 'response' => 3);
        }else{
          $query = $this->CI->db->query($sql);
          if($query){
            return $data = array(
              'auth' => 1,
              'id' => $this->CI->db->insert_id(),
              'funcao' => $this->funcao
            );
          }else{
            return $data = array('auth' => 0);
          }
        }
      }
    }
  }

  public function editarUsuario(){
    $query = $this->CI->db->query("SELECT * FROM `data__usuario` WHERE senha = '$this->senha'");
    if($query->num_rows() > 0){
      $sql = "UPDATE `data__usuario`
            SET nome = '$this->nome', email = '$this->email', nomeUsuario = '$this->nomeUsuario', funcao = $this->funcao WHERE id = $this->id";
    }else{
      $sql = "UPDATE `data__usuario`
            SET nome = '$this->nome', email = '$this->email', nomeUsuario = '$this->nomeUsuario', senha = '".md5($this->senha)."', funcao = $this->funcao WHERE id = $this->id";
    }

    $query = $this->CI->db->query("SELECT * FROM `data__usuario` WHERE email = '$this->email' AND id NOT IN ($this->id)");
    if($query->num_rows() > 0){
      return $data = array('auth' => 0, 'response' => 1);
    }else{
      $query = $this->CI->db->query("SELECT * FROM `data__usuario` WHERE nomeUsuario = '$this->nomeUsuario' AND id NOT IN ($this->id)");
      if($query->num_rows() > 0){
        return $data = array('auth' => 0, 'response' => 2);
      }else{
        $query = $this->CI->db->query("SELECT * FROM `data__usuario` WHERE cpf = '$this->cpf'");
        if($query->num_rows() > 0){
          return $data = array('auth' => 0, 'response' => 3);
        }else{
          $query = $this->CI->db->query($sql);
          if($query){
            $query = $this->CI->db->query("SELECT * FROM `data__usuario` WHERE id = '$this->id'");
            return $data = array(
              'auth' => 1,
              'data' => $query->result());
          }else{
            return $data = array('auth' => 0);
          }
        }
      }
    }
  }

  public function verificarCpf(){
    // Verifica se um número foi informado
    if(empty($this->cpf)) {
        return $data = array('auth' => 0);
    }

    // Elimina possivel mascara
    $cpf = preg_replace("/\D+/", "", $this->cpf);

    //Verifica se o numero de digitos informados é igual a 11
    if (strlen($cpf) != 11) {
        return $data = array('auth' => 0);
    }
    // Verifica se nenhuma das sequências invalidas abaixo
    // foi digitada. Caso afirmativo, retorna falso
    else if ($cpf == '00000000000' ||
        $cpf == '11111111111' ||
        $cpf == '22222222222' ||
        $cpf == '33333333333' ||
        $cpf == '44444444444' ||
        $cpf == '55555555555' ||
        $cpf == '66666666666' ||
        $cpf == '77777777777' ||
        $cpf == '88888888888' ||
        $cpf == '99999999999') {
        return $data = array('auth' => 0);
    // Calcula os digitos verificadores para verificar se o
    // CPF é válido
    } else {

        for ($t = 9; $t < 11; $t++) {

            for ($d = 0, $c = 0; $c < $t; $c++) {
                $d += $cpf{$c} * (($t + 1) - $c);
            }
            $d = ((10 * $d) % 11) % 10;
            if ($cpf{$c} != $d) {
                return $data = array('auth' => 0);
            }
        }

        return $data = array('auth' => 1);
    }
  }
  public function verificarEmail($tipo, $id, $html){
    if($tipo == 0){
      $query = $this->CI->db->query("SELECT * FROM `data__usuario` WHERE id = $id");
      $userData[0] = $query->result();
      return $data = array(
        'data' => $userData[0],
      );
    }else if($tipo == 1){
      $this->CI->email->set_mailtype("html");
      $this->CI->email->from('tiago@tiagoluizweb.com.br', 'Tiago Luiz - ' . $this->nome);
      $this->CI->email->to($this->email);

      $this->CI->email->subject('Confirmação de E-mail - ' . date("d-m-Y H:i:s"));
      $this->CI->email->message($html);
      $this->CI->email->send();
      if(!$this->CI->email->send()) {
          return $data = array(
            'auth' => 0,
            'error' => 'ocorreu um erro durante o envio: ',
          );
      }else {
          return $data = array(
            'auth' => 1,
            'error' => 'Mensagem enviada com sucesso!',
          );
      }
    }
  }
  function buscarRelatorio($tipo, $dataInicio, $dataFinal, $periodo){
    if($periodo != '1'){
       if($tipo == 2){
         $bettwen = "AND (`tar`.dataCadastro BETWEEN '$dataInicio' AND '$dataFinal')";
       }else{
         $bettwen = "AND (dataCadastro BETWEEN '$dataInicio' AND '$dataFinal')";
       }
    }else{
       $bettwen = '';
    }
    $query_user = $this->CI->db->query("SELECT * FROM `data__usuario` WHERE codigoRecuperacao = '$this->codigoRecuperacao' AND estado = 1;");
    $userData = $query_user->result();
    if($tipo == 1){
      $query_and = $this->CI->db->query("SELECT * FROM `data__projeto` WHERE( usuario_id = ".$userData[0]->id." AND estado = 1) $bettwen;");
      $query_fin = $this->CI->db->query("SELECT * FROM `data__projeto` WHERE (usuario_id = ".$userData[0]->id." AND (estado = 2 OR estado = 3)) $bettwen;");
      $query_canc = $this->CI->db->query("SELECT * FROM `data__projeto` WHERE (usuario_id = ".$userData[0]->id." AND estado = 4) $bettwen;");
      $query_count = $this->CI->db->query("SELECT * FROM `data__projeto` WHERE (usuario_id = ".$userData[0]->id.") $bettwen;");
      if($query_count->num_rows() > 0){
        return $data = array(
          'auth' => 1,
          'andamento' => $query_and->result(),
          'finalizado' => $query_fin->result(),
          'cancelado' => $query_canc->result(),
          'countReport' => $query_count->result(),
        );
      }else{
        return $data = array(
          'auth' => 0,
        );
      }
    }
    if($tipo == 2){
      $query_ativa = $this->CI->db->query("SELECT * FROM `data__usuario_tarefa` as `utar`
      INNER JOIN `data__usuario` as `usu` ON `usu`.id = `utar`.usuario_id
      INNER JOIN `data__tarefa` as `tar` ON `tar`.id = `utar`.tarefa_id WHERE (`usu`.id = ".$userData[0]->id." AND `tar`.estado = 1) $bettwen;");
      $query_inativa = $this->CI->db->query("SELECT * FROM `data__usuario_tarefa` as `utar`
      INNER JOIN `data__usuario` as `usu` ON `usu`.id = `utar`.usuario_id
      INNER JOIN `data__tarefa` as `tar` ON `tar`.id = `utar`.tarefa_id WHERE (`usu`.id = ".$userData[0]->id." AND `tar`.estado = 0) $bettwen;");
      $query_count = $this->CI->db->query("SELECT * FROM `data__usuario_tarefa` as `utar`
      INNER JOIN `data__usuario` as `usu` ON `usu`.id = `utar`.usuario_id
      INNER JOIN `data__tarefa` as `tar` ON `tar`.id = `utar`.tarefa_id WHERE (`usu`.id = ".$userData[0]->id.") $bettwen;");
      if($query_count->num_rows() > 0){
        return $data = array(
          'auth' => 1,
          'ativa' => $query_ativa->result(),
          'inativa' => $query_inativa->result(),
          'countReport' => $query_count->result(),
        );
      }else{
        return $data = array(
          'auth' => 0,
        );
      }
    }
    if($tipo == 3){
      $query_ativa = $this->CI->db->query("SELECT * FROM `data__empresa` WHERE (usuario_id = ".$userData[0]->id." AND estado = 1) $bettwen;");
      $query_inativa = $this->CI->db->query("SELECT * FROM `data__empresa` WHERE (usuario_id = ".$userData[0]->id." AND estado = 0) $bettwen;");
      $query_count = $this->CI->db->query("SELECT * FROM `data__empresa` WHERE (usuario_id = ".$userData[0]->id.") $bettwen;");
      if($query_count->num_rows() > 0){
        return $data = array(
          'auth' => 1,
          'ativa' => $query_ativa->result(),
          'inativa' => $query_inativa->result(),
          'countReport' => $query_count->result(),
        );
      }else{
        return $data = array(
          'auth' => 0,
        );
      }
    }
  }
  function gerarRelatorio($param=NULL){
      include_once APPPATH.'/third_party/mpdf/mpdf.php';

      if ($params == NULL){
          $param = '"en-GB-x","A4","","",10,10,10,10,6,3';          
      }

      return new mPDF($param, 'A4-L');
  }
}
?>
