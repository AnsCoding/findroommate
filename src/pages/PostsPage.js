import { useState, useEffect } from 'react';
import { onSnapshot, query, orderBy } from 'firebase/firestore';
import { postsRef } from '../firebase-config';
import PostCard from '../components/PostCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

//Prawal & Ans

export default function HomePage({ showLoader }) {
	const [posts, setPosts] = useState([]);
	const [modal, setModal] = useState(false);
	const [searchTerm, setSearchTerm] = useState('');
	const toggleModal = () => {
		setModal(!modal);
	};

	useEffect(() => {
		const q = query(postsRef, orderBy('createdAt', 'desc')); // order by: lastest post first
		const unsubscribe = onSnapshot(q, (data) => {
			const postsData = data.docs.map((doc) => {
				return { ...doc.data(), id: doc.id };
			});
			setPosts(postsData);
			showLoader(false);
		});
		return () => unsubscribe();
	}, [showLoader]);

	return (
		<section className='page'>
			<section>
				<p>En roommate er mere end en lejer 😇</p>
				<div class='search-input'>
					<FontAwesomeIcon icon={faSearch} />
					<input
						class='search-style'
						type='search'
						placeholder=' Hvor søger du roommates?'
						onChange={(event) => {
							setSearchTerm(event.target.value);
						}}
					/>
				</div>
				<div className='shadow'>
					<div>
						<p> Nyeste roommates</p>
					</div>
					<div>
						<button onClick={toggleModal} className='btn-modal'>
							<b>Filtrer</b>
						</button>
						{modal && (
							<div className='modal'>
								<div className='overlay'>
									<div className='modal-content'></div>
									<button className='close-modal' onClick={toggleModal}>
										Luk
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Prawal - Filtrere igennem vores array med filter */}

			<section className='grid-container'>
				{posts
					.filter((post) => {
						if (searchTerm === '') {
							return post;
						} else if (
							post.city.toLowerCase().includes(searchTerm.toLocaleLowerCase())
						) {
							return post;
						}
					})
					.map((post) => (
						<PostCard post={post} key={post.id} />
					))}
			</section>
		</section>
	);
}
