import { storeActionCategory, errorPayload as EP, indexPayload as IP } from './_types';
import { errorActors } from './_actors';
import action from '../action-constructors/action';
import formatErrors from '../helpers/formatErrors';

const errorActions: storeActionCategory<EP & IP<errorActors>> = {
  [errorActors.setError]: action<EP>((store, action) => {
    const { payload } = action;
    store.errors.push({
      raw: payload,
      message: formatErrors(payload)
    });
  })
};

export default errorActions;
