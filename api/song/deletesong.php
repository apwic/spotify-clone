<?php
require_once '../config.php';

$id = $_POST["id"];
deleteSong($con, $id);

?>