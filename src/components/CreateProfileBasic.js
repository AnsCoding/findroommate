import React, { Component } from 'react';

export class CreateProfileBasic extends Component {
	continue = (e) => {
		e.preventDefault();
		this.props.nextStep();
	};
	render() {
		const { values, handleChange } = this.props;
		return (
			<form>
				<h2>Oprettelse</h2>
				<b>Lad os komme i gang!</b>
				<p>Hvad er dit månedlige budget?</p>
				<input
					type='number'
					name='budget'
					placeholder='Beløb'
					onChange={handleChange('budget')}
					defaultValue={values.budget}
				/>
				<p>Indtast de byer hvor du søger bolig eller roommate</p>
				<input
					type='text'
					name='cities'
					placeholder='Postnummer'
					onChange={handleChange('cities')}
					defaultValue={values.cities}
				/>
				<p>Har du egen bolig?</p>
				<label for='no_housing'>Ingen bolig</label>
				<input
					type='radio'
					name='housing'
					value='no_housing'
					onChange={handleChange('housing')}
					defaultValue={values.housing}
				/>
				<label for='own_housing'>Egen bolig</label>
				<input
					type='radio'
					name='housing'
					value='own_housing'
					onChange={handleChange('housing')}
					defaultValue={values.housing}
				/>
				<p>Er du student?</p>
				<label for='is_student'>Student</label>
				<input
					type='radio'
					name='student'
					value='is_student'
					onChange={handleChange('student')}
					defaultValue={values.student}
				/>
				<label for='not_student'>Ikke student</label>
				<input
					type='radio'
					name='student'
					value='not_student'
					onChange={handleChange('student')}
					defaultValue={values.student}
				/>

				<p>Hvad er din stilling?</p>
				<input
					type='text'
					name='position'
					placeholder='Job eller uddannelse'
					onChange={handleChange('position')}
					defaultValue={values.position}
				/>
				<button onClick={this.continue}>Videre</button>
			</form>
		);
	}
}

export default CreateProfileBasic;
