$(document).ready(function () {

	// modal
	$('[data-name=modal]').on('click', function() {
		$('.overlay, #modal').fadeIn(500);
		$('body').toggleClass('lock');
	});

	$('.modal__close').on('click', function() {
		$('.overlay, #modal, #thanks').fadeOut(500);
		$('body').toggleClass('lock');
	});

	// validate form
	$('#form').validate({
		rules: {
			name:	{
				required: true,
				minlength: 2,
			},
			phone: "required",
			email: {
				required: true,
				email: true,
			},
		},
		messages: {
			name: {
				required: 'Пожалуйста, введите своё имя',
				minlength: jQuery.validator.format('Введите от {0} букв'),
			},
			phone: 'Пожалуйста, введите свой номер телефона',
			email: {
				required: 'Пожалуйста, введите свою почту',
        email: 'Неправильно введена почта', 
			},
		},
	});

  // Masked Input
  $('input[name=phone').mask('+7 (999) 999-9999');

	// ajax
	$('#form').submit(function(e) {
		e.preventDefault();

		// это условие внутри Ajax чтобы письмо пустым не отправлялось
		if (!$(this).valid()) {
			return;
		}

		$.ajax({
			type: 'POST',
			url: 'mailer/smart.php',
			data: $(this).serialize(),
		}).done(function() {
			$(this).find('input').val('');
			$('#modal').fadeOut(500);
			$('#thanks').fadeIn(500);


			$('form').trigger('reset');
		});
		return false;
	});
	
	$('.modal__close').on('click', function() {
		$('.overlay, #thanks').fadeOut(500);
	});

	// кнопка наверх
  $(window).scroll(function () {
    if ($(this).scrollTop() > 700) {
      $('.pageup').slideDown();
    } else {
      $('.pageup').slideUp();
    }
  });

  // плавность перехода по всем ссылкам на сайте
  $("a[href^='#']").click(function () {
    const _href = $(this).attr('href');
    $('html, body').animate({ scrollTop: $(_href).offset().top + 'px' });
    return false;
  });

});