import React, { Component } from 'react';

export class CreateProfileInformation extends Component {
	continue = (e) => {
		e.preventDefault();
		this.props.nextStep();
	};
	back = (e) => {
		e.preventDefault();
		this.props.prevStep();
	};
	render() {
		const { values, handleChange } = this.props;
		return (
			<form>
				<p>Vælgt dit profilbillede</p>
				<b>Informationer</b>
				<p>Generelt om dig</p>
				<input
					type='text'
					name='name'
					placeholder='Navn'
					onChange={handleChange('name')}
					defaultValue={values.name}
				/>
				<input
					type='date'
					name='birthday'
					placeholder='Fødselsdag'
					onChange={handleChange('birthday')}
					defaultValue={values.birthday}
				/>
				<p>Medbringer du et kæledyr i din kommende lejlighed?</p>
				<label for='has_pets'>Kæledyr</label>
				<input
					type='radio'
					name='pets'
					value='has_pets'
					onChange={handleChange('pets')}
					defaultValue={values.pets}
				/>
				<label for='no_pets'>Ingen Kæledyr</label>
				<input
					type='radio'
					name='pets'
					value='no_pets'
					onChange={handleChange('pets')}
					defaultValue={values.pets}
				/>
				<p>
					Det er ofte godt at vide hvilken personlighed din kommende roommate
					har. Hvad er din?
				</p>
				<label for='introvert'>Introvert</label>
				<input
					type='radio'
					name='personality'
					value='introvert'
					onChange={handleChange('personality')}
					defaultValue={values.personality}
				/>
				<label for='extrovert'>Ekstrovert</label>
				<input
					type='radio'
					name='personality'
					value='extrovert'
					onChange={handleChange('personality')}
					defaultValue={values.personality}
				/>
				<label for='ambivert'>Ambivert</label>
				<input
					type='radio'
					name='personality'
					value='ambivert'
					onChange={handleChange('personality')}
					defaultValue={values.personality}
				/>
				<p>
					Kommunikation er vigtig blandt roommates. Skriv alle de sprog du
					behersker!
				</p>
				<input
					type='text'
					name='language'
					placeholder='Sprog'
					onChange={handleChange('position')}
					defaultValue={values.position}
				/>
				<button onClick={this.back}>Tilbage</button>
				<button onClick={this.continue}>Videre</button>
			</form>
		);
	}
}

export default CreateProfileInformation;
