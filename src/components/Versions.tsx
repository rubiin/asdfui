import { Option, Select } from "@inkjs/ui";
import { Box, useFocus, useInput } from "ink";
import React, { useEffect, useState } from "react";
import { usePluginsStore } from "../stores/plugin.store.js";
import { getToolVersions } from "../utils/asdf.js";
import { NotFound, Title } from "./index.js";

import { getBorderColorOnFocus } from "../utils/helpers.js";
import { Loader } from "./Loader.js";

export function Versions() {
	const { isFocused } = useFocus({ id: "versions" });
	const [_value, setValue] = useState<string | undefined>();
	const [loading, setLoading] = useState(false);
	const currentlySelected = usePluginsStore((state) => state.currentlySelected);

	const [versions, setVersions] = useState<Option[]>([]);

	useEffect(() => {
		// declare the data fetching function
		setLoading(true);
		const fetchToolsVersionsData = async () => {



			const data = await getToolVersions(currentlySelected.label);
			setVersions(data);
			setLoading(false);
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
			{loading && <Loader text={`Fetching available ${currentlySelected.label} versions`} />}
			{!loading && <Select isDisabled={!isFocused} visibleOptionCount={20} options={versions} onChange={setValue} />}
			{!loading && versions.length === 0 && <NotFound text={`No versions found for plugin ${currentlySelected.label}`}/>}
		</Box>
	);
}
