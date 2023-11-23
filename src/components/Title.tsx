import { Box, Text } from "ink";
import React from "react";
import { GenericTextProp } from "@utils/index.js";

export function Title({ label, color }: GenericTextProp & { color: string }) {
	return (
		<Box alignSelf="center" marginTop={-1}>
			<Text bold color={color}>
				{label}
			</Text>
		</Box>
	);
}
