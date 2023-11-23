import Select from "ink-select-input";
import { Box, useFocus } from "ink";
import React, { useEffect } from "react";
import { usePluginsStore } from "@stores/index.js";
import { Loader, CustomAlert, Title } from "@components/index.js";
import { getBorderColorOnFocus, totalNumber, Item } from "@utils/index.js";

export function Plugins() {
	const { isFocused } = useFocus({ id: "plugins", autoFocus: true });
	const getAllLocalPlugins = usePluginsStore((state) => state.getAllLocalPlugins);
	const setSelectedPlugin = usePluginsStore((state) => state.selectPlugin);
	const plugins = usePluginsStore((state) => state.plugins);
	const loading = usePluginsStore((state) => state.isLoading);

	const handleSelect = (item: Item<string>) => {
		setSelectedPlugin({
			value: item.value,
			label: item.label,
		});
	};

	useEffect(() => {
		getAllLocalPlugins();
	}, []);

	return (
		<Box
			borderStyle="double"
			borderColor={getBorderColorOnFocus(isFocused)}
			flexDirection="column"
			minHeight={20}
			paddingLeft={2}
		>
			<Title label={totalNumber("Plugins", plugins.length)} color={getBorderColorOnFocus(isFocused)} />
			{loading && <Loader label="Fetching installed asdf plugins" />}
			{!loading && <Select limit={10} items={plugins} isFocused={isFocused} onHighlight={handleSelect} />}
			{!loading && plugins.length === 0 && <CustomAlert label="No installed plugins found" />}
		</Box>
	);
}
