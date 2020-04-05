import { useCallback } from 'react';
import { useDispatch } from 'globalState';

export default function useRemoveNotification() {
	const dispatchNotification = useDispatch('remove', 'notifications');
	const removeNotification = useCallback(uid => dispatchNotification({ uid }), [
		dispatchNotification
	]);
	return removeNotification;
}
