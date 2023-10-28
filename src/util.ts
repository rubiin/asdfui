import {$} from 'execa';

export interface IPlugin{
	label: string
	value: string
}

export const getBorderColorOnFocus = (isFocused: boolean) => (isFocused ? "blue" : "green");

function formatPluginData(data: string) {
return data.split("\n").map((element)=>({
	label: element,
	value: element,
}))
}


export const getAllPlugins = async(): Promise<IPlugin[]> => {
	const {stdout} = await $`asdf plugin list`;
	return formatPluginData(stdout)
}

export const getPluginVersions = async(name: string): Promise<IPlugin[]> => {
	const {stdout} = await $`asdf list all ${name}`;
	return formatPluginData(stdout)
}


