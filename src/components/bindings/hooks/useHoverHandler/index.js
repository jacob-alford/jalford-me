import { useState } from 'react';

export default function useHoverHandler(styles = {}){
  const { out = {} , over = {} , base = {} } = styles;
  const [isOver,setIsOver] = useState(false);
  const onMouseOut = () => setIsOver(false);
  const onMouseOver = () => setIsOver(true);
  const style = (isOver) ?
                { ...base,
                  ...over }
              : { ...base,
                  ...out }
  return { style , onMouseOut , onMouseOver };
}
