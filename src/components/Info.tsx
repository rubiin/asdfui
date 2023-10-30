import { Box, Text } from "ink";
import Link from "ink-link";
import React from "react";

export function Info() {
	return (
		<Box width="60%" minHeight={5} justifyContent="space-between" marginLeft={10}>
			<Text color="blue" bold>
				Tab: Change focus g: Set global version i: Install a version u: Install a version, q: To quit
			</Text>
			<Link url="https://github.com/rubiin/asdfui">
			<Text color="magenta">Github</Text>
			</Link>
		</Box>
	);
}
