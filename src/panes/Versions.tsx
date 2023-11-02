import { Box, useFocus, useInput, useStdout } from "ink";
import Select from "ink-select-input";
import React, { useEffect, useState } from "react";
import { usePluginsStore } from "../stores/plugin.store.js";
import { CustomAlert, CustomItem, Title } from "../components/index.js";

import isInternetAvailable from "is-online";
import { useInfosStore } from "../stores/global.stores.js";
import { useVersionsStore } from "../stores/version.store.js";
import { Item } from "../types.js";
import { installToolVersion, uninstallToolVersion } from "../utils/asdf.js";
import { getBorderColorOnFocus, totalNumber } from "../utils/helpers.js";
import { Loader } from "../components/Loader.js";

export function Versions() {
	const { isFocused } = useFocus({ id: "versions" });
	const {write} = useStdout()
	const [selectedVersion, setSelectedVersion] = useState<Item<string>>();
	const [isOnline, setIsOnline] = useState<boolean>(true);
	const [isLocal, setIsLocal] = useState<boolean>(true);
	const currentlySelected = usePluginsStore((state) => state.currentlySelected);
	const getAvailabeVersions = useVersionsStore((state) => state.getAvailabeVersions);
	const getInstalledVersions = useVersionsStore((state) => state.getInstalledVersions);
	const getAllInfo = useInfosStore((state) => state.getAllInfo);

	// for loader
	const loading = useVersionsStore((state) => state.loading);

	const versions = useVersionsStore((state) => state.versions);

	useEffect(() => {
		const fetchToolsVersionsData = async () => {
			write("online "+currentlySelected.label)
			const value = await isInternetAvailable();
			setIsOnline(value);
			getAvailabeVersions(currentlySelected.label);
		};

		if(!isLocal){
			fetchToolsVersionsData();
		}


	}, [currentlySelected.label, isLocal]);


	useEffect(() => {

		const fetchLocalToolsVersionsData = async () => {
			write("online "+currentlySelected.label)
			getInstalledVersions(currentlySelected.label);
		};

			if(isLocal){
				fetchLocalToolsVersionsData()
			}


	}, [currentlySelected.label, isLocal]);






	useInput(async (input) => {
		if (isFocused) {
			if (input === "i") {
				await installToolVersion({ name: currentlySelected.label, version: selectedVersion!.value })
				.then(
					() => {
						getAllInfo();
						getAvailabeVersions(currentlySelected.label)
					}
				);
			}

			if (input === "a") {
				 setIsLocal(!isLocal)
			}

			if (input === "u") {
				await uninstallToolVersion({ name: currentlySelected.label, version: selectedVersion!.value });
				getAllInfo();
				getAvailabeVersions(currentlySelected.label);
			}

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
			{isOnline && !loading && (
				<Select
					limit={38}
					isFocused={isFocused}
					items={versions}
					onHighlight={setSelectedVersion}
					itemComponent={CustomItem}
				/>
			)}
			{isOnline && !loading && versions.length === 0 && (
				<CustomAlert text={`No versions found for plugin ${currentlySelected.label}`} />
			)}
			{!isOnline && <CustomAlert text="No internet" variant="error" />}
		</Box>
	);
}


