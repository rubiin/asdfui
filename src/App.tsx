import { Box, useFocusManager } from "ink";
import React, { useEffect } from "react";
import { Globals } from "./components/Global.js";
import { Header, MainContainer, Plugins, Versions } from "./components/index.js";
import { BorderColor } from "./types.js";

export default function App() {
	const { focus } = useFocusManager();

	useEffect(() => {
		focus("plugins");
	}, []);

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
