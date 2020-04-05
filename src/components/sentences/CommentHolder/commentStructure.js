const greatestDepth = comments =>
	comments.reduce((acc, curr) => (acc > curr.depth ? acc : curr.depth), 0);

const getChildren = (parentComment, children) =>
	children.filter(child => child.parentId === parentComment.id);

export const strctureComments = comments => {
	const largestDepth = greatestDepth(comments);
	if (largestDepth === 0) return comments;
	else {
		const bigDepthArr = comments.filter(comment => comment.depth === largestDepth);
		return strctureComments(
			comments
				.filter(comment => comment.depth !== largestDepth)
				.map(comment => ({
					...comment,
					comments: getChildren(comment, bigDepthArr)
				}))
		);
	}
};
