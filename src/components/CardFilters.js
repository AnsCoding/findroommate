import { useState, useEffect } from 'react';
import { doc, getDoc } from '@firebase/firestore';
import { usersRef } from '../firebase-config';

export default function UserAvatar({ uid }) {
	const [user, setUser] = useState({
		student: '',
		position: '',
		pets: '',
		personality: '',
		language: '',
		smoking: '',
		eatingHabits: '',
		partyHabits: '',
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
		<div class='divbox'>
			<div class='box-info'>🚬{user.smoking}</div>
			<div class='box-info'>🐕 {user.pets}</div>
			<div class='box-info'>👤 {user.personality}</div>
			<div class='box-info'>🥄 {user.eatingHabits}</div>
			<div class='box-info'>🎉 {user.partyHabits}</div>
			<div class='box-info'>💼 {user.position}</div>
			<div class='box-info'>🗣️ {user.language}</div>
		</div>
	);
}
