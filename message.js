const scriptURLC = 'https://script.google.com/macros/s/AKfycbzZv0FZtQRSlrQGUh8ndIfJrM9A6gFqWfd3en8VIT7pFMQCjHNs3_6dSM9t4f4njnPz/exec'
const formc = document.forms['html-form-to-google-sheet'];
const alert_subc = document.getElementById('alert_submission');

formc.addEventListener('submit', e => {
	// todo disable submit button
	e.preventDefault();
	document.getElementById('but').classList.add('loading');
	fetch(scriptURLC, {
			method: 'POST',
			body: new FormData(formc)
		})
		.then(res => {
			console.log(res);
			// todo enable submit button

			if (res['status'] === 200) {
				alert_subc.classList.remove('alert-danger');
				alert_subc.classList.add('alert-msg');
				alert_subc.innerHTML = 'Message Received!!. We will contact you soon';
				formc.reset();

			} else {
				alert_subc.classList.remove('alert-msg');
				alert_subc.classList.add('alert-danger');
				alert_subc.innerHTML = 'Error occurred.';

			}
			document.getElementById('but').classList.remove('loading');
		})
		.catch(error => {
			console.error('Error!', error.message);
			alert_subc.classList.remove('alert-msg');
			alert_subc.classList.add('alert-danger');
			alert_subc.innerHTML = 'Error occurred.';
			// todo enable submit button

		})
});
