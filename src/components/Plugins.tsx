import  Select  from "ink-select-input";
import { Box, useFocus } from "ink";
import React, { useEffect } from "react";
import { usePluginsStore } from "../stores/plugin.store.js";
import { Loader, CustomAlert, Title } from "./index.js";
import { getBorderColorOnFocus, totalNumber } from "../utils/helpers.js";
import { Item } from "../types.js";

export function Plugins() {
	const { isFocused } = useFocus({ id: "plugins" , autoFocus: true});
	const getAllLocalPlugins = usePluginsStore((state) => state.getAllLocalPlugins);
	const setSelectedPlugin = usePluginsStore((state) => state.selectPlugin);
	const plugins = usePluginsStore((state) => state.plugins);
	const loading = usePluginsStore((state) => state.loading);



	const handleSelect = (item: Item<string>) => {
		setSelectedPlugin({
			value: item.value,
			label: item.label,
		});
	};

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
			{!loading && <Select limit={10} items={plugins} isFocused={isFocused}  onSelect={handleSelect} />}
			{!loading && plugins.length === 0 && <CustomAlert text={"No installed plugins found"} />}
		</Box>
	);
}
