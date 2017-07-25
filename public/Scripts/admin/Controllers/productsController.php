<?php

$_postData = json_decode(file_get_contents("php://input"), true);

if(isset($_postData['sessionId'])) session_id($_postData['sessionId']);
session_start();

//echo password_hash('Pa$$w0rd', PASSWORD_DEFAULT)."\n";


include '../../Shared/dataBaseConn.php';
$db = new Database();
$conn = $db->getConn();


if($_postData['action'] == 'GET_CATEGORIES'){


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

if($_postData['action'] == 'ADD_CATEGORY'){

    $dirtyCat = $_postData['newCategory'];

    if(preg_match('/^[A-Za-z0-9]{2,15}$/', stripcslashes(trim($dirtyCat)))) {

        $cCat = $conn->real_escape_string(trim($dirtyCat));
        $cleanCategory = strip_tags($cCat);

        try {
            $stmt = $conn->prepare("INSERT INTO category(cat) VALUES(?)");
            $stmt->bind_param("s", $cleanCategory);
            if($stmt->execute()){
                echo json_encode(['Message' => 'Category Added', 'success' => true]);
            }else{
                echo json_encode(['Message' => 'Could not add this category', 'success' => false]);
            }

        } catch (Exception $e) {
            echo json_encode(['Message' => 'Could not add this category', 'success' => false]);
        }


    }

}


if($_postData['action'] == 'DELETE_CATEGORY'){

    $dirtyId = $_postData['categoryId'];

    if(preg_match('/^[0-9]{1,3}$/', stripcslashes(trim($dirtyId)))) {

        $cId = $conn->real_escape_string(trim($dirtyId));
        $cleanId = strip_tags($cId);

        try {
            $stmt = $conn->prepare("DELETE FROM category WHERE id=?");
            $stmt->bind_param("i", $cleanId);
            if($stmt->execute()){
                echo json_encode(['Message' => 'Category Deleted', 'success' => true]);
            }else{
                echo json_encode(['Message' => 'Could not Delete this category', 'success' => false]);
            }

        } catch (Exception $e) {
            echo json_encode(['Message' => 'Could not Delete this category', 'success' => false]);
        }


    }

}