import { Title } from "@components/index.js";
import { Box, useFocus, useInput } from "ink";
import React, { useEffect, useState } from "react";

import { VersionsDisplay } from "@components/VersionsDisplay.js";
import { useInfosStore, usePluginsStore, useVersionsStore } from "@stores/index.js";
import {
	getBorderColorOnFocus,
	installToolVersion,
	setVersionGlobal,
	totalNumber,
	uninstallToolVersion,
} from "@utils/index.js";
import isInternetAvailable from "is-online";
import { Item } from "../types.js";

export function Versions() {
	const { isFocused } = useFocus({ id: "versions" });
	const [selectedVersion, setSelectedVersion] = useState<Item<string>>();
	const [isOnline, setIsOnline] = useState<boolean>(true);
	const [isLocal, setIsLocal] = useState<boolean>(true);
	const currentlySelected = usePluginsStore((state) => state.currentlySelected);
	const getAvailabeVersions = useVersionsStore((state) => state.getAvailabeVersions);
	const getInstalledVersions = useVersionsStore((state) => state.getInstalledVersions);
	const getAllInfo = useInfosStore((state) => state.getAllInfo);

	function handleState(item: Item<string>) {
		setSelectedVersion(item);
	}

	// for loader
	const isLoading = useVersionsStore((state) => state.isLoading);

	const versions = useVersionsStore((state) => state.versions);

	useEffect(() => {
		const fetchToolsVersionsData = async () => {
			const value = await isInternetAvailable();
			setIsOnline(value);
			getAvailabeVersions(currentlySelected.label);
		};

		const fetchLocalToolsVersionsData = async () => {
			getInstalledVersions(currentlySelected.label);
		};

		if (!isLocal) {
			fetchToolsVersionsData();
		} else {
			fetchLocalToolsVersionsData();
		}
	}, [currentlySelected.label, isLocal]);

	useInput(async (input) => {
		if (isFocused) {
			if (input === "i") {
				await installToolVersion({ name: currentlySelected.label, version: selectedVersion!.value }).then(() => {
					getAllInfo();
					getAvailabeVersions(currentlySelected.label);
				});
			}

			if (input === "a") {
				setIsLocal(!isLocal);
			}

			if (input === "u") {
				await uninstallToolVersion({ name: currentlySelected.label, version: selectedVersion!.value });
				getAllInfo();
				getAvailabeVersions(currentlySelected.label);
			}

			if (input === "g") {
				await setVersionGlobal({ name: currentlySelected.label, version: selectedVersion!.value });
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
			<Title label={totalNumber("Versions", versions.length)} color={getBorderColorOnFocus(isFocused)} />

			<VersionsDisplay
				setSelectedVersion={handleState}
				isOnline={isOnline}
				isFocused={isFocused}
				isLoading={isLoading}
				isLocal={isLocal}
				versions={versions}
				pluginName={currentlySelected.label}
			/>
		</Box>
	);
}
