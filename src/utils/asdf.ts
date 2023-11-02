import { $ } from "execa";

import { Option } from "@inkjs/ui";
import { formatPluginData, sanitizeData } from "./helpers.js";
import { VersionInfo } from "../types.js";

export const listtAllPlugins = async (): Promise<Option[]> => {
	try {
		const { stdout } = await $`asdf plugin list`;
		const sanitizedData = sanitizeData(stdout)
		return formatPluginData(sanitizedData);
	} catch (error) {
		return [];
	}
};

export const listToolsVersions = async (name: string): Promise<Option[]> => {
	try {
		const { stdout } = await $`asdf list all ${name}`;
		const sanitizedData = sanitizeData(stdout)
		return formatPluginData(sanitizedData).reverse();
	} catch (error) {
		return [];
	}
};

export const installToolVersion = async ({ name, version }: VersionInfo): Promise<boolean> => {
	try {
		await $`asdf install ${name} ${version}`;
		return true;
	} catch (error) {
		return false;
	}
};

export const uninstallToolVersion = async ({ name, version }: VersionInfo): Promise<boolean> => {
	try {
		await $`asdf uninstall ${name} ${version}`;

		return true;
	} catch (error) {
		return false;
	}
};

export const getInfo = async (): Promise<VersionInfo[]> => {
	try {
		const { stdout } = await $`asdf current`;
		const text = stdout.trim();

		const lines = sanitizeData(text);
		const extractedFields = lines.map((line) => {
			const fields = line.trim().split(/\s+/);
			return { name: fields[0]!, version: fields[1]! };
		});
		return extractedFields;
	} catch (error) {
		return [];
	}
};

export const checkIfVersionInstalled = () =>{

}



export const listInstalledToolsVersions = async(name: string) =>{
	try {
		const {stdout} = await $`asdf list ${name}`;
		const sanitizedData = sanitizeData(stdout)
		return formatPluginData(sanitizedData.map(value=> value.trim().replace("*","")));

	} catch (error) {
		return [];
	}
}
