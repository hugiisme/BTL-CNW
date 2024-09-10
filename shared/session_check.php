<?php 
    session_start();
    if (!isset($_SESSION["username"])){
        header("Location: ../Login-Register/login/login.php");
    }
?>