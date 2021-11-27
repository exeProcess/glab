<?php
    if(isset($_POST['sub'])){
        print_r($_FILES['1']);
        print_r($_FILES['2']);
        print_r($_FILES['3']);
    }
?>
<form action="try.php" method='post' enctype='multipart/form-data'>
   <input type='file' name='1'>
   <input type='file' name='2'>
   <input type='file' name='3'>
   <input type='submit' name='sub'>
</form>