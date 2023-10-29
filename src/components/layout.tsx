import { Box } from "ink";
import { useInput } from "ink";
import { useApp } from "ink";
import React from "react";

interface LayoutProps {
	children: React.ReactNode;
	width: number;
	borderColor: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, width, borderColor }) => {
	const { exit } = useApp();

	useInput((input) => {
		if (input === "q") {
			exit();
		}
	});

	return (
		<Box borderStyle="round" borderColor={borderColor} width={width + "%"} minHeight={20}>
			{children}
		</Box>
	);
};
