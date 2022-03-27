import { useState, useEffect } from 'react';
import { doc, getDoc } from '@firebase/firestore';
import { usersRef } from '../firebase-config';

export default function UserAvatar({ uid }) {
	const [user, setUser] = useState({
		budget: '',
		bio: '',
	});

	useEffect(() => {
		async function getUser() {
			const docRef = doc(usersRef, uid);
			const docSnap = await getDoc(docRef);
			if (docSnap.data()) {
				setUser(docSnap.data());
			}
		}
		getUser();
	}, [uid]);

	return (
		<div class='bio-box'>
			<p class='bio-text'>{user.bio}</p>

			<span>
				<h3>{user.budget} kr.</h3>
				<p>Månedlig husleje budget</p>
			</span>
		</div>
	);
}
