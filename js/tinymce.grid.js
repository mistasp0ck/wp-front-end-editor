/* global tinymce */

// var test = tinymce.init({
//     selector: '.fee-content',
//     inline: true,
//     menubar: true,
//     toolbar: 'undo redo'
// });

tinymce.PluginManager.add( 'feeGrid', function( editor ) {

	// jQuery('.fee-content').gridmanager({
	//    debug: 1,
	//    tinymce: 

	// }
	// ); 
	// editor.on( 'init', function( event ) {	
	// 				console.log('triggered');
	// 	if ( event.format !== 'raw' ) {
	// 		// var gm = jQuery('.fee-content').gridmanager();
	// 		console.log('triggered');
	// 		jQuery(editor).gridmanager({
	// 		   debug: 1}
	// 		);				
	// 	}

	// });

	editor.addCommand( 'test_command', function() {
		jQuery('.fee-content').gridmanager({
		   debug: 1}
		);
	});

	editor.addButton( 'wp_more', {
		tooltip: 'test',
		onclick: function() {
			editor.execCommand( 'test_command');
		}
	});	

	// editor.on( 'BeforeSetContent', function( event ) {
	// 	// if ( event.format !== 'raw' ) {
	// 	// 	event.content = editor.wpSetGridDivs( event.content );
	// 	// 	console.log(event.content);
	// 	// }
	// 	// jQuery(editor).gridmanager({
	// 	//    debug: 1}
	// 	// );			
	// 	gm.init();
	
	// });	       
	// editor.on( 'BeforeSetContent', function( event ) {
	// 	if ( event.format !== 'raw' ) {
	// 		event.content = editor.wpSetGridDivs( event.content );
	// 		console.log(event.content);
	// 	}
	// });



	editor.on( 'PostProcess', function( event ) {
		if ( event.get ) {
			// event.content = editor.wpGetGridDivs( event.content );
			// console.log(event.content);
			// event.content = event.content.replace( / data-wp-imgselect="1"/g, '' );
		}
	});

	// return {
	// 	_do_shcode: parseShortcode,
	// 	_get_shcode: getShortcode
	// };
});
