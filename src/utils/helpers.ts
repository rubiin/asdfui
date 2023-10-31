import { BorderColor, TabName } from "../types.js";

export const getBorderColorOnFocus = (isFocused: boolean) => (isFocused ? BorderColor.FOCUSED: BorderColor.UNFOCUSED);

export function formatPluginData(data: string) {
	return data.trim().split("\n").map((element) => ({
		label: element,
		value: element,
	}));
}

const movementKeys = "[↑/↓] movement"
const selectKey = "[↵] select"
const quitKey = "[q]uit"

export function totalNumber(start:string, total: number)
{
	 return `${start} (${total})`
}

export function getCommandInfo(tabName: TabName){
	switch(tabName){
		case TabName.PLUGINS:
			return `${movementKeys} | ${selectKey} | ${quitKey}`
		case TabName.GLOBAL:
			return `${movementKeys} | ${selectKey} | ${quitKey}`
		case TabName.VERSIONS:
			return `${movementKeys} | ${selectKey} | [i]nstall | [u]nintstall  | [g]lobal | ${quitKey}`
		default:
			return `${movementKeys} | ${selectKey} | ${quitKey}`

	}
}
