/*
  This script requires https://github.com/cli/cli installed globally
 */
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const writeFile = promisify(require('fs').writeFile);
const { prLabels, prStates, url, statsFileName } = require('./config');
const { outputPresets } = require('./assets');
const { makeArray, mergeObjects, recombine } = require('./utils');

exec("gh --version")
  .catch(e => {
    console.error("make-stats ERROR: This script requires https://github.com/cli/cli installed\n");
    throw e;
  })
  .then(() => main())
  .then(() => console.log("\nAll done"))
  .catch(e => {
    console.error("make-stats ERROR:\n", e);
  });

async function main() {
  let prDataByAuthor = {}, issueDataByAuthor = {};
  try {
    prDataByAuthor = await fetchPullRequestData(prLabels, prStates);
  } catch (e) {
    console.error('ERROR: Failed to fetch PR data');
    throw e;
  }
  try {
    issueDataByAuthor = await fetchIssueData(prLabels);
  } catch (e) {
    console.error('ERROR: Failed to fetch issue data');
    throw e;
  }
  prDataByAuthor = mergeObjects(prDataByAuthor, issueDataByAuthor);
  const orderedAuthors = Object.keys(prDataByAuthor)
    .map(authorName => ({
      author: authorName,
      prs: Object.keys(prDataByAuthor[authorName]).length,
    }))
    .sort(makeComparator("prs", "author"))
    .map(authorStats => authorStats.author);
  const report = [
    ...outputPresets.header,
    makeMarkdownTable(orderedAuthors, prLabels, prDataByAuthor),
    ...outputPresets.footer,
  ].join("\n");
  const ioResult = await saveStatsToAFile(statsFileName, report);
  console.log(`\nSaving stats ${statsFileName}: ${ioResult}`);
}

async function saveStatsToAFile(fileName, text) {
  try {
    await writeFile(fileName, text);
    return 'Success';
  } catch (e) {
    console.error(`Error writing data to "${fileName}"`);
    return 'Failure';
  }
}

function makeMarkdownTable(authors, labels, dataByAuthor) {
  const rows = [
    makeMarkdownTableRow(['Nr', 'author', ...labels]),
    makeMarkdownTableRow(makeArray(labels.length + 2, '---')),
  ];
  let coveredTasksCountLatest = Number.MAX_SAFE_INTEGER, authorNr = 0;
  authors.forEach(authorName => {
    const coveredTasksCount = Object.keys(dataByAuthor[authorName]).length;
    if (coveredTasksCount < coveredTasksCountLatest) {
      rows.push(
        makeMarkdownTableRow([
          '=',
          `**${coveredTasksCount} task${coveredTasksCount > 1 ? 's' : ''}**`,
          ...makeArray(labels.length, '   '),
        ])
      );
      coveredTasksCountLatest = coveredTasksCount;
      authorNr = 0;
    }
    rows.push(makeMarkdownTableRow([
      `${coveredTasksCountLatest}.${++authorNr}`,
      makePrListUrl(authorName),
      ...labels.map(label =>
        dataByAuthor[authorName][label]
          ? makePrUrl(dataByAuthor[authorName][label].prNr, dataByAuthor[authorName][label].state[0])
          : " "
      )])
    );
  });
  return rows.join("\n");
}

function makeMarkdownTableRow(cells) {
  const columnDelimiter = " | ";
  return `${columnDelimiter}${cells.join(columnDelimiter)}${columnDelimiter}`.trim();
}

function makePrListUrl(authorName) {
  return `[${authorName}](${url.prListFilteredByAuthorPrefix + authorName})`;
}

function makePrUrl(prNr, state) {
  let anchorText =
    (state[0] === 'm' ? "**" : "") +
    `#${prNr}` +
    (state[0] === 'm' ? "**" : ` ${state[0]}`);
  return `[${anchorText}](${url.prPrefix}${prNr})`;
}

async function fetchPullRequestData(prLabels, prStates) {
  console.log("NB! Relevant PRs must have labels assigned. Only open and merged PRs are accounted.");
  const dataByAuthor = {};
  await Promise.all(
    recombine(prLabels, prStates)
      .map(async ([label, state]) => {
        const command = fetchPrListGhCommand(label, state);
        try {
          const data = await exec(command);
          const prs = parsePrsData(data.stdout);
          prs.forEach(({prNr, author}) => {
            dataByAuthor[author] = {
              ...dataByAuthor[author],
              [label]: { prNr, state },
            };
          });
        } catch(e) {
          console.error(`ERROR executing "${command}"`);
          throw new Error(e);
        }
      })
  );
  return dataByAuthor;
}

async function fetchIssueData(prLabels) {
  console.log("NB! Relevant issues must have their titles starting with 'author_username:' and have labels assigned");
  const dataByAuthor = {};
  const commands = fetchIssueListGhCommand(prLabels);
  const issuesPerLabel = await Promise.all(commands.map(async command => {
    try {
      const data = await exec(command);
      return parseIssuesData(data.stdout);
    } catch(e) {
      console.error(`ERROR executing "${command}"`);
      throw new Error(e);
    }
  }));
  issuesPerLabel.flat().forEach(({issueNr, author, labels}) => {
    labels.forEach(label => {
      dataByAuthor[author] = {
        ...dataByAuthor[author],
        [label]: {prNr: issueNr, state: "issue"},
      };
    });
  });
  return dataByAuthor;
}

function parsePrsData(data) {
  return JSON.parse(data).map(({number: prNr, author: {login: authorId}}) => ({
    prNr,
    author: authorId,
  }));
}

function parseIssuesData(data) {
  return JSON.parse(data).map(({number: issueNr, author: {login: authorId}, labels}) => ({
    issueNr,
    author: authorId,
    labels: labels.map(labelDetails => labelDetails.name),
  }));
}

function fetchPrListGhCommand(label, state) {
  return `gh pr list --state ${state} --label "${label}" --limit 600 --json author,number`;
}

function fetchIssueListGhCommand(labels) {
  // Issues with multiple labels should be treated as individual entries.
  // Also listing multiple labels is treated as "AND" rather than "ANY OF".
  return labels.map(label => `gh issue list --state all --label "${label}" --limit 200 --json author,title,labels,number`);
}

function makeComparator(primaryKeyNumericDescending, secondaryKeyAlphaAscendingCaseInsensitive) {
  return function (a, b) {
    const [aPk, bPk] = [a, b].map(item => item[primaryKeyNumericDescending]);
    if (aPk === bPk) {
      const [aSk, bSk] = [a, b].map(item => item[secondaryKeyAlphaAscendingCaseInsensitive].toLowerCase());
      if (aSk < bSk) return -1;
      return 1;
    }
    return bPk - aPk;
  }
}
