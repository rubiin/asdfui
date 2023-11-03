import { create } from "zustand";
import  {listtAllPlugins } from "@utils";
import { Option } from "@inkjs/ui";

interface PluginState {
	plugins: Option[];
	loading: boolean;
	currentlySelected: Option;
	getAllLocalPlugins: () => void;
	selectPlugin: (plugin: Option) => void;
}

export const usePluginsStore = create<PluginState>()((set) => ({
	plugins: [],
	loading: false,
	currentlySelected: {
		value: "",
		label: "",
	},
	selectPlugin: (plugin) => set({ currentlySelected: plugin }),
	getAllLocalPlugins: async () => {
		set((state) => ({ loading: !state.loading}))
		const response = await listtAllPlugins();
		set({ plugins: response });
		set({ currentlySelected: response.length > 0 ? response[0] :
			{
				value: "",
				label: "",
			},
		});
		set((state) => ({ loading: !state.loading}))
	}
}));
