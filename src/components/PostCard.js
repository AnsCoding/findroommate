import { useNavigate } from 'react-router-dom';
import UserAvatar from './UserAvatar';
import imgLine from '../assets/img/line.png';

export default function PostCard({ post }) {
	const navigate = useNavigate();

	function handleClick() {
		navigate(`posts/${post.id}`);
	}

	// Prawal & Ans

	return (
		<article onClick={handleClick}>
			<div
				style={{
					backgroundImage: `url(${post.image})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					height: '21.25em',
					borderRadius: '10px 10px 0 0',
					display: 'flex',
					boxShadow: 'inset 0px -90px 100px -40px #000000',
				}}
			>
				<UserAvatar uid={post.uid} post={post} key={post.id} />
			</div>

			<div className='divbox'>
				<div className='box-info'>๐ฌ{post.smoking}</div>

				<div className='box-info'>๐ {post.pets}</div>

				<div className='box-info'>๐ค {post.personality}</div>

				<div className='box-info'>๐ฅ {post.eatingHabits}</div>

				<div className='box-info'>๐ {post.partyHabits}</div>

				<div className='box-info'>๐ผ {post.position}</div>

				<div className='box-info'>๐ฃ๏ธ {post.language}</div>

				<div className='img-line'>
					<img src={imgLine} alt={'line'} />
				</div>
			</div>
			<div className='bio-box'>
				<p className='bio-text'>{post.bio}</p>

				<span>
					<h3>{post.budget} kr.</h3>
					<p>Mรฅnedlig husleje budget</p>
				</span>
			</div>
		</article>
	);
}
