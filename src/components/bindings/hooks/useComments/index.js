import { useState, useEffect, useMemo } from 'react';
import { firebase } from 'firebase.js';

import { transformComments } from './selectors.js';

export default function useComments(id) {
	const [isLoading, setIsLoading] = useState(true);
	const [comments, setComments] = useState(null);
	const [error, setError] = useState(null);
	const gottenComments = useMemo(() => comments && transformComments(comments), [
		comments
	]);
	useEffect(() => {
		const db = firebase.firestore();
		const postComments = db
			.collection('posts')
			.doc(id)
			.collection('comments')
			.orderBy('date', 'desc');
		const unsubscribe = postComments.onSnapshot(
			docs => {
				const comments = [];
				docs.forEach(doc => {
					comments.push(doc.data());
				});
				setComments(comments);
			},
			error => setError(error)
		);
		return () => unsubscribe();
	}, [id]);
	useEffect(() => {
		if (isLoading && (comments || error)) setIsLoading(false);
	}, [comments, isLoading, error]);
	return {
		isLoading,
		comments: gottenComments || [],
		error
	};
}
