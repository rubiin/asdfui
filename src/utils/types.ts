export enum BorderColor {
	FOCUSED = "green",
	UNFOCUSED = "white",
}

export enum Keys {
	QUIT = "q",
	INSTALL = "i",
	UNINSTALL = "u",
	GLOBAL = "g",
	TOGGLE = "a",
}

export enum TabName {
	PLUGINS,
	VERSIONS,
	GLOBAL,
}

export interface VersionInfo {
	name: string;
	version: string;
}

export type Item<V> = {
	key?: string;
	label: string;
	value: V;
};

export interface GenericTextProp {
	label: string;
}
