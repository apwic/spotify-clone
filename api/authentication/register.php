<?php
require_once '../config.php';

// check if the username is there or not
if (!isset($_POST['username'])) {
    $result = ["status" => "error", "description" => "Invalid"];
    http_response_code(404);

    exit(json_encode($result));
} else {
    // set the default values from data input
    $email = $_POST['email'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT);
    $username = $_POST['username'];
    $isadmin = 0;

    // check if the user is already registered
    $sqlQuery = $con->prepare('SELECT `username` FROM `users` WHERE `username` = ? OR `email` = ?');
    $sqlQuery->bind_param('ss', $username, $email);

    // this code to check response code for debugging
    if (!$sqlQuery->execute()) {
        $result = ["status" => "error", "description" => "Query not executed"];
        http_response_code(500);
        
        exit(json_encode($result));
    }

    $queryResult = $sqlQuery->get_result();

    // there is data with given username and email
    if ($queryResult->num_rows != 0) {
        $result = ["status" => "error", "description" => "User already registered"];
        http_response_code(401);

        exit(json_encode($result));
    }

    // insert the data into users tables
    $sqlQuery = $con->prepare('INSERT INTO `users` (`username`, `email`, `password`, `isAdmin`) VALUES (?, ?, ?, ?)');
    $sqlQuery->bind_param('sssi', $username, $email, $password, $isadmin);

    // this code to check response code for debugging
    if (!$sqlQuery->execute()) {
        $result = ["status" => "error", "description" => "Query not executed"];
        http_response_code(500);

        exit(json_encode($result));
    }

    // insert the id to autoincrement column and keep the value
    $userID = $sqlQuery->insert_id;

    // set the session's expired time
    $expTime = time() + 1800;
    $setDate = date('Y-m-d H:i:s', $expTime);

    // make the session id with hash
    $sessionHash = hash('sha256', $userID . $username);

    // insert the session to sessions column
    $sqlQuery = $con->prepare('INSERT INTO `sessions` (`session_id`, `user_id`, `exp`) VALUES (?, ?, ?)');
    $sqlQuery->bind_param('sis', $sessionHash, $userID, $setDate);

    // this code to check response code for debugging
    if (!$sqlQuery->execute()) {
        $result = ["status" => "error", "description" => "Cannot execute query"];
        http_response_code(500);

        exit(json_encode($result));
    }

    // return the session id to validate user and set the cookie
    $session = ["sessionToken" => $sessionHash];
    $result = ["status" => "success", "description" => "User has registered", "session" => $session];
    http_response_code(200);
    
    echo json_encode($result);
}

?>