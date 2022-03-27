import { useEffect, useState } from 'react';
import imgPlaceholder from '../assets/img/img-placeholder.jpg';

export default function PostForm({ savePost, post }) {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [image, setImage] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		if (post) {
			setTitle(post.title);
			setBody(post.body);
			setImage(post.image);
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
			title: title,
			image: image,
			body: body,
		};

		const validForm = formData.title && formData.body && formData.image;
		if (validForm) {
			savePost(formData);
		} else {
			setErrorMessage('Please, fill in all fields.');
		}
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Title
				<input
					type='text'
					value={title}
					placeholder='Type a title'
					onChange={(e) => setTitle(e.target.value)}
				/>
			</label>
			<label>
				Body
				<input
					type='text'
					value={body}
					placeholder='Type a body text'
					onChange={(e) => setBody(e.target.value)}
				/>
			</label>
			<label>
				Image
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
			<p className='text-error'>{errorMessage}</p>
			<button type='submit'>Save</button>
		</form>
	);
}
