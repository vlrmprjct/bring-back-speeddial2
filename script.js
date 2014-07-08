/**
 * DESCRIPTION: SPEEDDIAL2 (A CHROME PLUGIN) TO CHROME BOOKMARK CONVERTER
 * CREATOR:		THOMAS MESCHKE - maillokalnetz.com
 * DATE:		26/05/2014
 * VERSION:		0.1
 */

const MIME_TYPE = 'text/plain';

var content 	= '';

var header		= '<!DOCTYPE HTML> \n'+
					'\t<HEAD> \n'+
					'\t\t<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n' +
					'\t</HEAD> \n'+
					'\t<BODY> \n'+
					'\t\t<DL> \n';

var footer 		= '\t\t</DL> \n' +
					'\t</BODY> \n'+
					'</HTML>';

$(document).ready(function($) {

	$('#convert').click(function(){
		convertBookmarks();
	});

	$('#download').click(function(){
		downloadContent(this.id, 'cvt');
	});

});


var convertBookmarks = function() {

	$.getJSON( $('#spexport').val() + '?callback=foo' , function(js) {

		// SET HOME GROUP
		content = content + '\t\t\t<DT><H3 ADD_DATE="" LAST_MODIFIED="">Home</H3></DT>\r';
		content = content + '\n' +  '\t\t\t<DL>\r';

		// PARSE DIALS DEPENDING ON HOMEGROUP
		$.each(js.dials, function (index, data) {
			if(data.idgroup == 0) {
				content = content + '\t\t\t\t<DT><A HREF="' + data.url + '" ADD_DATE="' + data.ts_created + '" ICON="">' + data.title + '</A></DT>\n'
			}
		})

		content = content + '\t\t\t</DL>\r';

		// PARSE GROUPS
		$.each(js.groups, function (index, data) {

			var gID = data.id;

			// SET GROUPNAME
			content = content + '\t\t\t<DT><H3 ADD_DATE="" LAST_MODIFIED="">' + data.title + '</H3></DT>\r';
			content = content + '\t\t\t<DL>\r';

			// PARSE DIALS DEPENDING ON GROUPS
			$.each(js.dials, function (index, data) {
				if(data.idgroup == gID) {
				content = content + '\t\t\t\t<DT><A HREF="' + data.url + '" ADD_DATE="' + data.ts_created + '" icon="">' + data.title + '</A></DT>\n'
				}
			})

			content = content + '\t\t\t</DL>\r';

		})

	$('textarea').val(header + content + footer);

	})

}


// @PARAM ELEMENT (STRING) TRIGGER ELEMENT FOR DOWNLOAD ( BUTTON, LINK )
// @PARAM DLCONTENT (STRING) THE CONTAINER THAT WRAP THE CONTENT TO DOWNLOAD
// @RETURN FILE
//
var downloadContent = function(element, dlcontent ) {

	window.URL = window.webkitURL || window.URL;

	var dl	=  document.getElementById(dlcontent).value;
	var bb	= new Blob([dl], {type: MIME_TYPE});
	var e	= document.getElementById(element);

	e.download	= 'speeddial2convert.html';
	e.href		= window.URL.createObjectURL(bb);
	e.dataset.downloadurl = [MIME_TYPE, e.download, e.href].join(':');

};

// THATS ALL :)