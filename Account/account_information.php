<?php
    header("Content-Type: application/json");
    include("../shared/database.php");
    session_start();

    $username = $_SESSION["username"];

    $query = "SELECT role FROM users WHERE username = '$username'";
    $result = mysqli_query($conn, $query);
    $row = mysqli_fetch_assoc($result);
    $role = $row["role"];

    $response = [
        "username" => $username,
        "role" => $role
    ];

    echo json_encode($response);

    mysqli_close($conn);
?>