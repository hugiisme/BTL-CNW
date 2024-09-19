<?php
    header("Content-Type: application/json");
    include("../shared/database.php");
    session_start();

    if(!isset($_SESSION["username"])){
        exit();
    }

    $username = $_SESSION["username"];

    $query = "SELECT id, role FROM users WHERE username = '$username'";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);
    $id = $row["id"];
    $role = $row["role"];

    $response = [
        "id" => $id,
        "username" => $username,
        "role" => $role
    ];

    echo json_encode($response);

    mysqli_close($conn);
?>