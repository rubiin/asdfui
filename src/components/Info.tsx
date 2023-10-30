import { Box, Text } from "ink";
import React from "react";

export function Info() {
	return (
		<Box width="80%" minHeight={5} justifyContent="center">
			<Text color="blue" bold>
				Tab: Change focus g: Set global version i: Install a version u: Install a version, q: To quit
			</Text>
		</Box>
	);
}
