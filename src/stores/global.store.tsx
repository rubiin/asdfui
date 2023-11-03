import { create } from "zustand";
import { getInfo } from "@utils/index.js";
import { VersionInfo } from "../types.js";


interface InfoState {
	versions: VersionInfo[];
	isLoading: boolean;
	getAllInfo: () => void;
}

export const useInfosStore = create<InfoState>()((set) => ({
	isLoading: false,
	versions: [],
	getAllInfo: async () => {
		set((state) => ({ isLoading: !state.isLoading}))
		const response = await getInfo();
		set({ versions: response });
		set((state) => ({ isLoading: !state.isLoading}))
	},
}));
