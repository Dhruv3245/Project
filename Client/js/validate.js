/*global jQuery:false */
jQuery(document).ready(function($) {
"use strict";

	//Contact
	$('form.validateform').submit(function(){

		var f = $(this).find('.field'), 
		ferror = false, 
		emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;

		f.children('input').each(function(){ // run all inputs

		    var i = $(this); // current input
		    var rule = i.attr('data-rule');

		    if( rule != undefined ){
			var ierror=false; // error flag for current input
			var pos = rule.indexOf( ':', 0 );
			if( pos >= 0 ){
			    var exp = rule.substr( pos+1, rule.length );
			    rule = rule.substr(0, pos);
			}else{
			    rule = rule.substr( pos+1, rule.length );
			}
			
			switch( rule ){
			    case 'required':
				if( i.val()=='' ){ ferror=ierror=true; }
				break;

			    case 'maxlen':
				if( i.val().length<parseInt(exp) ){ ferror=ierror=true; }
				break;

			    case 'email':
				if( !emailExp.test(i.val()) ){ ferror=ierror=true; }
				break;


			    case 'checked':
				if( !i.attr('checked') ){ ferror=ierror=true; }
				break;
				
			    case 'regexp':
				exp = new RegExp(exp);
				if( !exp.test(i.val()) ){ ferror=ierror=true; }
				break;
			  }
			  i.next('.validation').html( ( ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '' ) ).show('blind');
		    }
		});
		f.children('textarea').each(function(){ // run all inputs

		    var i = $(this); // current input
		    var rule = i.attr('data-rule');

		    if( rule != undefined ){
			var ierror=false; // error flag for current input
			var pos = rule.indexOf( ':', 0 );
			if( pos >= 0 ){
			    var exp = rule.substr( pos+1, rule.length );
			    rule = rule.substr(0, pos);
			}else{
			    rule = rule.substr( pos+1, rule.length );
			}
			
			switch( rule ){
			    case 'required':
				if( i.val()=='' ){ ferror=ierror=true; }
				break;

			    case 'maxlen':
				if( i.val().length<parseInt(exp) ){ ferror=ierror=true; }
				break;
			  }
			  i.next('.validation').html( ( ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'wrong Input') : '' ) ).show('blind');
		    }
		});
		if( ferror ) return false; 
			else var str = $(this).serialize();
		
			   $.ajax({
			   type: "POST",
			   url: "contact/contact.php",
			   data: str,
			   success: function(msg){
			$("#sendmessage").addClass("show");
			$("#errormessage").ajaxComplete(function(event, request, settings){
		
			if(msg == 'OK')
			{
				$("#sendmessage").addClass("show");
				
			}
			else
			{
				$("#sendmessage").removeClass("show");
				result = msg;
			}
		
			$(this).html(result);});}});
				return false;
	});

});
// Contact Form Validation
$(document).ready(function() {
    // Phone number validation - Indian format
    function validatePhone(phone) {
        var phoneRegex = /^[6-9]\d{9}$/;
        return phoneRegex.test(phone.replace(/\D/g, ''));
    }

    // Email validation
    function validateEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // PIN Code validation - Indian format
    function validatePincode(pincode) {
        var pincodeRegex = /^\d{6}$/;
        return pincodeRegex.test(pincode);
    }

    // Website URL validation
    function validateWebsite(website) {
        if (website === '') return true; // Optional field
        var websiteRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        return websiteRegex.test(website);
    }

    // Name validation - at least 2 characters and only letters/spaces
    function validateName(name) {
        var nameRegex = /^[a-zA-Z\s]{2,}$/;
        return nameRegex.test(name);
    }

    // Message validation - at least 10 characters
    function validateMessage(message) {
        return message.length >= 10;
    }

    // Form submission handler
    $('#contact-form').submit(function(e) {
        e.preventDefault();
        var isValid = true;

        // Clear previous error styles
        $('.form-group').removeClass('has-error');
        $('.error-message').remove();

        // Name validation
        var name = $('#name').val().trim();
        if (name === '') {
            $('#name').closest('.form-group').addClass('has-error');
            $('#name').after('<span class="error-message text-danger">Please enter your name</span>');
            isValid = false;
        } else if (!validateName(name)) {
            $('#name').closest('.form-group').addClass('has-error');
            $('#name').after('<span class="error-message text-danger">Name should contain only letters and be at least 2 characters long</span>');
            isValid = false;
        }

        // Email validation
        var email = $('#email').val().trim();
        if (email === '') {
            $('#email').closest('.form-group').addClass('has-error');
            $('#email').after('<span class="error-message text-danger">Please enter your email</span>');
            isValid = false;
        } else if (!validateEmail(email)) {
            $('#email').closest('.form-group').addClass('has-error');
            $('#email').after('<span class="error-message text-danger">Please enter a valid email address</span>');
            isValid = false;
        }

        // Phone validation
        var phone = $('#phone').val().trim();
        if (phone === '') {
            $('#phone').closest('.form-group').addClass('has-error');
            $('#phone').after('<span class="error-message text-danger">Please enter your phone number</span>');
            isValid = false;
        } else if (!validatePhone(phone)) {
            $('#phone').closest('.form-group').addClass('has-error');
            $('#phone').after('<span class="error-message text-danger">Please enter a valid 10-digit Indian mobile number</span>');
            isValid = false;
        }

        // PIN Code validation
        var pincode = $('#pincode').val().trim();
        if (pincode === '') {
            $('#pincode').closest('.form-group').addClass('has-error');
            $('#pincode').after('<span class="error-message text-danger">Please enter PIN code</span>');
            isValid = false;
        } else if (!validatePincode(pincode)) {
            $('#pincode').closest('.form-group').addClass('has-error');
            $('#pincode').after('<span class="error-message text-danger">Please enter a valid 6-digit PIN code</span>');
            isValid = false;
        }

        // Website validation
        var website = $('#website').val().trim();
        if (website !== '' && !validateWebsite(website)) {
            $('#website').closest('.form-group').addClass('has-error');
            $('#website').after('<span class="error-message text-danger">Please enter a valid website URL</span>');
            isValid = false;
        }

        // Subject validation
        var subject = $('#subject').val().trim();
        if (subject === '') {
            $('#subject').closest('.form-group').addClass('has-error');
            $('#subject').after('<span class="error-message text-danger">Please enter a subject</span>');
            isValid = false;
        } else if (subject.length < 5) {
            $('#subject').closest('.form-group').addClass('has-error');
            $('#subject').after('<span class="error-message text-danger">Subject should be at least 5 characters long</span>');
            isValid = false;
        }

        // Message validation
        var message = $('#message').val().trim();
        if (message === '') {
            $('#message').closest('.form-group').addClass('has-error');
            $('#message').after('<span class="error-message text-danger">Please enter your message</span>');
            isValid = false;
        } else if (!validateMessage(message)) {
            $('#message').closest('.form-group').addClass('has-error');
            $('#message').after('<span class="error-message text-danger">Message should be at least 10 characters long</span>');
            isValid = false;
        }

        // If form is valid, show success message
        if (isValid) {
            $('#contactSuccess').removeClass('hidden');
            $('#contactError').addClass('hidden');
            
            // Form data
            console.log('Form submitted successfully!');
            console.log('Form Data:', {
                name: name,
                email: email,
                phone: phone,
                pincode: pincode,
                website: website,
                subject: subject,
                message: message
            });
            
            // Reset form
            $('#contact-form')[0].reset();
        } else {
            $('#contactError').removeClass('hidden');
            $('#contactSuccess').addClass('hidden');
        }
    });

    // Auto-format phone number (only numbers, max 10 digits)
    $('#phone').on('input', function() {
        var phone = $(this).val().replace(/\D/g, '');
        if (phone.length > 10) {
            phone = phone.substring(0, 10);
        }
        $(this).val(phone);
    });

    // Auto-format PIN code (only numbers, max 6 digits)
    $('#pincode').on('input', function() {
        var pincode = $(this).val().replace(/\D/g, '');
        if (pincode.length > 6) {
            pincode = pincode.substring(0, 6);
        }
        $(this).val(pincode);
    });
});