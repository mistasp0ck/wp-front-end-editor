/* global tinymce */

tinymce.PluginManager.add( 'feeGrid', function( editor ) {
	// var html5 = editor.getParam( 'wpeditimage_html5_captions' ),
		// captionWrap = html5 ? 'figure' : 'dl',
		// captionImg = html5 ? 'section' : 'dt',
		// captionText = html5 ? 'figcaption' : 'dd';
		// console.log('trigger');
	function parseShortcode( content ) {

		// return content.replace( /(?:<p>)?\[(?:wp_)?column([^\]]+)\]([\s\S]+?)\[\/(?:wp_)?column\](?:<\/p>)?/g, function( a, b, c ) {
		return content.replace( /\[row\]([\s\S]+?)\[\/row\]?/g, function( a, b, c ) {

			var columns,out,
				trim = tinymce.trim;

			out = '<div class="mceTemp"><row>';

			columns = b.replace( /\[column([^\]]+)\]([\s\S]+?)\[\/column\]?/g,function(a, b, c){
				var size,inner,column;

				size = b.match( /md="([^"]*)"/ );
				size = ( size && size[1] ) ? size[1] : '';
				inner = trim(c);

				column = '<div class="col-sm-' + size + '">' +
							inner +
						'</div>';

				return (out += column);	
			} );
			out += '</row></div>';

			// inner = trim( b );
			return out;

		});
	}

	function getShortcode( content ) {
		// match row opening and falls back from one div
		// <div class="row(.+?)>(.+)<\/div>(?=<\/div>*)
		content = '<div class="mceTemp"><div class="row">    <div class="col-md-6">      …<br>    </div>    <div class="col-md-6">      …<br>    </div>  </div></div>';

		return content.replace( /<div (?:class="mceTemp)[^>]*><div (?:class="row)[^>]*>([\s\S]+?)(?:<\/div>){2}/g, function( a, b, c ) {
			var columns, out,trim = tinymce.trim;
			// out = '[row]';

			content = b;

			columns = b.match(/class="(.)*col-md-(\d*)"/g);
			if (columns) {
				var column;
				for (var i = columns.length - 1; i >= 0; i--) {
					out += columns[i];

					column += '[column md="' + columns[i] + '"]' +
						inner +
						'[/column]';					
				}				
			}




			// columns = b.replace( /<div class="row">([\s\S]+?)<\/div>/g,function(a, b, c){
			// 	var size,inner,row;

				// inner = b.replace( /<div ([^\]]+)>([\s\S]+?)<\/div>?/g,function(a, b, c){
				// 	var size,column;

				// 	size = b.match( /class="col-sm-([^"]*)"/ );
				// 	size = ( size && size[1] ) ? size[1] : '';
					// inner = trim(a);

				// 	column = '[column md="' + size + '"]' +
				// 		inner +
				// 		'[/column]';

				// 	return (out += column);	
				// } );

				// row = '[row]' +
				// 	inner +
				// 	'[/row]';

				// out += '[/row]';

			// 	return (content += row);

			// });

			// out = tinymce.trim( out );

			return content;
		});
	}

	editor.wpSetGridDivs = function( content ) {
		return parseShortcode( content );
	};

	editor.wpGetGridDivs = function( content ) {
		return getShortcode( content );
	};

	editor.on( 'BeforeSetContent', function( event ) {
		if ( event.format !== 'raw' ) {
			event.content = editor.wpSetGridDivs( event.content );
			// console.log(event.content);
		}
	});

	editor.on( 'PostProcess', function( event ) {
		if ( event.get ) {
			event.content = editor.wpGetGridDivs( event.content );
			console.log(event.content);
			// event.content = event.content.replace( / data-wp-imgselect="1"/g, '' );
		}
	});

	return {
		_do_shcode: parseShortcode,
		_get_shcode: getShortcode
	};
});
