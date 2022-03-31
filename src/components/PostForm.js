import { useEffect, useState } from 'react';
import imgPlaceholder from '../assets/img/img-placeholder.jpg';

export default function PostForm({ savePost, post }) {
	const [city, setCitys] = useState('');
	const [image, setImage] = useState('');

	const [budget, setBudget] = useState('');

	const [housing, setHousing] = useState('');

	const [position, setPosition] = useState('');

	const [pets, setPets] = useState('');

	const [personality, setPersonality] = useState('');

	const [smoking, setSmoking] = useState('');

	const [eatingHabits, setEatingHabits] = useState('');

	const [partyHabits, setPartyHabits] = useState('');

	const [bio, setBio] = useState('');

	const [interests, setInterests] = useState('');

	const [language, setLanguage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		if (post) {
			setCitys(post.city);
			setImage(post.image);

			setBudget(post.budget);

			setHousing(post.housing);

			setPosition(post.position);

			setPets(post.pets);

			setPersonality(post.personality);

			setLanguage(post.language);

			setSmoking(post.smoking);

			setEatingHabits(post.eatingHabits);

			setPartyHabits(post.partyHabits);

			setBio(post.bio);
			setInterests(post.interests);
		}
	}, [post]);

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

	function handleSubmit(event) {
		event.preventDefault();
		const formData = {
			image: image,
			city: city,
			budget: budget,
			housing: housing,
			position: position,
			pets: pets,
			personality: personality,
			language: language,
			smoking: smoking,
			eatingHabits: eatingHabits,
			partyHabits: partyHabits,
			bio: bio,
			interests: interests,
		};

		const validForm =
			formData.city &&
			formData.image &&
			formData.budget &&
			formData.housing &&
			formData.position &&
			formData.pets &&
			formData.personality &&
			formData.language &&
			formData.smoking &&
			formData.eatingHabits &&
			formData.partyHabits &&
			formData.bio &&
			formData.interests;

		if (validForm) {
			savePost(formData);
		} else {
			setErrorMessage('Udfyld alle felter');
		}
	}

	return (
		<form className='post-form' onSubmit={handleSubmit}>
			<p className='img-instruction'>Vælg dit profil billede</p>
			<label>
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

			<b>Informationer</b>
			<p>Generelt om dig</p>

			<label>
				Hvad er dit månedlige budget?
				<input
					type='number'
					value={budget}
					placeholder='Beløb'
					onChange={(e) => setBudget(e.target.value)}
				/>
			</label>

			<label>
				Hvor søger du bolig?
				<input
					type='text'
					value={city}
					placeholder='eks. Aarhus C, Aarhus N..'
					onChange={(e) => setCitys(e.target.value)}
				/>
			</label>

			<label>
				Hvad er din stilling?
				<input
					type='text'
					value={position}
					placeholder='Job eller Uddanelse'
					onChange={(e) => setPosition(e.target.value)}
				/>
			</label>

			<label>
				Hvilke sprog behersker du?
				<input
					type='text'
					value={language}
					placeholder='eks. Dansk, Engelsk..'
					onChange={(e) => setLanguage(e.target.value)}
				/>
			</label>

			<div className='radio-toolbar'>
				<p>Din bolig situation</p>
				<div className='label-div'>
					<label>
						<input
							type='radio'
							name='housing'
							value={housing}
							placeholder=''
							onChange={(e) => setHousing('Bolig')}
						/>
						<div className='checkmark'>Egen bolig</div>
					</label>
					<label>
						<input
							type='radio'
							name='housing'
							value={housing}
							placeholder=''
							onChange={(e) => setHousing('Ingen bolig')}
						/>
						<div className='checkmark'>Ingen bolig</div>
					</label>
				</div>
			</div>

			<div className='radio-toolbar'>
				<p>Medbringer du husdyr i din kommende lejlighed?</p>
				<div className='label-div'>
					<label>
						<input
							type='radio'
							name='husdyr'
							value={pets}
							placeholder=''
							onChange={(e) => setPets('Husdyr')}
						/>
						<div className='checkmark'>Husdyr</div>
					</label>
					<label>
						<input
							type='radio'
							name='husdyr'
							value={pets}
							placeholder=''
							onChange={(e) => setPets('Ingen husdyr')}
						/>
						<div className='checkmark'>Ingen husdyr</div>
					</label>
				</div>
			</div>

			<div className='radio-toolbar'>
				<p>Hvad er din personlighedstype?</p>
				<div className='label-div'>
					<label>
						<input
							type='radio'
							name='personality'
							value={personality}
							placeholder=''
							onChange={(e) => setPersonality('Introvert')}
						/>
						<div className='checkmark'>Introvert</div>
					</label>
					<label>
						<input
							type='radio'
							name='personality'
							value={personality}
							placeholder=''
							onChange={(e) => setPersonality('Ekstrovert')}
						/>
						<div className='checkmark'>Ekstrovert</div>
					</label>
					<label>
						<input
							type='radio'
							name='personality'
							value={personality}
							placeholder=''
							onChange={(e) => setPersonality('Ambivert')}
						/>
						<div className='checkmark'>Ambivert</div>
					</label>
				</div>
			</div>

			<div className='radio-toolbar'>
				<p>Hvad er din festvaner?</p>
				<div className='label-div'>
					<label>
						<input
							type='radio'
							name='partyHabits'
							value={partyHabits}
							placeholder=''
							onChange={(e) => setPartyHabits('Fester Sjældent')}
						/>
						<div className='checkmark'>Fester sjældent</div>
					</label>
					<label>
						<input
							type='radio'
							name='partyHabits'
							value={partyHabits}
							placeholder=''
							onChange={(e) => setPartyHabits('Fester ind imellem')}
						/>
						<div className='checkmark'>Fester ind imellem</div>
					</label>
					<label>
						<input
							type='radio'
							name='partyHabits'
							value={partyHabits}
							placeholder=''
							onChange={(e) => setPartyHabits('Fester ofte')}
						/>
						<div className='checkmark'>Fester ofte</div>
					</label>
				</div>
			</div>

			<div className='radio-toolbar'>
				<p>Hvad er din rygevaner?</p>
				<div className='label-div'>
					<label>
						<input
							type='radio'
							name='smoking'
							value={smoking}
							placeholder=''
							onChange={(e) => setSmoking('Ryger')}
						/>
						<div className='checkmark'>Ryger</div>
					</label>
					<label>
						<input
							type='radio'
							name='smoking'
							value={smoking}
							placeholder=''
							onChange={(e) => setSmoking('Ikke ryger')}
						/>
						<div className='checkmark'>Ikke ryger</div>
					</label>
				</div>
			</div>

			<div className='radio-toolbar'>
				<p>Hvad er din spisevaner?</p>
				<div className='label-div'>
					<label>
						<input
							type='radio'
							name='eatingHabits'
							value={eatingHabits}
							placeholder=''
							onChange={(e) => setEatingHabits('Kødspiser')}
						/>
						<div className='checkmark'>Kødspiser</div>
					</label>
					<label>
						<input
							type='radio'
							name='eatingHabits'
							value={eatingHabits}
							placeholder=''
							onChange={(e) => setEatingHabits('Vegetar')}
						/>
						<div className='checkmark'>Vegetar</div>
					</label>
					<label>
						<input
							type='radio'
							name='eatingHabits'
							value={eatingHabits}
							placeholder=''
							onChange={(e) => setEatingHabits('Veganer')}
						/>
						<div className='checkmark'>Veganer</div>
					</label>
					<label>
						<input
							type='radio'
							name='eatingHabits'
							value={eatingHabits}
							placeholder=''
							onChange={(e) => setEatingHabits('Pescetar')}
						/>
						<div className='checkmark'>Pescetar</div>
					</label>
				</div>
			</div>

			<b>Om mig</b>
			<p>Hvorfor er du den bedste roommate?</p>
			<label>
				<textarea
					value={bio}
					placeholder='Udfyld din bio..'
					onChange={(e) => setBio(e.target.value)}
				/>
			</label>

			<label>
				Skriv alle dine interesser - Start med #
				<input
					type='text'
					value={interests}
					placeholder='eks. #roommates #fodbold'
					onChange={(e) => setInterests(e.target.value)}
				/>
			</label>

			{/* --------------------- */}

			{/* <p>Hvilke sprog taler du?</p>
			<label>
				<input
					type='text'
					value={language}
					placeholder='eks. Dansk, Engelsk..'
					onChange={(e) => setLanguage(e.target.value)}
				/>
			</label> */}

			{/* <p>Hvor vil du bo</p>
			<label>
				<input
					type='text'
					value={city}
					placeholder='Type a citt text'
					onChange={(e) => setCitys(e.target.value)}
				/>
			</label> */}

			<p className='text-error'>{errorMessage}</p>
			<button type='submit'>Save</button>
		</form>
	);
}
