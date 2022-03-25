/* eslint-disable no-fallthrough */
/* eslint-disable default-case */
import React, { Component } from 'react';
import CreateProfileBasic from './CreateProfileBasic';
import CreateProfileInformation from './CreateProfileInformation';
import CreateProfileLifestyle from './CreateProfileLifestyle';

export class CreateProfile extends Component {
	state = {
		step: 1,
		budget: '',
		cities: '',
		housing: '',
		student: '',
		position: '',
		profileAvatar: '',
		name: '',
		birthday: '',
		pets: '',
		personality: '',
		langauge: '',
		smoking: '',
		eatingHabits: '',
		partyHabits: '',
		guests: '',
		bio: '',
		interests: '',
	};

	//Gå videre i oprettelsesforløbet
	nextStep = () => {
		const { step } = this.state;
		this.setState({
			step: step + 1,
		});
	};

	//Gå tilbage i oprettelsesforløbet
	prevStep = () => {
		const { step } = this.state;
		this.setState({
			step: step - 1,
		});
	};

	handleChange = (input) => (e) => {
		this.setState({
			[input]: e.target.value,
		});
	};

	render() {
		const { step } = this.state;
		const {
			budget,
			cities,
			housing,
			student,
			position,
			profileAvatar,
			name,
			birthday,
			pets,
			personality,
			langauge,
			smoking,
			eatingHabits,
			partyHabits,
			guests,
			bio,
			interests,
		} = this.state;
		const values = {
			budget,
			cities,
			housing,
			student,
			position,
			profileAvatar,
			name,
			birthday,
			pets,
			personality,
			langauge,
			smoking,
			eatingHabits,
			partyHabits,
			guests,
			bio,
			interests,
		};
		switch (step) {
			case 1:
				return (
					<CreateProfileBasic
						nextStep={this.nextStep}
						handleChange={this.handleChange}
						values={values}
					/>
				);
			case 2:
				return (
					<CreateProfileInformation
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={this.handleChange}
						values={values}
					/>
				);
			case 3:
				return (
					<CreateProfileLifestyle
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={this.handleChange}
						values={values}
					/>
				);
			case 4:
				return <h1>Opret</h1>;
		}
	}
}
