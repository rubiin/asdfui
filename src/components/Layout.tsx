import { Box, useApp, useInput } from "ink";
import React from "react";

interface LayoutProps {
	children: React.ReactNode;
	borderColor?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, borderColor }) => {
	const { exit } = useApp();

	useInput((input: string) => {
		if (input === "q") {
			exit();
		}
	});

	return (
		<Box width="100%" justifyContent="center">
		<Box borderStyle="round" borderColor={borderColor} minHeight={20} gap={1}>
			{children}
		</Box>
		</Box>
	);
};
