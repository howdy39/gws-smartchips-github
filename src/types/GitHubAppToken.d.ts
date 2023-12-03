// @see https://github.com/hankei6km/gas-github-app-token

interface GenerateOpts {
  appId: string;
  installationId: string;
  privateKey: string;
  apiBaseUrl?: string;
}
interface GitHubAppToken {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  generate(opts: GenerateOpts): [string, any];
}

declare const GitHubAppToken: GitHubAppToken;
