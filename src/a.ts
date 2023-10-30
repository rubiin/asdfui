import { $ } from "execa";

try {
	const res = await $`asdf list all deno`;
	console.log({res})
	 console.log(res.stdout.split("\n"))
} catch (error) {
	console.log('here',error);
}
