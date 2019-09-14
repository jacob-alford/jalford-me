import { useEffect , useReducer , useMemo , useState } from 'react';

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

export default function useDocReducer(collection,doc,grabbers){
  const { data , error , loading } = useDocSubscribe(collection,doc);
  const { getSetters , getTextHandlers , getTogglers , getSelectors } = grabbers;
  const [shouldUpdate,setShouldUpdate] = useState(true);
  const [formData,actOnFormData] = useReducer(reducer,{});
  const [updatesLocked,lockUpdates,unlockUpdates] = useLock(false);
  useEffect(() => {
    if(data && shouldUpdate && !updatesLocked){
      actOnFormData({
        type:'update',
        data
      });
      setShouldUpdate(false);
    }
  },[data,shouldUpdate,updatesLocked]);
  const setters = useMemo(
    () => getSetters && getSetters.reduce((acc,current) => {
      acc[current] = data => actOnFormData({
        type:'set',
        key:current,
        data
      });
      return acc;
    },{}),
    [getSetters]
  );
  const textHandlers = useMemo(
    () => getTextHandlers && getTextHandlers.reduce((acc,current) => {
      acc[current] = evt => actOnFormData({
        type:'set',
        key:current,
        data:evt.target.value
      });
      return acc;
    },{}),
    [getTextHandlers]
  );
  const toggleHandlers = useMemo(
    () => getTogglers && getTogglers.reduce((acc,current) => {
      acc[current] = () => actOnFormData({
        type:'set',
        key:current,
        data:!formData[current]
      });
      return acc;
    },{}),
    [getTogglers,formData]
  );
  const selectors = useMemo(
    () => getSelectors && getSelectors.reduce((acc,current) => {
      if(current.deepSelect)
        acc[current.key] = () => current.deepSelect(formData[current.key]);
      else
        acc[current] = () => formData[current];
      return acc;
    },{}),
    [getSelectors,formData]
  );
  return {
    forceUpdate: () => setShouldUpdate(true),
    data:formData,
    rawData:data,
    selectors,
    setters,
    textHandlers,
    toggleHandlers,
    lockUpdates,
    unlockUpdates,
    error,
    loading
  };
}

// --- e.g.
// const {
//   rawData,
//   data:{
//     snapshots,
//     lastPublish,
//     title:blogTitle,
//     snippit:blogSnippit,
//     series:blogSeries,
//     tags:blogTags,
//     isPublic,
//     displayHeading,
//     body:blogText
//   },
//   selectors:{
//     date:getDate
//   },
//   setters:{
//     tags:setBlogTags,
//     body:setBlogText
//   },
//   textHandlers:{
//     title:handleTitleChange,
//     snippit:handleSnippitChange,
//     series:handleSeriesChange,
//     date:handleDateChange
//   },
//   toggleHandlers:{
//     isPublic:handleIsPublicToggle,
//     displayHeading:handleDisplayHeadingToggle
//   },
//   forceUpdate,
//   lockUpates,
//   unlockUpdates,
//   error,
//   loading
// } = useDocReducer('posts',getPostId(props),{
//   getSelectors:[
//     {
//       key:'date',
//       deepSelect: date => date && new Date(date.toDate())
//     }
//   ],
//   getSetters:[
//     'tags','body'
//   ],
//   getTextHandlers:[
//     'title','snippit','series'
//   ],
//   getTogglers:[
//     'isPublic','displayHeading'
//   ]
// });
