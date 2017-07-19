<?php

/**
 * Created by PhpStorm.
 * User: carl
 * Date: 19/07/2017
 * Time: 17:18
 */

include 'dataBaseConn.php';


class loginControl{

    private $conn = null;
    private $loginId = null;


    public function __construct(){
        $db = new Database();
        $this->conn = $db->getConn();
    }
    //TODO This method is faulty
    //Queries the database for the user that has requested login and validates their password.
    public function validateUser($name, $pass){

        $cleanName = $this->conn->real_escape_string($name);

        $sql = "SELECT password FROM users WHERE loginId = $cleanName";
        if($result = $this->conn->query($sql)){
            if($result->num_rows === 0){
                return false;

            }else{
                $data = $result->fetch_assoc();
                $hashPass = $data['password'];
                if(password_verify ( $pass , $hashPass )){
                    $this->loginId = $name;
                    return true;
                }
            }
        }
       return false;
    }//EOF

    //Queries the data base for the details of the user requesting login. The validate user must be called first so that a valid
    //lodinId will be present in the class.
    public function getUserDetails(){

         $userArray = [];

        if($this->loginId != null){
            $sql = "select u.id, u.loginId, u.forname, u.surname, u.contactNumber, u.isStaff, a.houseNum, a.firstLine, a.secondLine, a.postcode, a.home, a.delivery from users as u inner join address as a on u.id = a.userId where u.loginId = \"$this->loginId\"";

            if($result = $this->conn->query($sql)){
                while($row = $result->fetch_assoc()){
                    $userArray = [
                        'id'=> $row['id'],
                        'loginId'=> $row['loginId'],
                        'forName'=> $row['forname'],
                        'surName'=> $row['surname'],
                        'contactNum'=> $row['contactNumber'],
                        'isStaff'=> boolval($row['isStaff']),
                        'houseNum'=> $row['houseNum'],
                        'adFirstLine'=> $row['firstLine'],
                        'adSecondLine'=> $row['secondLine'],
                        'postcode'=> $row['postcode'],
                        'homeAddress'=> $row['home'],
                        'deliveryAddress'=> $row['delivery'],
                    ];
                }
            }
        }


       // return $userArray;
        return  [$userArray];

    }//EOF

}