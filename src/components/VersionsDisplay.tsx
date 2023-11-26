import Select from "ink-select-input";
import React from "react";
import { Item } from "@utils/index.js";
import { CustomAlert, CustomItem, Loader } from "./index.js";

interface VersionsDisplayProps {
	isFocused: boolean;
	isLocal: boolean;
	isLoading: boolean;
	isOnline: boolean;
	showErrorMsg: boolean;
	showSuccessMsg: boolean;
	pluginName: string;
	versions: Item<string>[];
	setSelectedVersion: (value: Item<string>) => void;
}

export const VersionsDisplay: React.FC<VersionsDisplayProps> = ({
	isFocused,
	isOnline,
	isLocal,
	isLoading,
	pluginName,
	showSuccessMsg,
	showErrorMsg,
	versions,
	setSelectedVersion,
}) => {
	return (
		<>
			{!isLocal && isOnline && isLoading && <Loader label={`Fetching available ${pluginName} versions`} />}
			{isOnline && !isLoading && versions.length > 0 && (
				<Select
					limit={38}
					isFocused={isFocused}
					items={versions}
					onHighlight={setSelectedVersion}
					itemComponent={CustomItem}
				/>
			)}
			{!isLoading && versions.length === 0 && <CustomAlert label={`No versions found for plugin ${pluginName}`} />}
			{!showErrorMsg && <CustomAlert label="Operation failed" variant="error" />}
			{!showSuccessMsg && <CustomAlert label="Operation successful" variant="success" />}
			{!isOnline && !isLoading && <CustomAlert label="No internet" variant="error" />}
		</>
	);
};
