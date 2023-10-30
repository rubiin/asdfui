import { Select } from "@inkjs/ui";
import { Box, useFocus } from "ink";
import React, { useEffect } from "react";
import { getBorderColorOnFocus } from "../asdf.js";
import { usePluginsStore } from "../stores/plugin.store.js";
import Title from "./Title.js";

export function Plugins() {
	const { isFocused } = useFocus({ id: "plugins" });
	const getAllLocalPlugins = usePluginsStore((state) => state.getAllLocalPlugins);
	const setSelectedPlugin = usePluginsStore((state) => state.selectPlugin);
	const plugins = usePluginsStore((state) => state.plugins);

	function setValue(value: string) {
		setSelectedPlugin({
			value,
			label: value,
		});
	}

	useEffect(() => {
		// declare the data fetching function
		const fetchPluginsData = () => {
			getAllLocalPlugins();
		};

		// call the function
		fetchPluginsData();
	}, []);

	return (
		<Box
			borderStyle="round"
			borderColor={getBorderColorOnFocus(isFocused)}
			flexDirection="column"
			width="50%"
			minHeight={20}
			paddingLeft={2}
		>
			<Title title="Plugins" color={getBorderColorOnFocus(isFocused)} />

			<Select isDisabled={!isFocused} visibleOptionCount={10} options={plugins} onChange={setValue} />
		</Box>
	);
}
