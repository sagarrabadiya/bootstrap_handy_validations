# bootstrap easy validations
this provide easy to handle jquery validation inside bootstrap environment

check the demo folder for example

add ```data-validation``` attribute in any form
specify validation rules based on data attributes with messages

```html
	<input type="text" data-required="true" data-message-required="this field is required">
	<input type="text" data-required="true" data-email="true" data-message-required="this field is required" data-message-email="email is invalid">
```

to access the validator instance in any javascript use the `data('validator')`
on form

for example

```javascript
    $('form').data('validator') // will give the jquery validator instance
```
