import { Octokit } from "octokit";
import * as pkg from "../package.json";

export const github = new Octokit({
  auth: process.env.GITHUB_AUTH,
  userAgent: `${pkg.name}/${pkg.version}`,
});
