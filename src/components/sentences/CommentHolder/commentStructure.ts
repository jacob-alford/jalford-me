import { postComment, structuredComments } from 'global-state';

const greatestDepth = (comments: postComment[]) =>
  comments.reduce((acc, curr) => (acc > curr.depth ? acc : curr.depth), 0);

const getChildren = (parentComment: postComment, children: postComment[]) =>
  children.filter(child => child.parentId === parentComment.id);

export const strctureComments = (
  comments: postComment[]
): structuredComments[] | postComment[] => {
  if (!comments) return [];
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
