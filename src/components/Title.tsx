import { Box, Text } from "ink";
import React from "react";
import { GenericTextProperty } from "@utils/index.js";

export const Title: React.FC<GenericTextProperty & { color: string }> = ({ label, color }: GenericTextProperty & { color: string }) => {
	return (
		<Box alignSelf="center" marginTop={-1}>
			<Text bold color={color}>
				{label}
			</Text>
		</Box>
	);
}
