const getPostId = (props: { match: { params: { postId: string } } }) =>
  props.match.params.postId;
export default getPostId;
