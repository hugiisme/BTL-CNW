<?php 
    header('Content-Type: application/json');
    include("database.php");
    
    if ($_SERVER["REQUEST_METHOD"] == "POST") { 
        $username = isset($_POST["username"]) ? trim($_POST["username"]) : null;
        $password = isset($_POST["password"]) ? trim($_POST["password"]) : null;
        $role = "student"; // default là student, sau khi tạo sẽ để admin đổi role

        $sameNameUsers = "SELECT * FROM users WHERE username = '$username'";
        $duplicatedUsernameCheck = mysqli_query($conn, $sameNameUsers);
        
        // validate
        if ($username === null || $password === null){
            echo json_encode(["message" => "Chưa nhập tên đăng nhập hoặc mật khẩu"]); // thừa, js đã xử lý rồi
            exit();
        }

        // check tên đăng nhập đã tồn tại chưa
        if (mysqli_num_rows($duplicatedUsernameCheck) > 0){
            echo json_encode(["message" => "Tên đăng nhập này đã được sử dụng, vui lòng chọn tên đăng nhập khác"]);
        } else {
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
            $query = "INSERT INTO users (username, password, role) VALUES ('$username', '$hashedPassword', '$role')";

            // debug
            if (mysqli_query($conn, $query)) {
                echo json_encode(["message" => "User mới được tạo thành công"]);
            } else {
                echo json_encode(["message" => "Error: " . mysqli_error($conn)]);
            }
        }
    } 

    mysqli_close($conn);
?>