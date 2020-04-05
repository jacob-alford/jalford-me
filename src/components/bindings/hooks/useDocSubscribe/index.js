import { useEffect, useState } from 'react';

import { firebase } from 'firebase.js';

export default function useDocSubscribe(collection, doc) {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		const db = firebase.firestore();
		const docRef = db.collection(collection).doc(doc);
		const unsubscribe = docRef.onSnapshot(
			doc => {
				if (doc.exists) {
					setData(doc.data());
				} else {
					setError('Entry not found!');
				}
				setLoading(false);
			},
			error => setError(error.toString())
		);
		return () => unsubscribe();
	}, [collection, doc]);
	return { data, error, loading };
}
