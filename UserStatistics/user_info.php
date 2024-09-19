<?php
    include("../shared/database.php");
    include("../shared/session_check.php");

    header('Content-Type: application/json');
    if ($_SESSION["role"] !== "admin") {
        echo json_encode(["redirect" => "../Home/index.php"]);
        exit();
    }
    
    $users = [];
    if (isset($_GET["query"])) {
        $search = mysqli_real_escape_string($conn, $_GET["query"]); // Sanitize input
        $sql = "SELECT id, username, role FROM users WHERE username LIKE '%$search%'";
    } else {
        $sql = "SELECT id, username, role FROM users";
    }

    $roleFilter = isset($_GET["role"]) ? $_GET["role"] : '';
    if($roleFilter){
        $sql .= " AND role = '$roleFilter'";
    }

    $sortOrder = isset($_GET["sort"]) ? $_GET["sort"] : "asc";
    if ($sortOrder === 'asc') {
        $sql .= " ORDER BY username ASC";
    } else if ($sortOrder === 'desc') {
        $sql .= " ORDER BY username DESC";
    }
    
    $result = mysqli_query($conn, $sql);

    while ($row = mysqli_fetch_assoc($result)) {
        $users[] = $row;
    }

    echo json_encode($users);
?>