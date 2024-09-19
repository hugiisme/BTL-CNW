<?php
    header("Content-Type: application/json");
    include("../shared/database.php");
    session_start();

    try {
        if(!isset($_SESSION["username"])){
            exit();
        }
    
        $username = $_SESSION["username"];
    
        $query = "SELECT user_id, role, name, email FROM users WHERE username = '$username'";
        $result = mysqli_query($conn, $query);
        $row = mysqli_fetch_assoc($result);
        $userId = $row["user_id"];
        $name = $row["name"];
        $role = $row["role"];
        $email = $row["email"];
    
        $response = [
            "userId" => $userId,
            "username" => $username,
            "name" => $name,
            "role" => $role,
            "email" => $email
        ];
    
        echo json_encode($response);
    } catch (Exception $e){
        error_log($e->getMessage());
    } finally {
        mysqli_close($conn);
    }

?>