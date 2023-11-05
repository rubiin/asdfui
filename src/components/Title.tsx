import { Box, Text } from "ink";
import React from "react";

export function Title({ title, color }: { title: string; color: string }) {
	return (
		<Box alignSelf="center" marginTop={-1}>
			<Text bold color={color}>
				{title}
			</Text>
		</Box>
	);
}
