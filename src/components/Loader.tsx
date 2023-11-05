import { Spinner } from "@inkjs/ui";
import { Box } from "ink";
import React from "react";
import { GenericTextProp } from "../types.js";

export const Loader = ({ label }: GenericTextProp) => {
	return (
		<Box padding={2}>
			<Spinner type="dots" label={label} />
		</Box>
	);
};
