import { buildQueries } from '@testing-library/react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Nav() {
	const positionNav = {
		position: 'fixed',
		left: '0',
		bottom: '0',
		height: '60px',
		width: '100%',
		boxShadow: 'rgb(38, 57, 77) 0px 20px 30px -10px',
	};
	const styleNav = {
		textDecoration: 'none',
		textTransform: 'uppercase',
		fontSize: '.9rem',
		fontWeight: 'bold',
		padding: '1em',
	};

	return (
		<nav style={positionNav}>
			<NavLink to='/' style={styleNav} className='Nav_link'>
				<FontAwesomeIcon icon={faHouseChimney} /> Roommates
			</NavLink>
			<NavLink to='/posts/:id' style={styleNav} className='Nav_link'>
				<FontAwesomeIcon icon={faMessage} /> Notifikation
			</NavLink>
			<NavLink to='/profile' style={styleNav} className='Nav_link'>
				<FontAwesomeIcon icon={faUser} /> Profile
			</NavLink>
		</nav>
	);
}
