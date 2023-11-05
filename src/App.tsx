import { Box } from "ink";
import React from "react";
import { CommandInfo, PanesContainer } from "@components/index.js";
import { BorderColor } from "./types.js";
import { Versions, Info, Plugins } from "@panes/index.js";

export default function App() {
	return (
		<>
			<PanesContainer borderColor={BorderColor.UNFOCUSED}>
				<Box flexDirection="column" width="50%">
					<Info />
					<Plugins />
				</Box>
				<Versions />
			</PanesContainer>
			<CommandInfo />
		</>
	);
}
