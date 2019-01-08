<?php
    $liste_nature = $_GET['type'] // permet de specifier les filtre
?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="fr">

<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
	
    <title>Medialab - Liste des productions</title>
    <!--<link rel='stylesheet' type='text/css' href='assets/css-compiled/page_liste.css'>-->
    <?php echo "<link rel='stylesheet' type='text/css' href='assets/css-compiled/page_liste_".$liste_nature.".css'>" ?>
    <link rel="shortcut icon" href="assets/images/favicon-32x32.png" type="image/jpg"> 

</head>

<body>
	<?php include('fragments/_topbar.php'); ?>

	<?php
    include('fragments/page_liste/_liste_objet.php'); 
    ?>		
	
</body>
</html>