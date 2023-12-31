<?php
 	$sFileInfo = '';
	$headers = array();
	 
	foreach($_SERVER as $k => $v) {
		if(substr($k, 0, 9) == "HTTP_FILE") {
			$k = substr(strtolower($k), 5);
			$headers[$k] = $v;
		} 
	}

	$filename = rawurldecode($headers['file_name']);
	$filemane_ext_temp = explode('.',$filename);
    $filename_ext = strtolower(array_pop($filemane_ext_temp));
	$allow_file = array("jpg", "png", "bmp", "gif", "jpeg"); 

	if(!in_array($filename_ext, $allow_file)) {
		echo "NOTALLOW_".$filename;
	} else {
		$file = new stdClass;
		$file->name = date("YmdHis").mt_rand().".".$filename_ext;
		$file->content = file_get_contents("php://input");

		$uploadDir = $_SERVER['DOCUMENT_ROOT'].'/img/editor/';
		if(!is_dir($uploadDir)){
			mkdir($uploadDir, 0777);
		}
		
		$newPath = $uploadDir.$file->name;
		
		if(file_put_contents($newPath, $file->content)) {
			$sFileInfo .= "&bNewLine=true";
			$sFileInfo .= "&sFileName=".$filename;
			// $sFileInfo .= "&sFileURL=upload/".$file->name;
			$sFileInfo .= "&sFileURL=/img/editor/".$file->name;
		}

		
		echo $sFileInfo;
	}
?>