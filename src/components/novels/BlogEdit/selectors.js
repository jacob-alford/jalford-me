const getPostId = props => props.match.params.postId;
const getLatestSnapshot = postData => {
  if(postData.lastPublish.seconds > postData.snapshots[0].date.seconds){
    return postData;
  }else{
    return postData.snapshots[0];
  }
}
const getLatestSnapshotDate = postData => {
  if(postData.lastPublish.seconds > postData.snapshots[0].date.seconds){
    return postData.lastPublish;
  }else{
    return postData.snapshots[0].date;
  }
}
export { getPostId , getLatestSnapshot , getLatestSnapshotDate };
