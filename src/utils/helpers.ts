import { BorderColor } from "../types.js";

export const getBorderColorOnFocus = (isFocused: boolean) => (isFocused ? BorderColor.FOCUSED: BorderColor.UNFOCUSED);

export function formatPluginData(data: string) {
	return data.split("\n").map((element) => ({
		label: element,
		value: element,
	}));
}
