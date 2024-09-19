<?php
    header('Content-Type: application/json');
    include("../../shared/database.php");
    session_start();

    try {
        if (!$_SERVER["REQUEST_METHOD"] == "POST"){
            exit();
        }
    
        $username = trim($_POST["username"]);
        $password = trim($_POST["password"]);
    
        // validate
        // thừa, js đã xử lý rồi nhưng để cho chắc
        if($username === null){
            echo json_encode(["message" => "Chưa nhập tên đăng nhập", "status" => "error"]); 
            exit();
        } else if ($password === null){
            echo json_encode(["message" => "Chưa nhập tên mật khẩu", "status" => "error"]); 
            exit();
        }

    
        $query = "SELECT password, role, name FROM users WHERE username = '$username'";
        $result = mysqli_query($conn, $query);
        if (mysqli_num_rows($result) == 0){
            echo json_encode(["message" => "Sai tên đăng nhập", "status" => "error"]);
            exit();
        }
    
        $row = mysqli_fetch_assoc($result);
    
        if (password_verify($password, $row["password"])){
            $_SESSION['username'] = $username;
            $_SESSION['role'] = $row["role"];
            $_SESSION['name'] = $row["name"];
            echo json_encode(["message" => "Đăng nhập thành công", "status" => "success"]);
        } else {
            echo json_encode(["message" => "Sai mật khẩu", "status" => "error"]);
        }
    } catch (Exception $e){
        error_log($e->getMessage());
    } finally {
        mysqli_close($conn);
    }
    
?>

