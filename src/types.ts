export enum BorderColor {
	FOCUSED ="green",
	UNFOCUSED ="white"
}

export enum TabName {
	PLUGINS,
	VERSIONS,
	GLOBAL
}


export interface GlobalVersions{
	name: string;
	version: string;
}
