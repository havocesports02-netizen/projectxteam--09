<?php
include 'DB.php';
include 'Global.php';

if($maintenance == false){
     $conn->query("UPDATE tokens SET UID=NULL WHERE `Username` = '".$_GET['no']."'");   
}

?>

<script type="text/javascript">
	alert("Resetado");
	window.location.href='dashboard';
</script>