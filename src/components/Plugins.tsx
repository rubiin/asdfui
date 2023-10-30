import { Select } from "@inkjs/ui";
import { Box, useFocus } from "ink";
import React, { useEffect, useState } from "react";
import { usePluginsStore } from "../stores/plugin.store.js";
import { getBorderColorOnFocus } from "../utils/helpers.js";
import { Loader, NotFound, Title } from "./index.js";

export function Plugins() {
	const { isFocused } = useFocus({ id: "plugins" });
	const getAllLocalPlugins = usePluginsStore((state) => state.getAllLocalPlugins);
	const [loading, setLoading] = useState(false);
	const setSelectedPlugin = usePluginsStore((state) => state.selectPlugin);
	const plugins = usePluginsStore((state) => state.plugins);

	function setValue(value: string) {
		setSelectedPlugin({
			value,
			label: value,
		});
	}

	useEffect(() => {
		setLoading(true);
		// declare the data fetching function
		const fetchPluginsData = () => {
			getAllLocalPlugins();
			setLoading(false);
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
			{loading && <Loader text={"Fetching installed asdf plugins"} />}
			{!loading && <Select isDisabled={!isFocused} visibleOptionCount={10} options={plugins} onChange={setValue} />}
			{!loading && plugins.length === 0 && <NotFound text={"No installed plugins found"} />}
		</Box>
	);
}
