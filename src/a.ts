import { $ } from "execa";

try {
	const res = await $`asdf list all nodejs`;
	console.log(res);
} catch (error) {
	console.log(error);
}
