<?php

/*
 * Plugin Name: Front-end Editor Custom
 * Plugin URI:  https://wordpress.org/plugins/wp-front-end-editor-custom/
 * Description: Edit your posts on the front-end of your site and add bootstrap functionality.
 * Version:     1.2.0
 * Author:      Ella Iseulde Van Dorpe, Tony Staffiero
 * Author URI:  http://iseulde.com
 * Text Domain: wp-front-end-editor-custom
 * Domain Path: languages
 * Network:     false
 * License:     GPL-2.0+
 */

if ( class_exists( 'FEE' ) ) {
	return;
}

require_once( 'class-fee.php' );

new FEE;

require 'src/plugin.php';
