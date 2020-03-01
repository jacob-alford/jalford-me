import React, { useState, useEffect } from 'react';
import katex from 'katex';

type katexProps = {
	children: string;
	type?: string;
};

const Katex = (props: katexProps) => {
	const { children, type } = props;
	const [html, setHtml] = useState('');
	useEffect(
		() =>
			setHtml(
				katex.renderToString(children, {
					throwOnError: false,
					displayMode: true
				})
			),

		[children, type]
	);
	return <span dangerouslySetInnerHTML={{ __html: html }} />;
};

export default Katex;
