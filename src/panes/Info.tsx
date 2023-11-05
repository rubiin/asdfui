import { Box, Spacer, Text } from "ink";
import React, { useEffect } from "react";
import { useInfosStore } from "@stores/index.js";
import { BorderColor } from "../types.js";
import { totalNumber } from "@utils/index.js";
import { Loader, CustomAlert, Title } from "@components/index.js";

export function Info() {
	const getAllInfo = useInfosStore((state) => state.getAllInfo);
	const versions = useInfosStore((state) => state.versions);
	const isLoading = useInfosStore((state) => state.isLoading);

	useEffect(() => {
		getAllInfo();
	}, []);

	return (
		<Box borderStyle="double" borderColor={BorderColor.UNFOCUSED} flexDirection="column" minHeight={20} paddingLeft={2}>
			<Title title={totalNumber("Info", versions.length)} color={BorderColor.UNFOCUSED} />
			{isLoading && <Loader text="Fetching info" />}
			<Box paddingY={2} paddingX={4} flexDirection="column">
				{versions.map((element, index) => {
					return (
						<Box marginY={0.5} key={index}>
							<Text>{element.name}</Text>
							<Spacer />
							<Text>{element.version}</Text>
						</Box>
					);
				})}
			</Box>
			{!isLoading && versions.length === 0 && <CustomAlert text="No versions found" />}
		</Box>
	);
}
