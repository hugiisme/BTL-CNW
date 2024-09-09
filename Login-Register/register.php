<?php 
    include("database.php");
    include("register.html");
    include("register-validate.php");
    mysqli_close($conn);
    // TODO: tạo thông báo đăng ký thành công
    //       tạo thông báo lỗi khi đăng ký (mật khẩu không hợp lệ, tên đăng nhập đã tồn tại)
?>