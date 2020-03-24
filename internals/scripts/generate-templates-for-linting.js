/**
 * This script is for internal `react-boilerplate`'s usage.
 * It will run all generators in order to be able to lint them and detect
 * critical errors. Every generated component's name starts with 'RbGenerated'
 * and any modified file is backed up by a file with the same name but with the
 * 'rbgen' extension so it can be easily excluded from the test coverage reports.
 */

const chalk = require('chalk');
const fs = require('fs');
const nodePlop = require('node-plop');
const path = require('path');
const rimraf = require('rimraf');
const shell = require('shelljs');

const addCheckmark = require('./helpers/checkmark');
const xmark = require('./helpers/xmark');

/**
 * Every generated component/container is preceded by this
 * @type {string}
 */
const { BACKUPFILE_EXTENSION } = require('../generators/index');

process.chdir(path.join(__dirname, '../generators'));

const plop = nodePlop('./index.js');
const componentGen = plop.getGenerator('component');
const containerGen = plop.getGenerator('container');
const languageGen = plop.getGenerator('language');

/**
 * Every generated component/container is preceded by this
 * @type {string}
 */
const NAMESPACE = 'RbGenerated';

/**
 * Return a prettified string
 * @param {*} data
 * @returns {string}
 */
function prettyStringify(data) {
  return JSON.stringify(data, null, 2);
}

/**
 * Handle results from Plop
 * @param {array} changes
 * @param {array} failures
 * @returns {Promise<*>}
 */
function handleResult({ changes, failures }) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(failures) && failures.length > 0) {
      reject(new Error(prettyStringify(failures)));
    }

    resolve(changes);
  });
}

/**
 * Feedback to user
 * @param {string} info
 * @returns {Function}
 */
function feedbackToUser(info) {
  return result => {
    console.info(chalk.blue(info));
    return result;
  };
}

/**
 * Report success
 * @param {string} message
 * @returns {Function}
 */
function reportSuccess(message) {
  return result => {
    addCheckmark(() => console.log(chalk.green(` ${message}`)));
    return result;
  };
}

/**
 * Report errors
 * @param {string} reason
 * @returns {Function}
 */
function reportErrors(reason, shouldExist = true) {
  // TODO Replace with our own helpers/log that is guaranteed to be blocking?
  xmark(() => console.error(chalk.red(` ${reason}`)));
  if(shouldExist) {
    process.exit(1);
  }
}

/**
 * Run eslint on all files
 * @returns {Promise<void>}
 */
function runLinting() {
  return new Promise((resolve, reject) => {
    shell.exec(
      `npm run lint`,
      {
        silent: false, // so thats we can see the errors in the console
      },
      code =>
        code
          ? reject(new Error(`Linting failed!`))
          : resolve(),
    );
  });
}

/**
 * Run eslint on the given file
 * @param {string} filePath
 * @returns {Promise<string>}
 */
function runLintingOnFile(filePath) {
  return new Promise((resolve, reject) => {
    shell.exec(
      `npm run lint:eslint "${filePath}"`,
      {
        silent: false,
      },
      code => {
        if (code) {
          reject(new Error(`Linting errors in ${filePath}`));
        } else {
          resolve(filePath);
        }
      },
    );
  });
}

/**
 * Remove a directory
 * @param {string} relativePath
 * @returns {Promise<any>}
 */
function removeDir(relativePath) {
  return new Promise((resolve, reject) => {
    try {
      rimraf(path.join(__dirname, '/../../app/', relativePath), err => {
        if (err) throw err;
        resolve(relativePath);
      });
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Remove a given file
 * @param {string} filePath
 * @returns {Promise<any>}
 */
function removeFile(filePath) {
  return new Promise((resolve, reject) => {
    try {
      fs.unlink(filePath, err => {
        if (err) throw err;
      });
      resolve(filePath);

    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Copy file
 * @param {string} filePath
 * @param {string} [backupFileExtension=BACKUPFILE_EXTENSION]
 * @returns {Promise<*>}
 */
async function backupFile(
  filePath,
  backupFileExtension = BACKUPFILE_EXTENSION,
) {
  return new Promise((resolve, reject) => {
    const targetFile = filePath.concat(`.${backupFileExtension}`)
    try {
      fs.copyFile(filePath, targetFile, err => {
        if (err) throw err;
      });
      resolve(targetFile);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Overwrite file from copy
 * @param {string} filePath
 * @param {string} [backupFileExtension=BACKUPFILE_EXTENSION]
 * @returns {Promise<*>}
 */
async function restoreModifiedFile(
  filePath,
  backupFileExtension = BACKUPFILE_EXTENSION,
) {
  return new Promise((resolve, reject) => {
    const targetFile = filePath.replace(`.${backupFileExtension}`, '');
    try {
      fs.copyFile(filePath, targetFile, err => {
        if (err) throw err;
      });
      resolve(targetFile);
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Test the component generator
 * @param {string} name - Component name
 * @param {string} type - Plop Action type
 */
async function generateComponent({ name, memo }) {
  const targetFolder = 'components';
  const componentName = `${NAMESPACE}Component${name}`;
  const relativePath = `${targetFolder}/${componentName}`;

  await componentGen
    .runActions({
      name: componentName,
      memo,
      wantMessages: true,
      wantLoadable: true,
    })
    .then(handleResult)
    .then(feedbackToUser(`Generated '${relativePath}'`))
    .catch(reason => reportErrors(reason));
    
  // return a cleanup function
  return async () => {
    await removeDir(relativePath)
    .then(feedbackToUser(`Cleanup '${relativePath}'`))
    .catch(reason => reportErrors(reason));
  }
}

async function generateContainer({ name, memo }) {
  const targetFolder = 'containers';
  const componentName = `${NAMESPACE}Container${name}`;
  const relativePath = `${targetFolder}/${componentName}`;

  await containerGen
    .runActions({
      name: componentName,
      memo,
      wantHeaders: true,
      wantActionsAndReducer: true,
      wantSagas: true,
      wantMessages: true,
      wantLoadable: true,
    })
    .then(handleResult)
    .then(feedbackToUser(`Generated '${relativePath}'`))
    .catch(reason => reportErrors(reason));

  // return a cleanup function
  return async () => {
    await removeDir(relativePath)
      .then(feedbackToUser(`Cleanup '${relativePath}'`))
      .catch(reason => reportErrors(reason));
  }
}

/**
 * Generate components
 * @param {array} components
 */
async function generateComponents(components) {
  const typesPath = '../../app/types/index.ts'

  const backupTypes = await backupFile(typesPath)
    .then(feedbackToUser("Generated 'types/index.ds.ts.rbgen'"))
    .catch(reason => reportErrors(reason));

  const cleanups = [];
  for (const component of components) {
    if (component.kind === 'component') {
      cleanup = await generateComponent(component);
    } else if (component.kind === 'container') {
      cleanup = await generateContainer(component);
    }
    cleanups.push(cleanup);
  }
  const restoreBackups = async () => await restoreModifiedFile(backupTypes)
    .then(feedbackToUser(`Restored: ${typesPath}`))
    .catch(reason => reportErrors(reason));

  const removeBackups = async() =>  await removeFile(backupTypes)
    .then(feedbackToUser(`Removed: ${backupTypes}`))
    .catch(reason => reportErrors(reason));

  // return cleanup functions to run later
  cleanups.push(restoreBackups, removeBackups);
  return cleanups;
}

/**
 * Test the language generator
 * @param {string} language
 */
async function generateLanguage(language) {
  // Run generator
  const generatedFiles = await languageGen
    .runActions({ language, test: true })
    .then(handleResult)
    .then(feedbackToUser(`Added new language: '${language}'`))
    .then(changes =>
      changes.reduce((acc, change) => {
        const pathWithRemovedAnsiEscapeCodes = change.path.replace(
          /* eslint-disable-next-line no-control-regex */
          /(\u001b\[3(?:4|9)m)/g,
          '',
        );
        const obj = {};
        obj[pathWithRemovedAnsiEscapeCodes] = change.type;
        return Object.assign(acc, obj);
      }, {}),
    )
    .catch(reason => reportErrors(reason));

  // Restore modified files
  const restoreTasks =  async () => Object.keys(generatedFiles)
    .filter(filePath => generatedFiles[filePath] === 'backup')
    .map(async filePath => {
      const result = await restoreModifiedFile(filePath)
        .then(
          feedbackToUser(
            `Restored file: '${filePath.replace(
              `.${BACKUPFILE_EXTENSION}`,
              '',
            )}'`,
          ),
        )
        .catch(reason => reportErrors(reason));

      return result;
    });

  // Remove backup files and added files
  const removalTasks = async () => Object.keys(generatedFiles)
    .filter(
      filePath =>
        generatedFiles[filePath] === 'backup' ||
        generatedFiles[filePath] === 'add',
    )
    .map(async filePath => {
      const result = await removeFile(filePath)
        .then(feedbackToUser(`Removed '${filePath}'`))
        .catch(reason => reportErrors(reason));

      return result;
    });

  // return cleanup functions to run later
  const cleanups = [restoreTasks, removalTasks];
  return cleanups;
}

/**
 * Run
 */
(async function () {
  const componentsCleanups = await generateComponents([
    { kind: 'component', name: 'Component', memo: false },
    { kind: 'component', name: 'MemoizedComponent', memo: true },
    { kind: 'container', name: 'Container', memo: false },
    { kind: 'container', name: 'MemoizedContainer', memo: true },
  ]).catch(reason => reportErrors(reason));

  const languageCleanups = await generateLanguage('fr').catch(reason => reportErrors(reason));

  // Run lint when all the components and languages are generated to see if they have any linting erros
  const lintingResult = await runLinting()
    .then(reportSuccess(`Linting test passed`))
    .catch(reason => { 
      reportErrors(reason, false); 
      return false;
    });

  // Everything is done, so run the cleanups synchronously 
  const allCleanups = componentsCleanups.concat(...languageCleanups);
  for (const cleanup of allCleanups) {
    await cleanup();
  }

  if(lintingResult === false) {
    process.exit(1);
  }
})();
