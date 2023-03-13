import React from 'react'
import ReactQuill, { Quill } from 'react-quill'
import Toolbar from 'quill/modules/toolbar';
import Snow from 'quill/themes/snow';
import ImageResize from 'quill-image-resize-module-react';
import htmlEditButton from "quill-html-edit-button";

Quill.register({
  "modules/htmlEditButton": htmlEditButton
})

Quill.register('modules/imageResize', ImageResize);

const Editor = ({ value, onChange, }) => {
	const myModules = {
		toolbar: [
		  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
		  ['blockquote', 'code-block'],

		  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
		  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
		  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
		  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
		  [{ 'direction': 'rtl' }],                         // text direction

		  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
		  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

		  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
		  [{ 'font': [] }],
		  [{ 'align': [] }],
		  ['link'],
		  ['video'],
		  ['image'],

		  ['clean']                                      // remove formatting button
		],
		clipboard: {
			allowed: {
				tags: ['a', 'b', 'strong', 'u', 's', 'i', 'p', 'br', 'ul', 'ol', 'li', 'span'],
				attributes: ['href', 'rel', 'target', 'class']
			},
			keepSelection: true,
			substituteBlockElements: true,
			magicPasteLinks: true,
		},
		htmlEditButton: {
			debug: true, // logging, default:false
			msg: "Edit the content in HTML format", //Custom message to display in the editor, default: Edit HTML here, when you click "OK" the quill editor's contents will be replaced
			okText: "Ok", // Text to display in the OK button, default: Ok,
			cancelText: "Cancel", // Text to display in the cancel button, default: Cancel
			buttonHTML: "&lt;&gt;", // Text to display in the toolbar button, default: <>
			buttonTitle: "Show HTML source", // Text to display as the tooltip for the toolbar button, default: Show HTML source
			syntax: false, // Show the HTML with syntax highlighting. Requires highlightjs on window.hljs (similar to Quill itself), default: false
			prependSelector: 'div#myelement', // a string used to select where you want to insert the overlayContainer, default: null (appends to body),
			editorModules: {} // The default mod
		},
		imageResize: {
			displayStyles: {
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
			border: '1px solid red',
			color: 'white'
			},
			handleStyles: {
				backgroundColor: 'rgba(0, 0, 0, 0.5)',
				border: 'none',
				color: 'white'
			},
			modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
		}
	}

	const format = [
		'header',
		'bold', 'italic', 'underline', 'strike', 'blockquote',
		'list', 'bullet', 'indent',
		'link', 'image'
	]

	return (
		<ReactQuill value={value} onChange={onChange} modules={myModules} theme={'snow'} />
	)
}

export default Editor