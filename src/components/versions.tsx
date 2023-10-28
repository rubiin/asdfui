import { Select } from "@inkjs/ui";
import { Text, Box, useFocus, useInput } from "ink";
import React, { useState } from "react";
import { getBorderColorOnFocus } from "../asdf.js";
import Title from "./title.js";

export function Versions() {
	const { isFocused } = useFocus({ id: "version" });
	const [value, setValue] = useState<string | undefined>();

	const options = [
		{
			label: "Red",

			value: "red",
		},
		{
			label: "Green",
			value: "green",
		},
		{
			label: "Yellow",
			value: "yellow",
		},
		{
			label: "Blue",
			value: "blue",
		},
		{
			label: "Magenta",
			value: "magenta",
		},
		{
			label: "Cyan",
			value: "cyan",
		},
		{
			label: "White",
			value: "white",
		},
		{
			label: "Black",
			value: "Black",
		},
	]

	useInput((input) => {
		if (isFocused) {
			if (input === "g") {
				setValue("global");
			}

			if (input === "u") {
				setValue("uninstall");
			}

			if (input === "i") {
				setValue("install");
			}
		}
	});
	return (
		<Box
			borderStyle="round"
			borderColor={getBorderColorOnFocus(isFocused)}
			flexDirection="column"
			width="50%"
			minHeight={20}
			paddingLeft={2}
		>
			<Title title="Versions" color={getBorderColorOnFocus(isFocused)}/>
			<Select
				isDisabled={!isFocused}
				visibleOptionCount={10}
				options={options}
				onChange={setValue}
			/>

			<Text>Selected value: {value}</Text>
		</Box>
	);
}
