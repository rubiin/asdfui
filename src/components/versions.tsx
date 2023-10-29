import { Select } from "@inkjs/ui";
import { Box, useFocus, useInput } from "ink";
import React, { useEffect, useState } from "react";
import { IPlugin, getBorderColorOnFocus, getToolVersions } from "../asdf.js";
import { usePluginsStore } from "../plugin.store.js";
import Title from "./title.js";

export function Versions() {
	const { isFocused } = useFocus({ id: "versions" });
	const [_value, setValue] = useState<string | undefined>();
	const currentlySelected = usePluginsStore((state) => state.currentlySelected);

	const [versions, setVersions] = useState<IPlugin[]>([]);

	useEffect(() => {
		// declare the data fetching function
		const fetchToolsVersionsData = async () => {
			const data = await getToolVersions(currentlySelected.label);
			setVersions(data);
		};

		// call the function
		fetchToolsVersionsData();
	}, [currentlySelected.label]);

	useInput((input) => {
		if (isFocused) {
			if (input === "g") {
				setValue("global");
			}

			if (input === "u") {
				setValue("uninstall");
			}

			if (input === "i") {
				setValue("install");
			}
		}
	});
	return (
		<Box
			borderStyle="round"
			borderColor={getBorderColorOnFocus(isFocused)}
			flexDirection="column"
			width="70%"
			minHeight={20}
			paddingLeft={4}
		>
			<Title title="Versions" color={getBorderColorOnFocus(isFocused)} />
			<Select isDisabled={!isFocused} visibleOptionCount={20} options={versions} onChange={setValue} />
		</Box>
	);
}
