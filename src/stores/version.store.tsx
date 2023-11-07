import { Option } from "@inkjs/ui";
import { listInstalledToolsVersions, listToolsVersions } from "@utils/index.js";
import { create } from "zustand";

interface VersionState {
	availableVersions: Option[];
	installedVersions: Option[];
	isLoading: boolean;
	getAvailabeVersions: (name: string) => void;
	getInstalledVersions: (name: string) => void;
}

export const useVersionsStore = create<VersionState>()((set) => ({
	availableVersions: [],
	installedVersions: [],
	isLoading: false,
	getAvailabeVersions: async (name: string) => {
		set((state) => ({ isLoading: !state.isLoading }));
		const response = await listToolsVersions(name);
		set({ availableVersions: response });
		set((state) => ({ isLoading: !state.isLoading }));
	},
	getInstalledVersions: async (name: string) => {
		set((state) => ({ isLoading: !state.isLoading }));
		const response = await listInstalledToolsVersions(name);
		set({ installedVersions: response });
		set((state) => ({ isLoading: !state.isLoading }));
	},
}));
