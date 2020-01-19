import { useHistory } from 'react-router-dom';

export default function useRedirect(link) {
	const history = useHistory();
	if (link.includes('http')) return () => (window.location.href = link);
	else return () => history.push(link);
}
