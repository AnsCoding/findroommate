import { useState, useEffect } from 'react';
import { doc, getDoc } from '@firebase/firestore';
import { usersRef } from '../firebase-config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { faCity } from '@fortawesome/free-solid-svg-icons';

export default function UserAvatar({ uid, post }) {
	const [user, setUser] = useState({
		name: "User's Name",
		birthday: "User's Birthday",
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
		<div className='avatar'>
			<span
				style={{
					marginLeft: '0.4em',
				}}
			>
				<h2
					style={{
						margin: '0.2em 0',
					}}
				>
					{user.name}, {user.birthday}
				</h2>
				<p
					style={{
						marginBottom: '0.3em',
					}}
				>
					<FontAwesomeIcon
						icon={faHouse}
						style={{
							color: '#5195E5',
							marginRight: '0.2em',
						}}
					/>{' '}
					{post.housing}
				</p>
				<p
					style={{
						marginBottom: '0.3em',
					}}
				>
					<FontAwesomeIcon
						icon={faCity}
						style={{
							color: '#5195E5',
							marginRight: '0.2em',
						}}
					/>{' '}
					{post.city}
				</p>
			</span>
		</div>
	);
}
