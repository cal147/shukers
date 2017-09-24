<?php

/**
 * This class controls the the product data between the database and the view.
 */

$_postData = json_decode(file_get_contents("php://input"), true);

if(isset($_postData['sessionId'])) session_id($_postData['sessionId']);
session_start();

//echo password_hash('Pa$$w0rd', PASSWORD_DEFAULT)."\n";


include '../../Shared/dataBaseConn.php';
$db = new Database();
$conn = $db->getConn();
//Only logged in staff members have access to this information. All methods in this script are enclosed within
//two conditional statements. There must be an active session and the user must be logged in and a staff member.
if(session_status() === PHP_SESSION_ACTIVE) {
    if($_SESSION['loggedIn'] && $_SESSION['isStaff']) {

       //Retrieves a list of categories from the database and returns them to the user in JSON format.
        if ($_postData['action'] == 'GET_CATEGORIES') {


            $catArray = [];
            try {
                $stmt = $conn->prepare("SELECT id, cat FROM category");
                $stmt->execute();

                if ($result = $stmt->get_result()) {
                    while ($row = $result->fetch_assoc()) {
                        array_push($catArray, [
                            'id' => $row['id'],
                            'cat' => $row['cat']
                        ]);
                    }
                    echo json_encode($catArray);
                }else{
                    echo json_encode(['Message' => 'Something went wrong!', 'success' => false]);
                }


            } catch (Exception $e) {
                return false;
            }


        }

        //Adds a new category to the list of categories in the database. Returns a success message and boolean.
        if ($_postData['action'] == 'ADD_CATEGORY') {

            $dirtyCat = $_postData['newCategory'];

            if (preg_match('/^[A-Za-z0-9\s]{2,15}$/', stripcslashes(trim($dirtyCat)))) {

                $cCat = $conn->real_escape_string(trim($dirtyCat));
                $cleanCategory = strip_tags($cCat);

                try {
                    $stmt = $conn->prepare("INSERT INTO category(cat) VALUES(?)");
                    $stmt->bind_param("s", $cleanCategory);
                    if ($stmt->execute()) {
                        echo json_encode(['Message' => 'Category Added', 'success' => true]);
                    } else {
                        echo json_encode(['Message' => 'Could not add this category', 'success' => false]);
                    }

                } catch (Exception $e) {
                    echo json_encode(['Message' => 'Could not add this category', 'success' => false]);
                }


            }

        }


        if ($_postData['action'] == 'DELETE_CATEGORY') {

            $dirtyId = $_postData['categoryId'];

            if (preg_match('/^[0-9]{1,3}$/', stripcslashes(trim($dirtyId)))) {

                $cId = $conn->real_escape_string(trim($dirtyId));
                $cleanId = strip_tags($cId);

                try {
                    $stmt = $conn->prepare("DELETE FROM category WHERE id=?");
                    $stmt->bind_param("i", $cleanId);
                    if ($stmt->execute()) {
                        echo json_encode(['Message' => 'Category Deleted', 'success' => true]);
                    } else {
                        echo json_encode(['Message' => 'Could not Delete this category', 'success' => false]);
                    }

                } catch (Exception $e) {
                    echo json_encode(['Message' => 'Could not Delete this category', 'success' => false]);

                }


            }

        }

        if ($_postData['action'] == "ADD_PRODUCT"){

            $prodName= strip_tags($conn->real_escape_string(trim($_postData['prodName'])));
            $desc= strip_tags($conn->real_escape_string(trim($_postData['description'])));
            $price= strip_tags($conn->real_escape_string(trim($_postData['price'])));
            $units= strip_tags($conn->real_escape_string(trim($_postData['units'])));
            $onOffer= strip_tags($conn->real_escape_string(trim($_postData['onOffer'])));
            $threeForTen= strip_tags($conn->real_escape_string(trim($_postData['threeForTen'])));
            $cat = strip_tags($conn->real_escape_string(trim($_postData['category'])));
            $imgName= strip_tags($conn->real_escape_string(trim($_postData['name'])));
            $image= $_postData['blob'];


            try {
                $stmt = $conn->prepare("INSERT INTO products(name, description, price, onOffer, catId, imgPath, 3for10, units) VALUES(?,?,?,?,?,?,?,?)");
                $stmt->bind_param("ssdiisis", $prodName, $desc, $price, $onOffer, $cat, $imgName, $threeForTen, $units);
                if ($stmt->execute()) {
                    echo json_encode(['product' => 'product received', 'success' => true] );

                    $theFile = fopen("../../../Images/Products/".$imgName, "w");
                    $fileData = $image;
                    $pos = strpos($fileData, ',');
                    $newFileData = substr_replace($fileData, '',0, $pos+1);
                    $b64dec = base64_decode($newFileData);
                    fwrite($theFile, $b64dec);
                    fclose($theFile);


                } else {
                    echo json_encode(['product' => 'product received', 'success' => false] );
                }

            } catch (Exception $e) {
                echo json_encode(['product' => 'product received', 'success' => false] );

            }
        }

        if ($_postData['action'] == "GET_PRODUCTS"){

            $products = [];
            try {

                $stmt = $conn->prepare("SELECT * FROM products");
                $stmt->execute();

                if ($result = $stmt->get_result()) {
                    while ($row = $result->fetch_assoc()) {
                        array_push($products, [
                            'id' => $row['id'],
                            'prodName' => $row['name'],
                            'description' => $row['description'],
                            'price' => $row['price'],
                            'onOffer' => boolval($row['onOffer']),
                            'catId' => $row['catId'],
                            'imgName' => $row['imgPath'],
                            'threeForTen' => boolval($row['3for10']),
                            'units'=> $row['units'],
                        ]);
                    }
                    echo json_encode($products);
                }else{
                    echo json_encode(['Message' => 'Something went wrong!', 'success' => false]);
                }


            } catch (Exception $e) {
                return false;
            }
        }

        if($_postData['action'] == "DELETE_PRODUCT"){

            $id = $_postData['id'];
            $imgName = $_postData['imgName'];
            try{
                $stmt = $conn->prepare("DELETE FROM products WHERE id=?");
                $stmt->bind_param("s", $id);

                if($stmt->execute()){
                    echo json_encode(['Message' => 'Product Deleted', 'success' => true]);

                    //Delete the image.
                    $fileToDel = "../../../Images/Products/".$imgName;
                    unlink($fileToDel);

                }else{
                    echo json_encode(['Message' => 'Something went wrong!', 'success' => false]);
                }



            }catch(Exception $e){
                echo json_encode(['Message' => 'Something went wrong!', 'success' => false]);
            }
        }

        if($_postData['action'] == "UPDATE_PRODUCT"){

            $id = $conn->real_escape_string(strip_tags(trim($_postData['id'])));
            $name = $conn->real_escape_string(strip_tags(trim($_postData['name'])));
            $desc = $conn->real_escape_string(strip_tags(trim($_postData['desc'])));
            $price = $conn->real_escape_string(strip_tags(trim($_postData['price'])));
            $onOffer = $conn->real_escape_string(strip_tags(trim($_postData['onOffer'])));
            $threeForTen = $conn->real_escape_string(strip_tags(trim($_postData['threeForTen'])));
            $units = $conn->real_escape_string(strip_tags(trim($_postData['units'])));


            try{
                $stmt = $conn->prepare("UPDATE products SET  name = ?, description = ?, price = ?, onOffer = ?, 3for10 = ?, units = ? WHERE id=?");
                $stmt->bind_param("ssdiisi", $name, $desc, $price, $onOffer, $threeForTen, $units, $id);

                $stmt->execute();
                $stmt->close();

                echo json_encode(['Message' => 'Updated', 'success' => true]);

            }catch (Exception $e){
                echo json_encode(['Message' => 'Something went wrong!', 'success' => false]);
            }

        }


    }
}