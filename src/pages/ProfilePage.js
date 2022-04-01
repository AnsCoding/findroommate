import { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { usersRef } from '../firebase-config';
import { doc, getDoc, setDoc } from '@firebase/firestore';

// Prawal & Ans

export default function ProfilePage({ showLoader }) {
	const [name, setName] = useState('');
	const [birthday, setBirthday] = useState('');
	const [email, setEmail] = useState('');

	const auth = getAuth();

	useEffect(() => {
		showLoader(true);

		async function getUser() {
			if (auth.currentUser) {
				setEmail(auth.currentUser.email);

				const docRef = doc(usersRef, auth.currentUser.uid); // get more info about the user from users collection
				const userData = await (await getDoc(docRef)).data();
				if (userData) {
					setName(userData.name);
					setBirthday(userData.birthday);
				}
			}
			showLoader(false);
		}

		getUser();
	}, [auth.currentUser, showLoader]); // dependencies: useEffect is executed when auth.currentUser changes

	async function handleSubmit(event) {
		event.preventDefault();
		showLoader(true);

		const userToUpdate = { name: name, birthday: birthday };
		const docRef = doc(usersRef, auth.currentUser.uid);

		await setDoc(docRef, userToUpdate);
		showLoader(false);

		window.location.reload(false);
	}

	function handleSignOut() {
		signOut(auth);
	}

	return (
		<section className='page'>
			<h1>Profile</h1>
			<form onSubmit={handleSubmit}>
				<label>
					Name
					<input
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
						name='name'
						placeholder='Type name'
					/>
				</label>
				<label>
					Email
					<input
						type='email'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						name='email'
						placeholder='Type email'
						disabled
					/>
				</label>
				<label>
					Fødselsdag
					<input
						type='number'
						value={birthday}
						onChange={(e) => setBirthday(e.target.value)}
						name='Birthday'
					/>
				</label>

				<button>Save User</button>
			</form>
			<button onClick={handleSignOut}>Sign Out</button>
		</section>
	);
}
