import { $ } from "execa";

import { Option } from "@inkjs/ui";
import { formatPluginData, sanitizeData } from "./helpers.js";
import { VersionInfo } from "../types.js";
import fs from "node:fs";
import os from "node:os";
import readLine from "node:readline";

export const listAllPlugins = async (): Promise<Option[]> => {
	try {
		const { stdout } = await $`asdf plugin list`;
		const sanitizedData = sanitizeData(stdout);
		return formatPluginData(sanitizedData);
	} catch (error) {
		return [];
	}
};

export const listToolsVersions = async (name: string): Promise<Option[]> => {
	try {
		const { stdout } = await $`asdf list all ${name}`;
		const sanitizedData = sanitizeData(stdout);
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

		await $`asdf uninstall ${name} ${version.replace("🌎","").trim()}`;

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

export const setVersionGlobal = async ({ name, version }: VersionInfo): Promise<boolean> => {
	try {
		await $`asdf global ${name} ${version}`;

		return true;
	} catch (error) {
		return false;
	}
};

export const listInstalledToolsVersions = async (name: string) => {
	// otherwise asdf returns all plugins
	if (name === "") {
		return [];
	}

	try {
		const { stdout } = await $`asdf list ${name}`;
		if (stdout === "") return [];
		const sanitizedData = sanitizeData(stdout);
		const values = formatPluginData(
			sanitizedData.map((value) => {
				value = value.trim();
				if (value.startsWith("*")) {
					value = value.replace("*", "") + " 🌎";
				}

				return value;
			}),
		).reverse();

		return values;
	} catch (error) {
		return [];
	}
};

export async function getGlobalVersionForTool(searchTerm: string) {
	const filePath = `${os.homedir()}/.tool-versions`;
	return new Promise((resolve, reject) => {
		let result: unknown = undefined;

		let lineReader = readLine.createInterface({
			input: fs.createReadStream(filePath),
		});

		lineReader.on("line", function (line: string) {
			if (line.includes(searchTerm)) {
				result = line.split(" ")[1]!;
			}
		});

		// Wait for close/error event and resolve/reject
		lineReader.on("close", () => resolve(result));
		lineReader.on("error", reject);
	});
}
