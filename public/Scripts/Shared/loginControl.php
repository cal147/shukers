<?php


include 'dataBaseConn.php';


class loginControl{

    private $conn = null;
    private $loginId = null;


    public function __construct(){
        $db = new Database();
        $this->conn = $db->getConn();
    }

    //Queries the database for the user that has requested login and validates their password.
    public function validateUser($name, $pass){

        $cleanName = $this->conn->real_escape_string($name);
        $cleanPass = $this->conn->real_escape_string($pass);

        try{
            $stmt = $this->conn->prepare("SELECT password, loginId FROM users WHERE loginId = ?");
            $stmt->bind_param("s", $cleanName);
            $stmt->execute();
            $res = $stmt->get_result();
            $row = $res->fetch_assoc();
            $hashPass = $row['password'];
            if(password_verify ( $cleanPass , $hashPass ) == 1){
                    $this->loginId = $cleanName;
                    return true;
                }

        }catch (Exception $e){
            return false;
        }

       return false;
    }//EOF

    //Queries the data base for the details of the user requesting login. The validate user must be called first so that a valid
    //lodinId will be present in the class.
    public function getUserDetails(){

        // $userArray = [];

        if($this->loginId != null){

            $sql = "select u.id, u.loginId, u.forname, u.surname, u.contactNumber, u.isStaff, a.houseNum, a.firstLine, a.secondLine, a.postcode, a.home, a.delivery from users as u inner join address as a on u.id = a.userId where u.loginId = ?";

            try {
                $stmt = $this->conn->prepare($sql);
                $stmt->bind_param("s", $this->loginId);
                $stmt->execute();

                if ($result = $stmt->get_result()) {
                    while ($row = $result->fetch_assoc()) {
                        $userArray = [
                            'id' => $row['id'],
                            'loginId' => $row['loginId'],
                            'forName' => $row['forname'],
                            'surName' => $row['surname'],
                            'contactNum' => $row['contactNumber'],
                            'isStaff' => boolval($row['isStaff']),
                            'houseNum' => $row['houseNum'],
                            'adFirstLine' => $row['firstLine'],
                            'adSecondLine' => $row['secondLine'],
                            'postcode' => $row['postcode'],
                            'homeAddress' => boolval($row['home']),
                            'deliveryAddress' => boolval($row['delivery']),
                            'sessionId' => session_id()
                        ];
                    }
                } else {
                    $userArray = [];
                }
            }catch (Exception $e){
                echo ['fatal' => 'Login information could not loaded due to a systen exception'];
            }
        }


        return $userArray;

    }//EOF

}