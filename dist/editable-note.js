editableNote = {
	element: null,
	container: null,
	containerButtons: {
		general: null,
		fontStyle: null,
		align: null,
		undoRedo: null,
		fontFamily: null
	},
	fontBackgroundColor: '#fcff43',
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
		'undo',
		'redo'
	],
	fontFamily: [
		'Arial',
		'Helvetica',
		'serif',
		'Arial Black',
		'Impact',
		'cursive',
		'Courier New',
		'Verdana',
		'Times New Roman'
	],
	fontSizes: ['8','9','10','11','12','14','16','18','24','30','36','40','48']
}
editableNote.initialize = function (width = 600, height = 300) {
	this.element = document.getElementById('editable-note');
	this.element.contentEditable = 'true';
	this.element.addEventListener('keydown', this.onChangeText, false);
	this.insertContainerEditableNote();
	this.insertContainerButtonEditableNote();
	this.setSize(width, height);
	for (var key in this.toolbar) {
		this.insertButton(this.toolbar[key]);
	}
	this.insertParagraph();
	this.setPrimaryColor('#ffffff'); //default
	this.setSecundaryColor('#eaeaea');
}
editableNote.onChangeText = function (event) {
	if (event.keyCode == 8 || event.keyCode ==  46)
		if (this.textContent.length == 0)
			if (this.childNodes.length <= 1)
				event.preventDefault();
}
editableNote.insertParagraph = function () {
	this.insertNode('p','class','paragraph');
}
editableNote.insertContainerButtonEditableNote = function () {
	var types = ['undo-redo', 'general', 'font-family', 'font-style', 'align'];
	for (var key in types) {
		var container = document.createElement('div');
		setAttributes(container, {'class': 'container-button '+types[key]});
		this.container.insertBefore(container, this.element);
		types[key] == 'general' && (this.containerButtons.general = container)
		types[key] == 'font-style' && (this.containerButtons.fontStyle = container)
		types[key] == 'align' && (this.containerButtons.align = container)
		types[key] == 'undo-redo' && (this.containerButtons.undoRedo = container)
		types[key] == 'font-family' && (this.containerButtons.fontFamily = container)
	}
}
editableNote.insertContainerEditableNote = function () {
	var parent = this.element.parentNode;
	var wrapper = document.createElement('div');
	setAttributes(wrapper, {'id': 'editable-note-container'});
	parent.replaceChild(wrapper, this.element);
	wrapper.appendChild(this.element);
	this.container = wrapper;
}
editableNote.insertNode = function (elementType, attributeName = '', attributeValue = '') {
	var node = document.createElement(elementType);
	var attr = {};
	attr[attributeName] = attributeValue;
	setAttributes(node, attr);
	this.element.appendChild(node);
}
editableNote.setEventFontFamily = function (event, label, dropdown) {
	if (event.target.classList[0] == 'dropdown-font-family') 
		return false;
	label.style.fontFamily = event.target.textContent;
	label.textContent = event.target.textContent;
	label.appendChild(dropdown);
	document.execCommand('fontName', false, event.target.textContent);
}
editableNote.setEventFontSize = function (event) {
	if (event.target.classList[0] == 'dropdown-font-size') 
		return false;
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
}
editableNote.insertButton = function (elementType) {
	var node = document.createElement('button');
	var label = document.createElement('label');
	var input = document.createElement('input');
	var icon = document.createElement('i');
	var dropdown = document.createElement('div');
	var paletteColor = document.createElement('div');
	var list = document.createElement('span');

	switch (elementType) {
		case 'underline':
			setAttributes(node, {'class': 'editable-note-button fa fa-'+elementType});
			node.addEventListener('click', this.setEventType, false);
			node.eventType = 'underline';
			this.containerButtons.general.appendChild(node);
			break;
		case 'bold':
			setAttributes(node, {'class': 'editable-note-button fa fa-'+elementType});
			node.addEventListener('click', this.setEventType, false);
			node.eventType = 'bold';
			this.containerButtons.general.appendChild(node);
			break;
		case 'italic':
			setAttributes(node, {'class': 'editable-note-button fa fa-'+elementType});
			node.addEventListener('click', this.setEventType, false);
			node.eventType = 'italic';
			this.containerButtons.general.appendChild(node);
			break;
		case 'font-size':
			setAttributes(node, {'class': 'editable-note-button font-size fa'});
			setAttributes(icon, {'class': 'fa fa-font'});
			setAttributes(dropdown, {'class': 'dropdown-font-size'});
			iconClone = icon.cloneNode(true);
			iconClone.style.fontSize = '9px';
			for(var key in this.fontSizes) {
				list.textContent = this.fontSizes[key];
				dropdown.appendChild(list.cloneNode(true));
			}
			label.appendChild(icon);
			label.appendChild(dropdown);
			label.appendChild(iconClone);
			node.appendChild(label);
			dropdown.addEventListener('click', this.setEventFontSize, false);
			node.addEventListener('click', this.toggleDropdownFontSize, false);
			node.addEventListener('focusout', this.focusOutDropdownFontSize, false);
			this.containerButtons.fontStyle.appendChild(node);
			break;
		case 'font-family':
			setAttributes(node, {'class': 'editable-note-button font-family fa'});
			setAttributes(dropdown, {'class': 'dropdown-font-family'});
			for(var key in this.fontFamily) {
				list.textContent = this.fontFamily[key];
				list.style.fontFamily = this.fontFamily[key];
				dropdown.appendChild(list.cloneNode(true));
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
			this.containerButtons.fontFamily.appendChild(node);
			break;
		case 'font-color':
			setAttributes(node, {'class': 'editable-note-button fa'});
			setAttributes(icon, {'class': 'fa fa-font'});
			setAttributes(paletteColor, {'class': 'open-color-palette'});
			setAttributes(input, {'type': 'color'});
			label.appendChild(icon);
			label.appendChild(paletteColor);
			label.appendChild(input);
			node.appendChild(label);
			input.addEventListener('change', function (event) {
				editableNote.setColorEvent(event, label, icon);
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
			paletteColor.addEventListener('click', function (event) {
				event.stopPropagation();
			});
			this.containerButtons.fontStyle.appendChild(node);
			break;
		case 'background-font-color':
			setAttributes(node, {'class': 'editable-note-button fa'});
			setAttributes(icon, {'class': 'fa fa-font'});
			setAttributes(paletteColor, {'class': 'open-color-palette'});
			setAttributes(input, {'type': 'color'});
			icon.style.backgroundColor = '#fcff43';
			icon.style.padding = '3px 5px 3px 5px';
			label.appendChild(icon);
			label.appendChild(paletteColor);
			label.appendChild(input);
			node.appendChild(label);
			input.addEventListener('change', function (event) {
				editableNote.setColorEvent(event, label, icon);
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
			paletteColor.addEventListener('click', function (event) {
				event.stopPropagation();
			});
			this.containerButtons.fontStyle.appendChild(node);
			break;
		case 'align-left':
			setAttributes(node, {'class': 'editable-note-button fa fa-'+elementType});
			node.addEventListener('click', this.setEventType, false);
			node.eventType = 'justifyLeft';
			this.containerButtons.align.appendChild(node);
			break;
		case 'align-center':
			setAttributes(node, {'class': 'editable-note-button fa fa-'+elementType});
			node.addEventListener('click', this.setEventType, false);
			node.eventType = 'justifyCenter';
			this.containerButtons.align.appendChild(node);
			break;
		case 'align-right':
			setAttributes(node, {'class': 'editable-note-button fa fa-'+elementType});
			node.addEventListener('click', this.setEventType, false);
			node.eventType = 'justifyRight';
			this.containerButtons.align.appendChild(node);
			break;
		case 'align-justify':
			setAttributes(node, {'class': 'editable-note-button fa fa-'+elementType});
			node.addEventListener('click', this.setEventType, false);
			node.eventType = 'justifyFull';
			this.containerButtons.align.appendChild(node);
			break;
		case 'redo':
			setAttributes(node, {'class': 'editable-note-button fa fa-'+elementType});
			node.addEventListener('click', this.setEventType, false);
			node.eventType = 'redo';
			this.containerButtons.undoRedo.appendChild(node);
			break;
		case 'undo':
			setAttributes(node, {'class': 'editable-note-button fa fa-'+elementType});
			node.addEventListener('click', this.setEventType, false);
			node.eventType = 'undo';
			this.containerButtons.undoRedo.appendChild(node);
			break;
		case 'eraser':
			setAttributes(node, {'class': 'editable-note-button fa fa-'+elementType});
			node.addEventListener('click', this.setEventType, false);
			node.eventType = 'removeFormat';
			this.containerButtons.general.appendChild(node);
			break;
	}
}
editableNote.setSize = function (width, height) {
	this.element.style.width = width[width.length-1] == '%' ? ('100%') : (width+'px');
	this.container.style.width = width[width.length-1] == '%' ? ('calc('+width+' - 21px)') : (width+'px');
	if (height[height.length-1] == '%') {
		this.container.style.height = height;
		this.element.style.height = 'calc(100% - 90px)';
		this.element.style.overflowY = 'scroll';
	} else {
		this.element.style.minHeight = height+'px';
	}
}
editableNote.setColorEvent = function (event, label, icon) {
	if (event.target.eventType == 'foreColor') {
		label.style.color = event.target.value;
		editableNote.fontColor = event.target.value;
	}
	if (event.target.eventType == 'hiliteColor') {
		icon.style.backgroundColor = event.target.value;
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
editableNote.getHTML = function () {
	return this.element.innerHTML;
}
editableNote.setPrimaryColor = function (color) {
	this.element.style.backgroundColor = color;
	this.container.style.backgroundColor = color;
	for (var key in this.containerButtons) {
		this.containerButtons[key].childNodes.forEach(function(item){
			item.style.backgroundColor = color;
		});
	}
}
editableNote.setSecundaryColor = function (color) {
	NodeList.prototype.forEach = Array.prototype.forEach;
	this.element.style.borderTop = 'solid 1px '+shade(color, -0.05);
	this.container.style.boxShadow = '0px 0px 3px -1px'+shade(color, -0.9);
	var oldColor = color;
	color = shade(color, -0.1);
	for (var key in this.containerButtons) {
		this.containerButtons[key].style.boxShadow = '1px 1px 2px 0px'+shade(oldColor, -0.2);
		this.containerButtons[key].style.borderTop = 'solid 1px'+shade(oldColor, -0.05);
		this.containerButtons[key].style.borderLeft = 'solid 1px'+shade(oldColor, -0.05);
		this.containerButtons[key].childNodes.forEach(function(item, index, array){
			if (key == 'fontFamily' || key == 'fontStyle') {
				if (item.childNodes[0].childNodes[1].classList[0] == 'dropdown-font-family') {
					item.childNodes[0].childNodes[1].style.backgroundColor = shade(color, 1);
				}
				if (item.childNodes[0].childNodes[1].classList[0] == 'dropdown-font-size') {
					item.childNodes[0].childNodes[1].style.backgroundColor = shade(color, 1);
				}
				item.childNodes[0].childNodes[1].childNodes.forEach(function(list){
					list.onmouseover = function() {
						this.style.backgroundColor = shade(color, 0.6);
					}
					list.onmouseleave = function() {
						this.style.backgroundColor = shade(color, 1);
					}
				});
			}
			item.onmouseover = function() {
				this.style.backgroundColor = shade(color, 0.3);
			}
			item.onmouseleave = function() {
				this.style.backgroundColor = editableNote.container.style.backgroundColor;
			}
		});
	}
}
function setAttributes(el, attrs) {
	for (var key in attrs) {
		el.setAttribute(key, attrs[key]);
	}
}
function hex2(c) {
	c = Math.round(c);
	if (c < 0) c = 0;
	if (c > 255) c = 255;

	var s = c.toString(16);
	if (s.length < 2) s = "0" + s;

	return s;
}
function color(r, g, b) {
	return "#" + hex2(r) + hex2(g) + hex2(b);
}
function shade(col, light) {
	// TODO: Assert that col is good and that -1 < light < 1
	var r = parseInt(col.substr(1, 2), 16);
	var g = parseInt(col.substr(3, 2), 16);
	var b = parseInt(col.substr(5, 2), 16);
	if (light < 0) {
		r = (1 + light) * r;
		g = (1 + light) * g;
		b = (1 + light) * b;
	} else {
		r = (1 - light) * r + light * 255;
		g = (1 - light) * g + light * 255;
		b = (1 - light) * b + light * 255;
	}
	return color(r, g, b);
}