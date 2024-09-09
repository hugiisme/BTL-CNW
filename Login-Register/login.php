<?php 
    session_start();
    include("database.php");
    include("login.html");
    include("login-validate.php");

    mysqli_close($conn);
    // TODO: tạo thông báo sai mật khẩu hoặc tên đăng nhập
    //       tạo thông báo đăng nhập thành công
?>