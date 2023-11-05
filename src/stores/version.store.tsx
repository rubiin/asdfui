import { create } from "zustand";
import { listToolsVersions, listInstalledToolsVersions } from "@utils/index.js";
import { Option } from "@inkjs/ui";

interface VersionState {
	versions: Option[];
	isLoading: boolean;
	getAvailabeVersions: (name: string) => void;
	getInstalledVersions: (name: string) => void;
}

export const useVersionsStore = create<VersionState>()((set) => ({
	versions: [],
	isLoading: false,
	getAvailabeVersions: async (name: string) => {
		set((state) => ({ isLoading: !state.isLoading }));
		const response = await listToolsVersions(name);
		set({ versions: response });
		set((state) => ({ isLoading: !state.isLoading }));
	},
	getInstalledVersions: async (name: string) => {
		set((state) => ({ isLoading: !state.isLoading }));
		const response = await listInstalledToolsVersions(name);
		set({ versions: response });
		set((state) => ({ isLoading: !state.isLoading }));
	},
}));
