import { Alert, AlertProps } from "@inkjs/ui";
import { Box } from "ink";
import React from "react";

interface CustomAlertProps{
	text: string;
	variant?: AlertProps['variant']
}

export const CustomAlert = (opts: CustomAlertProps) => {
	const options = {
		variant: "info",
		...opts
	}
	return (
		<Box marginTop={1} marginRight={4}>
			<Alert variant={options.variant as AlertProps['variant']}>{options.text}</Alert>
		</Box>
	);
};
