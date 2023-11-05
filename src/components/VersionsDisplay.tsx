import Select from "ink-select-input";
import React from "react";
import { Item } from "../types.js";
import { CustomAlert } from "./CustomAlert.js";
import { CustomItem } from "./CustomSelectItem.js";
import { Loader } from "./Loader.js";

interface VersionsDisplayProps {
	isOnline: boolean;
	isLocal: boolean;
	isFocused: boolean;
	pluginName: string;
	isLoading: boolean;
	versions: Item<string>[];
	setSelectedVersion: (value: Item<string>) => void;
}

export const VersionsDisplay: React.FC<VersionsDisplayProps> = ({
	isFocused,
	isOnline,
	isLocal,
	isLoading,
	pluginName,
	versions,
	setSelectedVersion,
}) => {
	return (
		<>
			{!isLocal && isOnline && isLoading && <Loader text={`Fetching available ${pluginName} versions`} />}
			{isOnline && !isLoading && (
				<Select
					limit={38}
					isFocused={isFocused}
					items={versions}
					onHighlight={setSelectedVersion}
					itemComponent={CustomItem}
				/>
			)}
			{!isLoading && versions.length === 0 && <CustomAlert text={`No versions found for plugin ${pluginName}`} />}
			{!isOnline && !isLoading && <CustomAlert text="No internet" variant="error" />}
		</>
	);
};
