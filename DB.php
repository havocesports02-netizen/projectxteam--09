<?php
//$dbName = "PeruanoYT";
//$user = "HackersTeam";
//$pwd = "890998";
//$host = "localhost";
//conn = new PDO('mysql:dbname='//.$dbName.';host='.$host, $user//, $pwd);
//api url filter
if(strpos($_SERVER['REQUEST_URI'],"DB.php")){
    require_once 'Utils.php';
    PlainDie();
}

$conn = new mysqli("localhost", "newserver", "rRZhE7eRVVFi]9sW", "liboline");
if($conn->connect_error != null){
    die($conn->connect_error);
}