<?php 
    header('Content-Type: application/json');
    include("../../shared/database.php");
    session_start();

    try {
        if(!$_SERVER["REQUEST_METHOD"] == "POST"){
            exit();
        }

        $username = trim($_POST["username"]);
        $name = trim($_POST["name"]);
        $email = trim($_POST["email"]);
        $password = trim($_POST["passwordConfirmation"]); // sử dụng mật khẩu đã được xác nhận thay vì mật khẩu nhập lần đầu

        $role = "student"; // default là student, sau khi tạo sẽ để admin đổi role
            
        // validate thừa, js đã xử lý rồi nhưng để cho chắc
        if ($username === null){ 
            echo json_encode(["message" => "Chưa nhập tên đăng nhập", "status" => "error"]); 
            exit();
        } else if ($name === null){ 
            echo json_encode(["message" => "Chưa nhập tên người dùng", "status" => "error"]); 
            exit();
        } else if ($email === null) { 
            echo json_encode(["message" => "Chưa nhập email", "status" => "error"]); 
            exit();
        } else if ($password === null){
            echo json_encode(["message" => "Chưa nhập mật khẩu", "status" => "error"]); 
            exit();
        } 

        // check syntax của email
        if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
            echo json_encode(["message" => "Email không hợp lệ", "status" => "error"]); 
            exit();
        }
    
        // check tên đăng nhập đã tồn tại chưa
        $sameNameUsers = "SELECT * FROM users WHERE username = '$username'";
        $duplicatedUsernameCheck = mysqli_query($conn, $sameNameUsers);
        if (mysqli_num_rows($duplicatedUsernameCheck) > 0){
            echo json_encode(["message" => "Tên đăng nhập này đã được sử dụng, vui lòng chọn tên đăng nhập khác", "status" => "error"]);
            exit();
        }
        
        // insert user mới vào csdl
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT); // mã hóa password
        $query = "INSERT INTO users (username, password, role, name, email) VALUES ('$username', '$hashedPassword', '$role', '$name', '$email')";
        if (mysqli_query($conn, $query)) {
            echo json_encode(["message" => "User mới được tạo thành công", "status" => "success"]);
        } else {
            echo json_encode(["message" => "Error: " . mysqli_error($conn)]);
        }
    } catch (Exception $e){
        error_log($e->getMessage());
    } finally {
        mysqli_close($conn);
    }

?>
