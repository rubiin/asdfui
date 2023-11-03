import { create } from "zustand";
import { getInfo } from "@utils";
import { VersionInfo } from "../types.js";


interface InfoState {
	versions: VersionInfo[];
	loading: boolean;
	getAllInfo: () => void;
}

export const useInfosStore = create<InfoState>()((set) => ({
	loading: false,
	versions: [],
	getAllInfo: async () => {
		set((state) => ({ loading: !state.loading}))
		const response = await getInfo();
		set({ versions: response });
		set((state) => ({ loading: !state.loading}))
	},
}));
