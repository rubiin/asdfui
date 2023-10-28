import React, { useEffect } from "react";
import { Layout } from "./components/layout.js";
import { Plugins } from "./components/plugin.js";
import { Versions } from "./components/versions.js";
import { useFocusManager } from "ink";

export default function App() {
	const { focus } = useFocusManager();

	useEffect(() => {
		focus("plugin");
	}, []);

	return (
		<Layout width={50} borderColor="white">
			<Plugins />
			<Versions />
		</Layout>
	);
}
