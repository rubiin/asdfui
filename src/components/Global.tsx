import { Box, Spacer, Text, useFocus } from "ink";
import React, { useEffect } from "react";
import { useGlobalsStore } from "../stores/global.stores.js";
import { getBorderColorOnFocus, totalNumber } from "../utils/helpers.js";
import { Loader, NotFound, Title } from "./index.js";

export function Globals() {
	const { isFocused } = useFocus({ id: "globals" });
	const getAllGlobalVersions = useGlobalsStore((state) => state.getAllGlobalVersions);
	const globalVersions = useGlobalsStore((state) => state.versions);
	const loading = useGlobalsStore((state) => state.loading);

	useEffect(() => {
		// declare the data fetching function
		const fetchGlobalData = () => {
			getAllGlobalVersions();
		};

		// call the function
		fetchGlobalData();
	}, []);

	return (
		<Box
			borderStyle="double"
			borderColor={getBorderColorOnFocus(isFocused)}
			flexDirection="column"
			minHeight={20}
			paddingLeft={2}
		>
			<Title title={totalNumber("Global", globalVersions.length)} color={getBorderColorOnFocus(isFocused)} />
			{loading && <Loader text={"Fetching global versions"} />}
			<Box paddingY={2} paddingX={4} flexDirection="column">{globalVersions.map((element,index) => {
				return (
					<Box paddingY={0.5} key={index}>
						<Text>{element.name}</Text>
						<Spacer />
						<Text>{element.version}</Text>
					</Box>
				);
			})}
			</Box>
			{!loading && globalVersions.length === 0 && <NotFound text={"No global versions found"} />}
		</Box>
	);
}
