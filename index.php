<?php
// Conexão
require_once 'DB.php';

// Sessão
session_start();

// Botão enviar
if(isset($_POST['btn-entrar'])):
  $erros = array();
  $login = mysqli_escape_string($conn, $_POST['login']);
  $senha = mysqli_escape_string($conn, $_POST['senha']);

  if(isset($_POST['lembrar-senha'])):

    setcookie('login', $login, time()+3600);
    setcookie('senha', md5($senha), time()+3600);
  endif;

  if(empty($login) or empty($senha)):
    $erros[] = "";
  else:
    // 105 OR 1=1 
      // 1; DROP TABLE teste

    $sql = "SELECT login FROM usuarios WHERE login = '$login'";
    $resultado = mysqli_query($conn, $sql);   

    if(mysqli_num_rows($resultado) > 0):
    $senha = md5($senha);       
    $sql = "SELECT * FROM usuarios WHERE login = '$login' AND senha = '$senha'";



    $resultado = mysqli_query($conn, $sql);

      if(mysqli_num_rows($resultado) == 1):
        $dados = mysqli_fetch_array($resultado);
        mysqli_close($conn);
        $_SESSION['logado'] = true;
        $_SESSION['id_usuario'] = $dados['id'];
        header('Location: dashboard');
      else:
        $erros[] = "";
      endif;

    else:
      $erros[] = "";
    endif;

  endif;

endif;
?>

<!DOCTYPE html>
<html>
<head>
    <title>Area Administrativa</title>
    <meta charset="utf-8">
    <meta content="ie=edge" http-equiv="x-ua-compatible">
    <meta content="template language" name="keywords">
    <meta content="Marcio Silva" name="author">
    <meta content="Area Administrativa" name="description">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <link href="apple-touch-icon.png" rel="apple-touch-icon">
    <link href="index/style/main.css" rel="stylesheet">
    <link href="index/style/style.css" rel="stylesheet">
</head>

<body class="auth-wrapper">
    <div class="all-wrapper menu-side with-pattern">
        <div class="auth-box-w">
            <div class="logo-w pad-login"><a href="login.html"><img style="width: 200px;height: 200px;" alt="" src="index/img/pxt.png"></a></div>
            <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST" class="login100-form validate-form" >
                <div id="alerta-login" style="display: block;"></div>
                <div class="form-group">
                    <label for="">Usuário</label>
                    <input type="text" class="form-control" name="login" placeholder="Usuario" value="">
                    <div class="pre-icon os-icon os-icon-user-male-circle"></div>
                </div>
                <div class="form-group">
                    <label for="">Senha:</label>
                    <input type="password" class="form-control" name="senha" placeholder="Password" value="" >
                    <div class="pre-icon os-icon os-icon-fingerprint"></div>
                </div>
                
                <div class="buttons-w">
                    <!--div-- class="form-check-inline">
                        <label class="form-check-label"><input class="form-check-input" type="checkbox">Lembrar Senha</label>
                    </!--div-->
                    <button class="btn btn-primary btn-login" name="btn-entrar">Entrar</button>
                </div>
            </form>
        </div>
    </div>
    <script src="index/estilos/assets/jquery/dist/jquery.min.js"></script>
    <script src="index/estilos/js/login.js"></script>
</body>

</html>