import { themeHook } from 'theme';

const useClasses = themeHook(
	['getCardPadding', 'getMinorSpacing', 'getMajorSpacing'],
	([cardPadding, minorSpacing, majorSpacing]) => ({
		puzzleHolder: {
			width: '100vw',
			backgroundColor: '#FF1690',
			paddingBottom: majorSpacing
		},
		cell: {
			width: '32.5vw',
			padding: cardPadding,
			marginTop: minorSpacing,
			marginBottom: minorSpacing
		},
		rCell: {
			borderRadius: '0px 8px 8px 0px'
		},
		lCell: {
			borderRadius: '8px 0px 0px 8px'
		},
		pCell: {
			backgroundColor: '#efefef',
			zIndex: 1
		},
		nCell: {
			backgroundColor: '#CC1144'
		},
		analogyHolder: {
			width: '100vw'
		},
		field: {
			color: 'white',
			margin: '0px'
		},
		title: {
			marginBottom: majorSpacing,
			marginTop: majorSpacing,
			fontWeight: 'lighter',
			textAlign: 'center'
		},
		sucessSpan: {
			color: '#357e37'
		},
		problemSpan: {
			color: '#d32f2f'
		},
		checkButton: {
			marginTop: minorSpacing,
			marginBottom: minorSpacing
		}
	})
);

export default useClasses;
