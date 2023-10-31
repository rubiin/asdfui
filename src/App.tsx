import { Box } from "ink";
import React from "react";
import { Globals } from "./components/Global.js";
import { Header, MainContainer, Plugins, Versions } from "./components/index.js";
import { BorderColor } from "./types.js";

export default function App() {


	return (
		<>
		  <Header />
			<MainContainer  borderColor={BorderColor.UNFOCUSED}>
				<Box flexDirection="column" width="50%">
				<Globals/>
				<Plugins/>
				</Box>
				<Versions />
			</MainContainer>
		</>
	);
}
