export enum BorderColor {
	FOCUSED ="green",
	UNFOCUSED ="white"
}

export enum TabName {
	PLUGINS,
	VERSIONS,
	GLOBAL
}


export interface VersionInfo{
	name: string;
	version: string;
}


export type Item<V> = {
	key?: string;
	label: string;
	value: V;
};
