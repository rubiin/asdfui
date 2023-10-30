import { Box, useFocusManager } from "ink";
import React, { useEffect } from "react";
import { Layout, Plugins, Versions, Info, Header } from "./components/index.js";
import { BorderColor } from "./types.js";

export default function App() {
	const { focus } = useFocusManager();

	useEffect(() => {
		focus("plugins");
	}, []);

	return (
		<>
		<Box width="100%" flexDirection="column" alignItems="center">
		  <Header />
			<Layout width={80} borderColor={BorderColor.UNFOCUSED}>
				<Plugins />
				<Versions />
			</Layout>
			<Info />
			</Box>
		</>
	);
}
