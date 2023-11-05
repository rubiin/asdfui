import { listInstalledToolsVersions } from "./utils/asdf.js";

try {
	const res = await listInstalledToolsVersions("deno");

	console.log(res);
} catch (error) {
	console.log("here", error);
}
