const check = require("check-node-version");
const chalk = require('chalk');

check({ node: ">= 8.0"}, (error, results) => {
  if (error) {
    return warnAboutNode();
  }
  if (results.isSatisfied) return;

  warnAboutNode();
});

const warnAboutNode = () => {
  const message = `Webdash requires Node >= 8.0 to run properly.\nIf you encounter any issues, please upgrade your installation of node.`;
  const warning = chalk.bgKeyword('yellow').keyword('black').bold(message);
  console.log(warning);
}
