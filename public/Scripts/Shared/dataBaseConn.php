<?php

 class Database{
     //Constant mysql details ensures they cant be changed later in the program.
    const SERVER = '127.0.0.1';
    const USERNAME = 'admin';
    const PASSWORD = '123456';
    const DATABASE = 'myDb';

    private $conn = null;


    public function __construct() {
       $this->conn = new mysqli(Database::SERVER, Database::USERNAME, Database::PASSWORD, Database::DATABASE);



    }//End of constructor

    public function getConn(){
        return $this->conn;
    }
}
