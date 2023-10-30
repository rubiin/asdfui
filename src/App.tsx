import { useFocusManager } from "ink";
import React, { useEffect } from "react";
import { Header, About, Layout, Plugins, Versions } from "./components/index.js";
import { BorderColor } from "./types.js";

export default function App() {
	const { focus } = useFocusManager();

	useEffect(() => {
		focus("plugins");
	}, []);

	return (
		<>
		  <Header />
			<Layout  borderColor={BorderColor.UNFOCUSED}>
				<Plugins />
				<Versions />
			</Layout>
			<About />
		</>
	);
}
