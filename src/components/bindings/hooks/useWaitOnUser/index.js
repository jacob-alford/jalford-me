import { useState, useEffect } from 'react';

export default function useWaitOnUser(user) {
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		if (isLoading && user.loggedIn) setIsLoading(false);
	}, [user, isLoading]);
	return isLoading;
}
