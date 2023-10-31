import { Box, Text, useFocus } from "ink";
import Link from "ink-link";
import React from "react";
import { getCommandInfo } from "../utils/helpers.js";

export function CommandInfo() {
	useFocus({isActive: false})
	return (
		<Box width="60%" minHeight={5} justifyContent="space-between" marginLeft={10}>
			<Text color="blue" bold>
				 {getCommandInfo()}
			</Text>
			<Link url="https://github.com/rubiin/asdfui">
			<Text color="magenta">Github</Text>
			</Link>
		</Box>
	);
}
