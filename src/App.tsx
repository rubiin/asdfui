import { Box } from "ink";
import React from "react";
import { CommandInfo, Header, PanesContainer } from "@components/index.js";
import { BorderColor } from "./types.js";
import { Versions, Info, Plugins } from "@panes/index.js";

export default function App() {
	return (
		<>
			<Header />
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
