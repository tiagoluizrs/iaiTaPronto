<?php require 'includes/header.php'; ?>
<header class="container-fluid">
  <div class="container login-area">
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
        <span class="body_logo">
          <a href="#">
            <img src="<?php echo base_url(); ?>public/images/logo.png" alt="" width="100%"/>
          </a>
        </span>
        <span class="body_login">
            <h1>Entrar no Sistema</h1>
            <form>
              <div class="input-group login-form">
                <span class="input-group-addon icon-form" id="user_email"><i class="fa fa-user"></i></span>
                <input type="email" class="form-control" placeholder="E-mail" aria-describedby="user_email">
              </div>
              <div class="input-group login-form">
                <span class="input-group-addon icon-form" id="user_password"><i class="fa fa-unlock-alt"></i></span>
                <input type="password" class="form-control" placeholder="Senha" aria-describedby="user_password">
              </div>
              <span class="link_form"><a href="#">Esqueci minha Senha</a></span>
              <button type="submit" class="btn btn-default button_default button_login">Entrar</button>
              <!--<span class="or">ou</span>-->
              <!--<button type="submit" class="btn btn-default button_default button_social_login facebook_button"><i class="icon_button fa fa-facebook-f"></i>Conectar</button>-->
              <!--<button type="submit" class="btn btn-default button_default button_social_login google_button"><i class="icon_button fa fa-google-plus"></i>Conectar</button>-->
              <span class="dont_account">Não possui uma conta? <a href="#">Cadastre-se</a></span>
            </form>
        </span>
      </div>
    </div>
  </div>
</header>
<?php include 'includes/footer.php'; ?>