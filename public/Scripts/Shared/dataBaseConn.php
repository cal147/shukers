<?php

 class Database{
     //Constant mysql details ensures they cant be changed later in the program.
    const SERVER = 'db702337542.db.1and1.com';
    const USERNAME = 'dbo702337542';
    const PASSWORD = 'Shuker.2';
    const DATABASE = 'db702337542';

    private $conn = null;


    public function __construct() {
       $this->conn = new mysqli(Database::SERVER, Database::USERNAME, Database::PASSWORD, Database::DATABASE);



    }//End of constructor

    public function getConn(){
        return $this->conn;
    }
}