import { Box, Text } from "ink";
import React from "react";

export default function Info() {
	return (
		<Box flexDirection="column" width="80%" minHeight={5} paddingLeft={2}>
			<Text color="blue" bold>
				Tab: Change focus g: Set global version i: Install a version u: Install a version, q: To quit
			</Text>
		</Box>
	);
}
