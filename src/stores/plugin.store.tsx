import { create } from "zustand";
import { listAllPlugins } from "@utils/index.js";
import { Option } from "@inkjs/ui";

interface PluginState {
	plugins: Option[];
	isLoading: boolean;
	currentlySelected: Option;
	getAllLocalPlugins: () => void;
	selectPlugin: (plugin: Option) => void;
}

const emptySelection = {
	value: "",
	label: "",
};

export const usePluginsStore = create<PluginState>()((set) => ({
	plugins: [],
	isLoading: false,
	currentlySelected: emptySelection,
	selectPlugin: (plugin) => set({ currentlySelected: plugin }),
	getAllLocalPlugins: async () => {
		set((state) => ({ isLoading: !state.isLoading }));
		const response = await listAllPlugins();
		set({ plugins: response });
		set({ currentlySelected: response.length > 0 ? response[0] : emptySelection });
		set((state) => ({ isLoading: !state.isLoading }));
	},
}));
