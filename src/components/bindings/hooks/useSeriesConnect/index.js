import { useState, useEffect } from 'react';
import { firebase } from 'firebase.js';

export default function useSeriesConnect(series) {
	const [isLoading, setIsLoading] = useState(true);
	const [postData, setPostData] = useState(null);
	const [error, setError] = useState(null);
	useEffect(() => {
		if (!error && !postData) {
			const db = firebase.firestore();
			const posts = db
				.collection('posts')
				.where('isPublic', '==', true)
				.where('series', '==', series);
			const unsubscribe = posts.onSnapshot(
				snapshot => {
					const seriesPosts = [];
					snapshot.forEach(doc => {
						seriesPosts.push(doc.data());
					});
					setPostData(seriesPosts);
				},
				error => setError(error)
			);
			return () => unsubscribe();
		}
	}, [error, postData, series]);
	useEffect(() => {
		if (isLoading && (postData || error)) setIsLoading(false);
	}, [postData, isLoading, error]);
	return { isLoading, postData, error };
}
