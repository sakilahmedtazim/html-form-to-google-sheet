const scriptURLC = 'https://script.google.com/macros/s/AKfycbyHcvNXWBA5D4FCxg74XIHPUfwy_638TODdN9Rgir3H26rF3cg9SLGeIUkHPZBwz1O7Bw/exec'
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
