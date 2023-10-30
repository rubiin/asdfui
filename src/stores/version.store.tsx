import { create } from "zustand";
import { getToolVersions } from "../utils/asdf.js";
import { Option } from "@inkjs/ui";

interface VersionState {
	versions: Option[];
	getAlVersions: (name: string) => void;
	loading: boolean;
}

export const useVersionsStore = create<VersionState>()((set) => ({
	versions: [],
	getAlVersions: async (name: string) => {
		set((state) => ({ loading: !state.loading}))
		const response = await getToolVersions(name);
		set({ versions: response });
		set((state) => ({ loading: !state.loading}))
	},
	loading: false
}));
