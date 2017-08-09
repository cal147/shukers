<?php
/**
 * Created by PhpStorm.
 * User: Chris
 * Date: 24/07/2017
 * Time: 19:57
 */

include 'dataBaseConn.php';

class products{

    private $conn = null;

    public function __construct(){
        $db = new Database();
        $this->conn = $db->getConn();
    }

    public function products(){

        try{
            $stmt = $this->conn->prepare("SELECT * FROM products");
            $stmt->execute();


        }catch (Exception $e){
            return false;
        }
    }
}