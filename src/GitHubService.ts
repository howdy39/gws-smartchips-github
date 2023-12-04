type URLFetchRequestOptions = GoogleAppsScript.URL_Fetch.URLFetchRequestOptions;

export class GitHubService {
  static getToken() {
    const properties = PropertiesService.getScriptProperties();

    const GITHUB_APP_ID = properties.getProperty('GITHUB_APP_ID');
    const GITHUB_INSTALLATION_ID = properties.getProperty('GITHUB_INSTALLATION_ID');
    const GITHUB_PRIVATE_KEY = properties.getProperty('GITHUB_PRIVATE_KEY');

    if (GITHUB_APP_ID === null || GITHUB_INSTALLATION_ID === null || GITHUB_PRIVATE_KEY === null) {
      throw new Error('Property could not be retrieved.');
    }

    const [url, opts] = GitHubAppToken.generate({
      appId: GITHUB_APP_ID,
      installationId: GITHUB_INSTALLATION_ID,
      privateKey: GITHUB_PRIVATE_KEY.replaceAll('\\n', '\n'),
    });
    const res = UrlFetchApp.fetch(url, opts);
    const token = JSON.parse(res.getContentText()).token;

    return token;
  }

  static getIssue(
    owner: string,
    repo: string,
    issueNumber: Number,
  ): { title: string; body: string; userIconUrl: string } {
    // https://docs.github.com/ja/rest/issues/issues?apiVersion=2022-11-28#get-an-issue
    const url = `https://api.github.com/repos/${owner}/${repo}/issues/${issueNumber}`;
    const params: URLFetchRequestOptions = {
      method: 'get',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${GitHubService.getToken()}`,
      },
    };
    const res = UrlFetchApp.fetch(url, params);
    const { title, body, user } = JSON.parse(res.getContentText());
    return { title, body: body || '', userIconUrl: user.avatar_url };
  }

  static getPullRequest(
    owner: string,
    repo: string,
    pullNumber: Number,
  ): { title: string; body: string; userIconUrl: string } {
    // https://docs.github.com/ja/rest/pulls/pulls?apiVersion=2022-11-28#get-a-pull-request
    const url = `https://api.github.com/repos/${owner}/${repo}/pulls/${pullNumber}`;
    const params: URLFetchRequestOptions = {
      method: 'get',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${GitHubService.getToken()}`,
      },
    };
    const res = UrlFetchApp.fetch(url, params);
    const { title, body, user } = JSON.parse(res.getContentText());
    return { title, body: body || '', userIconUrl: user.avatar_url };
  }
}
