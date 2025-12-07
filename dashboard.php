<?php
// Sessão
session_start();
// Verificação
if(!isset($_SESSION['logado'])):
    header('Location: index.php');
endif;
?>

<!DOCTYPE html>
<html>
<head>
    <title>Area Administrativa</title>
    <meta charset="utf-8">
    <meta content="ie=edge" http-equiv="x-ua-compatible">
    <meta content="template language" name="keywords">
    <meta content="Pxt" name="author">
    <meta content="Area Administrativa" name="description">
    <meta content="width=device-width, initial-scale=1" name="viewport">
    <link href="apple-touch-icon.png" rel="apple-touch-icon">
    <link href="assets/select2.min.css" rel="stylesheet">
    <link href="assets/daterangepicker.css" rel="stylesheet">
    <link href="assets/dropzone.css" rel="stylesheet">
    <link href="assets/dataTables.bootstrap.min.css" rel="stylesheet">
    <link href="assets/fullcalendar.min.css" rel="stylesheet">
    <link href="assets/perfect-scrollbar.min.css" rel="stylesheet">
    <link href="assets/slick.css" rel="stylesheet">
    <link href="css/main.css" rel="stylesheet">
    <link href="css/style.css" rel="stylesheet">
    <link href="css/newstyle.css" rel="stylesheet">
</head>

<?php   // this code is use to insert the form details and register and expiration date
include 'DB.php';
include 'Global.php';

$date_1_hora = date('Y-m-d H:i', strtotime('-4 Hours'));
//echo $date_1_hora;
if(isset($_POST['register'])){
$Username = $_POST['firstname'];
$Password  = $_POST['lastname'];
$Vendedor = $_POST['Vendedor'];
$Expiration = $_POST['email'];
$date      = $date_1_hora;//date("Y/m/d/h/m");
$true      = 2;
$fetch = "INSERT INTO `tokens`(`Username`, `Password`, `Vendedor`, `StartDate`, `EndDate`, `UID`, `Expiry`) VALUES ('$Username','$Password','$Vendedor','$date','$Expiration', NULL, '$true')";
$fire = mysqli_query($conn,$fetch);
}
?>

<body class="menu-position-side menu-side-left with-content-panel" >



<!-- reCAPTCHA -->
<script src='https://www.google.com/recaptcha/api.js'></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js" type="text/javascript"></script>

  <div class="all-wrapper with-side-panel solid-bg-all">

    <div class="search-with-suggestions-w">

      <div class="search-with-suggestions-modal">

        <div class="element-search"><input class="search-suggest-input" placeholder="Start typing to search..."

            type="text">

          <div class="close-search-suggestions"><i class="os-icon os-icon-x"></i></div></input>

        </div>

        <div class="search-suggestions-group">

          <div class="ssg-header">

            <div class="ssg-icon">

              <div class="os-icon os-icon-box"></div>

            </div>

            <div class="ssg-name">Projects</div>

            <div class="ssg-info">24 Total</div>

          </div>

          <div class="ssg-content">

            <div class="ssg-items ssg-items-boxed"><a class="ssg-item" href="users_profile_big.html">

                <div class="item-media" style="background-image: url(img/company6.png)"></div>

                <div class="item-name">Integ<span>ration</span> with API</div>

              </a><a class="ssg-item" href="users_profile_big.html">

                <div class="item-media" style="background-image: url(img/company7.png)"></div>

                <div class="item-name">Deve<span>lopm</span>ent Project</div>

              </a></div>

          </div>

        </div>

        <div class="search-suggestions-group">

          <div class="ssg-header">

            <div class="ssg-icon">

              <div class="os-icon os-icon-users"></div>

            </div>

            <div class="ssg-name">Customers</div>

            <div class="ssg-info">12 Total</div>

          </div>

          <div class="ssg-content">

            <div class="ssg-items ssg-items-list"><a class="ssg-item" href="users_profile_big.html">

                <div class="item-media" style="background-image: url(img/avatar1.jpg)"></div>

                <div class="item-name">John Ma<span>yer</span>s</div>

              </a><a class="ssg-item" href="users_profile_big.html">

                <div class="item-media" style="background-image: url(img/avatar2.jpg)"></div>

                <div class="item-name">Th<span>omas</span> Mullier</div>

              </a><a class="ssg-item" href="users_profile_big.html">

                <div class="item-media" style="background-image: url(img/avatar3.jpg)"></div>

                <div class="item-name">Kim C<span>olli</span>ns</div>

              </a></div>

          </div>

        </div>

        <div class="search-suggestions-group">

          <div class="ssg-header">

            <div class="ssg-icon">

              <div class="os-icon os-icon-folder"></div>

            </div>

            <div class="ssg-name">Files</div>

            <div class="ssg-info">17 Total</div>

          </div>

          <div class="ssg-content">

            <div class="ssg-items ssg-items-blocks"><a class="ssg-item" href="#">

                <div class="item-icon"><i class="os-icon os-icon-file-text"></i></div>

                <div class="item-name">Work<span>Not</span>e.txt</div>

              </a><a class="ssg-item" href="#">

                <div class="item-icon"><i class="os-icon os-icon-film"></i></div>

                <div class="item-name">V<span>ideo</span>.avi</div>

              </a><a class="ssg-item" href="#">

                <div class="item-icon"><i class="os-icon os-icon-database"></i></div>

                <div class="item-name">User<span>Tabl</span>e.sql</div>

              </a><a class="ssg-item" href="#">

                <div class="item-icon"><i class="os-icon os-icon-image"></i></div>

                <div class="item-name">wed<span>din</span>g.jpg</div>

              </a></div>

            <div class="ssg-nothing-found">

              <div class="icon-w"><i class="os-icon os-icon-eye-off"></i></div><span>No files were found.

                Try changing your query...</span>

            </div>

          </div>

        </div>

      </div>

    </div>

    <div class="layout-w">

        <div class="menu-mobile menu-activated-on-click color-scheme-dark">

          <div class="mm-logo-buttons-w">

            <a class="mm-logo" href="https://bit.ly/2WD2ko8" target="_blank">

              <img class="logo_website" src="img/profiles/pxt.png">
              <span name="name_website"></span>

            </a>

            <div class="mm-buttons">
              <div class="mobile-menu-trigger">
                <div class="os-icon os-icon-hamburger-menu-1"></div>

              </div>

            </div>

          </div>

          <div class="menu-and-user">

            <!-- main menu movil -->

            <ul class="main-menu" id="menuWeb">     
          <li class="">
                <a href="dashboard">
                  <div class="icon-w">
                    <div class="os-icon os-icon-layers"></div>
                  </div>
                  <span>Dashboard</span>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-header"></div>
                  <div class="sub-menu-i">
                  
                  </div>
                </div>
          </li>

          <li class="selected has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <div class="os-icon os-icon-database"></div>
                  </div>
                  <span>Conexão</span>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-header"></div>
                  <div class="sub-menu-i">
                    <ul class="sub-menu">
                      <li><a href="connection" target="_blank">Servidor - Conexão</a></li>
                    </ul>
                  </div>
                </div>
          </li>

          <li class="selected has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <div class="os-icon os-icon-user-male-circle"></div>
                  </div>
                  <span>Clientes</span>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-header"></div>
                  <div class="sub-menu-i">
                    <ul class="sub-menu">
                      <li><a href="registrar-usuario">Registrar Usuario</a></li>
                      <li><a href="adddias">Adicionar Dias</a></li>
                    </ul>
                  </div>
                </div>
          </li>

          <li class="selected has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <div class="os-icon os-icon-crown"></div>
                  </div>
                  <span>Funções Premium</span>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-header"></div>
                  <div class="sub-menu-i">
                    <ul class="sub-menu">
                      <li><a href="https://wa.link/ewdovw" target="_blank">Peruano YT</a></li>
                    </ul>
                  </div>
                </div>
          </li>             

            </ul>
 


            </ul>

          </div>

        </div>

        <div class="menu-w color-scheme-dark color-style-default menu-position-side menu-side-left menu-layout-full sub-menu-style-inside sub-menu-color-bright selected-menu-color-light menu-activated-on-hover menu-has-selected-link">
      <div class="logo-w page">
        <a class="logo" href="https://bit.ly/2WD2ko8" target="_blank">
          <img class="logo_website" style="width: 100%" src="img/profiles/pxt.png">
          <span class="name_website">Projectxteam</span>
        </a>
      </div>

      <!-- main menu ordenador -->

      <ul class="main-menu" id="menuWeb">     
          <li class="">
                <a href="dashboard">
                  <div class="icon-w">
                    <div class="os-icon os-icon-layers"></div>
                  </div>
                  <span>Dashboard</span>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-header">Dashboard</div>
                  <div class="sub-menu-i">
                  
                  </div>
                </div>
          </li>

          <li class="selected has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <div class="os-icon os-icon-database"></div>
                  </div>
                  <span>Conexão</span>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-header">Clientes</div>
                  <div class="sub-menu-i">
                    <ul class="sub-menu">
                      <li><a href="connection" target="_blank">Servidor - Conexão</a></li>
                    </ul>
                  </div>
                </div>
          </li>

          <li class="selected has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <div class="os-icon os-icon-user-male-circle"></div>
                  </div>
                  <span>Clientes</span>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-header">Clientes</div>
                  <div class="sub-menu-i">
                    <ul class="sub-menu">
                      <li><a href="registrar-usuario">Registrar Usuario</a></li>
                      <li><a href="adddias">Adicionar Dias</a></li>
                    </ul>
                  </div>
                </div>
          </li>

          <li class="selected has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <div class="os-icon os-icon-crown"></div>
                  </div>
                  <span>Funções Premium</span>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-header">Funções premium</div>
                  <div class="sub-menu-i">
                    <ul class="sub-menu">
                      <li><a href="https://wa.link/ewdovw" target="_blank">Peruano YT</a></li>
                    </ul>
                  </div>
                </div>
          </li>             

            </ul>
    </div>
        <div class="content-w">

          <div class="top-bar color-scheme-transparent">

            <div class="top-menu-controls">

              <div class="logged-user-w">

                <div class="logged-user-i">
                  <a class="btn btn-success" data-target=".bd-avisos-modal-lg" data-toggle="modal" style="color:white">
                    Avisos <span class="badge badge-light" id="avisos">0</span>
                  </a>
                  <!--a class="btn btn-success" data-target=".bd-downloads-sm" data-toggle="modal" style="color:white">Downloads</a-->
                  <!--a class="btn btn-danger" href="./videos/Area_Administrativa.mp4" target="_blank" id="video">Tutorial painel</a-->
                  <a class="btn btn-primary " href="logout"><i class="os-icon os-icon-signs-11"></i><span>Sair</span></a></<a>

                </div>

              </div>

            </div>

          </div>

          <ul class="breadcrumb">

            <li class="breadcrumb-item"><a href="#">Clientes</a></li>

            <li class="breadcrumb-item"><a href="#">Gerenciar</a></li>

          </ul>

          <div class="content-panel-toggler"><i class="os-icon os-icon-grid-squares-22"></i><span>Sidebar</span>

          </div>

          <div class="content-i">

            <div class="content-box">

              <div class="element-wrapper">

                <div class="element-box">

                <div class="row" id="dash" style="display:none">
                    <div class="col-xl-3 col-md-6">
                        <div class="card bg-warning text-white mb-4">
                            <div class="card-body">Clientes Pendentes</div>
                            <div class="card-footer d-flex align-items-center justify-content-between">
                                <a class="small text-white" id="count_pendentes"></a>
                                <div class="small text-white"><svg class="svg-inline--fa fa-angle-right fa-w-8" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg><!-- <i class="fas fa-angle-right"></i> --></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                        <div class="card bg-success text-white mb-4">
                            <div class="card-body">Clientes Ativos</div>
                            <div class="card-footer d-flex align-items-center justify-content-between">
                                <a class="small text-white" id="count_ativos"></a>
                                <div class="small text-white"><svg class="svg-inline--fa fa-angle-right fa-w-8" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg><!-- <i class="fas fa-angle-right"></i> --></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                        <div class="card bg-danger text-white mb-4">
                            <div class="card-body">Clientes Expirados</div>
                            <div class="card-footer d-flex align-items-center justify-content-between">
                                <a class="small text-white" id="count_venc"></a>
                                <div class="small text-white"><svg class="svg-inline--fa fa-angle-right fa-w-8" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg><!-- <i class="fas fa-angle-right"></i> --></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
                        <div class="card bg-primary text-white mb-4">
                            <div class="card-body">Renovações Pendentes</div>
                            <div class="card-footer d-flex align-items-center justify-content-between">
                                <a class="small text-white" id="count_renova"></a>
                                <div class="small text-white"><svg class="svg-inline--fa fa-angle-right fa-w-8" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" data-fa-i2svg=""><path fill="currentColor" d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg><!-- <i class="fas fa-angle-right"></i> --></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-10">
                      <h5 class="form-header">Servidor de Versão Gratuita</h5>
                    </div>
                    <div class="col-md-2">
                    <a class="btn btn-primary" data-target=".bd-resetar-clientes-modal-lg" data-toggle="modal" style="color:white">
                      Resetar clientes
                    </a>
                    </div>
                </div>
                  <h4 class="form-header">Gerenciar Clientes</h4>

                  <div class="form-desc">Clique em um dos clientes para mais detalhes.</div>
                  <div id="alerta-cliente" style="display: block;"></div>
                  <div class="table-striped">

                    <div class="table-responsive">

                      <table class="table table-bordered">

                        <thead>
                          <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Senha</th>
                            <th scope="col">Vendedot</th>
                            <th scope="col">Device</th>
                            <th scope="col">Data</th>
                            <th scope="col">Validade</th>
                            <th scope="col">Status</th>
                            <th scope="col">Delete</th>
                            <th scope="col">Resetar</th>
                            <th scope="col">Dias</th>
                          </tr>
                            <tr>
                              <th><input id="usuario" class="form-control" placeholder="Filtrar Usuário" type="text" onChange="myFunction('usuario', usuario.value)" /></th>
                              <th><input id="senha" class="form-control" placeholder="Filtrar Senha" type="text" onChange="myFunction('senha', senha.value)" /></th>
                              <th><input id="senha" class="form-control" placeholder="Filtrar Vendedor" type="text" onChange="myFunction('senha', vendedor.value)" /></th>
                              <th></th>
                              <th></th>
                              <th></th>
                              <th><select id="status" class="form-control" onChange="myFunction('status', '')">
                                    <option value="">Todos</option>
                                    <option value="V">Validos</option>
                                    <option value="P">Pendentes</option>
                                    <option value="E">Expirados</option>
                                  </select>
                              </th>
                              <th></th>
                              <th></th>
                              <th><input id="dt_expira" class="form-control" placeholder="Expiração" type="text" onChange="myFunction('validade', dt_expira.value)" /></th>
                          </tr>  
                        </thead>

                        <tbody id="divPrincipal">


                        </tbody>

<?php
$fetchqry = "SELECT * FROM `tokens`";
$result=mysqli_query($conn,$fetchqry);
$num=mysqli_num_rows($result);
while ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) { ?>
       <tr>
        <td><?php echo $row['Username'];?></td>
        <td><?php echo $row['Password'];?></td>
        <td><?php echo $row['Vendedor'];?></td>
        <td><?php if ($row['UID'] == NULL) {
    echo "0/1";
 } else {
    echo "1/1";
 }
                ?></td>
        <td><?php echo $date1 = $row['StartDate'];?></td>
        <td><?php echo $date2 = $row['EndDate'];?></td>
        <td><?php if(strtotime(date("Y/m/d")) < strtotime($date2)) echo "Online"; else { echo "Offline";} ?></td>
        <?php
      {
         echo "<td> <a href='delete-user?no=".$row['Username']."'><button type='button' class='btn btn-outline-primary mb-3'>Delete</button></a> </td>";
      }

      ?>
      <?php
      {
         echo "<td> <a href='reboot-user?no=".$row['Username']."'><button type='button' class='btn btn-outline-primary mb-3'>Reset</button></a> </td>";
      }


      ?>
 
        <?php 
$database = date_create($date2);
$datadehoje = date_create();
$resultado = date_diff($database, $datadehoje);
echo "<td>";
echo date_interval_format($resultado, '%a');
echo "</td>";
        ?>
        
       
        <?php
    
  if(isset($_POST['adicionardiass'])){
$dias = $_POST['dias'];
$mod_date = strtotime($date2."+ 1 days");
$adicionardias = date("Y/m/d h:m",$mod_date);
$nome = $row['Username'];
echo $nome;

  
//$adicionardias = date('Y/m/d h:m', strtotime('+$dias days', strtotime($date2)));;
  }
  
  ?>

      </tr>

      
      <?php } ?>
    </tbody>
  </table>

</div>
<script>
function myFunction($lol) {
<?php
$delete = "SELECT * FROM `tokens`";
?>
    
}
</script>

                      </table>

                    </div>

                  </div>

                </div>

              </div>

          </div>

          <div class="display-type"></div>
          
          <div aria-hidden="true" aria-labelledby="myLargeModalLabel" class="modal fade bd-downloads-sm" role="dialog" tabindex="-1">

            <div class="modal-dialog">

              <div class="modal-content">

                <div class="modal-header">

                  <h5 class="modal-title" id="exampleModalLabel">Downloads</h5><button aria-label="Close" class="close" data-dismiss="modal" type="button"><span aria-hidden="true"> &times;</span></button>

                </div>
                <div class="modal-body">

                  <div class="card mb-4 shadow-sm">
                    <div class="card-header">
                      <h4 class="my-0 font-weight-normal">ProjecXTeam1.57LiteV2.apk</h4>
                    </div>
                    <div class="card-body">
                      <ul class="list-unstyled mt-3 mb-4">
                        <li><strong>Atualizado em 03/01/2021</strong></li>
                        <li><strong>Versão: </strong> Lite</li>
                        <li><strong>Tamanho: </strong> 93mb</li>
                      </ul>
                      <a class="btn btn-lg btn-block btn-outline-primary" href="../apks/ProjectXTeam1.57SuperLite.apk" target="_blank">Clique aqui para baixar</a>
                    </div>
                  </div>

                  <div class="card mb-4 shadow-sm">
                    <div class="card-header">
                      <h4 class="my-0 font-weight-normal">ProjecXTeam1.57Completa.apk</h4>
                    </div>
                    <div class="card-body">
                      <ul class="list-unstyled mt-3 mb-4">
                        <li><strong>Atualizado em 03/01/2021</strong></li>
                        <li><strong>Versão: </strong> Completa</li>
                        <li><strong>Tamanho: </strong> 93mb</li>
                      </ul>
                      <a class="btn btn-lg btn-block btn-outline-primary" href="../apks/ProjectXTeam1.57Completo.apk" target="_blank">Clique aqui para baixar</a>
                    </div>
                  </div>

                </div>

              </div>

            </div>    
          </div>                  

          <div class="modal bd-muda-vendedor-modal-lg" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Mudar Vendedor</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                <form id="formEditMudarVendedor" enctype="multipart/form-data">
                    <input type="hidden" name="id_cliente_vendedor" id="id_cliente_vendedor">
                    <label for="">Vendedor</label>
                    <select id="select_vendedor" name="select_vendedor" class="form-control" ></select>
                    <div class="modal-footer">
                      <button class="btn btn-primary" type="submit" id="editarDadosVendedor">Editar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div class="modal bd-resetar-clientes-modal-lg" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Resetar Clientes</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <div id="alerta-reset" style="display: block;"></div>
                  <form id="formEditResetCliente" enctype="multipart/form-data">
                   
                    <br />
                    <div class="modal-footer">
                      <button class="btn btn-primary" type="submit" id="reset">Resetar Clientes</button>

<script type="text/javascript">

  window.onload = function() {
    // var sound = new Audio('../Click.mp3');      // descomente esta linha quando criado apenas no script
    var mapa = document.getElementById("reset");
    mapa.onclick = function() {
        alert("Do you want to do the general reset of the users?");
window.location.href = "reset";

      }
    }
  
</script>

                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div class="modal bd-avisos-modal-lg" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Avisos</h5>
                  <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body" id="texto_aviso">
                  <!--div class="alert alert-secondary" role="alert">
                    This is a secondary alert—check it out!
                  </div>
                  <div class="alert alert-success" role="alert">
                    This is a success alert—check it out!
                  </div-->                  
                </div>
              </div>
            </div>
          </div>

          <div aria-hidden="true" aria-labelledby="myLargeModalLabel" class="modal fade bd-example-modal-lg"

            role="dialog" tabindex="-1">

            <div class="modal-dialog modal-lg">

              <div class="modal-content">

                <div class="modal-header">

                  <h5 class="modal-title" id="exampleModalLabel">Gerenciar cliente</h5><button aria-label="Close"

                    class="close" data-dismiss="modal" type="button"><span aria-hidden="true">

                      &times;</span></button>

                </div>
                <div class="modal-body">

                  <form id="formEdit" enctype="multipart/form-data">
                    <input type="hidden" id="area" name="area" value="clientes">
                    <input type="hidden" name="id" id="id">
                    <div id="alerta-evento" style="display: block;"></div>

                    <label for="">Usuário</label><input class="form-control"
                    type="text" name="user_id" id="user_id" size="8" maxlength="8">

                    <label for="">Senha</label><input class="form-control"
                    type="text" name="user_password" id="user_password" size="8" maxlength="8">

                    <label for="">Celular</label><input class="form-control"
                    type="text" name="user_celular" id="user_celular">

                    <label for="">IMEI</label><input class="form-control"
                    type="text" name="user_imei" id="user_imei">

                    <label for="">Validade</label>
                    <input type="date" class="form-control" name="user_dt_expira" id="user_dt_expira">

                    <label for="">Vendedor</label><input readonly=“true” class="form-control"
                    type="text" name="user_vendedor" id="user_vendedor">

                    <label for="">Game</label>
                    <select id="select_game" name="select_game" class="form-control" ></select>

                    <label for="">Cor</label>
                    <input type="color" id="user_color" name="user_color" >

                    <div class="modal-footer">

                      <button class="btn btn-primary" type="submit" id="editarDados">Editar</button>

                    </div>

                  </form>

                </div>

            </div>

          </div>

    </div>
  </div>
        <script src="plugins/jquery.min.js"></script>
        <script src="plugins/popper.min.js"></script>
        <script src="plugins/moment.js"></script>
        <script src="plugins/Chart.min.js"></script>
        <script src="plugins/select2.full.min.js"></script>
        <!--script sr.="./assets/jquery-bar-rating/dist/jquery.barrating.min.js"></script>
        <script src="./assets/ckeditor/ckeditor.js"></script-->
        <script src="plugins/validator.min.js"></script>
        <script src="plugins/daterangepicker.js"></script>
        <script src="plugins/ion.rangeSlider.min.js"></script>
        <script src="plugins/dropzone.js"></script>
        <script src="plugins/mindmup-editabletable.js"></script>
        <script src="plugins/jquery.dataTables.min.js"></script>
        <script src="plugins/dataTables.bootstrap.min.js"></script>
        <script src="plugins/fullcalendar.min.js"></script>
        <script src="plugins/perfect-scrollbar.jquery.min.js"></script>
        <script src="plugins/tether.min.js"></script>
        <!--script sr.="./assets/slick-carousel/slick/slick.min.js"></script-->
        <script src="plugins/util.js"></script>
        <script src="plugins/alert.js"></script>
        <script src="plugins/button.js"></script>
        <!--script sr.="./assets/bootstrap/js/dist/carousel.js"></script-->
        <script src="plugins/collapse.js"></script>
        <script src="plugins/dropdown.js"></script>
        <script src="plugins/modal.js"></script>
        <script src="plugins/tab.js"></script>
        <script src="plugins/tooltip.js"></script>
        <script src="plugins/popover.js"></script>
        <script src="plugins/demo_customizerce5a.js?version=4.4.1"></script>
        <script src="plugins/main.js?u=202106111953"></script>

    </body>
</html>
