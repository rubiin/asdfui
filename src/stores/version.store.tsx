import { create } from "zustand";
import { listToolsVersions, listInstalledToolsVersions } from "@utils";
import { Option } from "@inkjs/ui";

interface VersionState {
	versions: Option[];
	loading: boolean;
	getAvailabeVersions: (name: string) => void;
	getInstalledVersions: (name: string) => void;
}

export const useVersionsStore = create<VersionState>()((set) => ({
	versions: [],
	loading: false,
	getAvailabeVersions: async (name: string) => {
		set((state) => ({ loading: !state.loading}))
		const response = await listToolsVersions(name);
		set({ versions: response });
		set((state) => ({ loading: !state.loading}))
	},
	getInstalledVersions: async (name: string) => {
		set((state) => ({ loading: !state.loading}))
		const response = await listInstalledToolsVersions(name);
		set({ versions: response });
		set((state) => ({ loading: !state.loading}))
	}
}));
