import { useEffect } from 'react';
import { CreateProfile } from '../components/CreateProfile';
import { addDoc, serverTimestamp } from '@firebase/firestore';
import { postsRef } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

export default function CreateProfilePage({ showLoader }) {
	const navigate = useNavigate();
	const auth = getAuth();

	useEffect(() => {
		showLoader(false);
	}, [showLoader]);

	async function handleSubmit(newPost) {
		showLoader(true);
		newPost.createdAt = serverTimestamp(); // timestamp (now)
		newPost.uid = auth.currentUser.uid;
		await addDoc(postsRef, newPost);

		showLoader(false);
		navigate('/');
	}

	return (
		<section className='page'>
			<h1>Hello World</h1>
			<CreateProfile savePost={handleSubmit} />
		</section>
	);
}
