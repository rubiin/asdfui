import { BorderColor } from "../types.js";

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

export function getCommandInfo(){
 return `${movementKeys} | ${selectKey} | [i]nstall | [u]nintstall  | [g]lobal | ${quitKey}`
}
