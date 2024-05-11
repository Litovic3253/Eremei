<?
require_once 'PHPMailer/PHPMailerAutoload.php';

$admin_email = array();
foreach ( $_POST["admin_email"] as $key => $value ) {
	array_push($admin_email, $value);
}

$form_subject = trim($_POST["form_subject"]);

$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';


$mail->isSMTP();
$mail->SMTPAuth = true;
$mail->SMTPDebug = 0;

$mail->Host = 'smtp.gmail.com';
$mail->SMTPSecure = 'ssl'; 
$mail->Port = 465;
$mail->Username = 'trusttechmailer@gmail.com'; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = 'duhspwbygjgwaejp';

$jsonText = $_POST['Товары'];
$myArray = json_decode($jsonText, true);

$prod = '';

foreach ($myArray as $key => $value) {
		$quantity = $value["quantity"];
	    $title = $value["title"];
	    $price = $value["price"];
	    $prod .= "
			<tr>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$title</td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$price</td>
				<td style='padding: 10px; border: #e9e9e9 1px solid;'>$quantity</td>
			</tr>
			";
	}

$c = true;
$message = '';
foreach ( $_POST as $key => $value ) {
	if ( $value != ""  && $key != "admin_email" && $key != "form_subject"  && $key != "Товары") {
		if (is_array($value)) {
			$val_text = '';
			foreach ($value as $val) {
				if ($val && $val != '') {
					$val_text .= ($val_text==''?'':', ').$val;
				}
			}
			$value = $val_text;
		}
		$message .= "
		" . ( ($c = !$c) ? '<tr>':'<tr>' ) . "
		<td style='padding: 10px; width: auto;'><b>$key:</b></td>
		<td style='padding: 10px;width: 100%;'>$value</td>
		</tr>
		";
	}
}
$message = "<table style='width: 50%;'>$message . $prod</table>";


// От кого
$mail->setFrom('trusttechmailer@no-reply');

// Кому
$mail->addAddress('nelq.cz@gmail.com');
// Тема письма
$mail->Subject = 'Заказ с сайта';

// Тело письма
$body = $message;
// $mail->isHTML(true);  это если прям верстка
$mail->msgHTML($body);


// Приложения
if ($_FILES){
	foreach ( $_FILES['file']['tmp_name'] as $key => $value ) {
		$mail->addAttachment($value, $_FILES['file']['name'][$key]);
	}
}
$mail->send();
?>
