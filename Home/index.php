<?php 
    session_start();
    if (!isset($_SESSION["username"])){
        header("Location: ../Login-Register/login.php");
        exit();
    }
    echo "Hello " . $_SESSION["username"];
    include("index.html");
?>