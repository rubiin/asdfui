import { Select } from "@inkjs/ui";
import { Box, useFocus } from "ink";
import React, { useEffect } from "react";
import { usePluginsStore } from "../stores/plugin.store.js";
import { getBorderColorOnFocus, totalNumber } from "../utils/helpers.js";
import { Loader, NotFound, Title } from "./index.js";

export function Plugins() {
	const { isFocused } = useFocus({ id: "plugins" });
	const getAllLocalPlugins = usePluginsStore((state) => state.getAllLocalPlugins);
	const setSelectedPlugin = usePluginsStore((state) => state.selectPlugin);
	const plugins = usePluginsStore((state) => state.plugins);
	const loading = usePluginsStore((state) => state.loading);

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
			borderStyle="double"
			borderColor={getBorderColorOnFocus(isFocused)}
			flexDirection="column"
			minHeight={20}
			paddingLeft={2}
		>
			<Title title={totalNumber("Plugins",plugins.length)} color={getBorderColorOnFocus(isFocused)} />
			{loading && <Loader text={"Fetching installed asdf plugins"} />}
			{!loading && <Select isDisabled={!isFocused} visibleOptionCount={10} options={plugins} onChange={setValue} />}
			{!loading && plugins.length === 0 && <NotFound text={"No installed plugins found"} />}
		</Box>
	);
}
