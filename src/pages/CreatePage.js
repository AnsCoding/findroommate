import { addDoc, serverTimestamp } from '@firebase/firestore';
import { useEffect } from 'react';
import { postsRef } from '../firebase-config';
import { useNavigate } from 'react-router-dom';
import PostForm from '../components/PostForm';
import { getAuth } from 'firebase/auth';

export default function CreatePage({ showLoader }) {
	const navigate = useNavigate();
	const auth = getAuth();

	useEffect(() => {
		showLoader(false);
	}, [showLoader]);

	async function handleSubmit(newPost) {
		showLoader(true);
		newPost.createdAt = serverTimestamp();
		newPost.uid = auth.currentUser.uid;
		await addDoc(postsRef, newPost);

		showLoader(false);
		navigate('/');
	}

	return (
		<section className='page'>
			<PostForm savePost={handleSubmit} />
		</section>
	);
}
