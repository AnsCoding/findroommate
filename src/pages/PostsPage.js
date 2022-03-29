import { useState, useEffect } from 'react';
import { onSnapshot, query, orderBy } from 'firebase/firestore';
import { postsRef } from '../firebase-config';
import PostCard from '../components/PostCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

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
				<h2 className='logo'>FindRoommate</h2>

				<h1 class='slogan'>En roommate er mere end en lejer 😇</h1>
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
				<div className='profile-show'>
					<div>
						<h4> Nyeste roommates</h4>
					</div>
					<div>
						<button
							onClick={toggleModal}
							// className='btn-modal'
							class='box-filter'
						>
							<b>Filtrere</b>
						</button>
						{modal && (
							<div className='modal'>
								<div className='overlay'>
									<div className='modal-content'>
										<h2>Hello</h2>
										<p>
											lorek skd skd kk sdk skd ksd skd ksskd ks dskd ks dks skd
											sk dks dks dskd ks dks dksd
										</p>
									</div>
									<button className='close-modal' onClick={toggleModal}>
										Close
									</button>
								</div>
							</div>
						)}
					</div>
				</div>
			</section>

			<section className='grid-container'>
				{posts
					.filter((post) => {
						if (searchTerm === '') {
							return post;
						} else if (
							post.title.toLowerCase().includes(searchTerm.toLocaleLowerCase())
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
