'use strict';
(function($) {
	/**
	 * scan all the forms and apply validation to it
	 */

	var supportedRules = [
		'required',
		'remote',
		'email',
		'url',
		'date',
		'dateISO',
		'number',
		'digits',
		'equalTo',
		'maxlength',
		'minlength',
		'rangelength',
		'range',
		'max',
		'min'
	];

	var filterRules = function(rules) {
		var validRules = {};
		$.each(rules, function(key, value) {
			if(supportedRules.indexOf(key) !== -1) {
				validRules[key] = value;
			}
		});
		return validRules;
	}

	var extractMessages = function(dataAttributes) {
		var messages = {}
		$.each(dataAttributes, function(key, value) {
			if(/message/.test(key))
				messages[key.replace('message', '').toLowerCase()] = value;
		});
		return messages;
	}

	var forms = $('form[data-validation]');

	var generateId = function(length) {
		if(!length) {
			length = 5;
		}
		var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	    for( var i=0; i < length; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));
	    return text;
	}

	/**
	 * scan inputs inside each form and create validation instance
	 * @param  {[type]} index [description]
	 * @param  {[type]} form) {		console.log(index,form);	} [description]
	 * @return {[type]}       [description]
	 */
	$.each(forms, function(index, form) {
		var inputs = $(form).find('input');
		var validationRules = {};
		var validationMessages = {};
		$.each(inputs, function(inputIndex, input) {
			input = $(input);
			var id;
			if(!input.attr('id')) {
				if(input.attr('name')) {
					input.attr('id', input.attr('name'));
				} else {
					input.attr('id', generateId(10));
					input.attr('name', input.attr('id'));
				}
			}
			id = input.attr('id');
			var rulesData = input.data();
			if(input.attr('type') == 'email') {
				rulesData['email'] = true;
			} else if(input.attr('type') == 'number') {
				rulesData['number'] = true;
			}
			rulesData = filterRules(rulesData);
			validationRules[id] = rulesData;
			validationMessages[id] = extractMessages(input.data());
		});
		var validatorInstance = $(form).validate({
			rules:validationRules,
			messages: validationMessages,
			errorClass: 'help-block',
			errorElement: 'span',
			highlight: function(element) {
		        $(element).closest('.form-group').addClass('has-error');
		    },
		    unhighlight: function(element) {
		        $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
		    }
		});
		$(form).data('validator', validatorInstance);
	});
})(jQuery);
