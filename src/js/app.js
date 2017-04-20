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
		var $inputs = $thisForm.find("input")
		var status = 1;

		$inputs.removeClass("error-input");
		$inputs.removeClass("valid-input");
		$thisForm.find("input").each(function(){
			var $this = $(this);
			validateInput($this);
		});
		
		if($inputs.hasClass("error-input")){
			status = 0;
		}else{
			$inputs.addClass("valid-input")
		}

		if(status == 1) {
			$.ajax({
				url: 'mail.php',
				type: 'GET',
				data: $(this).serialize(),
				success: function(){
					console.log("success")
					$inputs.removeClass('valid-input');
					$thisForm.trigger("reset");
				}
			})
		}
	});

	function validateInput(input){
		var val = input.val();
		var nameStr = input.attr("name");

		switch (nameStr) {
			case "name":
			if(!isValidGeneral(val)){
				input.addClass('error-input')
			}else{
				input.addClass('valid-input')
			} break;

			case "phone":
			if(!isValidPhope(val)){
				input.addClass('error-input')
			}else{
				input.addClass('valid-input')
			} break;

			case "e-mail":
			if(!isValidEmail(val)){
				input.addClass('error-input')
			}else{
				input.addClass('valid-input')
			} break;

			default: ;
		};
	};


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