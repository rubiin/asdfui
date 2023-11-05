import { Spinner } from "@inkjs/ui";
import { Box } from "ink";
import React from "react";

export const Loader = ({ text }: { text: string }) => {
	return (
		<Box padding={2}>
			<Spinner type="dots" label={text} />
		</Box>
	);
};
