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



export const getGlobalToolVersions = async (): Promise<any> => {
	try {
		const { stdout } = await $`asdf list current`;
		const text = stdout.trim()

		const lines = text.trim().split('\n');
		const extractedFields = lines.map(line => {
			const fields = line.trim().split(/\s+/);
			if (fields.length >= 2) {
				return {name:fields[0], version: fields[1]};
			}
			return null; // Handle lines with fewer than 2 fields
		});
		return extractedFields
	} catch (error) {
		return [];
	}
};
