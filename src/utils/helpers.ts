import { BorderColor } from "../types.js";

export const getBorderColorOnFocus = (isFocused: boolean) => (isFocused ? BorderColor.FOCUSED: BorderColor.UNFOCUSED);

export function formatPluginData(data: string) {
	return data.trim().split("\n").map((element) => ({
		label: element,
		value: element,
	}));
}

export function totalNumber(start:string, total: number)
{
	 return `${start} (${total})`
}
