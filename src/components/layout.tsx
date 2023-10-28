import React from "react";
import { Box } from "ink";

interface LayoutProps {
	children: React.ReactNode;
	width: number;
	borderColor: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, width, borderColor }) => {
	return (
		<Box borderStyle="round" borderColor={borderColor} alignItems="center" width={width + "%"} minHeight={20}>
			{children}
		</Box>
	);
};
