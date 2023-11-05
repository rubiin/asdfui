import React from "react";
import { Box } from "ink";
import Gradient from "ink-gradient";
import BigText from "ink-big-text";

export const Header = () => {
	return (
		<Box justifyContent="center">
			<Gradient name="retro">
				<BigText text="Asdfui" font="block" />
			</Gradient>
		</Box>
	);
};
