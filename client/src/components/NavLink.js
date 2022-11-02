import * as React from "react";
import { NavLink as BaseNavLink } from "react-router-dom";

export const NavLink = React.forwardRef(({ ...props }, ref) => {
	let activeClassName = "inherit";
	let activeStyle = {
		textDecoration: "underline",
	};

	return (
		<BaseNavLink
			ref={ref}
			{...props}
			className={({ isActive }) =>
				[props.className, isActive ? activeClassName : null]
					.filter(Boolean)
					.join(" ")
			}
			style={({ isActive }) => ({
				...props.style,
				...(isActive ? activeStyle : null),
			})}
		/>
	);
});
