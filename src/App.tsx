import { Box } from "ink";
import React from "react";
import { CommandInfo, Header, MainContainer, Plugins, Versions, Info } from "./components/index.js";
import { BorderColor } from "./types.js";

export default function App() {


	return (
		<>
		  <Header />
			<MainContainer  borderColor={BorderColor.UNFOCUSED}>
				<Box flexDirection="column" width="50%">
				<Info/>
				<Plugins/>
				</Box>
				<Versions />
			</MainContainer>
			<CommandInfo/>
		</>
	);
}
