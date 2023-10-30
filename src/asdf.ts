import { $ } from "execa";

import { Option } from "@inkjs/ui";

export const getBorderColorOnFocus = (isFocused: boolean) => (isFocused ? "green" : "white");

function formatPluginData(data: string) {
	return data.split("\n").map((element) => ({
		label: element,
		value: element,
	}));
}

export const getAllPlugins = async (): Promise<Option[]> => {
	const { stdout } = await $`asdf plugin list`;
	return formatPluginData(stdout);
};

export const getToolVersions = async (name: string): Promise<Option[]> => {
	const { stdout } = await $`asdf list all ${name}`;
	return formatPluginData(stdout).reverse();
};

export const installToolVersion = async (name: string, version: string): Promise<boolean> => {
	await $`asdf install ${name} ${version}`;
	return true;
};

export const unInstallToolVersion = async (name: string, version: string): Promise<boolean> => {
	await $`asdf uninstall ${name} ${version}`;
	return true;
};
