import { Select } from "@inkjs/ui";
import { Box, useFocus } from "ink";
import React, { useEffect, useState } from "react";
import { IPlugin, getAllPlugins, getBorderColorOnFocus } from "../asdf.js";
import Title from "./title.js";

function setValue(){

}

export function Plugins() {
	const { isFocused } = useFocus({ id: "plugin" });
	const [plugins, setPlugins] = useState<IPlugin[]>([]);

	useEffect(() => {
		// declare the data fetching function
		const fetchData = async () => {
			const data = await getAllPlugins();
			setPlugins(data);
		};

		// call the function
		fetchData()
			// make sure to catch any error
			.catch(console.error);
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
			<Title title="Plugins" color={getBorderColorOnFocus(isFocused)}/>
			<Select isDisabled={!isFocused} visibleOptionCount={10} options={plugins} onChange={setValue} />
		</Box>
	);
}
