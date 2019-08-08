# editable-note-js
WYSIWYG Editor, made with pure javascript, doesn't need to use Jquery, a library or a framework.

## **How to use**<br/>
Clone or download the editable note from github and include the script and css on the head, you need to use font awesome too for the icons.<br/> 
```
<head>
    <script type="text/javascript" src="dist/editable-note.js"></script>
    <link rel="stylesheet" type="text/css" href="dist/editable-note.css"/>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"/>
</head>
```
Create a element html div with identification name of editable-note.<br/>
```
<div id="editable-note"></div>
```
Inicialize the editable note.<br/>
```
editableNote.initialize();
```
Set size of editable note in percent.<br/>
``` 
editableNote.initialize('100%', '100%');
```
Set size of editable note in pixel.<br/>
```
editableNote.initialize(600, 300);
```

