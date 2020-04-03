import { useHistory } from 'react-router-dom';

export default function useRedirect(link) {
	const history = useHistory();
	if (!link)
		return lick => {
			if (lick.includes('http')) return () => (window.location.href = lick);
			else return () => history.push(lick);
		};
	if (link.includes('http')) return () => (window.location.href = link);
	else return () => history.push(link);
}
