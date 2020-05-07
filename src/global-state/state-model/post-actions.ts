import { storeActionCategory, blogPayload as BP } from './_types';
import { postActors } from './_actors';
import action from '../action-constructors/action';

const postActions: storeActionCategory<BP> = {
  [postActors.refreshPosts]: action<BP>((store, action) => {
    const posts = action.payload;
    store.posts = posts;
  })
};

export default postActions;
