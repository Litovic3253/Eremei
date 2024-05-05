<?php
    require_once($_SERVER['DOCUMENT_ROOT'] . '/smartbasket/php/phpmailer/phpmailer.php');

		

		 require_once($_SERVER['DOCUMENT_ROOT'] . '/smartbasket/php/phpmailer/smtp.php');
		 const HOST = 'smtp.gmail.com';
		 const LOGIN = 'trusttechmailer@gmail.com';
		 const PASS = 'duhspwbygjgwaejp';
		 const PORT = '465';

		
   
    const SENDER = 'ldipper93@gmail.com';
    const CATCHER = 'nelq.cz@gmail.com';
    const SUBJECT = 'Заявка с сайта';
    const CHARSET = 'UTF-8';
    