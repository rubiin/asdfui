import { Box, useFocus, useInput } from "ink";
import Select from "ink-select-input";
import React, { useEffect, useState } from "react";
import { usePluginsStore } from "../stores/plugin.store.js";
import { CustomAlert, Title } from "./index.js";

import isInternetAvailable from "is-online";
import { useVersionsStore } from "../stores/version.store.js";
import { Item } from "../types.js";
import { getBorderColorOnFocus, totalNumber } from "../utils/helpers.js";
import { Loader } from "./Loader.js";

export function Versions() {
	const { isFocused } = useFocus({ id: "versions" });
	const [_selectedVersion, setSelectedVersion] = useState<Item<string>>();
	const [isOnline, setIsOnline] = useState<boolean>(true);
	const currentlySelected = usePluginsStore((state) => state.currentlySelected);
	const getAllVersions = useVersionsStore((state) => state.getAlVersions);

	// for loader
	const loading = useVersionsStore((state) => state.loading);

	const versions = useVersionsStore((state) => state.versions);

	useEffect(() => {
		const fetchToolsVersionsData = async () => {
			const value = await isInternetAvailable();
			setIsOnline(value);
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
			<Title title={totalNumber("Versions", versions.length)} color={getBorderColorOnFocus(isFocused)} />
			{isOnline && loading && <Loader text={`Fetching available ${currentlySelected.label} versions`} />}
			{isOnline && !loading && <Select limit={38} isFocused={isFocused} items={versions} onSelect={setSelectedVersion} onHighlight={setSelectedVersion} />}
			{isOnline && !loading && versions.length === 0 && (
				<CustomAlert text={`No versions found for plugin ${currentlySelected.label}`} />
			)}
			{!isOnline && <CustomAlert text="No internet" variant="error" />}

		</Box>
	);
}
