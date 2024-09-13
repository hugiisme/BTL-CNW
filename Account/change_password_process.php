<?php
    header("Content-Type: application/json");
    include("../shared/database.php");
    session_start();

    try {
        if ($_SERVER["REQUEST_METHOD"] != "POST"){
            exit();
        }
    
        $oldPassword = trim($_POST["old_password"]);
        $newPassword = trim($_POST["new_password"]);
        $username = $_SESSION["username"];
    
        if(empty($oldPassword) && empty($newPassword)){
            echo json_encode(["message" => "Chưa nhập mật khẩu"]);
            exit();
        }
    
        $query = "SELECT password FROM users WHERE username = '$username'";
        $result = mysqli_query($conn, $query);
    
        if (mysqli_num_rows($result) == 0){
            echo json_encode(["message" => "Không tìm được tài khoản"]);
            exit();
        }
    
        $row = mysqli_fetch_assoc($result);
    
        if (password_verify($newPassword, $row["password"])){
            echo json_encode(["message" => "Mật khẩu mới phải khác mật khẩu cũ"]);
            exit();
        }
    
        if (!password_verify($oldPassword, $row["password"])) {
            echo json_encode(["message" => "Sai mật khẩu cũ"]);
            exit();
        }
                    
        $newPasswordHashed = password_hash($newPassword, PASSWORD_DEFAULT);
        $updateQuery = "UPDATE users SET password = '$newPasswordHashed' WHERE username = '$username'";
    
        if (mysqli_query($conn, $updateQuery)){
            echo json_encode(["message" => "Đổi mật khẩu thành công"]);
        } else {
            echo json_encode(["message" => "không thể đổi mật khẩu"]);
        }
    } catch (Exception $e){
        error_log($e->getMessage());
    } finally {
        mysqli_close($conn);
    }

?>

<?php
    // header("Content-Type: application/json");
    // include("../shared/database.php");
    // session_start();

    // if ($_SERVER["REQUEST_METHOD"] == "POST") {
    //     $oldPassword = trim($_POST["old_password"]);
    //     $newPassword = trim($_POST["new_password"]);
    //     $username = $_SESSION["username"];

    //     if(!empty($oldPassword) && !empty($newPassword)){
    //         $query = "SELECT password FROM users WHERE username = '$username'";
    //         $result = mysqli_query($conn, $query);

    //         if (mysqli_num_rows($result) > 0){
    //             $row = mysqli_fetch_assoc($result);
    //             if (password_verify($newPassword, $row["password"])){
    //                 echo json_encode(["message" => "Mật khẩu mới phải khác mật khẩu cũ"]);
    //                 exit();
    //             }
    //             if (password_verify($oldPassword, $row["password"])){
    //                 $newPasswordHashed = password_hash($newPassword, PASSWORD_DEFAULT);
    //                 $updateQuery = "UPDATE users SET password = '$newPasswordHashed' WHERE username = '$username'";

    //                 if (mysqli_query($conn, $updateQuery)){
    //                     echo json_encode(["message" => "Đổi mật khẩu thành công"]);
    //                 } else {
    //                     echo json_encode(["message" => "không thể đổi mật khẩu"]);
    //                 }

    //             } else {
    //                 echo json_encode(["message" => "Sai mật khẩu"]);
    //             }
    //         }
            
    //     } else {
    //         echo json_encode(["message" => "Chưa nhập mật khẩu"]);
    //     }
    // }

    // mysqli_close($conn);
?>