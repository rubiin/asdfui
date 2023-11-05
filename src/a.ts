import { listToolsVersions, listInstalledToolsVersions } from "./utils/asdf.js";

try {
	const res = await listInstalledToolsVersions("erlang");
	const res2 = await listToolsVersions("erlang");

	console.log(res);
	console.log(res2);
} catch (error) {
	console.log("here", error);
}
