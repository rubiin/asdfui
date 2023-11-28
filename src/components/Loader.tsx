import { Spinner } from "@inkjs/ui";
import { Box } from "ink";
import React from "react";
import { GenericTextProperty } from "@utils/index.js";

export const Loader: React.FC<GenericTextProperty> = ({ label }: GenericTextProperty) => {
	return (
		<Box padding={2}>
			<Spinner type="dots" label={label} />
		</Box>
	);
};
