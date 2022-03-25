import { useEffect, useState } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { usersRef } from '../firebase-config';
import { doc, getDoc, setDoc } from '@firebase/firestore';
import imgPlaceholder from '../assets/img/img-placeholder.jpg';

export default function ProfilePage({ showLoader }) {
	const [image, setImage] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [budget, setBudget] = useState('');
	const [cities, setCities] = useState('');
	const [housing, setHousing] = useState('');
	const [student, setStudent] = useState('');
	const [position, setPosition] = useState('');
	const [birthday, setBirthday] = useState('');
	const [pets, setPets] = useState('');
	const [personality, setPersonality] = useState('');
	const [language, setLanguage] = useState('');
	const [smoking, setSmoking] = useState('');
	const [eatingHabits, setEatingHabits] = useState('');
	const [partyHabits, setPartyHabits] = useState('');
	const [guests, setGuests] = useState('');
	const [bio, setBio] = useState('');
	const [interests, setInterests] = useState('');

	const [errorMessage, setErrorMessage] = useState('');

	const auth = getAuth();

	useEffect(() => {
		showLoader(true);

		async function getUser() {
			if (auth.currentUser) {
				setEmail(auth.currentUser.email);

				const docRef = doc(usersRef, auth.currentUser.uid); // get more info about the user from users collection
				const userData = await (await getDoc(docRef)).data();
				if (userData) {
					setImage(userData.image);
					setName(userData.name);
					setBudget(userData.budget);
					setCities(userData.cities);
					setHousing(userData.housing);
					setStudent(userData.student);
					setPosition(userData.position);
					setBirthday(userData.birthday);
					setPets(userData.pets);
					setPersonality(userData.personality);
					setLanguage(userData.language);
					setSmoking(userData.smoking);
					setEatingHabits(userData.eatingHabits);
					setPartyHabits(userData.partyHabits);
					setGuests(userData.guests);
					setBio(userData.bio);
					setInterests(userData.interests);
				}
			}
			showLoader(false);
		}

		getUser();
	}, [auth.currentUser, showLoader]); // dependencies: useEffect is executed when auth.currentUser changes

	async function handleSubmit(event) {
		event.preventDefault();
		showLoader(true);

		const userToUpdate = {
			image: image,
			name: name,
			budget: budget,
			cities: cities,
			housing: housing,
			student: student,
			position: position,
			birthday: birthday,
			pets: pets,
			personality: personality,
			language: language,
			smoking: smoking,
			eatingHabits: eatingHabits,
			partyHabits: partyHabits,
			guests: guests,
			bio: bio,
			interests: interests,
		};
		const docRef = doc(usersRef, auth.currentUser.uid);

		await setDoc(docRef, userToUpdate);
		showLoader(false);
	}

	function handleSignOut() {
		signOut(auth);
	}

	function handleImageChange(event) {
		const file = event.target.files[0];
		if (file.size < 500000) {
			const reader = new FileReader();
			reader.onload = (event) => {
				setImage(event.target.result);
			};
			reader.readAsDataURL(file);
			setErrorMessage('');
		} else {
			setErrorMessage('The image file is too big!');
		}
	}

	return (
		<section className='page'>
			<h1>Profile</h1>
			<form onSubmit={handleSubmit}>
				<b>Lad os komme i gang!</b>

				{/* ----- Navn ----- */}
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

				{/* ----- Email ----- */}

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

				{/* ----- Profilbillede ----- */}

				<label>
					Image
					<input
						type='file'
						className='file-input'
						accept='image/*'
						onChange={handleImageChange}
					/>
					<img
						className='image-preview'
						src={image}
						alt='Choose'
						onError={(event) => (event.target.src = imgPlaceholder)}
					/>
				</label>

				{/* ----- Budget ----- */}

				<label>
					Hvad er dit månedlige budget?
					<input
						type='number'
						value={budget}
						onChange={(e) => setBudget(e.target.value)}
						placeholder='Beløb'
					/>
				</label>

				{/* ----- Byer ----- */}

				<label>
					Indtast de byer hvor du søger bolig eller roommates
					<input
						type='text'
						value={cities}
						onChange={(e) => setCities(e.target.value)}
						placeholder='Indtast bynavn'
					/>
				</label>

				{/* ----- Bolig ----- */}

				<p>Har du egen bolig?</p>
				<label for='housing'>
					Ingen bolig
					<input
						type='radio'
						value={housing}
						onChange={() => setHousing('Ingen bolig')}
						name='housing'
					/>
				</label>
				<label for='housing'>
					Egen bolig
					<input
						type='radio'
						value={housing}
						onChange={() => setHousing('Egen bolig')}
						name='housing'
					/>
				</label>

				{/* ----- Student ----- */}

				<p>Er du student?</p>
				<label for='student'>
					Student
					<input
						type='radio'
						value={student}
						onChange={() => setStudent('Student')}
						name='student'
					/>
				</label>
				<label for='student'>
					Ikke student
					<input
						type='radio'
						value={student}
						onChange={() => setStudent('Ikke student')}
						name='student'
					/>
				</label>

				{/* ----- Stilling ----- */}

				<label>
					Hvad er din stilling?
					<input
						type='text'
						value={position}
						onChange={(e) => setPosition(e.target.value)}
						name='position'
						placeholder='Job eller uddannelse'
					/>
				</label>

				{/* ----- Fødselsdag ----- */}

				<input
					type='date'
					value={birthday}
					onChange={(e) => setBirthday(e.target.value)}
					name='birthday'
					placeholder='Din fødselsdag'
				/>

				{/* ----- Kæledyr ----- */}

				<p>Medbringer du et kæledyr i din kommende lejlighed?</p>
				<label for='pets'>
					Kæledyr
					<input
						type='radio'
						value={pets}
						onChange={() => setPets('Kæledyr')}
						name='pets'
					/>
				</label>
				<label for='pets'>
					Ingen kæledyr
					<input
						type='radio'
						value={pets}
						onChange={() => setPets('Ingen kæledyr')}
						name='pets'
					/>
				</label>

				{/* ----- Personlighed ----- */}

				<p>
					Det er ofte godt at vide hvilken personlighed din kommende roommate
					har. Hvad er din?
				</p>
				<label for='personality'>
					Introvert
					<input
						type='radio'
						value={personality}
						onChange={() => setPersonality('Introvert')}
						name='personality'
					/>
				</label>
				<label for='personality'>
					Ekstrovert
					<input
						type='radio'
						value={personality}
						onChange={() => setPersonality('Ekstrovert')}
						name='personality'
					/>
				</label>
				<label for='personality'>
					Ambivert
					<input
						type='radio'
						value={personality}
						onChange={() => setPersonality('Ambivert')}
						name='personality'
					/>
				</label>

				{/* ----- Sprog ----- */}

				<label>
					Kommunikation er vigtig blandt roommates. Skriv alle de sprog du
					behersker!
					<input
						type='text'
						value={language}
						onChange={(e) => setLanguage(e.target.value)}
						name='language'
						placeholder='Eks. Dansk, Engelsk..'
					/>
				</label>

				{/* ----- Rygning ----- */}

				<b>Livsstil</b>
				<p>Hvad er din rygevaner?</p>
				<label for='smoking'>
					Ryger
					<input
						type='radio'
						value={smoking}
						onChange={() => setSmoking('Ryger')}
						name='smoking'
					/>
				</label>
				<label for='smoking'>
					Ikke ryger
					<input
						type='radio'
						value={smoking}
						onChange={() => setSmoking('Ikke ryger')}
						name='smoking'
					/>
				</label>

				{/* ----- Rygning ----- */}

				<p>Hvad er din spisevaner?</p>
				<label for='eatingHabits'>
					Kødspiser
					<input
						type='radio'
						value={eatingHabits}
						onChange={() => setEatingHabits('Kødspiser')}
						name='eatingHabits'
					/>
				</label>
				<label for='eatingHabits'>
					Vegetar
					<input
						type='radio'
						value={eatingHabits}
						onChange={() => setEatingHabits('Vegetar')}
						name='eatingHabits'
					/>
				</label>
				<label for='eatingHabits'>
					Veganer
					<input
						type='radio'
						value={eatingHabits}
						onChange={() => setEatingHabits('Veganer')}
						name='eatingHabits'
					/>
				</label>
				<label for='eatingHabits'>
					Pescetar
					<input
						type='radio'
						value={eatingHabits}
						onChange={() => setEatingHabits('Pescetar')}
						name='eatingHabits'
					/>
				</label>

				{/* ----- Personlighed ----- */}

				<p>Hvad er din festvaner?</p>
				<label for='partyHabits'>
					Fester sjældent
					<input
						type='radio'
						value={partyHabits}
						onChange={() => setPartyHabits('Fester sjældent')}
						name='partyHabits'
					/>
				</label>
				<label for='partyHabits'>
					Fester indimellem
					<input
						type='radio'
						value={partyHabits}
						onChange={() => setPartyHabits('Fester indimellem')}
						name='partyHabits'
					/>
				</label>
				<label for='partyHabits'>
					Fester ofte
					<input
						type='radio'
						value={partyHabits}
						onChange={() => setPartyHabits('Fester ofte')}
						name='partyHabits'
					/>
				</label>

				{/* ----- Gæster ----- */}

				<label>
					Hvor tit regner du med at have gæster på besøg?
					<div>Gæst pr. uge</div>
					<input
						type='number'
						value={guests}
						onChange={(e) => setGuests(e.target.value)}
						placeholder=''
					/>
				</label>

				{/* ----- Bio Tekst ----- */}

				<b>Om mig</b>
				<label>
					Hvorfor er du den bedste roommate?
					<textarea
						value={bio}
						onChange={(e) => setBio(e.target.value)}
						placeholder='Udfyld din bio..'
					/>
				</label>

				{/* ----- Interesser ----- */}

				<label>
					Skriv dine interesser i hashtags
					<input
						type='text'
						value={interests}
						onChange={(e) => setInterests(e.target.value)}
						placeholder='#roommates #verdensfred'
					/>
				</label>

				<p className='text-error'>{errorMessage}</p>
				<button>Save User</button>
			</form>
			<button className='btn-outline' onClick={handleSignOut}>
				Sign Out
			</button>
		</section>
	);
}
