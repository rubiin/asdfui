import { create } from "zustand";
import { getGlobalToolVersions } from "../utils/asdf.js";
import { GlobalVersions } from "../types.js";


interface GlobalState {
	versions: GlobalVersions[];
	getAllGlobals: (by: string) => void;
	loading: boolean,
}

export const useVersionsStore = create<GlobalState>()((set) => ({
	loading: false,

	versions: [],
	getAllGlobals: async () => {
		set((state) => ({ loading: !state.loading}))
		const response = await getGlobalToolVersions();
		set({ versions: response });
		set((state) => ({ loading: !state.loading}))
	},
}));
