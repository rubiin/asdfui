import Select from "ink-select-input";
import React from "react";
import { Item } from "@utils/index.js";
import { CustomAlert , CustomItem, Loader} from "./index.js";


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
			{!isOnline && !isLoading && <CustomAlert label="No internet" variant="error" />}
		</>
	);
};
