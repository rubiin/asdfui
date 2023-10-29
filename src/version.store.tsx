import { create } from "zustand";
import { IPlugin as IVersion, getToolVersions } from "./asdf.js";

interface VersionState {
	versions: IVersion[];
	getAlVersions: (by: string) => void;
}

export const useVersionsStore = create<VersionState>()((set) => ({
	versions: [],
	getAlVersions: async (by: string) => {
		const response = await getToolVersions(by);
		set({ versions: response });
	},
}));
