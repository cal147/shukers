<?php

$_postData = json_decode(file_get_contents("php://input"), true);

if ($_postData['action'] == "ADD_IMAGE"){
    echo json_encode(['ImageClass' => 'image received', 'success' => true]);

    $theFile = fopen($_postData['name'], "w");
    $fileData = $_postData['blob'];
    fwrite($theFile, $fileData);
    fclose($theFile);

}