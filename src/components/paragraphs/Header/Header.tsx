import React from 'react';
import { useLocation } from 'react-router';
import { useTrail } from 'react-spring';

import { navItems } from 'config';
import { getActiveNavItem } from 'functions';
import useRedirect from 'components/bindings/hooks/useRedirect';
import { NavItems, NavItem, ToggleArrow } from './style';

type HeaderProps = {
	headerIsOpen: boolean;
	setHeaderIsOpen: (val: boolean) => void;
};

const Header = (props: HeaderProps) => {
	const { headerIsOpen, setHeaderIsOpen } = props;
	const location = useLocation();
	const redirect: (link: string) => () => void = useRedirect();
	const navItemStyles = useTrail(navItems.length, {
		opacity: headerIsOpen ? 1 : 0,
		transform: headerIsOpen
			? `translate3d(0px, 0, 0px) scale3d(1,1,1)`
			: `translate3d(-15px, 0px, 0px) scale3d(0,0,0)`,
		from: {
			opacity: 0,
			transform: `translate3d(-15px, 0px, 0px) scale3d(0,0,0)`
		},
		config: {
			tension: 420,
			friction: 32
		},
		trail: 250
	});
	return (
		<NavItems>
			<ToggleArrow
				headerIsOpen={headerIsOpen}
				setHeaderIsOpen={setHeaderIsOpen}
			/>
			{navItemStyles.map((animStyles, index) => (
				<NavItem
					active={getActiveNavItem(location.pathname) === index ? 1 : 0}
					onClick={redirect(navItems[index].url)}
					key={navItems[index].text}
					style={animStyles}>
					{navItems[index].text}
				</NavItem>
			))}
		</NavItems>
	);
};

export default Header;
