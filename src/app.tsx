import { useFocusManager } from "ink";
import React, { useEffect } from "react";
import Info from "./components/info.js";
import { Layout } from "./components/layout.js";
import { Plugins } from "./components/plugins.js";
import { Versions } from "./components/versions.js";

export default function App() {
	const { focus } = useFocusManager();

	useEffect(() => {
		focus("plugins");
	}, []);

	return (
		<>
			<Layout width={80} borderColor="white">
				<Plugins />
				<Versions />
			</Layout>
			<Info />
		</>
	);
}
