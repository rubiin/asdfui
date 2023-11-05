import { Text } from "ink";
import React from "react";
import { GenericTextProp } from "../types.js";

export function CustomItem({ label }: GenericTextProp) {
	return <Text>{label}</Text>;
}
