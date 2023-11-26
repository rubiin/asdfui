import { Title } from "@components/index.js";
import { Box, useFocus, useInput } from "ink";
import React, { useEffect, useState } from "react";

import { VersionsDisplay } from "@components/index.js";
import { useInfosStore, usePluginsStore, useVersionsStore } from "@stores/index.js";
import {
	Item,
	Keys,
	getBorderColorOnFocus,
	installToolVersion,
	setVersionGlobal,
	totalNumber,
	uninstallToolVersion,
} from "@utils/index.js";
import isInternetAvailable from "is-online";

export function Versions() {
	const { isFocused } = useFocus({ id: "versions" });
	const [selectedVersion, setSelectedVersion] = useState<Item<string>>();
	const [isOnline, setIsOnline] = useState<boolean>(true);
	const [isLocal, setIsLocal] = useState<boolean>(true);
	const [showSuccessMsg, setShowSuccessMsg] = useState<boolean>(true);
	const [showErrorMsg, setShowErrorMsg] = useState<boolean>(true);
	const currentlySelected = usePluginsStore((state) => state.currentlySelected);
	const getAvailabeVersions = useVersionsStore((state) => state.getAvailabeVersions);
	const getInstalledVersions = useVersionsStore((state) => state.getInstalledVersions);
	const getAllInfo = useInfosStore((state) => state.getAllInfo);

	const handleSelectedState = (item: Item<string>) => {
		setSelectedVersion(item);
	};

	const toggleMessage = (type: "error" | "success") => {
		type === "error"? setShowErrorMsg(!showErrorMsg): setShowSuccessMsg(!showSuccessMsg)
		setTimeout(() => {
			type === "error"? setShowErrorMsg(!showErrorMsg): setShowSuccessMsg(!showSuccessMsg)
		}, 1500);
	}

	// for loader
	const isLoading = useVersionsStore((state) => state.isLoading);

	const availableVersions = useVersionsStore((state) => state.availableVersions);
	const installedVersions = useVersionsStore((state) => state.installedVersions);

	useEffect(() => {
		const fetchToolsVersionsData = async () => {
			const value = await isInternetAvailable();
			setIsOnline(value);
			getAvailabeVersions(currentlySelected.label);
			setSelectedVersion(availableVersions[0] ?? undefined);
		};

		const fetchLocalToolsVersionsData = async () => {
			getInstalledVersions(currentlySelected.label);
			setSelectedVersion(availableVersions[0] ?? undefined);
		};

		// TODO: set first version as selected version (BUG)
		// TODO: show message after operation success

		if (!isLocal) {
			fetchToolsVersionsData();
		} else {
			fetchLocalToolsVersionsData();
		}
	}, [currentlySelected.label, isLocal]);

	useInput(async (input) => {
		if (isFocused) {
			switch (input) {
				case Keys.INSTALL: {
					await installToolVersion({ name: currentlySelected.label, version: selectedVersion!.value })
						.then(async () => {
							await Promise.all([getAllInfo(), getInstalledVersions(currentlySelected.label)]);
							setIsLocal(true);
							toggleMessage("success");
						})
						.catch((_e) => {
							toggleMessage("error");
						});
					break;
				}

				case Keys.UNINSTALL: {
					await uninstallToolVersion({ name: currentlySelected.label, version: selectedVersion!.value })
						.then(async () => {
							await Promise.all([getAllInfo(), getInstalledVersions(currentlySelected.label)]);
							toggleMessage("success");
						})
						.catch((_e) => {
							toggleMessage("error");
						});
					break;
				}

				case Keys.GLOBAL: {
					await setVersionGlobal({ name: currentlySelected.label, version: selectedVersion!.value })
						.then(async () => {
							await Promise.all([getAllInfo(), getInstalledVersions(currentlySelected.label)]);
							toggleMessage("success");
						})
						.catch((_e) => {
							toggleMessage("error");
						});
					break;
				}
				case Keys.TOGGLE: {
					setIsLocal(!isLocal);
					break;
				}
				default:
				// noop
			}
		}
	});

	return (
		<Box
			borderStyle="double"
			flexDirection="column"
			borderColor={getBorderColorOnFocus(isFocused)}
			width="70%"
			minHeight={20}
			paddingLeft={4}
		>
			<Title
				label={totalNumber(
					"Versions",
					installedVersions.length,
					availableVersions.length > 0 ? availableVersions.length : "-",
				)}
				color={getBorderColorOnFocus(isFocused)}
			/>

			<VersionsDisplay
				setSelectedVersion={handleSelectedState}
				isOnline={isOnline}
				isFocused={isFocused}
				isLoading={isLoading}
				showSuccessMsg={showSuccessMsg}
				showErrorMsg={showErrorMsg}
				isLocal={isLocal}
				versions={isLocal ? installedVersions : availableVersions}
				pluginName={currentlySelected.label}
			/>
		</Box>
	);
}
