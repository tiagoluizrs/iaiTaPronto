<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Autenticacao{

  private $CI, $email, $senha, $codigoRecuperacao;

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

  // Encapsulamentos
  public function setEmail($email){
    $this->email = $email;
  }
  public function getEmail(){
    return $this->email;
  }
  public function setSenha($senha){
    $this->senha = $senha;
  }
  public function getSenha(){
    return $this->senha;
  }
  public function setCodigoRecuperacao($codigoRecuperacao){
    $this->codigoRecuperacao = $codigoRecuperacao;
  }
  public function getCodigoRecuperacao(){
    return $this->codigoRecuperacao;
  }

  // Funções de execução
  public function login(){
    $senha = md5($this->senha);
    $query = $this->CI->db->query("SELECT * FROM `data__usuario` WHERE (email = '$this->email' AND senha = '$senha') OR (nomeUsuario = '$this->email' AND senha = '$senha')");
    if($query->num_rows() > 0){
      $userResultado = $query->result();
      if($userResultado[0]->acesso == 0){
        $this->CI->db->query("UPDATE `data__usuario` SET acesso = 1 WHERE id = ". $userResultado[0]->id ."");
      }else{
        $this->CI->db->query("UPDATE `data__usuario` SET acesso = ".($userResultado[0]->acesso + 1)." WHERE id = ".$userResultado[0]->id."");
      }
      return $data = array('data' => $query->result(), 'auth' => true);
    }else{
      return $data = array('auth' => false, 'email' => $this->senha, 'senha' => $senha, 'senha2' => $this->senha);
    }
  }

  public function recuperarSenha($tipo, $html, $dataUsuario){
    if($tipo == 0){
      $query = $this->CI->db->query("SELECT * FROM `data__usuario` WHERE email = '$this->email'");
      $result = $query->result();
      $funcao = $result[0]->funcao;
      $path;
      if($funcao == 1){
        $path = 'edit';
      }else if($funcao == 2){
        $path = 'editSupport';
      }
      else if($funcao == 3){
        $path = 'editProfile';
      }
      return $data = array(
        'auth' => 1,
        'data' => $result[0],
        'path' => $path
      );
    }else if($tipo == 1){
      $dataUsuario = $dataUsuario['data'];
      $this->CI->email->set_mailtype("html");
      $this->CI->email->from('tiago@tiagoluizweb.com.br', 'Tiago Luiz - ' . $dataUsuario->nome);
      $this->CI->email->to($this->email);
      $this->CI->email->subject('Recuração de Senha - ' . date("d-m-Y H:i:s"));
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

  public function loginRecuperacao(){
    $query = $this->CI->db->query("SELECT * FROM `data__usuario` WHERE codigoRecuperacao = '$this->codigoRecuperacao'");

    if($query->num_rows() > 0){
      $userResultado = $query->result();

      return $data = array(
        'auth' => 1,
        'data' => $userResultado
      );
    }else{
      return $data = array('auth' => 0);
    }
  }
}
?>
