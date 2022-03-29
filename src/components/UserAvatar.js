import { useState, useEffect } from 'react';
import { doc, getDoc } from '@firebase/firestore';
import { usersRef } from '../firebase-config';
import placerholder from '../assets/img/user-placeholder.jpg';
import homeIcon from '../assets/img/home-icon.png';
import cityIcon from '../assets/img/city-icon.png';

export default function UserAvatar({ uid }) {
	const [user, setUser] = useState({
		image: placerholder,
		name: '',
		budget: '',
		cities: '',
		housing: '',
		student: '',
		position: '',
		birthday: '',
		pets: '',
		personality: '',
		language: '',
		smoking: '',
		eatingHabits: '',
		partyHabits: '',
		guests: '',
		bio: '',
		interests: '',
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
		<div
			style={{
				backgroundImage: `url(${user.image})`,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'center',
				height: '21.25em',
				borderRadius: '10px 10px 0 0',
				display: 'flex',
				boxShadow:
					'inset 0px -50px 100px -10px #000000,5px 0px 5px 0px #DDDDDD',
			}}
		>
			<div class='displayImgUnderline'>
				<span>
					<h3
						style={{
							alignSelf: 'flex-end',
							fontWeight: 'normal',
							fontSize: '23px',
							color: '#ffffff',
							margin: '0',
						}}
					>
						{user.name}, {user.birthday}
					</h3>
				</span>
				<span class='heightlight-text'>
					<img src={homeIcon} alt='home icon' />
					{user.housing}
				</span>

				<span class='heightlight-text'>
					<img src={cityIcon} alt='city icon' />
					{user.cities}
				</span>
			</div>
			{/* <img src={user.image} alt={user.id} /> */}
			{/* <span>

				<h3>{user.name}</h3>
				<p>{user.budget}</p>
				<p>{user.cities}</p>
				<p>{user.housing}</p>
				<p>{user.student}</p>
				<p>{user.position}</p>
				<p>{user.birthday}</p>
				<p>{user.pets}</p>
				<p>{user.personality}</p>
				<p>{user.language}</p>
				<p>{user.smoking}</p>
				<p>{user.eatingHabits}</p>
				<p>{user.partyHabits}</p>
				<p>{user.guests}</p>
				<p>{user.bio}</p>
				<p>{user.interests}</p>
			</span> */}
		</div>
	);
}
