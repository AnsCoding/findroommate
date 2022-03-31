import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney } from '@fortawesome/free-solid-svg-icons';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export default function Nav() {
	return (
		<nav>
			<NavLink to='/' className='Nav_link'>
				<FontAwesomeIcon icon={faHouseChimney} /> Roommates
			</NavLink>

			<NavLink to='/sign-in' className='Nav_link'>
				Sign-in
			</NavLink>

			<NavLink to='/create' className='Nav_link'>
				Create
			</NavLink>
			<NavLink to='/profile' className='Nav_link'>
				<FontAwesomeIcon icon={faUser} /> Profile
			</NavLink>
		</nav>
	);
}
