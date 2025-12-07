<?php 
include 'DB.php';

     $conn->query("UPDATE tokens SET UID=NULL");   
?>
<script type="text/javascript">
	alert("General reboot of users");
	window.location.href='dashboard';
</script>