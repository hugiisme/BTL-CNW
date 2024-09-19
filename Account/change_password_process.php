<?php
    header("Content-Type: application/json");
    include("../shared/database.php");
    session_start();
    try {
        if ($_SERVER["REQUEST_METHOD"] != "POST"){
            exit();
        }

        $oldPassword = trim($_POST["oldPassword"]);
        $newPassword = trim($_POST["newPassword"]);
        $username = $_SESSION["username"];

        $query = "SELECT password FROM users WHERE username = '$username'";
        $result = mysqli_query($conn, $query);
        $row = mysqli_fetch_assoc($result);
        
        if(!password_verify($oldPassword, $row["password"])){
            echo json_encode(["message" => "Mật khẩu cũ sai", "status" => "error", "assigned_id" => "old-password-error"]);
            exit();
        }

        if ($oldPassword == $newPassword){
            echo json_encode(["message" => "Mật khẩu mới không thể giống mật khẩu cũ", "status" => "error", "assigned_id" => "new-password-error"]);
            exit();
        }

        $hashedNewPassword = password_hash($newPassword, PASSWORD_DEFAULT);
        $updateQuery = "UPDATE users SET password = '$hashedNewPassword' WHERE username = '$username'";

        if (mysqli_query($conn, $updateQuery)){
            echo json_encode(["message" => "Cập nhật mật khẩu thành công", "status" => "success"]);
            exit();
        } else {
            echo json_encode(["message" => "Không thể đổi mật khẩu", "status" => "error", "assigned_id" => ""]);
            exit();
        }

    } catch (Exception $e){
        error_log($e->getMessage());
    } finally {
        mysqli_close($conn);
    }

?>
