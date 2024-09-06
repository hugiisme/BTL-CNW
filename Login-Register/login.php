<?php 
    session_start();
    include("login.html");
    include("database.php");

    $username = $_POST["username"];
    $password = $_POST["password"];
    # nếu đã nhập đủ username và password thì mã hóa password
    if (!empty($username) && !empty($password)){
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT); 
    }

?>