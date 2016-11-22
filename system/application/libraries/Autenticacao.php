<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Autenticacao{

  private $CI, $email, $senha, $codigoRecuperacao;

  public function __construct(){
    $this->CI =& get_instance();
    $this->CI->load->library('email');
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

  public function recuperarSenha(){
    $query = $this->CI->db->query("SELECT * FROM `data__usuario` WHERE email = '$this->email'");
    $userData = $query->result();
    $path;
    if($userData[0]->funcao == 1){
      $path = 'edit';
    }else if($userData[0]->funcao == 2){
      $path = 'editSupport';
    }
    else{
      $path = 'editProfile';
    }
    $this->CI->email->from('tcc@tiagoluizweb.com.br', 'Tiago Luiz - ' . $userData[0]->nome);
    $this->CI->email->to($this->email);

    $this->CI->email->subject('Recuração de Senha');
    $this->CI->email->message('Olá querido usuário '.$userData[0]->nome.'. Para prosseguir e mudar su senha clique no link ao lado '.base_url().'app/#/'.$path.'/' . $userData[0]->codigoRecuperacao);

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
