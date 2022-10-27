<?php
require_once "./config.php";

$path = $_POST["path"];
deleteFile($path);
?>