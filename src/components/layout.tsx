import React from "react";
import { Box } from "ink";

interface LayoutProps {
	children: React.ReactNode;
	width: number;
}

export const Layout: React.FC<LayoutProps> = ({ children, width }) => {
	return (
		<Box borderStyle="round" borderColor="green" alignItems="center" width={width + "%"} minHeight={20}>
			{children}
		</Box>
	);
};
