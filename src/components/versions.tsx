import { Select } from "@inkjs/ui";
import { Text, Box, useFocus, useInput } from "ink";
import React, { useState } from "react";
import { getBorderColorOnFocus } from "../util.js";

export function Versions() {
	const { isFocused } = useFocus({id: "version"}) ;
	const [value, setValue] = useState<string | undefined>();

	useInput((input) => {

		if(isFocused){
			if (input === 'g') {
				setValue("global")
		 }

		 if (input === 'u') {
			 setValue("uninstall")
		}

		if (input === 'i') {
			setValue("install")
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
			<Box alignSelf="center" marginTop={-1}>
				<Text bold>Versions </Text>
			</Box>
			<Select
				isDisabled={!isFocused}
				options={[
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
				]}
				onChange={setValue}
			/>

			<Text>Selected value: {value}</Text>
		</Box>
	);
}
