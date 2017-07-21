<?php


$_postData = json_decode(file_get_contents("php://input"), true);

if(isset($_postData['sessionId'])) session_id($_postData['sessionId']);
session_start();

 //echo password_hash('Pa$$w0rd', PASSWORD_DEFAULT)."\n";


include '../Shared/loginControl.php';



//Checks that the user has entered correct user name and password
if($_postData['action'] == 'LOGIN_USER'){

    $name = $_postData['name'];
    $pass = $_postData['password'];

    $loginCont = new loginControl();

    if($loginCont->validateUser($name, $pass)){

        $userInformation = $loginCont->getUserDetails();

        if($userInformation != null) {
            $_SESSION['loggedIn'] = true;
            if($userInformation['isStaff'])$_SESSION['isStaff'] = true;

            echo json_encode($userInformation);


        }
    }else{
        echo json_encode(['fail' => 'Incorect user details', 'success' => false]);
    }

}//END of login user

//logs the user out of the session.
if($_postData['action']  == 'LOGOUT'){

    $_SESSION['loggedIn'] == false;
    $_SESSION['isStaff'] == false;

    session_destroy();
    echo json_encode(['Logout' => 'User is logged out', 'success' => true]);

}