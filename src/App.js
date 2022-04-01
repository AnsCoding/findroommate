import { Routes, Navigate, Route } from 'react-router-dom';
import Nav from './components/Nav';
import PostsPage from './pages/PostsPage';
import CreatePage from './pages/CreatePage';
import UpdatePage from './pages/UpdatePage';
import Loader from './components/Loader';
import { useState } from 'react';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import ProfilePage from './pages/ProfilePage';
import { doc, getDoc } from '@firebase/firestore';
import { usersRef } from './firebase-config';
import { useNavigate } from 'react-router-dom';

function App() {
	const [showLoader, setShowLoader] = useState(true);
	const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
	const [isValid, setIsValid] = useState(false);
	const navigate = useNavigate();

	const auth = getAuth();

	useState(() => {
		onAuthStateChanged(auth, (user) => {
			console.log(user);
			if (user) {
				setIsAuth(true);
				localStorage.setItem('isAuth', true);
				userIsValid(user);
			} else {
				setIsValid(false);
				setIsAuth(false);
				localStorage.removeItem('isAuth');
			}
		});

		async function userIsValid(user) {
			console.log(user);
			const docRef = doc(usersRef, user.uid);
			const docSnap = await getDoc(docRef);
			setIsValid(false);

			if (docSnap.data()) {
				const userData = docSnap.data();

				console.log(userData);

				if (userData.name && userData.birthday) {
					setIsValid(true);
				}
				console.log(isValid);
			}
		}
	}, [auth.currentUser]);

	// Private routes og navigation
	const privateRoutes = (
		<>
			<Nav />
			<Routes>
				{isValid && (
					<>
						<Route
							path='/'
							element={<PostsPage showLoader={setShowLoader} />}
						/>
						<Route
							path='/create'
							element={<CreatePage showLoader={setShowLoader} />}
						/>
						<Route
							path='/posts/:id'
							element={<UpdatePage showLoader={setShowLoader} />}
						/>
					</>
				)}
				<Route
					path='/profile'
					element={<ProfilePage showLoader={setShowLoader} />}
				/>
				{isValid ? (
					<Route path='*' element={<Navigate to='/' />} />
				) : (
					<Route path='*' element={<Navigate to='/profile' />} />
				)}
			</Routes>
		</>
	);

	// Offentlige routes og navigation
	const publicRoutes = (
		<>
			<Nav />
			<Routes>
				<Route
					path='/sign-in'
					element={<SignInPage showLoader={setShowLoader} />}
				/>
				<Route
					path='/sign-up'
					element={<SignUpPage showLoader={setShowLoader} />}
				/>
				<Route
					path='/posts'
					element={<PostsPage showLoader={setShowLoader} />}
				/>
				<Route path='*' element={<Navigate to='/posts' />} />
			</Routes>
		</>
	);

	function handleClick() {
		navigate(`/`);
	}

	return (
		<main>
			<div
				style={{
					padding: '1em 1em 0',
				}}
			>
				<h3
					onClick={handleClick}
					style={{
						fontSize: '20px',
						fontWeight: 'bold',
						color: '#007aff',
						cursor: 'pointer',
					}}
				>
					FindRoommate
				</h3>
			</div>
			{isAuth ? privateRoutes : publicRoutes}
			{showLoader && <Loader />}
		</main>
	);
}

export default App;
