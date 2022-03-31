import { useEffect, useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

export default function SignUpPage({ showLoader }) {
	const [errorMessage, setErrorMessage] = useState('');

	const auth = getAuth();

	useEffect(() => {
		showLoader(false);
	}, [showLoader]);

	function handleSignUp(event) {
		event.preventDefault();
		const email = event.target.mail.value;
		const password = event.target.password.value;
		createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				// ...
				console.log(user);
			})
			.catch((error) => {
				let code = error.code;
				code = code.replaceAll('-', ' ');
				code = code.replaceAll('auth/', '');
				setErrorMessage(code);
			});
	}

	return (
		<section className='page'>
			<h1>Sign Up</h1>
			<form onSubmit={handleSignUp}>
				<input type='email' name='mail' placeholder='Din email' />
				<input type='password' name='password' placeholder='Din adgangskode' />
				<input type='text' name='name' placeholder='Dit navn' />
				<input type='number' name='birthday' placeholder='Din fødselsdag' />
				<p className='text-error'>{errorMessage}</p>
				<button>Opret en profil</button>
			</form>
			<p className='text-center'>
				Har du en profil? <Link to='/sign-in'>Login her</Link>
			</p>
		</section>
	);
}
