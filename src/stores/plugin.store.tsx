import { create } from "zustand";
import  {listtAllPlugins } from "@utils/index.js";
import { Option } from "@inkjs/ui";

interface PluginState {
	plugins: Option[];
	isLoading: boolean;
	currentlySelected: Option;
	getAllLocalPlugins: () => void;
	selectPlugin: (plugin: Option) => void;
}

export const usePluginsStore = create<PluginState>()((set) => ({
	plugins: [],
	isLoading: false,
	currentlySelected: {
		value: "",
		label: "",
	},
	selectPlugin: (plugin) => set({ currentlySelected: plugin }),
	getAllLocalPlugins: async () => {
		set((state) => ({ isLoading: !state.isLoading}))
		const response = await listtAllPlugins();
		set({ plugins: response });
		set({ currentlySelected: response.length > 0 ? response[0] :
			{
				value: "",
				label: "",
			},
		});
		set((state) => ({ isLoading: !state.isLoading}))
	}
}));
