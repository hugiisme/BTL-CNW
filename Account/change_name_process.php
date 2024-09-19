<?php
    header("Content-Type: application/json");
    include("../shared/database.php");
    session_start();
    try {
        if ($_SERVER["REQUEST_METHOD"] != "POST"){
            exit();
        }

        $newName = trim($_POST["newName"]);
        $username = $_SESSION["username"];
        if($newName == $_SESSION["name"]){
            echo json_encode(["message" => "Tên người dùng mới không thể giống tên cũ", "status" => "error"]);
            exit();
        }

        $query = "UPDATE users SET name = '$newName' WHERE username = '$username'";
        if(mysqli_query($conn, $query)){
            $_SESSION["name"] = $newName;
            echo json_encode(["message" => "Đổi tên người dùng thành công", "status" => "success"]);
            exit();
        } else {
            echo json_encode(["message" => "Không thể thay đổi tên người dùng", "status" => "error"]);
            exit();
        }

    } catch (Exception $e){
        error_log($e->getMessage());
    } finally {
        mysqli_close($conn);
    }

?>