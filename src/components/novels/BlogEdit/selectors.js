const getPostId = props => props.match.params.postId;

const getLatestSnapshot = postData => {
	if (postData.lastPublish.seconds > postData.snapshots[0].date.seconds) {
		return postData;
	} else {
		return postData.snapshots[0];
	}
};

const getLatestSnapshotDate = postData => {
	if (postData.lastPublish.seconds > postData.snapshots[0].date.seconds) {
		return postData.lastPublish;
	} else {
		return postData.snapshots[0].date;
	}
};

const getSliderSnapshots = postData => {
	const outArr = postData.snapshots.slice(0, 5).map((snapshot, index, arr) => {
		return {
			value: -1 * index,
			label: index === 0 ? 'New' : index === arr.length - 1 ? 'Old' : null
		};
	});
	outArr.unshift({ value: 1, label: 'Pub' });
	return outArr;
};

export { getPostId, getLatestSnapshot, getLatestSnapshotDate, getSliderSnapshots };
