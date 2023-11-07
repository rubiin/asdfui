import { getGlobalVersionForTool } from "@utils/asdf.js";

try {
	const res = await getGlobalVersionForTool("nodejsaa");
	console.log(typeof res);
	console.log({ res });
} catch (err) {
	console.error("Error reading the file:", err);
}
