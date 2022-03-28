import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc } from '@firebase/firestore';
import { usersRef } from '../firebase-config';
import UserAvatar from './UserAvatar';
import CardFilters from './CardFilters';
import CardBio from './CardBio';
import imgLine from '../assets/img/line.png';

export default function PostCard({ post }) {
	const navigate = useNavigate();

	function handleClick() {
		navigate(`posts/${post.id}`);
	}

	return (
		<article>
			<UserAvatar uid={post.uid} />
			<CardFilters uid={post.uid} />

			<div class='img-line'>
				<img src={imgLine} alt={'line'} />
			</div>

			<CardBio uid={post.uid} />
		</article>
	);
}
