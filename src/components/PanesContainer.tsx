import { Box, useApp, useInput } from "ink";
import React from "react";
import { Keys } from "@utils/index.js";

interface LayoutProps {
	children: React.ReactNode;
	borderColor?: string;
}

export const PanesContainer: React.FC<LayoutProps> = ({ children, borderColor }) => {
	const { exit } = useApp();

	useInput((input: string) => {
		if (input === Keys.QUIT) {
			exit();
		}
	});

	return (
		<Box width="100%" borderColor={borderColor} minHeight={20} gap={1} marginTop={2}>
			{children}
		</Box>
	);
};
