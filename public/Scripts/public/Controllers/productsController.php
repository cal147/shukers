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
        $stmt = $conn->prepare("SELECT name, price, imgPath FROM products WHERE forSale = 1 AND onOffer = 1 ORDER BY rand() LIMIT 6");
        $stmt->execute();

        if ($result = $stmt->get_result()) {
            while ($row = $result->fetch_assoc()) {
                array_push($prodArray, [
                    'name' => $row['name'],
                    'price' => $row['price'],
                    'imgPath' => $row['imgPath'],
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

    if (preg_match('/^[A-Za-z0-9\s]{2,20}$/', stripcslashes(trim($dirtyProd)))) {

        $cProd = $conn->real_escape_string(trim($dirtyProd));
        $cleanProd = strip_tags($cProd);
        $productArray = [];
        try {
            $stmt = $conn->prepare("SELECT p.id, p.name, p.description, p.price, p.onOffer, p.3for10, p.imgPath, c.cat, p.units FROM products AS p JOIN category AS c ON p.catId = c.id WHERE c.cat=? AND p.forSale = 1");
            $stmt->bind_param("s", $cleanProd);
            $stmt->execute();

            if ($result = $stmt->get_result()) {
                while ($row = $result->fetch_assoc()) {
                    $desc = $row['description'];
                    $descNoTags = str_replace('\n', "\r\n", $desc);
                    array_push($productArray, [
                        'id' => $row['id'],
                        'name' => $row['name'],
                        'desc' => $descNoTags,
                        'price' => $row['price'],
                        'onOffer' => $row['onOffer'],
                        'threeForTen' => $row['3for10'],
                        'imgPath' => $row['imgPath'],
                        'cat' => $row['cat'],
                        'units' => $row['units']
                    ]);
                }
            }
            echo json_encode($productArray);
        } catch (Exception $e) {
            echo('fail');
            return false;
        }
    }
}

if ($_postData['action'] == 'GET_THREEFORTEN') {

    $productArray = [];
    try {
        $stmt = $conn->prepare("SELECT id, name, price, description, onOffer, 3for10, imgPath, units FROM products WHERE forSale = 1 AND 3for10 = 1");
        $stmt->execute();

        if ($result = $stmt->get_result()) {
            while ($row = $result->fetch_assoc()) {
                $desc = $row['description'];
                $descNoTags = str_replace('\n', "\r\n", $desc);
                array_push($productArray, [
                    'id' => $row['id'],
                    'name' => $row['name'],
                    'desc' => $descNoTags,
                    'price' => $row['price'],
                    'onOffer' => $row['onOffer'],
                    'threeForTen' => $row['3for10'],
                    'imgPath' => $row['imgPath'],
                    'units' => $row['units']
                ]);
            }
        }
        echo json_encode($productArray);
    } catch (Exception $e) {
        echo('fail');
        return false;
    }
}

if ($_postData['action'] == 'GET_OFFERS') {

    $productArray = [];
    try {
        $stmt = $conn->prepare("SELECT id, name, price, description, onOffer, 3for10, imgPath, units FROM products WHERE forSale = 1 AND onOffer = 1");
        $stmt->execute();

        if ($result = $stmt->get_result()) {
            while ($row = $result->fetch_assoc()) {
                $desc = $row['description'];
                $descNoTags = str_replace('\n', "\r\n", $desc);
                array_push($productArray, [
                    'id' => $row['id'],
                    'name' => $row['name'],
                    'desc' => $descNoTags,
                    'price' => $row['price'],
                    'onOffer' => $row['onOffer'],
                    'threeForTen' => $row['3for10'],
                    'imgPath' => $row['imgPath'],
                    'units' => $row['units']
                ]);
            }
        }
        echo json_encode($productArray, JSON_HEX_TAG);
    } catch (Exception $e) {
        echo('fail');
        return false;
    }
}

if ($_postData['action'] == 'GET_PRODUCTS') {
    $prodArray = [];
    try {
        $stmt = $conn->prepare("SELECT p.id, p.name, p.description, p.price, p.onOffer, p.imgPath, c.cat FROM products AS p JOIN category AS c ON p.catId = c.id WHERE p.forSale = 1");
        $stmt->execute();
        if ($result = $stmt->get_result()) {
            while ($row = $result->fetch_assoc()) {
                $desc = $row['description'];
                $descNoTags = str_replace('\n', "\r\n", $desc);
                array_push($prodArray, [
                    'id' => $row['id'],
                    'name' => $row['name'],
                    'desc' => $descNoTags,
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
            $stmt = $conn->prepare("SELECT name, price, imgPath FROM products WHERE name LIKE ? AND forSale = 1");
            $stmt->bind_param('s', $ProdName);
            $stmt->execute();
            if ($result = $stmt->get_result()) {
                while ($row = $result->fetch_assoc()) {
                    array_push($prodArray, [
                        'title' => $row['name'],
                        'price' => $row['price'],
                        'image' => '/Images/Products/' . $row['imgPath'],
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
        $stmt = $conn->prepare("SELECT id, name, description, price, imgPath, units FROM products WHERE name = ? LIMIT 1");
        $stmt->bind_param('s', $cleanProdName);
        $stmt->execute();
        if ($result = $stmt->get_result()) {
            while ($row = $result->fetch_assoc()) {
                $desc = $row['description'];
                $descNoTags = str_replace('\n', "\r\n", $desc);
                array_push($prodArray, [
                    'id' => $row['id'],
                    'name' => $row['name'],
                    'description' => $descNoTags,
                    'price' => $row['price'],
                    'image' => $row['imgPath'],
                    'units' => $row['units']
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

        try {
            $stmt = $conn->prepare("SELECT id, DATE_FORMAT(saleDate, \"%W %d %M %Y\") AS saleDate, totalPrice FROM sales WHERE userId = ? AND paid = 1 ORDER BY saleDate ASC;");
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
            $stmt = $conn->prepare("SELECT s.id, sd.id AS salesDetailsID, p.name, sd.qty, p.price , SUM(sd.qty * p.price) AS subTotal, p.3for10, p.units FROM sales AS s JOIN salesdetails AS sd ON s.id = sd.saleId JOIN products AS p ON sd.productId = p.id WHERE s.userId = ? AND s.paid = 0 AND s.collection = 0 GROUP BY s.id, sd.id, p.id ORDER BY sd.id");
            $stmt->bind_param("i", $cleanUserID);
            $stmt->execute();
            if ($result = $stmt->get_result()) {
                while ($row = $result->fetch_assoc()) {
                    array_push($orderArray, [
                        'id' => $row['id'],
                        'sdId' => $row['salesDetailsID'],
                        'name' => $row['name'],
                        'qty' => $row['qty'],
                        'price' => $row['price'],
                        'subPrice' => $row['subTotal'],
                        'threeForTen' => boolval($row['3for10']),
                        'units' => $row['units']
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
            $stmt = $conn->prepare("SELECT sum(sd.qty * p.price) AS totalPrice FROM salesdetails AS sd JOIN products AS p ON sd.productId = p.id JOIN sales AS s ON sd.saleId = s.id WHERE s.id = ? AND s.paid = 0");
            $stmt->bind_param("i", $cleanUserID);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            $BasketTotalPrice = $row['totalPrice'];

            echo json_encode(["totalPrice" => $BasketTotalPrice]);


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
            $stmt = $conn->prepare("SELECT id FROM sales WHERE paid = 0 AND userId = ?");
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
                //echo json_encode(['Message' => 'product deleted', 'success' => true]);
                $stmt = $conn->prepare("UPDATE sales SET totalPrice = (SELECT sum(sd.qty * p.price) FROM salesdetails AS sd JOIN products AS p ON sd.productId = p.id WHERE saleId = ?) WHERE `id` = ?;");
                $stmt->bind_param("ii", $SalesID, $SalesID);
                if ($stmt->execute()) {
                    $stmt = $conn->prepare("DELETE FROM sales WHERE totalPrice IS NULL AND id = ?;");
                    $stmt->bind_param("i", $SalesID);
                    if ($stmt->execute()) {
//                        echo json_encode(['Message' => 'sale removed', 'success' => true]);
                    } else {
//                        echo json_encode(['Message' => 'sale unable to be removed', 'success' => false]);
                    }
                    echo json_encode(['Message' => 'item removed', 'success' => true]);
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
            $stmt = $conn->prepare("SELECT id FROM users WHERE loginId = ?  ");
            $stmt->bind_param("s", $cleanUser);
            $stmt->execute();
            $result = $stmt->get_result();
            $row = $result->fetch_assoc();
            $userID = (int)$row['id'];
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


    if (preg_match('/^[0-9]{1,3}$/', stripcslashes(trim($dirtyprodID))) &&
        preg_match('/^[0-9]{1,3}$/', stripcslashes(trim($dirtyuserID))) &&
        preg_match('/^[0-9]{1,2}$/', stripcslashes(trim($dirtyQty)))) {

        $cProdID = $conn->real_escape_string(trim($dirtyprodID));
        $cQty = $conn->real_escape_string(trim($dirtyQty));
        $cUserID = $conn->real_escape_string(trim($dirtyuserID));

        $cleanProductID = strip_tags($cProdID);
        $cleanQty = strip_tags($cQty);
        $cleanUserID = strip_tags($cUserID);


        if ($SalesID == 0) {

            try {
                $stmt = $conn->prepare("INSERT INTO sales(userId,saleDate,paid) VALUES(?,CURDATE(),0);");
                $stmt->bind_param("i", $cleanUserID);

                if ($stmt->execute()) {
                    echo json_encode(['Message' => 'New sale created', 'success' => true]);

                    $salesID = $conn->insert_id;

                    $stmt = $conn->prepare("INSERT INTO salesdetails(saleId,productId,qty) VALUES(LAST_INSERT_ID(),?,?);");
                    $stmt->bind_param("ii", $cleanProductID, $cleanQty);

                    if ($stmt->execute()) {
                        echo json_encode(['Message' => 'product added to new sale', 'success' => true]);

                        $stmt = $conn->prepare("UPDATE sales SET totalPrice = (SELECT sum(sd.qty * p.price) FROM salesdetails AS sd JOIN products AS p ON sd.productId = p.id WHERE saleId = ?) WHERE `id` = ?");
                        $stmt->bind_param("ii", $salesID, $salesID);

                        if ($stmt->execute()) {
                            echo json_encode(['Message' => 'Sales Table Price updated', 'success' => true]);
                        } else {
                            echo json_encode(['Message' => 'Sales table unable to update', 'success' => false]);
                        }

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
                $stmt = $conn->prepare("INSERT INTO salesdetails (saleId, productId, qty) VALUES (?, ?, ?)");
                $stmt->bind_param("iii", $SalesID, $cleanProductID, $cleanQty);

                if ($stmt->execute()) {
                    echo json_encode(['Message' => 'Product Added to Basket', 'success' => true]);
                    $stmt = $conn->prepare("UPDATE sales SET totalPrice = (SELECT sum(sd.qty * p.price) FROM salesdetails AS sd JOIN products AS p ON sd.productId = p.id WHERE saleId = ?) WHERE `id` = ?");
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
            stripcslashes(trim($dirtypass))))

        $cName = $conn->real_escape_string(trim($dirtyuser));
    $cleanName = strip_tags($cName);
    $curPass = $conn->real_escape_string(trim($dirtycurPass));
    $cleancurPass = strip_tags($curPass);
    $cPass = $conn->real_escape_string(trim($dirtypass));
    $cleanPass = strip_tags($cPass);
    $cCPass = $conn->real_escape_string(trim($dirtyconpass));
    $cleanConPass = strip_tags($cCPass);

    try {
        $stmt = $conn->prepare("SELECT password FROM users WHERE id = ?");
        $stmt->bind_param("i", $cleanName);
        $stmt->execute();
        $res = $stmt->get_result();
        $row = $res->fetch_assoc();
        $hashPass = $row['password'];
        if (password_verify($cleancurPass, $hashPass) == 1) {
            if ($cleanPass === $cleanConPass) {
                try {
                    $passHash = password_hash($cleanPass, 1);
                    $stmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
                    $stmt->bind_param("si", $passHash, $cleanName);
                    if ($stmt->execute()) {
                        echo json_encode(['Message' => 'ok', 'success' => true]);
                    } else {
                        echo json_encode(['Message' => 'not changed', 'success' => false]);
                    }
                } catch (Exception $e) {
                    return false;
                }
            } else echo json_encode(['Message' => 'password not the same', 'success' => false]);
        } else echo json_encode(['Message' => 'current password wrong', 'success' => false]);
    } catch (Exception $e) {
        return false;
    }
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
            echo json_encode(['Message' => 'ok', 'success' => true]);

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
            echo json_encode(['Message' => 'ok', 'success' => true]);
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
    $price = $conn->real_escape_string(strip_tags(trim($_postData['price'])));

    try {
        $stmt = $conn->prepare("UPDATE sales SET collection = 1, totalPrice = ? WHERE id = ?");
        $stmt->bind_param("ds", $price, $SaleID);
        if ($stmt->execute()) {
            echo json_encode(['Message' => 'Order being processed for collection', 'success' => true]);
        } else {
            echo json_encode(['Message' => 'Order unable to be processed for collection', 'success' => false]);
        }
    } catch (Exception $e) {
        echo json_encode(['Message' => 'Something went wrong!', 'success' => false]);
    }
}

if ($_postData['action'] == 'GET_ADDRESS') {
    $Address = [];
    $HomeAddress = [];
    $dirtyuserID = $_postData['User'];

    if (preg_match('/^[0-9]{1,3}$/', stripcslashes(trim($dirtyuserID)))) {

        $cUserID = $conn->real_escape_string(trim($dirtyuserID));

        $cleanUserID = strip_tags($cUserID);

        try {
            $stmt = $conn->prepare("SELECT houseNum, firstLine, secondLine, postcode FROM address WHERE userId = ? AND delivery = 1 AND home = 1;");
            $stmt->bind_param("i", $cleanUserID);
            $stmt->execute();
            $result = $stmt->get_result();
            if (mysqli_num_rows($result) == 1) {
                $row = $result->fetch_assoc();
                array_push($Address, [
                    'houseNum' => $row['houseNum'],
                    'firstLine' => $row['firstLine'],
                    'secondLine' => $row['secondLine'],
                    'postCode' => $row['postcode'],
                    'deliveryAddress' => true
                ]);
                echo json_encode($Address);
            }
            $stmt = $conn->prepare("SELECT houseNum, firstLine, secondLine, postcode FROM address WHERE userId = ? AND delivery = 0 AND home = 1;");
            $stmt->bind_param("i", $cleanUserID);
            $stmt->execute();
            $result = $stmt->get_result();
            if (mysqli_num_rows($result) == 1) {
                $row = $result->fetch_assoc();
                array_push($HomeAddress, [
                    'houseNum' => $row['houseNum'],
                    'firstLine' => $row['firstLine'],
                    'secondLine' => $row['secondLine'],
                    'postCode' => $row['postcode'],
                    'deliveryAddress' => false
                ]);
            }
            $stmt = $conn->prepare("SELECT houseNum, firstLine, secondLine, postcode FROM address WHERE userId = ? AND delivery = 1 AND home = 0;");
            $stmt->bind_param("i", $cleanUserID);
            $stmt->execute();
            $result = $stmt->get_result();
            if (mysqli_num_rows($result) == 1) {
                $row = $result->fetch_assoc();
                array_push($HomeAddress, [
                    'delhouseNum' => $row['houseNum'],
                    'delfirstLine' => $row['firstLine'],
                    'delsecondLine' => $row['secondLine'],
                    'delpostCode' => $row['postcode']
                ]);
                echo json_encode($HomeAddress);
            }


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

        } else {
            $DelhouseNum = $conn->real_escape_string(strip_tags(trim($_postData['DelhouseNum'])));
            $Deladdress1 = $conn->real_escape_string(strip_tags(trim($_postData['Deladdress1'])));
            $Deladdress2 = $conn->real_escape_string(strip_tags(trim($_postData['Deladdress2'])));
            $DelpostCode = $conn->real_escape_string(strip_tags(trim($_postData['DelpostCode'])));
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

if ($_postData['action'] == 'PAYMENT_COMPLETE') {
    $saleIDArray = null;
    $dirtyuserID = $_postData['User'];

    if (preg_match('/^[0-9]{1,3}$/', stripcslashes(trim($dirtyuserID)))) {

        $cUserID = $conn->real_escape_string(trim($dirtyuserID));

        $cleanUserID = strip_tags($cUserID);

        try {
            $stmt = $conn->prepare("UPDATE sales SET paid = 1 WHERE userId = ?");
            $stmt->bind_param("i", $cleanUserID);
            if ($stmt->execute()) {
                echo json_encode(['Message' => 'Order Paid', 'success' => true]);
            } else {
                echo json_encode(['Message' => 'Order Not Paid', 'success' => false]);
            }

        } catch (Exception $e) {
            return false;
        }
    }
}

if ($_postData['action'] == 'DISCOUNT_PRICE') {

    $price = $conn->real_escape_string(strip_tags(trim($_postData['price'])));
    $saleID = $conn->real_escape_string(strip_tags(trim($_postData['saleID'])));

    echo $price;

    try {
        $stmt = $conn->prepare("UPDATE sales SET totalPrice = ? WHERE id = ?");
        $stmt->bind_param("di", $price, $saleID);
        if ($stmt->execute()) {
            echo json_encode(['Message' => 'price updated', 'success' => true]);
        } else {
            echo json_encode(['Message' => 'price Not updated Paid', 'success' => false]);
        }

    } catch (Exception $e) {
        return false;
    }

}