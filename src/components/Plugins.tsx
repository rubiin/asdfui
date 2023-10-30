import { Select } from "@inkjs/ui";
import { Box, useFocus } from "ink";
import React, { useEffect, useState } from "react";
import { getBorderColorOnFocus } from "../asdf.js";
import { usePluginsStore } from "../stores/plugin.store.js";
import Title from "./Title.js";
import { Loader } from "./Loader.js";

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
		setLoading(true)
		// declare the data fetching function
		const fetchPluginsData = () => {
			getAllLocalPlugins();
			setLoading(false)
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
			{loading && <Loader text={'Fetching installed asdf plugins'}/>}
			<Select isDisabled={!isFocused} visibleOptionCount={10} options={plugins} onChange={setValue} />
		</Box>
	);
}
