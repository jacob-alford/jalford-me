const C = {
	h: `${50 / 16}vh`,
	H: `calc(${50 / 8}vh - 4px)`,
	blue: (index = 0) => {
		const light = '#6ac0fd';
		const med = '#2c1fe0';
		const dark = '#3e007b';
		return [light, med, dark][index];
	},
	pink: (index = 0) => {
		const light = '#E86DD7';
		const med = '#d819e3';
		const dark = '#B4169E';
		return [light, med, dark][index];
	},
	orange: (index = 0) => {
		const light = '#ffe197';
		const med = '#ffb025';
		const dark = '#ED8F02';
		return [light, med, dark][index];
	}
};

export default C;
