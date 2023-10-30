import { create } from "zustand";
import  {getAllPlugins } from "../utils/asdf.js";
import { Option } from "@inkjs/ui";

interface PluginState {
	plugins: Option[];
	currentlySelected: Option;
	getAllLocalPlugins: () => void;
	selectPlugin: (plugin: Option) => void;
}

export const usePluginsStore = create<PluginState>()((set) => ({
	plugins: [],
	currentlySelected: {
		value: "golang",
		label: "golang",
	},
	selectPlugin: (plugin) => set({ currentlySelected: plugin }),
	getAllLocalPlugins: async () => {
		const response = await getAllPlugins();
		set({ plugins: response });
		set({ currentlySelected: response[2] });
	},
}));
