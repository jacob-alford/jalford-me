const defaultNotifState = {
	notifications: []
};

const actors = {
	add: 'add',
	remove: 'remove'
};
const actions = {
	[actors.add]: ({ notifications }, { notification }) => [notification, ...notifications],
	[actors.remove]: ({ notifications }, { uid }) =>
		notifications.filter(item => item.uid !== uid)
};

const selectees = {
	getNotifications: 'getNotifications'
};
const notifSelectors = {
	[selectees.getNotifications]: state => state.notifications
};

export default actions;

export { defaultNotifState, notifSelectors };
