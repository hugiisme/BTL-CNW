<?php
    session_start(); 
    session_unset(); 
    session_destroy(); 
    header("Location: ../Login-Register/login/login.php");
    exit();
?>
