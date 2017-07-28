<?php


 class Database{
     //Constant mysql details ensures they cant be changed later in the program.
    const SERVER = 'localhost';
    const USERNAME = 'root';
    const PASSWORD = '';
    const DATABASE = 'shukers';

    private $conn = null;


    public function __construct() {
       $this->conn = new mysqli(Database::SERVER, Database::USERNAME, Database::PASSWORD, Database::DATABASE);



    }//End of constructor

    public function getConn(){
        return $this->conn;
    }
}

