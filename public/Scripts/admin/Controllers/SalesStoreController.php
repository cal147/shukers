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
                $stmt = $conn->prepare("SELECT s.id, CONCAT(u.forname, ' ', surname) AS 'name', CONCAT(a.houseNum, ' ', firstLine) AS 'street', u.contactNumber, a.postcode, s.saleDate, s.totalPrice, s.paid, s.dispatched, s.collection FROM sales AS s INNER JOIN users AS u on u.id = s.userId INNER JOIN address as a on u.id = a.userId WHERE paid=1 AND dispatched = 0 AND a.delivery = 1");
                $stmt->execute();

                if ($result = $stmt->get_result()) {
                    while ($row = $result->fetch_assoc()) {
                        array_push($sales, [
                            'id' => $row['id'],
                            'name' => $row['name'],
                            'street' => $row['street'],
                            'contactNumber' => $row['contactNumber'],
                            'postcode' => $row['postcode'],
                            'saleDate' => $row['saleDate'],
                            'totalPrice' => $row['totalPrice'],
                            'paid' => boolval($row['paid']),
                            'dispatched' => boolval($row['dispatched']),
                            'collection' => boolval($row['collection']),
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
            $id = strip_tags($conn->real_escape_string(trim($_postData['id'])));

            try{
                $stmt = $conn->prepare("UPDATE sales SET  dispatched = 1 WHERE id=?");
                $stmt->bind_param("i", $id);

                $stmt->execute();
                $stmt->close();

                echo json_encode(['Message' => 'Updated', 'success' => true]);

            }catch (Exception $e){
                echo json_encode(['Message' => 'Something went wrong!', 'success' => false]);
            }
        }


        if ($_postData['action'] == 'GET_SALE_DETAILS') {

            $saleDetails = [];
            try{
                $stmt = $conn->prepare("SELECT p.name, s.qty, p.price FROM salesDetails AS s INNER JOIN products AS p on p.id = s.productId WHERE saleId = ?");
                $stmt->bind_param("i", $_postData['id']);
                $stmt->execute();

                if ($result = $stmt->get_result()) {
                    while ($row = $result->fetch_assoc()) {
                        array_push($saleDetails, [
                            'product' => $row['name'],
                            'qty' => $row['qty'],
                            'price' => $row['price']
                        ]);
                    }
                    echo json_encode(['saledetails' => $saleDetails, 'success' => true]);
                }else{
                    echo json_encode(['Message' => 'Something went wrong!', 'success' => false]);
                }

                $stmt->close();

            }catch (Exception $e) {
                echo json_encode(['Message' => 'Something went wrong!', 'success' => false]);
            }
        }



    }
}