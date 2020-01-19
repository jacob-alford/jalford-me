import { useState, useEffect } from 'react';
import { firebase } from 'firebase.js';

import useRHook from 'components/bindings/hooks/useRHook';

export default function useRsConnect() {
	const [isLoading, setIsLoading] = useState(true);
	const [users, setUsers] = useState(null);
	const [error, setError] = useState(null);
	const { user, userLoading } = useRHook();
	useEffect(() => {
		if (!userLoading) {
			if (!user.loggedIn) {
				setError('Insufficient permissions: User not logged in!');
			} else if (
				!error &&
				!users &&
				user.loggedIn &&
				user.activeUser.permissions.value < 10
			) {
				setError('Insufficient permissions: Must be admin to view the users!');
			} else if (
				!error &&
				!users &&
				user.loggedIn &&
				user.activeUser.permissions.value === 10
			) {
				const db = firebase.firestore();
				const usersDB = db.collection('users');
				const unsubscribe = usersDB.onSnapshot(
					snapshot => {
						const userArr = [];
						snapshot.forEach(doc => {
							userArr.push(doc.data());
						});
						setUsers(userArr);
					},
					error => setError(error)
				);
				return () => unsubscribe();
			}
		}
	}, [error, users, user, userLoading]);
	useEffect(() => {
		if (isLoading && !userLoading && (users || error)) setIsLoading(false);
	}, [users, isLoading, error, userLoading]);
	return { isLoading, users, error, user };
}
