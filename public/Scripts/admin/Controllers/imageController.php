<?php

//$_postData = json_decode(file_get_contents("php://input"), true);



session_start();

echo json_encode(['ImageClass' => 'i have responded', 'postData'=>$_POST]);
echo "this is the post ".$_POST;

$theFile = fopen($_POST['name'], "w");
$fileData = $_postData['blob'];
fwrite($theFile, $fileData);
fclose($theFile);