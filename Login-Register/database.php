<?php 
    $db_server = "localhost";
    $db_user = "root";
    $db_password = "";
    $db_name = "universityapplicationdb";

    $conn = mysqli_connect($db_server, $db_user, $db_password, $db_name);

    // test connection first method
    // try{
    //     $conn = mysqli_connect($db_server, $db_user, $db_password, $db_name);
    //     echo "Kết nối thành công";
    // } 
    // catch (mysqli_sql_exception $e){
    //     echo "Không thể kết nối";
    //     echo $e->getMessage();
    // }

    // test connection second method
    // if (!$conn) {
    //     echo "không thể kết nối: " + mysqli_connect_error();
    //     exit();
    // }
    
    // echo "Kết nối thành công";
    
?>