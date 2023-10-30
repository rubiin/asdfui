import { $ } from "execa";

import { Option } from "@inkjs/ui";
import { formatPluginData } from "./helpers.js";

export const getAllPlugins = async (): Promise<Option[]> => {
	try {
		const { stdout } = await $`asdf plugin list`;
		return formatPluginData(stdout);
	} catch (error) {
		return [];
	}
};

export const getToolVersions = async (name: string): Promise<Option[]> => {
	try {
		const { stdout } = await $`asdf list all ${name}`;
		return formatPluginData(stdout).reverse();
	} catch (error) {
		return [];
	}
};

export const installToolVersion = async (name: string, version: string): Promise<boolean> => {
	await $`asdf install ${name} ${version}`;
	return true;
};

export const unInstallToolVersion = async (name: string, version: string): Promise<boolean> => {
	await $`asdf uninstall ${name} ${version}`;
	return true;
};
