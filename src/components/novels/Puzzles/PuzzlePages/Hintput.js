import React, { useState } from 'react';

import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import SHA3 from 'crypto-js/sha3';

import Holder from 'components/words/Holder';

import { themeHook } from 'theme';

const useClasses = themeHook(['getMinorSpacing'], ([minorSpacing]) => ({
	hintGroup: {
		margin: '8px'
	},
	fieldTitle: {
		color: 'rgba(0,0,0,.69)'
	},
	textField: {
		marginTop: minorSpacing,
		marginBottom: minorSpacing
	}
}));

const sha3Check = (test, str) => SHA3(test).toString() === str;
const setSuccessHeader = (test, str, setter) => () => {
	if (test && str && sha3Check(test, str)) setter(true);
	else setter(false);
};

export default function Hintput(props) {
	const { label, hash, setCorrect, correct, boxLabel } = props;
	const [boxValue, setBoxValue] = useState('');
	const classes = useClasses();
	return (
		<Holder className={classes.hintGroup}>
			<Typography
				variant='h2'
				className={classes.fieldTitle}
				style={{
					color: correct === true ? '#357e37' : correct === false ? '#d32f2f' : null
				}}>
				{label}
			</Typography>
			<TextField
				label={boxLabel}
				onChange={evt => setBoxValue(evt.target.value)}
				value={boxValue}
				className={classes.textField}
			/>
			<Button variant='outlined' onClick={setSuccessHeader(boxValue, hash, setCorrect)}>
				Check
			</Button>
		</Holder>
	);
}
