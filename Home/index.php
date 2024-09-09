<?php 
    session_start();
    if (!isset($_SESSION["username"])){
        header("Location: ../Login-Register/php/login.php");
    }
    echo "Hello " . $_SESSION["username"];
    include("index.html");
?>