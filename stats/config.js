const baseRepoUrl = "https://github.com/kottans/frontend-2022-homeworks/";

const prLabels = [
  "task-PopUp",
  "task-DOM",
  "task-TJSW",
  "task-Frogger",
  "task-TJSW-OOP",
  "task-MPG",
  "task-Friends",
];

const prStates = [
  "open",
  "merged",
];

const url = {
  prListFilteredByAuthorPrefix: baseRepoUrl + "pulls?q=is%3Apr+author%3A",
  prPrefix: baseRepoUrl + "pull/",
  issuePrefix: baseRepoUrl + "issues/",
}

const statsFileName = "./pr-stats.md";

module.exports = {
  prLabels,
  prStates,
  url,
  statsFileName,
};
