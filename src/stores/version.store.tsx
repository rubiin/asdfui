import { create } from "zustand";
import { getToolVersions } from "../utils/asdf.js";
import { Option } from "@inkjs/ui";

interface VersionState {
	versions: Option[];
	getAlVersions: (by: string) => void;
}

export const useVersionsStore = create<VersionState>()((set) => ({
	versions: [],
	getAlVersions: async (by: string) => {
		const response = await getToolVersions(by);
		set({ versions: response });
	},
}));
