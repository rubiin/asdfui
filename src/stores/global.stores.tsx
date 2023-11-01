import { create } from "zustand";
import { getInfo } from "../utils/asdf.js";
import { Info } from "../types.js";


interface InfoState {
	versions: Info[];
	getAllInfo: () => void;
	loading: boolean,
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
