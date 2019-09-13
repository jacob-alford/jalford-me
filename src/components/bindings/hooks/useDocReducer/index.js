import { useEffect , useReducer , useMemo } from 'react';

import useDocSubscribe from 'components/bindings/hooks/useDocSubscribe';
import useLock from 'components/bindings/hooks/useLock';

const actors = {
  update:'update',
  set:'set'
}
const actions = {
  [actors.update]: (state,{data}) => ({
    ...state,
    ...data
  }),
  [actors.set]: (state,{key,data}) => ({
    ...state,
    [key]:data
  })
}

const reducer = (state,action) => {
  const { type , key = null , data } = action;
  try{
    return actions[type](state,{key,data});
  }catch(error){
    throw new Error(`Unable to reduce.  It is likely a call to an unknown reducer! err: ${error}`);
  }
}

export default function useDocReducer(collection,doc,selectors){
  const { data , error } = useDocSubscribe(collection,doc);
  const [shouldUpdate,setShouldUpdate] = useState(true);
  const [formData,actOnFormData] = useReducer(reducer,{});
  const [updatesLocked,lockUpates,unlockUpdates] = useLock(false);
  useEffect(() => {
    if(data && shouldUpdate && !updatesLocked){
      actOnFormData({
        type:'update',
        data
      });
      setShouldUpdate(false);
    }
  },[data,shouldUpdate,updatesLocked]);
  const mappedSelectors = useMemo(() =>
    selectors.reduce((acc,current) => {
      const key = current.key || current;
      const transform = current.transform;
      if(data[key]){
        acc[key] = [
          (transform && transform(data[key])) || data[key],
          data => actOnFormData({
            type:'set',
            key:current,
            data
          }),
          {
            onChange: evt => actOnFormData({
              type:'set',
              key:current,
              data:evt.target.value
            })
          }
        ];
        return acc;
      }else{
        throw new Error(`Selector '${current}' not found in database!`);
      }
    },{}),
    [selectors]
  );
  return {
    ...mappedSelectors,
    forceUpdate: () => setShouldUpdate(true),
    lockUpdates,
    unlockUpdates,
    error
  };
}

const {
  title:[bTitle,bTitleHandlers],
  body:[bBody,bBodyHandlers],
  date:[bDate,bDateHandler],
  forceUpdate
} = useFormReducer('posts','dunc5',[
  'author',
  'body',
  'date'
]);
