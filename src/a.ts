import { $ } from "execa";

const branch = await $`asdf list all golang`;
console.log({ branch });
