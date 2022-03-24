import React, { Component } from 'react';
import { usersRef } from '../firebase-config';

export class CreateProfileLifestyle extends Component {
	continue = (e) => {
		e.preventDefault();
		this.props.nextStep();
		const { values } = this.props;
		usersRef.collection('Profiles').add({ values });
	};
	back = (e) => {
		e.preventDefault();
		this.props.prevStep();
	};
	render() {
		const { values, handleChange } = this.props;
		return (
			<form>
				<b>Livsstil</b>
				<p>Hvad er din rygevaner?</p>
				<label for='is_smoking'>Ryger</label>
				<input
					type='radio'
					name='smoking'
					value='is_smoking'
					onChange={handleChange('smoking')}
					defaultValue={values.smoking}
				/>
				<label for='no_smoking'>Ikke ryger</label>
				<input
					type='radio'
					name='smoking'
					value='no_smoking'
					onChange={handleChange('smoking')}
					defaultValue={values.smoking}
				/>
				<p>Hvad er din spisevaner?</p>
				<label for='meatEater'>Kødspiser</label>
				<input
					type='radio'
					name='eatingHabits'
					value='meatEater'
					onChange={handleChange('eatingHabits')}
					defaultValue={values.eatingHabits}
				/>
				<label for='vegetarian'>Vegetar</label>
				<input
					type='radio'
					name='eatingHabits'
					value='vegetarian'
					onChange={handleChange('eatingHabits')}
					defaultValue={values.eatingHabits}
				/>
				<label for='vegan'>Veganer</label>
				<input
					type='radio'
					name='eatingHabits'
					value='vegan'
					onChange={handleChange('eatingHabits')}
					defaultValue={values.eatingHabits}
				/>
				<label for='pescetarian'>Pescetar</label>
				<input
					type='radio'
					name='eatingHabits'
					value='pescetarian'
					onChange={handleChange('eatingHabits')}
					defaultValue={values.eatingHabits}
				/>
				<p>Hvad er din festvaner?</p>
				<label for='rarely_parties'>Fester sjældent</label>
				<input
					type='radio'
					name='partyHabits'
					value='rarely_parties'
					onChange={handleChange('partyHabits')}
					defaultValue={values.partyHabits}
				/>
				<label for='occasionally_parties'>Fester indimellem</label>
				<input
					type='radio'
					name='partyHabits'
					value='occasionally_parties'
					onChange={handleChange('partyHabits')}
					defaultValue={values.partyHabits}
				/>
				<label for='often_parties'>Fester ofte</label>
				<input
					type='radio'
					name='partyHabits'
					value='often_parties'
					onChange={handleChange('partyHabits')}
					defaultValue={values.partyHabits}
				/>
				<p>Hvor tit regner du med at have gæster på besøg?</p>
				<div>Gæst pr. uge</div>{' '}
				<input
					type='number'
					name='guests'
					placeholder='0'
					onChange={handleChange('guests')}
					defaultValue={values.guests}
				/>
				<b>Om mig</b>
				<p>Hvorfor er du den bedste roommate!</p>
				<input
					type='text'
					name='bio'
					placeholder='Udfyld din bio..'
					onChange={handleChange('bio')}
					defaultValue={values.bio}
				/>
				<b>Interesser</b>
				<input
					type='text'
					name='interests'
					placeholder='#skriv #dine #interesser'
					onChange={handleChange('interests')}
					defaultValue={values.interests}
				/>
				<button onClick={this.back}>Tilbage</button>
				<button onClick={this.continue}>Opret din profil</button>
			</form>
		);
	}
}

export default CreateProfileLifestyle;
