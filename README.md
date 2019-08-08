# editable-note-js
WYSIWYG Editor, made with pure javascript, doesn't need to use Jquery, a library or a framework.

## **How to use**<br/>
Clone or download the editable note from github and include the script and css on the head, you need to use font awesome too for the icons.<br/> 
```
<head>
    <script type="text/javascript" src="editable-note-js/dist/editable-note.js"></script>
    <link rel="stylesheet" type="text/css" href="editable-note-js/dist/editable-note.css"/>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"/>
</head>
```
Create a element html div with identification name of editable-note.<br/>
```
<div id="editable-note"></div>
```
Inicialize the editable note.<br/>
```
document.addEventListener("DOMContentLoaded", function () {
    editableNote.initialize();
});
```
With Jquery.<br/>
```
$( document ).ready(function() {
    editableNote.initialize();
});
```
Set size of editable note in percent.<br/>
``` 
editableNote.initialize('100%', '100%');
```
Set size of editable note in pixel.<br/>
```
editableNote.initialize(600, 300);
```
Set Color, need to be a hexadecimal.<br/>
```
    editableNote.initialize();
    editableNote.setColor('#d0d0d0');
```
Set the fonts size of editor.<br/>
```
    editableNote.fontSizes = ['10', '12', '13'];
    editableNote.initialize();
```
Set the fonts family of editor.<br/>
```
    editableNote.fontFamily = ['serif','Helvetica','Arial'];
    editableNote.initialize();
```
Set the toolbar of editor.<br/>
```
    editableNote.toolbar = ['bold','underline','italic','eraser'];
    editableNote.initialize();
```

**On the code have a complete example.**
