import { useEffect, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';

export default function SignInPage({ showLoader }) {
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		showLoader(false);
	}, [showLoader]);

	function signIn(event) {
		event.preventDefault();
		const mail = event.target.mail.value;
		const password = event.target.password.value;
		const auth = getAuth();
		signInWithEmailAndPassword(auth, mail, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
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
			<h1>Sign In</h1>
			<form onSubmit={signIn}>
				<input type='email' name='mail' placeholder='Type your mail' />
				<input
					type='password'
					name='password'
					placeholder='Type your password'
				/>
				<p className='text-error'>{errorMessage}</p>
				<button>Sign in</button>
			</form>
			<p className='text-center'>
				Har du ikke en profil? <Link to='/sign-up'>Opret en profil her</Link>
			</p>
		</section>
	);
}
