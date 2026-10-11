export function initForm() {
	const formField = document.querySelector('.form-contact');
	const userEmail = document.getElementById('contact-email');
	const formBtn = document.querySelector('.form-contact__btn');
	if (formField) {
		function validateEmail() {
			const emailValue = userEmail.value.trim();
			const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
			if (!emailRegex.test(emailValue) || emailValue === '') {
				showError(userEmail.closest('.form-contact__item'));
				return null;
			}
			return emailValue;
		}

		function showError(el) {
			el.classList.add('error');
			const input = el.querySelector('input');
			if (input) {
				input.value = '';
				input.placeholder = 'example@email.com';
				input.setAttribute('aria-invalid', 'true');
			}
		}

		function resetErrors(el) {
			// if (el && typeof el.forEach === 'function') {
			// 	el.forEach(el => {
			// 		el.classList.remove('error');
			// 		const input = el.querySelector('input');
			// 		if (input) {
			// 			input.placeholder = 'Enter your email address';
			// 			input.setAttribute('aria-invalid', 'false');
			// 		}
			// 	});
			// } else if (el) {
			// 	el.classList.remove('error');
			// 	const input = el.querySelector('input');
			// 	if (input) {
			// 		input.placeholder = 'Enter your email address';
			// 		input.setAttribute('aria-invalid', 'false');
			// 	}
			// }
			if (el) {
				el.classList.remove('error');
				const input = el.querySelector('input');
				if (input) {
					input.placeholder = 'Enter your email address';
					input.setAttribute('aria-invalid', 'false');
				}
			}
		}

		userEmail.addEventListener('input', () => resetErrors(userEmail.closest('.form-contact__item')));

		formField.addEventListener('submit', e => {
			e.preventDefault();
			resetErrors(document.querySelector('.form-contact__item'));

			const email = validateEmail();

			if (email) {
				alert("Thanks! We've received your email and will be in touch soon.");
				setTimeout(() => {
					formField.reset();
					resetErrors(document.querySelector('.form-contact__item'));
				}, 1500);
			}
		});
	}
}
