import {
  storeActionCategory,
  blogPayload as BP,
  addBodyBlogPayload as ABP
} from './_types';
import { postActors } from './_actors';
import action from '../action-constructors/action';
import doNothing from '../action-constructors/doNothing';

const postActions: storeActionCategory<BP & ABP> = {
  [postActors.concatPosts]: action<BP>((store, action) => {
    store.posts.push(...action.payload);
  }),
  [postActors.triggerBodyUpdate]: doNothing(),
  [postActors.addPostBody]: action<ABP>((store, action) => {
    const { index, body } = action.payload;
    store.posts[index].body = body;
  })
};

export default postActions;
