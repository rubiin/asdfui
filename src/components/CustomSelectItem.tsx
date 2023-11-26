import { Box, Text } from "ink";
import React from "react";
import { GenericTextProp } from "@utils/index.js";

export function CustomItem({ label }: GenericTextProp) {
	const LineItem = ({ text }: { text: string }) => {
		if (text.includes(" ")) {
			const [first, second] = label.split(" ");
			return (
				<>
					<Text>{first}</Text>
					<Text color={"green"} bold>
						{second}
					</Text>
				</>
			);
		}
		return (
			<>
				<Text>{text}</Text>
			</>
		);
	};
	return (
		<Box gap={1}>
			<LineItem text={label} />
		</Box>
	);
}
