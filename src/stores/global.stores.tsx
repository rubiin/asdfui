import { create } from "zustand";
import { getGlobalToolVersions } from "../utils/asdf.js";
import { GlobalVersions } from "../types.js";


interface GlobalVersionsState {
	versions: GlobalVersions[];
	getAllGlobalVersions: () => void;
	loading: boolean,
}

export const useGlobalsStore = create<GlobalVersionsState>()((set) => ({
	loading: false,

	versions: [],
	getAllGlobalVersions: async () => {
		set((state) => ({ loading: !state.loading}))
		const response = await getGlobalToolVersions();
		set({ versions: response });
		set((state) => ({ loading: !state.loading}))
	},
}));
