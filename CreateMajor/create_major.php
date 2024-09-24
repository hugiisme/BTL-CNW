<?php 
    include("../shared/session_check.php");
    include("../shared/header/header.html");
    if ($_SESSION['role'] == "admin"){
        include("create-major.html");
    } else {
        header("Location: ../index.php");
    }
?>