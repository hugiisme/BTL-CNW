<?php 
    include("../shared/session_check.php");
    include("../shared/header/header.html");
    if ($_SESSION['role'] == "admin"){
        include("applicationStatistics.html");
    } else {
        header("Location: ../Home/index.php");
    }
?>