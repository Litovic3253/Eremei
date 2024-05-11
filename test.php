<?php


$price = $_POST['product_price'];
$quantity = $_POST['product_quantity'];


echo $price;
$name = $_POST['name'];
$number = $_POST['number'];
$email = $_POST['email'];

foreach ($price as $key) {
    echo $key;
}