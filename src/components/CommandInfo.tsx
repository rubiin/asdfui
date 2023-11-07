import { getCommandInfo } from "@utils/index.js";
import { Box, Text } from "ink";
import React from "react";

export function CommandInfo() {
	return (
		<Box width="100%" minHeight={5} marginTop={1} justifyContent="center" flexWrap="wrap">
			<Text color="blue" bold>
				{getCommandInfo()}
			</Text>
		</Box>
	);
}
