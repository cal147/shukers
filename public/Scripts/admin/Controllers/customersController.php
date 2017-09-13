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

                echo json_encode(['Message' => 'Added', 'success' => true]);

            }catch (Exception $e){
                echo json_encode(['Message' => 'Something went wrong!', 'success' => false]);
            }

        }


        if ($_postData['action'] == 'GET_CUSTOMERS') {

            $customers = [];
            try {

                $stmt = $conn->prepare("SELECT u.id, u.loginId, u.forname, u.surname, u.contactNumber, u.isStaff, u.email, a.id AS 'addressId', a.houseNum, a.firstLine, a.postcode, a.home, a.delivery FROM users as u INNER JOIN address AS a ON u.id = a.userId");
                $stmt->execute();

                if ($result = $stmt->get_result()) {
                    while ($row = $result->fetch_assoc()) {
                        array_push($customers, [
                            'id' => $row['id'],
                            'loginId' => $row['loginId'],
                            'forname' => $row['forname'],
                            'surname' => $row['surname'],
                            'contactNumber' => $row['contactNumber'],
                            'isStaff' => boolval($row['isStaff']),
                            'email' => $row['email'],
                            'addressId' => $row['addressId'],
                            'houseNum' => $row['houseNum'],
                            'street' => $row['firstLine'],
                            'postcode' => $row['postcode'],
                            'home' => boolval($row['home']),
                            'delivery' => boolval($row['delivery']),
                        ]);
                    }
                    echo json_encode($customers);
                }else{
                    echo json_encode(['Message' => 'Something went wrong!', 'success' => false]);
                }


            } catch (Exception $e) {
                return false;
            }
        }

        if ($_postData['action'] == 'GET_CUSTOMER') {

            $customers = [];
            try {

                $stmt = $conn->prepare("SELECT u.id, u.loginId, u.forname, u.surname, u.contactNumber, u.isStaff, u.email, a.id AS 'addressId', a.houseNum, a.firstLine, a.postcode, a.home, a.delivery FROM users as u INNER JOIN address AS a ON u.id = a.userId WHERE u.id = ?");
                $stmt->bind_param("s", $_postData['id']);
                $stmt->execute();

                if ($result = $stmt->get_result()) {
                    while ($row = $result->fetch_assoc()) {
                        array_push($customers, [
                            'id' => $row['id'],
                            'loginId' => $row['loginId'],
                            'forname' => $row['forname'],
                            'surname' => $row['surname'],
                            'contactNumber' => $row['contactNumber'],
                            'isStaff' => boolval($row['isStaff']),
                            'email' => $row['email'],
                            'addressId' => $row['addressId'],
                            'houseNum' => $row['houseNum'],
                            'street' => $row['firstLine'],
                            'postcode' => $row['postcode'],
                            'home' => boolval($row['home']),
                            'delivery' => boolval($row['delivery']),
                        ]);
                    }
                    echo json_encode($customers);
                }else{
                    echo json_encode(['Message' => 'Something went wrong!', 'success' => false]);
                }


            } catch (Exception $e) {
                return false;
            }
        }


        if($_postData['action'] == "CHECK_LOGIN_NAME"){
            $loginName = $_postData['name'];
            try{
                $stmt = $conn->prepare("SELECT loginId FROM users WHERE loginId=?");
                $stmt->bind_param("s", $loginName);
                $stmt->execute();

                if ($result = $stmt->get_result()) {
                    if($result->num_rows == 0){
                        echo json_encode(['Message' => 'ok', 'success' => true]);
                    }else{
                        echo json_encode(['Message' => 'The user name is taken', 'success' => true]);
                    }
                }

            }catch(Exception $e){
                echo json_encode(['Message' => 'Something went wrong!', 'success' => false]);
            }
        }

        if($_postData['action'] == "DELETE_USER"){
            $id = $_postData['id'];
            try{
                $stmt = $conn->prepare("DELETE FROM address WHERE userId=?");
                $stmt->bind_param("s", $id);

                if($stmt->execute()){
                    $stmt = $conn->prepare("DELETE FROM users WHERE id=?");
                    $stmt->bind_param("s", $id);
                    if($stmt->execute()) {
                        echo json_encode(['Message' => 'Record Deleted', 'success' => true]);
                        return;
                    }
                    echo json_encode(['Message' => 'Something went wrong!', 'success' => false]);
                }else{
                    echo json_encode(['Message' => 'Something went wrong!', 'success' => false]);
                }



            }catch(Exception $e){
                echo json_encode(['Message' => 'Something went wrong!', 'success' => false]);
            }

        }

        if($_postData['action']== "UPDATE_USER"){

            $id = $conn->real_escape_string(strip_tags(trim($_postData['id'])));
            $addressId = $conn->real_escape_string(strip_tags(trim($_postData['addressId'])));
            $postcode = $conn->real_escape_string(strip_tags(trim($_postData['postcode'])));
            $street = $conn->real_escape_string(strip_tags(trim($_postData['street'])));
            $houseNumber = $conn->real_escape_string(strip_tags(trim($_postData['houseNum'])));
            $email = $conn->real_escape_string(strip_tags(trim($_postData['email'])));
            $surname = $conn->real_escape_string(strip_tags(trim($_postData['surname'])));
            $firstName = $conn->real_escape_string(strip_tags(trim($_postData['forname'])));
            $loginName = $conn->real_escape_string(strip_tags(trim($_postData['loginId'])));
            $staffMember = $conn->real_escape_string(strip_tags(trim($_postData['isStaff'])));
            $contactNumber = $conn->real_escape_string(strip_tags(trim($_postData['contactNumber'])));
            $deliveryAddress = $conn->real_escape_string(strip_tags(trim($_postData['delivery'])));
            $homeAddress = $conn->real_escape_string(strip_tags(trim($_postData['home'])));


            try{
                $stmt = $conn->prepare("UPDATE users SET loginId = ?, forname = ?, surname = ?, contactNumber = ?, isStaff = ?, email = ? WHERE id=?");
                $stmt->bind_param("ssssisi", $loginName, $firstName, $surname, $contactNumber, $staffMember, $email, $id);

                $stmt->execute();


                $stmt->close();
                $stmt = $conn->prepare("UPDATE address SET houseNum = ?, firstLine = ?, postcode = ?, home = ?, delivery = ? WHERE id= ?");

                $stmt->bind_param("ssssii", $houseNumber, $street, $postcode, $homeAddress, $deliveryAddress, $addressId);
                $stmt->execute();

                $stmt->close();

                echo json_encode(['Message' => 'Added', 'success' => true]);

            }catch (Exception $e){
                echo json_encode(['Message' => 'Something went wrong!', 'success' => false]);
            }
        }
    }
}