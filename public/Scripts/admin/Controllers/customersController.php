<?php


$_postData = json_decode(file_get_contents("php://input"), true);

if(isset($_postData['sessionId'])) session_id($_postData['sessionId']);
session_start();

//echo password_hash('Pa$$w0rd', PASSWORD_DEFAULT)."\n";


include '../../Shared/dataBaseConn.php';
$db = new Database();
$conn = $db->getConn();

if(session_status() === PHP_SESSION_ACTIVE) {
    if ($_SESSION['loggedIn'] && $_SESSION['isStaff']) {

        if ($_postData['action'] == 'ADD_CUSTOMER_WITHDELIVERY') {

            $deliveryNum = $conn->real_escape_string(strip_tags(trim($_postData['deliveryNum'])));
            $deliveryStreet = $conn->real_escape_string(strip_tags(trim($_postData['deliveryStreet'])));
            $deliveryPostcode = $conn->real_escape_string(strip_tags(trim($_postData['deliveryPostcode'])));
            $postcode = $conn->real_escape_string(strip_tags(trim($_postData['postcode'])));
            $street = $conn->real_escape_string(strip_tags(trim($_postData['street'])));
            $houseNumber = $conn->real_escape_string(strip_tags(trim($_postData['houseNumber'])));
            $email = $conn->real_escape_string(strip_tags(trim($_postData['email'])));
            $surname = $conn->real_escape_string(strip_tags(trim($_postData['surname'])));
            $firstName = $conn->real_escape_string(strip_tags(trim($_postData['firstName'])));
            $loginName = $conn->real_escape_string(strip_tags(trim($_postData['loginName'])));
            $password = $conn->real_escape_string(strip_tags(trim($_postData['password'])));
            $staffMember = $conn->real_escape_string(strip_tags(trim($_postData['staffMember'])));
            $contactNumber = $conn->real_escape_string(strip_tags(trim($_postData['contactNumber'])));
            $hashPass = password_hash($password, PASSWORD_DEFAULT);

            try{
                $stmt = $conn->prepare("INSERT INTO users(loginId, forname, surname, password, contactNumber, isStaff, email ) values(?,?,?,?,?,?,?)");
                $stmt->bind_param('sssssis', $loginName, $firstName, $surname, $hashPass, $contactNumber, $staffMember, $email);
                $stmt->execute();

                $id = $conn->insert_id;
                $stmt->close();

                $stmt = $conn->prepare("INSERT INTO address (userId, houseNum, firstLine, postcode, home, delivery ) values(?,?,?,?,?,?)");
                $deliveryAddress = 1;
                $homeAddress = 0;
                $stmt->bind_param('isssii', $id, $deliveryNum, $deliveryStreet, $deliveryPostcode, $homeAddress, $deliveryAddress);
                $stmt->execute();

                $deliveryAddress = 0;
                $homeAddress = 1;
                $stmt->bind_param('isssii', $id, $houseNumber, $street, $postcode, $homeAddress, $deliveryAddress);
                $stmt->execute();

                $stmt->close();
            }catch (Exception $e){

            }

        }


        if ($_postData['action'] == 'ADD_CUSTOMER') {

            $postcode = $conn->real_escape_string(strip_tags(trim($_postData['postcode'])));
            $street = $conn->real_escape_string(strip_tags(trim($_postData['street'])));
            $houseNumber = $conn->real_escape_string(strip_tags(trim($_postData['houseNumber'])));
            $email = $conn->real_escape_string(strip_tags(trim($_postData['email'])));
            $surname = $conn->real_escape_string(strip_tags(trim($_postData['surname'])));
            $firstName = $conn->real_escape_string(strip_tags(trim($_postData['firstName'])));
            $loginName = $conn->real_escape_string(strip_tags(trim($_postData['loginName'])));
            $password = $conn->real_escape_string(strip_tags(trim($_postData['password'])));
            $staffMember = $conn->real_escape_string(strip_tags(trim($_postData['staffMember'])));
            $hashPass = password_hash($password, PASSWORD_DEFAULT);
            $contactNumber = $conn->real_escape_string(strip_tags(trim($_postData['contactNumber'])));
            $deliveryAddress = 1;
            $homeAddress = 1;


            try{
                $stmt = $conn->prepare("INSERT INTO users (loginId, forname, surname, password, contactNumber, isStaff, email ) values(?,?,?,?,?,?,?)");
                $stmt->bind_param("sssssis", $loginName, $firstName, $surname, $hashPass, $contactNumber, $staffMember, $email);

                $stmt->execute();

                $id = $conn->insert_id;

                $stmt->close();
                $stmt = $conn->prepare("INSERT INTO address (userId, houseNum, firstLine, postcode, home, delivery ) values(?,?,?,?,?,?)");

                $stmt->bind_param("isssii", $id, $houseNumber, $street, $postcode, $homeAddress, $deliveryAddress);
                $stmt->execute();

                $stmt->close();
            }catch (Exception $e){
                echo $e;
            }

        }

    }
}