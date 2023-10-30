import { $ } from "execa";

try {
	const {stdout} = await $`asdf current`;
	const text = stdout.trim()

	const lines = text.trim().split('\n');
	const extractedFields = lines.map(line => {
		const fields = line.trim().split(/\s+/);
		if (fields.length >= 2) {
			return {name:fields[0], version: fields[1]};
		}
		return null; // Handle lines with fewer than 2 fields
	});
	console.log(extractedFields);

} catch (error) {
	console.log('here',error);
}
