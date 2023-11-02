import { Box } from "ink";
import React from "react";
import { CommandInfo, Header, PanesContainer} from "./components/index.js";
import { BorderColor } from "./types.js";
import { Versions } from "./panes/Versions.js";
import { Plugins } from "./panes/Plugins.js";
import { Info } from "./panes/Info.js";

export default function App() {


	return (
		<>
		  <Header />
			<PanesContainer borderColor={BorderColor.UNFOCUSED}>
				<Box flexDirection="column" width="50%">
				<Info/>
				<Plugins/>
				</Box>
				<Versions />
			</PanesContainer>
			<CommandInfo/>
		</>
	);
}
