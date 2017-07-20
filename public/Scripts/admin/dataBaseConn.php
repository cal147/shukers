<?php


 class Database{

    private $server = 'localhost';
    private $userName = 'admin';
    private $password = '123456';
    private $dataBase = 'shukers';
    private $conn = null;


    public function __construct() {
       $this->conn = new mysqli($this->server, $this->userName, $this->password, $this->dataBase);


    }//End of constructor

    public function getConn(){
        return $this->conn;
    }
}

