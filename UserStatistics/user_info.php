<?php
    include("../shared/database.php");
    include("../shared/session_check.php");

    try {
        header('Content-Type: application/json');
        if ($_SESSION["role"] !== "admin") {
            echo json_encode(["redirect" => "../Home/index.php"]);
            exit();
        }
        
        $users = [];
        $sql = "SELECT user_id, role, name, email, create_at, update_at FROM users";
        if ($_GET["name"] != '') {
            $search = mysqli_real_escape_string($conn, $_GET["name"]); 
            $sql .= " WHERE name LIKE '%$search%'";
        } 
    
        $roleFilter = isset($_GET["role"]) ? $_GET["role"] : '';
        if($roleFilter){
            $sql .= " AND role = '$roleFilter'";
        }
    
        $sortOrder = isset($_GET["sortOrder"]) ? $_GET["sortOrder"] : "asc";
        $sortBy = isset($_GET["sortBy"]) ? $_GET["sortBy"] : "name";
        if ($sortOrder === 'asc') {
            $sql .= " ORDER BY $sortBy ASC";
        } else if ($sortOrder === 'desc') {
            $sql .= " ORDER BY $sortBy DESC";
        }

        error_log($sql);

        $result = mysqli_query($conn, $sql);
        
        while ($row = mysqli_fetch_assoc($result)) {
            $users[] = $row;
        }
    
        echo json_encode($users);
        
    } catch (Exception $e){
        error_log($e->getMessage());
    } finally {
        mysqli_close($conn);
    }

    
?>