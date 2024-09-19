<?php
    header("Content-Type: application/json");
    include("../shared/database.php");
    session_start();
    try {
        if ($_SERVER["REQUEST_METHOD"] != "POST"){
            exit();
        }

        $username = trim($_POST["username"]);
        $password = trim($_POST["password"]);

        if($username != $_SESSION["username"]){
            echo json_encode(["message" => "Tên đăng nhập sai", "status" => "error", "assigned_id" => "username-error"]);
            exit();
        }

        $query = "SELECT password FROM users WHERE username = '$username'";
        $result = mysqli_query($conn, $query);
        $row = mysqli_fetch_assoc($result);

        if(!password_verify($password, $row["password"])){
            echo json_encode(["message" => "Mật khẩu sai", "status" => "error", "assigned_id" => "password-error"]);
            exit();
        }

        $deleteQuery = "DELETE FROM users WHERE username = '$username'";
        if(mysqli_query($conn, $deleteQuery)){
            echo json_encode(["message" => "Xóa tài khoản thành công", "status" => "success"]);
            exit();
        } else {
            echo json_encode(["message" => "Không thể xóa tài khoản", "status" => "error", "assigned_id" => ""]);
            exit();
        }

    } catch (Exception $e){
        error_log($e->getMessage());
    } finally {
        mysqli_close($conn);
    }
?>
