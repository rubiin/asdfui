import React from 'react'
import { Loader } from './Loader.js';
import  Select from 'ink-select-input';
import { CustomAlert } from './CustomAlert.js';
import { Item } from '../types.js';
import { CustomItem } from './CustomSelectItem.js';


interface VersionsDisplayProps{
	isOnline: boolean;
	isLocal: boolean;
	isFocused: boolean;
	pluginName: string;
	isLoading: boolean;
	versions: Item<string>[];
	setSelectedVersion: (value: Item<string>) => void;
}


export const VersionsDisplay: React.FC<VersionsDisplayProps> = ({isFocused,isOnline,isLocal,isLoading,pluginName , versions, setSelectedVersion }) => {
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
			{isOnline && !isLoading && versions.length === 0 && (
				<CustomAlert text={`No versions found for plugin ${pluginName}`} />
			)}
			{!isOnline && <CustomAlert text="No internet" variant="error" />}
	</>
	)
}
