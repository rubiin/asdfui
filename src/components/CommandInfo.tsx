import { Box, Text, useFocus } from "ink";
import Link from "ink-link";
import React from "react";
import { getCommandInfo } from "@utils/index.js";

export function CommandInfo() {
	useFocus({ isActive: false });
	return (
		<Box width="100%" minHeight={5} justifyContent="space-between" flexWrap="wrap">
			<Box flexGrow={3}>
				<Text color="blue" bold>
					{getCommandInfo()}
				</Text>
			</Box>
			<Box flexGrow={1}>
				<Link url="https://github.com/rubiin/asdfui">
					<Text color="magenta">Github</Text>
				</Link>
			</Box>
		</Box>
	);
}
