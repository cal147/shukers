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

        if(preg_match('/^[A-Za-z0-9\-_]{5,10}$/', stripcslashes(trim($name))) && preg_match('/^[A-Za-z0-9\-!"£$%\^&*()]{5,10}$/', stripcslashes(trim($pass))) ) {

            $cName = $this->conn->real_escape_string(trim($name));
            $cleanName = strip_tags($cName);
            $cPass = $this->conn->real_escape_string(trim($pass));
            $cleanPass = strip_tags($cPass);

            try {
                $stmt = $this->conn->prepare("SELECT password, loginId FROM users WHERE loginId = ?");
                $stmt->bind_param("s", $cleanName);
                $stmt->execute();
                $res = $stmt->get_result();
                $row = $res->fetch_assoc();
                $hashPass = $row['password'];
                if (password_verify($cleanPass, $hashPass) == 1) {
                    $this->loginId = $cleanName;
                    return true;
                }

            } catch (Exception $e) {
                return false;
            }

            return false;
        }else{
            return false;
        }
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
                echo ['fatal' => 'Login information could not loaded due to a system exception'];
            }
        }


        return $userArray;

    }//EOF

}