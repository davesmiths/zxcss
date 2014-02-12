<?php ini_set('display_errors','1');ini_set('display_startup_errors','1');error_reporting(E_ALL|E_STRICT); ?>
<?php

if (isset($_POST['output-css'], $_POST['output-js'], $_POST['output-legacysupport'])) {
    
    $legacysupport = $_POST['output-legacysupport'];
    $css = $_POST['output-css'];
    $js = $_POST['output-js'];
    
    //$file = tmpfile();
    $file = tempnam('tmp', 'zip');
       
    $zip = new ZipArchive();
    
    // Zip will open and overwrite the file, rather than try to read it.
    $zip->open($file, ZipArchive::OVERWRITE);
    
    $zip->addFromString('baseup.css', $css);
    
    if ($legacysupport === true) {
        $zip->addFromString('baseup.js', $js);
    }
    
    $zip->close();
    
    // Stream the file to the client
    header("Content-Type: application/zip");
    header("Content-Length: " . filesize($file));
    header("Content-Disposition: attachment; filename=\"a_zip_file.zip\"");
    readfile($file);
    
    unlink($file);

}

?>