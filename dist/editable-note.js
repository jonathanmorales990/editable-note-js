editableNote = {
	element: null,
	container: null,
	fontBackgroundColor: '#ffffff',
	fontColor: '#000000',
	toolbar: [
		'bold',
		'underline',
		'italic',
		'eraser',
		'font-size',
		'font-color',
		'background-font-color',
		'font-family',
		'align-justify',
		'align-left',
		'align-center',
		'align-right',
		'redo',
		'undo',
	],
	fontFamily: [
		'serif',
		'Helvetica',
		'Arial',
		'Arial Black',
		'Impact',
		'cursive',
		'Courier New',
		'Verdana',
		'Times New Roman'
	],
	fontSizes: ['8','9','10','11','12','14','16','18','24','30','36','40','48']
}
editableNote.initialize = function (width = 900, height = 300) {
	this.element = document.getElementById('editable-note');
	this.insertContainerEditableNote();
	this.setSize(width, height);
	this.element.contentEditable = 'true';
	this.element.addEventListener('keydown', this.onChangeText, false);
	for(var key in this.toolbar) {
		this.insertButton(this.toolbar[key]);
	}
	this.insertParagraph();
}
editableNote.onChangeText = function (event) {
	if(event.keyCode == 8 || event.keyCode ==  46)
		if(this.textContent.length == 0)
			if(this.childNodes.length <= 1)
				event.preventDefault();
}
editableNote.insertParagraph = function () {
	this.insertNode('p','class','paragraph');
}
editableNote.insertContainerEditableNote = function () {
	var parent = this.element.parentNode;
	var wrapper = document.createElement('div');
	var attr = document.createAttribute('id');
	attr.value = 'editable-note-container';
	wrapper.setAttributeNode(attr);
	parent.replaceChild(wrapper, this.element);
	wrapper.appendChild(this.element);
	this.container = document.getElementById('editable-note-container');
}
editableNote.insertNode = function (elementType, attributeName = '', attributeValue = '') {
	var node = document.createElement(elementType);
	var attr = document.createAttribute(attributeName);
	attr.value = attributeValue;
	node.setAttributeNode(attr);
	this.element.appendChild(node);
}
editableNote.setEventFontFamily = function (event, label, dropdown) {
	label.style.fontFamily = event.target.textContent;
	label.textContent = event.target.textContent;
	label.appendChild(dropdown);
	document.execCommand('fontName', false, event.target.textContent);
	//event.stopPropagation();
}
editableNote.setEventFontSize = function (event) {
	document.execCommand('fontSize', false, '7');
	var fontElements = document.getElementsByTagName('font');
	if (fontElements) {
		for (var i = 0, len = fontElements.length; i < len; ++i) {
			if (fontElements[i].size == '7') {
				fontElements[i].removeAttribute('size');
				fontElements[i].style.fontSize = event.target.textContent+'px';
			}
		}
	}
	//event.stopPropagation();
}
editableNote.insertButton = function (elementType) {
	var node = document.createElement('button');
	var label = document.createElement('label');
	var input = document.createElement('input');
	var icon = document.createElement('i');
	var dropdown = document.createElement('div');
	var triangleButton = document.createElement('div');
	var fontSizeList = document.createElement('span');
	var attr;

	switch (elementType) {
		case 'underline':
			attr = document.createAttribute('class');
			attr.value = 'editable-note-button fa fa-'+elementType;
			node.setAttributeNode(attr);
			node.addEventListener('click', this.setEventType, false);
			node.eventType = 'underline';
			break;
		case 'bold':
			attr = document.createAttribute('class');
			attr.value = 'editable-note-button fa fa-'+elementType;
			node.setAttributeNode(attr);
			node.addEventListener('click', this.setEventType, false);
			node.eventType = 'bold';
			break;
		case 'italic':
			attr = document.createAttribute('class');
			attr.value = 'editable-note-button fa fa-'+elementType;
			node.setAttributeNode(attr);
			node.addEventListener('click', this.setEventType, false);
			node.eventType = 'italic';
			break;
		case 'font-size':
			attr = document.createAttribute('class');
			attr.value = 'editable-note-button font-size fa';
			node.setAttributeNode(attr);
			label.style.width = '100%';
			label.style.height = '100%';
			label.style.position = 'relative';
			attr = document.createAttribute('class');
			attr.value = 'fa fa-font';
			icon.setAttributeNode(attr);
			label.appendChild(icon);
			iconClone = icon.cloneNode(true);
			iconClone.style.fontSize = '9px';
			attr = document.createAttribute('class');
			attr.value = 'dropdown-font-size';
			dropdown.setAttributeNode(attr);
			for(var key in this.fontSizes) {
				fontSizeList.textContent = this.fontSizes[key];
				dropdown.appendChild(fontSizeList.cloneNode(true));
			}
			label.appendChild(dropdown);
			label.appendChild(iconClone);
			node.appendChild(label);
			dropdown.addEventListener('click', this.setEventFontSize, false);
			node.addEventListener('click', this.toggleDropdownFontSize, false);
			node.addEventListener('focusout', this.focusOutDropdownFontSize, false);
			break;
		case 'font-family':
			attr = document.createAttribute('class');
			attr.value = 'editable-note-button font-family fa';
			node.setAttributeNode(attr);
			label.style.width = '100%';
			label.style.height = '100%';
			label.style.position = 'relative';
			attr = document.createAttribute('class');
			attr.value = 'dropdown-font-family';
			dropdown.setAttributeNode(attr);
			for(var key in this.fontFamily) {
				fontSizeList.textContent = this.fontFamily[key];
				fontSizeList.style.fontFamily = this.fontFamily[key];
				dropdown.appendChild(fontSizeList.cloneNode(true));
			}
			label.style.fontFamily = this.fontFamily[0];
			label.textContent = this.fontFamily[0];
			label.style.fontSize = '12px';
			label.appendChild(dropdown);
			node.appendChild(label);
			dropdown.addEventListener('click', function (event) {
				editableNote.setEventFontFamily(event, label, dropdown); 
			}, false);
			node.addEventListener('click', this.toggleDropdownFontFamily, false);
			node.addEventListener('focusout', this.focusOutDropdownFontFamily, false);
			break;
		case 'font-color':
			attr = document.createAttribute('class');
			attr.value = 'editable-note-button fa';
			node.setAttributeNode(attr);
			label.style.width = '100%';
			label.style.height = '100%';
			input.style.display = 'none';
			attr = document.createAttribute('class');
			attr.value = 'fa fa-font';
			icon.setAttributeNode(attr);
			attr = document.createAttribute('class');
			attr.value = 'font-triangle-button';
			triangleButton.setAttributeNode(attr);
			attr = document.createAttribute('type');
			attr.value = 'color';
			input.setAttributeNode(attr);
			label.style.position = 'relative';
			label.appendChild(icon);
			label.appendChild(triangleButton);
			label.appendChild(input);
			node.appendChild(label);
			input.addEventListener('change', function (event) {
				editableNote.setColorEvent(event, label);
			}, false);
			input.eventType = 'foreColor';
			label.addEventListener('click', function (event) {
				if (event.target.nodeName == 'INPUT') {
					return true;
				} else {
					label.eventType = 'foreColor';
					label.changeColor = editableNote.fontColor;
					icon.eventType = 'foreColor';
					icon.changeColor = editableNote.fontColor;
					editableNote.setEventType(event);
					event.preventDefault();
				}
			});
			triangleButton.addEventListener('click', function (event) {
				event.stopPropagation();
			});
			break;
		case 'background-font-color':
			attr = document.createAttribute('class');
			attr.value = 'editable-note-button fa';
			node.setAttributeNode(attr);
			label.style.width = '100%';
			label.style.height = '100%';
			label.style.backgroundColor = 'white';
			input.style.display = 'none';
			attr = document.createAttribute('class');
			attr.value = 'fa fa-font';
			icon.setAttributeNode(attr);
			attr = document.createAttribute('class');
			attr.value = 'font-triangle-button';
			triangleButton.setAttributeNode(attr);
			attr = document.createAttribute('type');
			attr.value = 'color';
			input.setAttributeNode(attr);
			label.style.position = 'relative';
			label.appendChild(icon);
			label.appendChild(triangleButton);
			label.appendChild(input);
			node.appendChild(label);
			input.addEventListener('change', function (event) {
				editableNote.setColorEvent(event, label);
			}, false);
			input.eventType = 'hiliteColor';
			label.addEventListener('click', function (event) {
				if (event.target.nodeName == 'INPUT') {
					return true;
				} else {
					event.preventDefault();
					label.eventType = 'hiliteColor';
					label.changeColor = editableNote.fontBackgroundColor;
					icon.eventType = 'hiliteColor';
					icon.changeColor = editableNote.fontBackgroundColor;
					editableNote.setEventType(event);
				}
			});
			triangleButton.addEventListener('click', function (event) {
				event.stopPropagation();
			});
			break;
		case 'align-left':
			attr = document.createAttribute('class');
			attr.value = 'editable-note-button fa fa-'+elementType;
			node.setAttributeNode(attr);
			node.addEventListener('click', this.setEventType, false);
			node.eventType = 'justifyLeft';
			break;
		case 'align-center':
			attr = document.createAttribute('class');
			attr.value = 'editable-note-button fa fa-'+elementType;
			node.setAttributeNode(attr);
			node.addEventListener('click', this.setEventType, false);
			node.eventType = 'justifyCenter';
			break;
		case 'align-right':
			attr = document.createAttribute('class');
			attr.value = 'editable-note-button fa fa-'+elementType;
			node.setAttributeNode(attr);
			node.addEventListener('click', this.setEventType, false);
			node.eventType = 'justifyRight';
			break;
		case 'align-justify':
			attr = document.createAttribute('class');
			attr.value = 'editable-note-button fa fa-'+elementType;
			node.setAttributeNode(attr);
			node.addEventListener('click', this.setEventType, false);
			node.eventType = 'justifyFull';
			break;
		case 'redo':
			attr = document.createAttribute('class');
			attr.value = 'editable-note-button fa fa-'+elementType+'-alt';
			node.setAttributeNode(attr);
			node.addEventListener('click', this.setEventType, false);
			node.eventType = 'redo';
			break;
		case 'undo':
			attr = document.createAttribute('class');
			attr.value = 'editable-note-button fa fa-'+elementType+'-alt';
			node.setAttributeNode(attr);
			node.addEventListener('click', this.setEventType, false);
			node.eventType = 'undo';
			break;
		case 'eraser':
			attr = document.createAttribute('class');
			attr.value = 'editable-note-button fa fa-'+elementType;
			node.setAttributeNode(attr);
			node.addEventListener('click', this.setEventType, false);
			node.eventType = 'removeFormat';
			break;

	}
	this.container.insertBefore(node, this.element);
}
editableNote.setSize = function (width, height) {
	this.element.style.width = width[width.length-1] == '%' ? (width) : (width+'px');
	this.container.style.width = width[width.length-1] == '%' ? (width) : (width+'px');
	if (height[width.length-1] == '%') {
		this.container.style.height = '100%'; 
		this.element.style.height = 'calc(100% - 35px)';
		this.element.style.overflowY = 'scroll';
	} else {
		this.element.style.minHeight = height+'px';
	}
}
editableNote.setColorEvent = function (event, label) {
	if (event.target.eventType == 'foreColor') {
		label.style.color = event.target.value;
		editableNote.fontColor = event.target.value;
	}
	if (event.target.eventType == 'hiliteColor') {
		label.style.backgroundColor = event.target.value;
		editableNote.fontBackgroundColor = event.target.value;
	}
}
editableNote.setEventType = function (event) {
	event.target.eventType == 'foreColor' || event.target.eventType == 'hiliteColor' ?
		document.execCommand(event.target.eventType, false, event.target.changeColor) :
		document.execCommand(event.target.eventType, false, null)
}
editableNote.toggleDropdownFontSize = function () {
	var el = document.getElementsByClassName('dropdown-font-size');
	el[0].classList[1] ?
		setAttributes(el[0], {'class': 'dropdown-font-size'}) : setAttributes(el[0], {'class': 'dropdown-font-size open'})
}
editableNote.focusOutDropdownFontSize = function () {
	var el = document.getElementsByClassName('dropdown-font-size');
	setAttributes(el[0], {'class': 'dropdown-font-size'})
}
editableNote.toggleDropdownFontFamily = function () {
	var el = document.getElementsByClassName('dropdown-font-family');
	el[0].classList[1] ?
		setAttributes(el[0], {'class': 'dropdown-font-family'}) : setAttributes(el[0], {'class': 'dropdown-font-family open'})
}
editableNote.focusOutDropdownFontFamily = function () {
	var el = document.getElementsByClassName('dropdown-font-family');
	setAttributes(el[0], {'class': 'dropdown-font-family'})
}
function setAttributes(el, attrs) {
	for(var key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
}