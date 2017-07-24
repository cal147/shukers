<?php


 class Database{

    const SERVER = 'localhost';
    const USERNAME = 'admin';
    const PASSWORD = '123456';
    const DATABASE = 'shukers';
    private $conn = null;


    public function __construct() {
       $this->conn = new mysqli(Database::SERVER, Database::USERNAME, Database::PASSWORD, Database::DATABASE);



    }//End of constructor

    public function getConn(){
        return $this->conn;
    }
}

