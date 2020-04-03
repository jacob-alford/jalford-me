import React, { useState, useLayoutEffect } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

type katexProps = {
	str: string;
	inline?: boolean;
	style?: React.CSSProperties;
};

const Katex = (props: katexProps) => {
	const { str, inline = false, style } = props;
	const [html, setHtml] = useState('');
	useLayoutEffect(
		() =>
			setHtml(
				katex.renderToString(str, {
					throwOnError: false,
					displayMode: !inline
				})
			),
		[str, inline]
	);
	if (inline)
		return <span style={style} dangerouslySetInnerHTML={{ __html: html }} />;
	return <div style={style} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Katex;
