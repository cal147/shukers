<?php

$_postData = json_decode(file_get_contents("php://input"), true);

if(isset($_postData['sessionId'])) session_id($_postData['sessionId']);
session_start();


include '../../Shared/loginControl.php';

$db = new Database();
$conn = $db->getConn();

if(session_status() === PHP_SESSION_ACTIVE) {
    if($_SESSION['loggedIn'] && $_SESSION['isStaff']) {

        if ($_postData['action'] == 'GET_SALES') {

            $sales = [];

            try{
                $stmt = $conn->prepare("SELECT id, userId, saleDate, totalPrice, paid, dispatched FROM sales WHERE paid=1 AND dispatched = 0");
                $stmt->execute();

                if ($result = $stmt->get_result()) {
                    while ($row = $result->fetch_assoc()) {
                        array_push($sales, [
                            'id' => $row['id'],
                            'userId' => $row['userId'],
                            'saleDate' => $row['saleDate'],
                            'totalPrice' => $row['totalPrice'],
                            'paid' => boolval($row['paid']),
                            'dispatched' => boolval($row['dispatched'])
                        ]);
                    }
                    echo json_encode(['sales' => $sales, 'success' => true]);
                }else{
                    echo json_encode(['Message' => 'Something went wrong!', 'success' => false]);
                }

                $stmt->close();

            }catch (Exception $e){
                echo json_encode(['Message' => 'Something went wrong!', 'success' => false]);
            }
        }

        if ($_postData['action'] == 'MARK_AS_DISPATCHED') {

        }


    }
}