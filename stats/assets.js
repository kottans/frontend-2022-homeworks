const outputPresets = {
  'header': [
    '# Open and merged PRs by task labels',
    '',
    `_as of ${new Date().toISOString()} UTC_`,
    '',
    'PR reference legend:',
    ' - #xxx o -- PR is yet open ',
    ' - #xxx i -- labelled issue referring to p2p PR(s)',
    ' - **#xxx** -- PR is merged',
    '',
  ],
  'footer': [
    '',
    '## How to "import" a PR from a different repo',
    '',
    '1. Open an issue where Title starts with `username:`, describes the purpose of the PR, and body contains link(s) to PR(s) that need to be accounted for.',
    '1. Assign relevant task labels on the issue.',
    '',
    '## How to update stats',
    '',
    '1. Have official [GitHub CLI](https://cli.github.com/) installed.',
    '1. Run `cd stats && node make-stats.js`',
    '1. Commit and Push changes',
    '',
  ],
};

module.exports = {
  outputPresets,
};
