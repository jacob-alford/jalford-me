import {
  storeActionCategory,
  blogPayload as BP,
  addBodyBlogPayload as ABP,
  addPostCommentsPayload as APC
} from './_types';
import { postActors } from './_actors';
import action from '../action-constructors/action';
import doNothing from '../action-constructors/doNothing';

const postActions: storeActionCategory<BP & ABP & APC> = {
  [postActors.concatPosts]: action<BP>((store, action) => {
    store.posts.push(...action.payload);
  }),
  [postActors.triggerBodyUpdate]: doNothing(),
  [postActors.addPostBody]: action<ABP>((store, action) => {
    const { index, body } = action.payload;
    store.posts[index].body = body;
  }),
  [postActors.addPostComments]: action<APC>((store, action) => {
    const { comments, index } = action.payload;
    store.posts[index].comments = comments;
  })
};

export default postActions;
