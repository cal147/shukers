<?php

$_postData = json_decode(file_get_contents("php://input"), true);

if(isset($_postData['sessionId'])) session_id($_postData['sessionId']);
session_start();

//echo password_hash('Pa$$w0rd', PASSWORD_DEFAULT)."\n";


include '../../Shared/dataBaseConn.php';

if($_postData['action'] == 'GET_CATEGORIES'){

    $db = new Database();
    $conn = $db->getConn();
    $catArray = [];
    try {
        $stmt = $conn->prepare("SELECT id, cat FROM category");
        $stmt->execute();

        if ($result = $stmt->get_result()) {
            while ($row = $result->fetch_assoc()) {
                array_push($catArray,[
                    'id' => $row['id'],
                    'cat' => $row['cat']
                ]);
            }
            echo json_encode($catArray);
        }


    } catch (Exception $e) {
        return false;
    }


}