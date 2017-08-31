<?php

$_postData = json_decode(file_get_contents("php://input"), true);

if (isset($_postData['sessionId'])) session_id($_postData['sessionId']);
session_start();


include '../../Shared/dataBaseConn.php';
$db = new Database();
$conn = $db->getConn();


if ($_postData['action'] == 'GET_HOMEPRODUCTS') {


    $prodArray = [];
    try {
        $stmt = $conn->prepare("SELECT p.id, p.name, p.description, p.price, p.onOffer, p.imgPath, c.cat FROM products as p join category as c on p.catId = c.id order by rand() LIMIT 3");
        $stmt->execute();

        if ($result = $stmt->get_result()) {
            while ($row = $result->fetch_assoc()) {
                array_push($prodArray, [
                    'id' => $row['id'],
                    'name' => $row['name'],
                    'desc' => $row['description'],
                    'price' => $row['price'],
                    'onOffer' => $row['onOffer'],
                    'imgPath' => $row['imgPath'],
                    'cat' => $row['cat']
                ]);
            }
            echo json_encode($prodArray);
        }


    } catch (Exception $e) {
        return false;
    }


}

if ($_postData['action'] == 'GET_MENUCATEGORY') {


    $categoryArray = [];
    try {
        $stmt = $conn->prepare("SELECT cat FROM category");
        $stmt->execute();

        if ($result = $stmt->get_result()) {
            while ($row = $result->fetch_assoc()) {
                array_push($categoryArray, [
                    'cat' => $row['cat']
                ]);
            }
            echo json_encode($categoryArray);
        }


    } catch (Exception $e) {
        return false;
    }


}

if ($_postData['action'] == 'GET_Category') {

    $dirtyCategory = $_postData['categoryId'];

    if (preg_match('/^[A-Za-z0-9]{2,15}$/', stripcslashes(trim($dirtyCategory)))) {

        $cCategory = $conn->real_escape_string(trim($dirtyCategory));
        $cleanCategory = strip_tags($cCategory);
        $categoryArray = [];
        try {
            $stmt = $conn->prepare("SELECT cat FROM category WHERE cat = ?");
            $stmt->bind_param('s', $Category);
            $stmt->execute();
            if ($result = $stmt->get_result()) {
                while ($row = $result->fetch_assoc()) {
                    array_push($categoryArray, [
                        'cat' => $row['cat']
                    ]);
                }
                echo json_encode($categoryArray);
            }
        } catch (Exception $e) {
            return false;
        }
    }
}

if ($_postData['action'] == 'SELECT_SPECIFICCATEGORY') {

    $dirtyProd = $_postData['category'];

    if (preg_match('/^[A-Za-z0-9]{2,15}$/', stripcslashes(trim($dirtyProd)))) {

        $cProd = $conn->real_escape_string(trim($dirtyProd));
        $cleanProd = strip_tags($cProd);
        $productArray = [];
        try {
            $stmt = $conn->prepare("SELECT p.id, p.name, p.description, p.price, p.onOffer, p.imgPath, c.cat FROM products as p join category as c on p.catId = c.id WHERE c.cat=?");
            $stmt->bind_param("s", $cleanProd);
            $stmt->execute();

            if ($result = $stmt->get_result()) {
                while ($row = $result->fetch_assoc()) {
                    array_push($productArray, [
                        'id' => $row['id'],
                        'name' => $row['name'],
                        'desc' => $row['description'],
                        'price' => $row['price'],
                        'onOffer' => $row['onOffer'],
                        'imgPath' => $row['imgPath'],
                        'cat' => $row['cat']
                    ]);
                }
            }
            echo json_encode($productArray);
        } catch (Exception $e) {
            return false;
        }
    }
}

if ($_postData['action'] == 'GET_PRODUCTS') {
    $prodArray = [];
    try {
        $stmt = $conn->prepare("SELECT p.id, p.name, p.description, p.price, p.onOffer, p.imgPath, c.cat FROM products as p join category as c on p.catId = c.id");
        $stmt->execute();
        if ($result = $stmt->get_result()) {
            while ($row = $result->fetch_assoc()) {
                array_push($prodArray, [
                    'id' => $row['id'],
                    'name' => $row['name'],
                    'desc' => $row['description'],
                    'price' => $row['price'],
                    'onOffer' => $row['onOffer'],
                    'imgPath' => $row['imgPath'],
                    'cat' => $row['cat']
                ]);
            }
            echo json_encode($prodArray);
        }
    } catch (Exception $e) {
        return false;
    }
}

if ($_postData['action'] == 'GET_USERORDERHISTORY') {
    $orderArray = [];
    $dirtyuserID = $_postData['User'];

    if (preg_match('/^[0-9]{1,3}$/', stripcslashes(trim($dirtyuserID)))) {

        $cUserID = $conn->real_escape_string(trim($dirtyuserID));

        $cleanUserID = strip_tags($cUserID);

        try {
            $stmt = $conn->prepare("SELECT p.name, sd.qty, sd.productPrice FROM sales as s JOIN salesdetails AS sd ON s.id = sd.salesId JOIN products AS p ON sd.productId = p.id WHERE s.userId = ? AND s.paid = 1;");
            $stmt->bind_param("i", $cleanUserID);
            $stmt->execute();
            if ($result = $stmt->get_result()) {
                while ($row = $result->fetch_assoc()) {
                    array_push($orderArray, [
                        'name' => $row['name'],
                        'qty' => $row['qty'],
                        'price' => $row['productPrice']
                    ]);
                }
                echo json_encode($orderArray);
            }
        } catch (Exception $e) {
            return false;
        }
    }
}

if ($_postData['action'] == 'GET_USERSALESHISTORY') {
    $purchaseSalesArray = [];
    $dirtyuserID = $_postData['User'];

    if (preg_match('/^[0-9]{1,3}$/', stripcslashes(trim($dirtyuserID)))) {

        $cUserID = $conn->real_escape_string(trim($dirtyuserID));

        $cleanUserID = strip_tags($cUserID);

        try {
            $stmt = $conn->prepare("SELECT id, DATE_FORMAT(saleDate, \"%W %d %M %Y\") as saleDate, (SELECT SUM(totalPrice) FROM salesdetails GROUP BY salesId) as totalPrice FROM shukers.sales WHERE userId = ? ORDER BY saleDate ASC;");
            $stmt->bind_param("i", $cleanUserID);
            $stmt->execute();
            if ($result = $stmt->get_result()) {
                while ($row = $result->fetch_assoc()) {
                    array_push($purchaseSalesArray, [
                        'id' => $row['id'],
                        'saleDate' => $row['saleDate'],
                        'totalPrice' => $row['totalPrice']
                    ]);
                }
                echo json_encode($purchaseSalesArray);
            }
        } catch (Exception $e) {
            return false;
        }
    }
}


if ($_postData['action'] == 'ADD_PRODUCTTOBASKET') {

    $dirtyprodID = $_postData['Product'];
    $dirtyuserID = $_postData['User'];
    $dirtyQty = $_postData['Qty'];

    if (preg_match('/^[0-9]{1,3}$/', stripcslashes(trim($dirtyprodID))) &&
        preg_match('/^[0-9]{1,3}$/', stripcslashes(trim($dirtyuserID))) &&
        preg_match('/^[0-9]{1,2}$/', stripcslashes(trim($dirtyQty)))) {

        $cProdID = $conn->real_escape_string(trim($dirtyprodID));
        $cUserID = $conn->real_escape_string(trim($dirtyuserID));
        $cQty = $conn->real_escape_string(trim($dirtyQty));

        $cleanProductID = strip_tags($cProdID);
        $cleanUserID = strip_tags($cUserID);
        $cleanQty = strip_tags($cQty);

        try {
            $stmt = $conn->prepare("
INSERT INTO sales(userId,saleDate,paid) VALUES(?,CURDATE(),0);
INSERT INTO salesdetails(salesId,productId,productPrice,qty) 
VALUES(LAST_INSERT_ID(),?,(select price from products where id=?),?);");
            $stmt->bind_param("i", $cleanUserID);
            $stmt->bind_param("i", $cleanProductID);
            $stmt->bind_param("i", $cleanProductID);
            $stmt->bind_param("i", $cleanQty);

            if ($stmt->execute()) {
                echo json_encode(['Message' => 'Product Added to Basket', 'success' => true]);
            } else {
                echo json_encode(['Message' => 'Could not add this Product to Basket', 'success' => false]);
            }

        } catch (Exception $e) {
            echo json_encode(['Message' => 'Could not add this Product', 'success' => false]);
        }


    }

}