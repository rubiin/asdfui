import { Box, Text } from "ink";
import React from "react";
import { GenericTextProp } from "../types.js";

export function CustomItem({ label }: GenericTextProp) {
	const [first, second] = label.split(" ");
	return (
		<Box gap={1}>
			<Text>{first}</Text>
			<Text color={"green"} bold>{second}</Text>
		</Box>
	);
}
