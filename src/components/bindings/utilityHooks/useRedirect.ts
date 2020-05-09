import { useHistory } from 'react-router-dom';

const useRedirect = (link?: string): (() => void) | ((link: string) => void) => {
  const history = useHistory();
  if (!link)
    return (lick: string) => {
      if (lick.includes('http')) return () => (window.location.href = lick);
      else return () => history.push(lick);
    };
  if (link.includes('http')) return () => (window.location.href = link);
  else return () => history.push(link);
};

export default useRedirect;
