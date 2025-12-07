<?php
include 'DB.php';
include 'Global.php';

if($maintenance == false){
     $conn->query("DELETE FROM `tokens` WHERE `Username` = '".$_GET['no']."'");   
}

?>

<script type="text/javascript">
	alert("Delete User");
	window.location.href='dashboard';
</script>