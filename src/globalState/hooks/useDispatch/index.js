import { useContext } from 'react';

import { MutateGlobalState } from 'globalState';

const getSelectors = (selectors, domain, reducer) => {
	if (Array.isArray(selectors))
		return selectors.map(selector => {
			return payload =>
				reducer({
					domain,
					selector,
					payload
				});
		});
	else if (typeof selectors === 'string')
		return payload =>
			reducer({
				domain,
				selector: selectors,
				payload
			});
};

export default function useDispatch(selectors, domain) {
	const globalReducer = useContext(MutateGlobalState);
	return getSelectors(selectors, domain, globalReducer);
}
