import { create } from "zustand";
import { IPlugin, getAllPlugins } from "./asdf.js";

interface PluginState {
	plugins: IPlugin[];
	currentlySelected: IPlugin;
	getAllLocalPlugins: () => void;
	selectPlugin: (plugin: IPlugin) => void;
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
