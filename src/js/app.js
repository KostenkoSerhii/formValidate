// example of simple includes for js
//=include lib/sayHello.js
//=include lib/jquery.min.js
//=include lib/slick.min.js
//=include lib/svgxuse.min.js

sayHello();


$(document).ready(function(){

	/*callback validate*/
	$('form').submit(function(e) {
		e.preventDefault();

		var $thisForm = $(this);
		var $fields = $thisForm.find(".form-field");
		var formStatus = 1;
		var fieldStatus = 1;

		$fields.removeClass("error-field valid-field");

		$thisForm.find(".form-field").each(function(){
			var $this = $(this);
			validateInput($this);
		});
		
		if(fieldStatus == 0){
			formStatus = 0;
		}

		if(formStatus == 1) {
			console.log("form status ok")
			$.ajax({
				url: 'mail.php',	
				type: 'GET',
				data: $(this).serialize(),
				success: function(){
					console.log("success")
					$fields.removeClass('valid-field');
					$thisForm.trigger("reset");
				}
			})
		};

		function validateInput(input){
			var val = input.val();
			var nameStr = input.attr("name");

			switch (nameStr) {
				case "name":
				if(!isValidGeneral(val)){
					input.addClass('error-field');
					fieldStatus = 0;
				}else{
					//input.addClass('valid-field')
				} break;

				case "phone":
				if(!isValidPhope(val)){
					input.addClass('error-field');
					fieldStatus = 0;
				}else{
					//input.addClass('valid-field')
				} break;

				case "e-mail":
				if(!isValidEmail(val)){
					input.addClass('error-field');
					fieldStatus = 0;
				}else{
					//input.addClass('valid-field')
				} break;

				default: ;
			};
		};
	});



	function isValidGeneral(val) {
		if(val.length >= 2) return 1;
		return 0;
	};
	function isValidPhope(phone) {
		var regExp = new RegExp(/((8|\+7)[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{5,10}/);
		return regExp.test(phone);
	};
	function isValidEmail(email) {
		var regExp = new RegExp(/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/i);
		return regExp.test(email);
	};
	/*callback validate*/

});