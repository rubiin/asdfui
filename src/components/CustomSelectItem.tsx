import { Box, Text } from "ink";
import React from "react";
import { GenericTextProperty } from "@utils/index.js";

	export const CustomItem: React.FC<GenericTextProperty> = ({ label }: GenericTextProperty) => {

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
