import { useHistory } from 'react-router-dom';

const useRedirect = (link?: string): (() => void) | ((link: string) => void) => {
  const history = useHistory();
  if (!link)
    return (lick: string) => {
      if (lick.includes('http')) window.location.href = lick;
      else history.push(lick);
    };
  if (link.includes('http') || link.includes('mailto'))
    return () => (window.location.href = link);
  else return () => history.push(link);
};

export default useRedirect;
