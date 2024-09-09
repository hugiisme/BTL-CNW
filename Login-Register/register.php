<?php 
    include("database.php");
    include("register.html");

    if ($_SERVER["REQUEST_METHOD"] == "POST") { 
        $username = isset($_POST["username"]) ? trim($_POST["username"]) : null;
        $password = isset($_POST["password"]) ? trim($_POST["password"]) : null;
        $role = "student"; // default là student, sau khi tạo sẽ để admin đổi role

        $sameNameUsers = "SELECT * FROM users WHERE username = '$username'";
        $duplicatedUsernameCheck = mysqli_query($conn, $sameNameUsers);
        
        // validate
        if ($username === null || $password === null){
            echo "Chưa nhập tên đăng nhập hoặc mật khẩu";
            exit();
        }

        // check tên đăng nhập đã tồn tại chưa
        if (mysqli_num_rows($duplicatedUsernameCheck) > 0){
            echo "Tên đăng nhập này đã được sử dụng";
        } else {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $query = "INSERT INTO users (username, password, role) VALUES ('$username', '$hashedPassword', '$role')";

            // debug
            if (mysqli_query($conn, $query)) {
                echo "User mới được tạo thành công";
            } else {
                echo "Error: " . mysqli_error($conn);
            }
        }
        
        mysqli_close($conn);
    } 
    // TODO: tạo thông báo đăng ký thành công
    //       tạo thông báo lỗi khi đăng ký (mật khẩu không hợp lệ, tên đăng nhập đã tồn tại)
?>