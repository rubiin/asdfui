import { Select } from "@inkjs/ui";
import { Box, useFocus, useInput } from "ink";
import React, { useEffect, useState } from "react";
import { usePluginsStore } from "../stores/plugin.store.js";
import { NotFound, Title } from "./index.js";

import { useVersionsStore } from "../stores/version.store.js";
import { getBorderColorOnFocus } from "../utils/helpers.js";
import { Loader } from "./Loader.js";

export function Versions() {
	const { isFocused } = useFocus({ id: "versions" });
	const [_value, setValue] = useState<string | undefined>();
	const currentlySelected = usePluginsStore((state) => state.currentlySelected);
	const getAllVersions = useVersionsStore((state) => state.getAlVersions);

	// for loader
	const loading = useVersionsStore((state) => state.loading);

	const versions = useVersionsStore((state) => state.versions);

	useEffect(() => {
		const fetchToolsVersionsData = async () => {
			getAllVersions(currentlySelected.label);
		};
		fetchToolsVersionsData();
	}, [currentlySelected.label]);

	useInput((input) => {
		if (isFocused) {
			if (input === "g") {
			}
		}
	});
	return (
		<Box
			borderStyle="double"
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
