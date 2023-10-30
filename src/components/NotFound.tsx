import { Alert } from "@inkjs/ui";
import { Box } from "ink";
import React from "react";

export const NotFound = ({ text }: { text: string }) => {
	return (
		<Box marginTop={1}>
			<Alert variant="info">{text}</Alert>
		</Box>
	);
};
