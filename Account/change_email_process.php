<?php
    header("Content-Type: application/json");
    include("../shared/database.php");
    session_start();
    try {
        if ($_SERVER["REQUEST_METHOD"] != "POST"){
            exit();
        }

        $newEmail = trim($_POST["newEmail"]);
        $username = $_SESSION["username"];
        $query = "SELECT email FROM users WHERE username = '$username'";
        $result = mysqli_query($conn, $query);
        $row = mysqli_fetch_assoc($result);
        $oldEmail = $row["email"];

        if(!filter_var($newEmail, FILTER_VALIDATE_EMAIL)){
            echo json_encode(["message" => "Email không hợp lệ", "status" => "error"]);
            exit();
        }
        
        if($newEmail == $oldEmail){
            echo json_encode(["message" => "Email mới không thể giống email cũ", "status" => "error"]);
            exit();
        }

        $updateQuery = "UPDATE users SET email = '$newEmail' WHERE username = '$username'";
        if(mysqli_query($conn, $updateQuery)){
            echo json_encode(["message" => "Thay đổi email thành công", "status" => "success"]);
            exit();
        } else {
            echo json_encode(["message" => "Không thể thay đổi email", "status" => "error"]);
            exit();
        }

    } catch (Exception $e){
        error_log($e->getMessage());
    } finally {
        mysqli_close($conn);
    }

?>