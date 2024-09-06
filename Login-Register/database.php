<?php 
    $db_server = "localhost";
    $db_user = "root";
    $db_password = "";
    $db_name = "users";
    $conn = "";

    // try{
    //     $conn = mysqli_connect($db_server, $db_user, $db_password, $db_name);
    //     echo "Connected";
    // } 
    // catch (mysqli_sql_exception $e){
    //     echo "Could not connect";
    //     echo $e->getMessage();
    // }

    if (!$conn) {
        echo "Could not connect: " . mysqli_connect_error();
        exit();
    }
    
    echo "Connected successfully";
    
?>