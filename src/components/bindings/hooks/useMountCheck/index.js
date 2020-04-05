import { useState, useEffect } from 'react';

export default function useMountCheck() {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
		return () => setIsMounted(false);
	}, [setIsMounted]);
	return isMounted;
}
