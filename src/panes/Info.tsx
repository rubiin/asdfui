import { Box, Spacer, Text } from "ink";
import React, { useEffect } from "react";
import { useInfosStore } from "../stores/global.stores.js";
import { BorderColor } from "../types.js";
import { totalNumber } from "../utils/helpers.js";
import { Loader, CustomAlert, Title } from "../components/index.js";

export function Info() {
	const getAllInfo= useInfosStore((state) => state.getAllInfo);
	const versions = useInfosStore((state) => state.versions);
	const loading = useInfosStore((state) => state.loading);

	useEffect(() => {
		// declare the data fetching function
		const fetchInfoData = () => {
			getAllInfo();
		};

		// call the function
		fetchInfoData();
	}, []);

	return (
		<Box
			borderStyle="double"
			borderColor={BorderColor.UNFOCUSED}
			flexDirection="column"
			minHeight={20}
			paddingLeft={2}
		>
			<Title title={totalNumber("Info", versions.length)} color={BorderColor.UNFOCUSED} />
			{loading && <Loader text={"Fetching info"} />}
			<Box paddingY={2} paddingX={4} flexDirection="column">{versions.map((element,index) => {
				return (
					<Box marginY={0.5} key={index}>
						<Text>{element.name}</Text>
						<Spacer />
						<Text>{element.version}</Text>
					</Box>
				);
			})}
			</Box>
			{!loading && versions.length === 0 && <CustomAlert text={"No versions found"} />}
		</Box>
	);
}
