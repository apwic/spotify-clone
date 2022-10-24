<?php
header('Content-Type: application/json');

//SET CONNECTION
define('HOST', 'localhost');
define('USER', 'root');
define('PASS', '');
define('DBNAME', 'sepotipayi');

$con = new mysqli(HOST, USER, PASS, DBNAME);

if ($con->connect_errno) {
  $result = ["status" => "error", "description" => "cannot connect to database"];
  http_response_code(401);
  exit(json_encode($result));
}