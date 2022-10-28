<?php
require_once '../config.php';

if (!isset($_POST['email'])) {
    $result = ["status" => "error", "description" => "Invalid"];
    http_response_code(404);

    exit(json_encode($result));
} else {
    $email = $_POST['email'];
    
    $sqlQuery = $con->prepare("SELECT `email` FROM `USERS` WHERE `email` = ?");
    $sqlQuery->bind_param('s', $email);
    
    if (!$sqlQuery->execute()) {
        $result = ["status" => "error", "description" => "Query not executed"];
        http_response_code(500);
        
        exit(json_encode($result));
    }
    
    $queryResult = $sqlQuery->get_result();

    if ($queryResult->num_rows != 0) {
        $result = ["status" => "error", "description" => "Email already taken", "code" => "email"];
        http_response_code(200);

        echo json_encode($result);
    } else {
        $result = ["status" => "success", "description" => "Email is available", "code" => "email"];
        http_response_code(200);
    
        echo json_encode($result);
    }


}

?>