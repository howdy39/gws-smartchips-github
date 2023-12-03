import { GitHubService } from './GitHubService';
import { DocsEventObject } from './types/DocsEventObject';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function linkPreview(event: { docs: DocsEventObject }) {
  try {
    const url = event.docs.matchedUrl && event.docs.matchedUrl.url;

    if (url) {
      // 正規表現を使用してURLから必要な部分を抽出
      const matchResultForIssues = url.match(
        // eslint-disable-next-line no-useless-escape
        /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/issues\/(\d+)$/,
      );

      const matchResultForPulls = url.match(
        // eslint-disable-next-line no-useless-escape
        /^https:\/\/github\.com\/([^\/]+)\/([^\/]+)\/pull\/(\d+)$/,
      );

      if (matchResultForIssues === null && matchResultForPulls === null) {
        throw new Error('URLが正規表現にマッチしませんでした。');
      }

      if (matchResultForIssues !== null) {
        const [, owner, repo, issueNumber] = matchResultForIssues;
        const issue = GitHubService.getIssue(owner, repo, Number(issueNumber));
        return buildCard__(issue.title, issue.userIconUrl, `${owner}/${repo}`, issue.body);
      } else if (matchResultForPulls !== null) {
        const [, owner, repo, pullNumber] = matchResultForPulls;
        const pull = GitHubService.getPullRequest(owner, repo, Number(pullNumber));
        return buildCard__(pull.title, pull.userIconUrl, `${owner}/${repo}`, pull.body);
      }
    }
  } catch (error) {
    let message = '';

    if (error instanceof Error) {
      message = error.message;
      if (message.includes('404')) {
        message = 'URLが見つかりませんでした、URLを確認してください';
      }
    } else if (typeof error === 'string') {
      message = error;
    } else {
      message = 'unexpected error';
    }

    return CardService.newCardBuilder()
      .addSection(
        CardService.newCardSection().addWidget(CardService.newTextParagraph().setText(message)),
      )
      .build();
  }
}

function buildCard__(title: string, imageUrl: string, repojitory: string, body: string) {
  return CardService.newCardBuilder()
    .setHeader(CardService.newCardHeader().setTitle(title).setImageUrl(imageUrl))
    .addSection(
      CardService.newCardSection()
        .setHeader('REPOSITORY')
        .addWidget(
          CardService.newDecoratedText()
            .setStartIcon(CardService.newIconImage().setIcon(CardService.Icon.BOOKMARK))
            .setText(repojitory)
            .setWrapText(true),
        ),
    )
    .addSection(
      CardService.newCardSection()
        .setHeader('BODY')
        .addWidget(
          CardService.newDecoratedText()
            .setStartIcon(CardService.newIconImage().setIcon(CardService.Icon.DESCRIPTION))
            .setText(body)
            .setWrapText(true),
        ),
    )
    .build();
}
