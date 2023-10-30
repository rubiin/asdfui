import { create } from "zustand";
import  {getAllPlugins } from "../utils/asdf.js";
import { Option } from "@inkjs/ui";

interface PluginState {
	plugins: Option[];
	currentlySelected: Option;
	getAllLocalPlugins: () => void;
	selectPlugin: (plugin: Option) => void;
	loading: boolean;
}

export const usePluginsStore = create<PluginState>()((set) => ({
	plugins: [],
	currentlySelected: {
		value: "",
		label: "",
	},
	selectPlugin: (plugin) => set({ currentlySelected: plugin }),
	getAllLocalPlugins: async () => {
		set((state) => ({ loading: !state.loading}))
		const response = await getAllPlugins();
		set({ plugins: response });
		set({ currentlySelected: response.length > 0 ? response[0] :
			{
				value: "",
				label: "",
			},
		});
		set((state) => ({ loading: !state.loading}))
	},
	loading: false
}));
