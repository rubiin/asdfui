export enum BorderColor {
	FOCUSED ="green",
	UNFOCUSED ="white"
}

export enum TabName {
	PLUGINS,
	VERSIONS,
	GLOBAL
}


export interface Info{
	name: string;
	version: string;
}
