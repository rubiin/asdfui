import { Select } from "@inkjs/ui";
import { Box, useFocus, useInput } from "ink";
import React, { useEffect, useState } from "react";
import { getBorderColorOnFocus, getToolVersions } from "../asdf.js";
import { usePluginsStore } from "../stores/plugin.store.js";
import Title from "./Title.js";
import { Option } from "@inkjs/ui";

import { Loader } from "./Loader.js";

export function Versions() {
	const { isFocused } = useFocus({ id: "versions" });
	const [_value, setValue] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
	const currentlySelected = usePluginsStore((state) => state.currentlySelected);

	const [versions, setVersions] = useState<Option[]>([]);

	useEffect(() => {
		// declare the data fetching function
		setLoading(true)
		const fetchToolsVersionsData = async () => {
			const data = await getToolVersions(currentlySelected.label);
			setVersions(data);
			setLoading(false)
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
			{loading && <Loader text={`Fetching available ${currentlySelected.label} versions`}/>}
			<Select isDisabled={!isFocused} visibleOptionCount={20} options={versions} onChange={setValue} />
		</Box>
	);
}
