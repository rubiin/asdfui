import React from "react";
import { Text } from "ink";
import { Spinner } from "@inkjs/ui";

export const Loader = () => {
	return (
		<Text>
			<Text color="green">
				<Spinner type="dots" />
			</Text>
			{" Loading"}
		</Text>
	);
};
