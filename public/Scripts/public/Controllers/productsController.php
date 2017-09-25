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
        $stmt = $conn->prepare("SELECT p.id, p.name, p.description, p.price, p.onOffer, p.imgPath, c.cat FROM products AS p JOIN category AS c ON p.catId = c.id ORDER BY rand() LIMIT 3");
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
            $stmt->bind_param('s', $cleanCategory);
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
            $stmt = $conn->prepare("SELECT p.id, p.name, p.description, p.price, p.onOffer, p.3for10, p.imgPath, c.cat FROM products AS p JOIN category AS c ON p.catId = c.id WHERE c.cat=?");
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
                        'threeForTen' => $row['3for10'],
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
        $stmt = $conn->prepare("SELECT p.id, p.name, p.description, p.price, p.onOffer, p.imgPath, c.cat FROM products AS p JOIN category AS c ON p.catId = c.id");
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

if ($_postData['action'] == 'SEARCH_PRODUCTS') {
    $prodArray = [];
    $dirtyProdName = $_postData['prodName'];

    if (preg_match('/^[A-Za-z]{1,30}$/', stripcslashes(trim($dirtyProdName)))) {

        $cProdName = $conn->real_escape_string(trim($dirtyProdName));
        $cleanProdName = strip_tags($cProdName);
        $ProdName = '%' . $cleanProdName . '%';

        try {
            $stmt = $conn->prepare("SELECT name, price, imgPath FROM products WHERE name LIKE ?");
            $stmt->bind_param('s', $ProdName);
            $stmt->execute();
            if ($result = $stmt->get_result()) {
                while ($row = $result->fetch_assoc()) {
                    array_push($prodArray, [
                        'title' => $row['name'],
//                        'description' => $row['description'],
                        'price' => $row['price'],
                        'image' => 'http://localhost/shukers/public/Images/Products/' . $row['imgPath'],
                    ]);
                }
                echo json_encode($prodArray);
            }
        } catch (Exception $e) {
            return false;
        }
    }
}

if ($_postData['action'] == 'GET_PRODUCTMODALDETAILS') {
    $prodArray = [];
    $dirtyProdName = $_postData['prodName'];


    $cProdName = $conn->real_escape_string(trim($dirtyProdName));
    $cleanProdName = strip_tags($cProdName);
    $ProdName = '"' . $cleanProdName . '"';


    try {
        $stmt = $conn->prepare("SELECT id, name, description, price, imgPath FROM products WHERE name = ? LIMIT 1");
        $stmt->bind_param('s', $cleanProdName);
        $stmt->execute();
        if ($result = $stmt->get_result()) {
            while ($row = $result->fetch_assoc()) {
                array_push($prodArray, [
                    'id' => $row['id'],
                    'title' => $row['name'],
                    'description' => $row['description'],
                    'price' => $row['price'],
                    'image' => $row['imgPath'],
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
            $stmt = $conn->prepare("SELECT s.id, p.name, sd.qty, sd.productPrice, SUM(sd.qty * sd.productPrice) AS subTotal FROM sales AS s JOIN salesdetails AS sd ON s.id = sd.salesId JOIN products AS p ON sd.productId = p.id WHERE s.userId = ? AND s.paid = 1 GROUP BY p.id;");
            $stmt->bind_param("i", $cleanUserID);
            $stmt->execute();
            if ($result = $stmt->get_result()) {
                while ($row = $result->fetch_assoc()) {
                    array_push($orderArray, [
                        'id' => $row['id'],
                        'name' => $row['name'],
                        'qty' => $row['qty'],
                        'price' => $row['productPrice'],
                        'subPrice' => $row['subTotal']
                    ]);
                }
                echo($row['id']);
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

        //TODO - Look at this to have several orders on without joining - currently shows individual orders but all order details ///// think about remove

        try {
            $stmt = $conn->prepare("SELECT id, DATE_FORMAT(saleDate, \"%W %d %M %Y\") AS saleDate, totalPrice FROM shukers.sales WHERE userId = ? AND paid = 1 ORDER BY saleDate ASC;");
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

if ($_postData['action'] == 'GET_USERBASKET') {
    $orderArray = [];
    $dirtyuserID = $_postData['User'];

    if (preg_match('/^[0-9]{1,3}$/', stripcslashes(trim($dirtyuserID)))) {

        $cUserID = $conn->real_escape_string(trim($dirtyuserID));

        $cleanUserID = strip_tags($cUserID);

        try {
            $stmt = $conn->prepare("SELECT s.id, sd.id AS salesDetailsID, p.name, sd.qty, sd.productPrice, SUM(sd.qty * sd.productPrice) AS subTotal, p.3for10 FROM sales AS s JOIN salesdetails AS sd ON s.id = sd.salesId JOIN products AS p ON sd.productId = p.id WHERE s.userId = ? AND s.paid = 0 AND s.collection = 0 GROUP BY p.id ORDER BY p.price;");
            $stmt->bind_param("i", $cleanUserID);
            $stmt->execute();
            if ($result = $stmt->get_result()) {
                while ($row = $result->fetch_assoc()) {
                    array_push($orderArray, [
                        'id' => $row['id'],
                        'sdId' => $row['salesDetailsID'],
                        'name' => $row['name'],
                        'qty' => $row['qty'],
                        'price' => $row['productPrice'],
                        'subPrice' => $row['subTotal'],
                        'threeForTen' => boolval($row['3for10'])
                    ]);
                }
                echo json_encode($orderArray);

            }
        } catch (Exception $e) {
            return false;
        }
    }
}

if ($_postData['action'] == 'GET_USERBASKETTOTALPRICE') {
    $dirtyuserID = $_postData['User'];

    if (preg_match('/^[0-9]{1,3}$/', stripcslashes(trim($dirtyuserID)))) {

        $cUserID = $conn->real_escape_string(trim($dirtyuserID));

        $cleanUserID = strip_tags($cUserID);

        try {
            $stmt = $conn->prepare("SELECT totalPrice FROM shukers.sales WHERE userId = ? AND paid = 0 AND collection = 0;");
            $stmt->bind_param("i", $cleanUserID);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            $BasketTotalPrice = (double)$row['totalPrice'];

            echo $BasketTotalPrice;


        } catch (Exception $e) {
            return false;
        }
    }
}

if ($_postData['action'] == 'GET_SALEID') {
    $saleIDArray = null;
    $dirtyuserID = $_postData['User'];

    if (preg_match('/^[0-9]{1,3}$/', stripcslashes(trim($dirtyuserID)))) {

        $cUserID = $conn->real_escape_string(trim($dirtyuserID));

        $cleanUserID = strip_tags($cUserID);

        try {
            $stmt = $conn->prepare("SELECT id FROM shukers.sales WHERE paid = 0 AND userId = ?");
            $stmt->bind_param("i", $cleanUserID);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            $SalesID = (int)$row['id'];

            echo($SalesID);

        } catch (Exception $e) {
            return false;
        }
    }
}

if ($_postData['action'] == 'REMOVEPRODUCTFROMBASKET') {
    $saleIDArray = null;
    $dirtyID = $_postData['id'];

    if (preg_match('/^[0-9]{1,3}$/', stripcslashes(trim($dirtyID)))) {

        $cID = $conn->real_escape_string(trim($dirtyID));

        $cleanID = strip_tags($cID);

        $SalesID = $conn->real_escape_string(strip_tags(trim($_postData['salesId'])));

        try {
            $stmt = $conn->prepare("DELETE FROM salesdetails WHERE id = ?");
            $stmt->bind_param("i", $cleanID);

            if ($stmt->execute()) {
                echo json_encode(['Message' => 'product deleted', 'success' => true]);
                $stmt = $conn->prepare("UPDATE sales SET totalPrice = (SELECT SUM(totalPrice) FROM salesdetails WHERE salesID = ?) WHERE `id` = ?;");
                $stmt->bind_param("ii", $SalesID, $SalesID);
                if ($stmt->execute()) {
                    echo json_encode(['Message' => 'Price Updated', 'success' => true]);
                } else {
                    echo json_encode(['Message' => 'Sales table unable to update', 'success' => false]);
                }
            }

        } catch (Exception $e) {
            return false;
        }
    }
}

if ($_postData['action'] == 'USEREXIST') {
    $dirtyuser = $_postData['userName'];
    $loginexist = 0;

    if (preg_match('/^[A-Za-z0-9]{1,30}$/', stripcslashes(trim($dirtyuser)))) {

        $cUser = $conn->real_escape_string(trim($dirtyuser));

        $cleanUser = strip_tags($cUser);

        try {
            $stmt = $conn->prepare("SELECT id, count(loginId) AS user FROM users WHERE loginId = ?");
            $stmt->bind_param("s", $cleanUser);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            $loginCount = (int)$row['user'];
            if ($loginCount === 1) {
                $loginexist = true;
                $userID = (int)$row['id'];
            } else {
                $loginexist = 0;
                $userID = 0;
            }
            echo($userID);

        } catch (Exception $e) {
            return false;
        }
    }
}

if ($_postData['action'] == 'ADD_PRODUCTTOBASKET') {

    $dirtyprodID = $_postData['Product'];
    $dirtyQty = $_postData['Qty'];
    $SalesID = $_postData['saleID'];
    $dirtyuserID = $_postData['User'];

    if ($SalesID == null) {
        $SalesID = null;
    }

    if (preg_match('/^[0-9]{1,3}$/', stripcslashes(trim($dirtyprodID))) &&
        preg_match('/^[0-9]{1,3}$/', stripcslashes(trim($dirtyuserID))) &&
        preg_match('/^[0-9]{1,2}$/', stripcslashes(trim($dirtyQty)))) {

        $cProdID = $conn->real_escape_string(trim($dirtyprodID));
        $cQty = $conn->real_escape_string(trim($dirtyQty));
        $cUserID = $conn->real_escape_string(trim($dirtyuserID));

        $cleanProductID = strip_tags($cProdID);
        $cleanQty = strip_tags($cQty);
        $cleanUserID = strip_tags($cUserID);


        if ($SalesID == null) {

            try {
                $stmt = $conn->prepare("INSERT INTO sales(userId,saleDate,paid) VALUES(?,CURDATE(),0);");
                $stmt->bind_param("i", $cleanUserID);

                if ($stmt->execute()) {
                    echo json_encode(['Message' => 'New sale created', 'success' => true]);

                    $stmt = $conn->prepare("INSERT INTO salesdetails(salesId,productId,productPrice,qty) VALUES(LAST_INSERT_ID(),?,(SELECT price FROM products WHERE id=?),?);");
                    $stmt->bind_param("iii", $cleanProductID, $cleanProductID, $cleanQty);

                    if ($stmt->execute()) {
                        echo json_encode(['Message' => 'product added to new sale', 'success' => true]);
                    } else {
                        echo json_encode(['Message' => 'unable to add product to new sale', 'success' => false]);
                    }
                } else {
                    echo json_encode(['Message' => 'unable to create new sale', 'success' => false]);
                }

            } catch (Exception $e) {
                echo json_encode(['Message' => 'Could not add this Product', 'success' => false]);
            }

        } else {
            try {
                $stmt = $conn->prepare("INSERT INTO salesdetails (salesId, productId, productPrice, qty) VALUES (?, ?, (SELECT price FROM products WHERE id = ?), ?);");
                $stmt->bind_param("iiii", $SalesID, $cleanProductID, $cleanProductID, $cleanQty);

                if ($stmt->execute()) {
                    echo json_encode(['Message' => 'Product Added to Basket', 'success' => true]);
                    $stmt = $conn->prepare("UPDATE sales SET totalPrice = (SELECT SUM(totalPrice) FROM salesdetails WHERE salesID = ?) WHERE `id` = ?;");
                    $stmt->bind_param("ii", $SalesID, $SalesID);

                    if ($stmt->execute()) {
                        echo json_encode(['Message' => 'Sales Table updated', 'success' => true]);
                    } else {
                        echo json_encode(['Message' => 'Sales table unable to update', 'success' => false]);
                    }
                } else {
                    echo json_encode(['Message' => 'Could not add this Product to Basket', 'success' => false]);
                }

            } catch (Exception $e) {
                echo json_encode(['Message' => 'Could not add this Product', 'success' => false]);
            }
        }

    }

}

if ($_postData['action'] == 'FORGOT_PASSWORD') {

    $dirtyuser = $_postData['userName'];
    $dirtypass = $_postData['pass'];
    $dirtyconpass = $_postData['conPass'];

    if (preg_match('/^[0-9]{1,3}$/', stripcslashes(trim($dirtyuser))) &&
        preg_match('/^[A-Za-z0-9\-!"£$%\^&*()]{5,15}$/',
            stripcslashes(trim($dirtypass)))) {

        $cName = $conn->real_escape_string(trim($dirtyuser));
        $cleanName = strip_tags($cName);
        $cPass = $conn->real_escape_string(trim($dirtypass));
        $cleanPass = strip_tags($cPass);
        $cCPass = $conn->real_escape_string(trim($dirtyconpass));
        $cleanConPass = strip_tags($cCPass);
        if ($cleanPass === $cleanConPass) {
            try {
                $passHash = password_hash($cleanPass, 1);
                $stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
                $stmt->bind_param("si", $passHash, $cleanName);
                if ($stmt->execute()) {
                    echo $cleanName;
                } else {
                    echo 0;
                }
            } catch (Exception $e) {
                return false;
            }
        }
    } else echo 0;
}

if ($_postData['action'] == 'CHANGE_PASSWORD') {

    $dirtyuser = $_postData['userID'];
    $dirtycurPass = $_postData['currPass'];
    $dirtypass = $_postData['pass'];
    $dirtyconpass = $_postData['conPass'];

    if (preg_match('/^[0-9]{1,3}$/', stripcslashes(trim($dirtyuser))) &&
        preg_match('/^[A-Za-z0-9\-!"£$%\^&*()]{5,15}$/',
            stripcslashes(trim($dirtypass))) &&
        preg_match('/^[A-Za-z0-9\-!"£$%\^&*()]{5,15}$/',
            stripcslashes(trim($dirtycurPass)))) {

        $cName = $conn->real_escape_string(trim($dirtyuser));
        $cleanName = strip_tags($cName);
        $curPass = $conn->real_escape_string(trim($dirtycurPass));
        $cleancurPass = strip_tags($curPass);
        $cPass = $conn->real_escape_string(trim($dirtypass));
        $cleanPass = strip_tags($cPass);
        $cCPass = $conn->real_escape_string(trim($dirtyconpass));
        $cleanConPass = strip_tags($cCPass);

        try {
            $stmt = $this->conn->prepare("SELECT password FROM users WHERE id = ?");
            $stmt->bind_param("i", $cleanName);
            $stmt->execute();
            $res = $stmt->get_result();
            $row = $res->fetch_assoc();
            $hashPass = $row['password'];
            if (password_verify($cleancurPass, $hashPass) == 1 && $cleanPass === $cleanConPass) {
                try {
                    $passHash = password_hash($cleanPass, 1);
                    $curPassHash = password_hash($cleancurPass, 1);
                    $stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
                    $stmt->bind_param("si", $passHash, $cleanName);
                    if ($stmt->execute()) {
                        echo $cleanName;
                    } else {
                        echo 0;
                    }
                } catch (Exception $e) {
                    return false;
                }
            }
        } catch (Exception $e) {
            return false;
        }
    } else echo 0;
}

if ($_postData['action'] == 'NEW_USER') {

    $firstName = $conn->real_escape_string(strip_tags(trim($_postData['firstName'])));
    $lastName = $conn->real_escape_string(strip_tags(trim($_postData['lastName'])));
    $userName = $conn->real_escape_string(strip_tags(trim($_postData['userName'])));
    $password = $conn->real_escape_string(strip_tags(trim($_postData['password'])));
    $contactNumber = $conn->real_escape_string(strip_tags(trim($_postData['contactNumber'])));
    $email = $conn->real_escape_string(strip_tags(trim($_postData['email'])));
    $houseNum = $conn->real_escape_string(strip_tags(trim($_postData['houseNum'])));
    $address1 = $conn->real_escape_string(strip_tags(trim($_postData['address1'])));
    $address2 = $conn->real_escape_string(strip_tags(trim($_postData['address2'])));
    $postCode = $conn->real_escape_string(strip_tags(trim($_postData['postCode'])));
    $DelhouseNum = $conn->real_escape_string(strip_tags(trim($_postData['DelhouseNum'])));
    $Deladdress1 = $conn->real_escape_string(strip_tags(trim($_postData['Deladdress1'])));
    $Deladdress2 = $conn->real_escape_string(strip_tags(trim($_postData['Deladdress2'])));
    $DelpostCode = $conn->real_escape_string(strip_tags(trim($_postData['DelpostCode'])));
    $deliveryAddressChecked = $conn->real_escape_string(strip_tags(trim($_postData['deliveryAddressChecked'])));
    $homeAddressChecked = $conn->real_escape_string(strip_tags(trim($_postData['homeAddressChecked'])));
    $hashPass = password_hash($password, PASSWORD_DEFAULT);

    try {
        $stmt = $conn->prepare("INSERT INTO users(loginId, forname, surname, password, contactNumber, email ) VALUES(?,?,?,?,?,?)");
        $stmt->bind_param("ssssss", $userName, $firstName, $lastName, $hashPass, $contactNumber, $email);
        $stmt->execute();

        $userID = $conn->insert_id;
        $stmt->close();

        if ($deliveryAddressChecked == true) {
            $deliveryAddressChecked = 1;
            $homeAddressChecked = 1;

            $stmt = $conn->prepare("INSERT INTO address (userId, houseNum, firstLine, secondline, postcode, home, delivery ) VALUES(?,?,?,?,?,?,?)");
            $stmt->bind_param("iisssii", $userID, $houseNum, $address1, $address2, $postCode, $homeAddressChecked, $deliveryAddressChecked);
            $stmt->execute();
            echo('home and delivery address assigned');

        } elseif ($deliveryAddressChecked == false) {
            $deliveryAddressChecked = 0;
            $homeAddressChecked = 1;

            $stmt = $conn->prepare("INSERT INTO address (userId, houseNum, firstLine, secondline, postcode, home, delivery ) VALUES(?,?,?,?,?,?,?)");
            $stmt->bind_param("iisssii", $userID, $houseNum, $address1, $address2, $postCode, $homeAddressChecked, $deliveryAddressChecked);
            $stmt->execute();

            $deliveryAddressChecked = 1;
            $homeAddressChecked = 0;

            $stmt = $conn->prepare("INSERT INTO address (userId, houseNum, firstLine, secondline, postcode, home, delivery ) VALUES(?,?,?,?,?,?,?)");
            $stmt->bind_param("iisssii", $userID, $DelhouseNum, $Deladdress1, $Deladdress2, $DelpostCode, $homeAddressChecked, $deliveryAddressChecked);
            $stmt->execute();
            echo('home and delivery address different');
        }

    } catch (Exception $e) {
        return false;
    }

}

if ($_postData['action'] == 'CHECK_USER_NAME') {

    $UserName = $conn->real_escape_string(strip_tags(trim($_postData['userName'])));

    try {
        $stmt = $conn->prepare("SELECT loginId FROM users WHERE loginId=?");
        $stmt->bind_param("s", $UserName);
        $stmt->execute();

        if ($result = $stmt->get_result()) {
            if ($result->num_rows == 0) {
                echo json_encode(['Message' => 'ok', 'success' => true]);
            } else {
                echo json_encode(['Message' => 'The user name is already taken', 'success' => true]);
            }
        }

    } catch (Exception $e) {
        echo json_encode(['Message' => 'Something went wrong!', 'success' => false]);
    }
}

if ($_postData['action'] == 'PAY_INSTORE') {

    $SaleID = $conn->real_escape_string(strip_tags(trim($_postData['saleID'])));

    try {
        $stmt = $conn->prepare("UPDATE sales SET collection = 1 WHERE id = ?");
        $stmt->bind_param("s", $SaleID);
        if ($stmt->execute()) {
            echo json_encode(['Message' => 'Order being processed for collection', 'success' => true]);
        } else {
            echo json_encode(['Message' => 'Order unable to be processed for collection', 'success' => false]);
        }
    } catch (Exception $e) {
        echo json_encode(['Message' => 'Something went wrong!', 'success' => false]);
    }
}

if ($_postData['action'] == 'CHECK_DELIVERYADDRESS') {
    $delAddress = [];
    $dirtyuserID = $_postData['User'];

    if (preg_match('/^[0-9]{1,3}$/', stripcslashes(trim($dirtyuserID)))) {

        $cUserID = $conn->real_escape_string(trim($dirtyuserID));

        $cleanUserID = strip_tags($cUserID);

        try {
            $stmt = $conn->prepare("SELECT houseNum, firstLine, secondLine, postcode FROM address WHERE userId = ? AND delivery = 0 AND home = 1;");
            $stmt->bind_param("i", $cleanUserID);
            $stmt->execute();

            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            $rowcount = (int)$row['houseNum'];
            if ($rowcount === 1) {
                array_push($delAddress, [
                    'delAddress' => true,
                    'houseNum' => $row['houseNum'],
                    'firstLine' => $row['firstLine'],
                    'secondLine' => $row['secondLine'],
                    'postCode' => $row['postcode']
                ]);

                echo json_encode($delAddress);
            } else return null;

        } catch (Exception $e) {
            return null;
        }
    }
}

if ($_postData['action'] == 'UPDATE_ADDRESS') {

    $firstName = $conn->real_escape_string(strip_tags(trim($_postData['firstName'])));
    $lastName = $conn->real_escape_string(strip_tags(trim($_postData['lastName'])));
    $userID = $conn->real_escape_string(strip_tags(trim($_postData['userID'])));
    $contactNumber = $conn->real_escape_string(strip_tags(trim($_postData['contactNumber'])));
    $email = $conn->real_escape_string(strip_tags(trim($_postData['email'])));
    $houseNum = $conn->real_escape_string(strip_tags(trim($_postData['houseNum'])));
    $address1 = $conn->real_escape_string(strip_tags(trim($_postData['address1'])));
    $address2 = $conn->real_escape_string(strip_tags(trim($_postData['address2'])));
    $postCode = $conn->real_escape_string(strip_tags(trim($_postData['postCode'])));
    $DelhouseNum = $conn->real_escape_string(strip_tags(trim($_postData['DelhouseNum'])));
    $Deladdress1 = $conn->real_escape_string(strip_tags(trim($_postData['Deladdress1'])));
    $Deladdress2 = $conn->real_escape_string(strip_tags(trim($_postData['Deladdress2'])));
    $DelpostCode = $conn->real_escape_string(strip_tags(trim($_postData['DelpostCode'])));
    $deliveryAddressChecked = $conn->real_escape_string(strip_tags(trim($_postData['deliveryAddressChecked'])));

    try {
        $stmt = $conn->prepare("DELETE FROM address WHERE userId = ?");
        $stmt->bind_param("i", $userID);
        $stmt->execute();

        if ($deliveryAddressChecked == true) {
            $deliveryAddressChecked = 1;
            $homeAddressChecked = 1;

            $stmt = $conn->prepare("INSERT INTO address (userId, houseNum, firstLine, secondline, postcode, home, delivery ) VALUES(?,?,?,?,?,?,?)");
            $stmt->bind_param("iisssii", $userID, $houseNum, $address1, $address2, $postCode, $homeAddressChecked, $deliveryAddressChecked);
            $stmt->execute();
            echo json_encode(['Message' => 'Address Updated', 'success' => true]);

        } elseif ($deliveryAddressChecked == false) {
            $deliveryAddressChecked = 0;
            $homeAddressChecked = 1;

            $stmt = $conn->prepare("INSERT INTO address (userId, houseNum, firstLine, secondline, postcode, home, delivery ) VALUES(?,?,?,?,?,?,?)");
            $stmt->bind_param("iisssii", $userID, $houseNum, $address1, $address2, $postCode, $homeAddressChecked, $deliveryAddressChecked);
            $stmt->execute();

            $deliveryAddressChecked = 1;
            $homeAddressChecked = 0;

            $stmt = $conn->prepare("INSERT INTO address (userId, houseNum, firstLine, secondline, postcode, home, delivery ) VALUES(?,?,?,?,?,?,?)");
            $stmt->bind_param("iisssii", $userID, $DelhouseNum, $Deladdress1, $Deladdress2, $DelpostCode, $homeAddressChecked, $deliveryAddressChecked);
            $stmt->execute();
            echo json_encode(['Message' => 'Address Updated', 'success' => true]);

        }

    } catch (Exception $e) {
        return false;
    }

}