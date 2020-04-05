import { useState, useEffect } from 'react';

import { getTextColorBasedOnBg } from 'functions';

export default function useColorAdapt(color) {
	const [currentTextColor, setCurrentTextColor] = useState(getTextColorBasedOnBg(color));
	useEffect(() => {
		setCurrentTextColor(getTextColorBasedOnBg(color));
	}, [color]);
	return currentTextColor;
}
