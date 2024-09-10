<?php 
    $db_server = "localhost";
    $db_user = "root";
    $db_password = "";
    $db_name = "universityapplicationdb";

    $conn = mysqli_connect($db_server, $db_user, $db_password, $db_name);

    // test connection
    
    // if (!$conn) {
    //     echo "không thể kết nối: " + mysqli_connect_error();
    //     exit();
    // }
    
    // echo "Kết nối thành công";
    
?>