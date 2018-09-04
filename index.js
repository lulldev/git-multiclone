const commandLineArgs = require('command-line-args');
const fs = require('fs');
const _  = require('lodash');


const startupOptionDifinition = [
  { name: 'multiclone', alias: 'm', type: Boolean },
];

const startupOptions = commandLineArgs(startupOptionDifinition);
const SPACES_PATH = `${process.cwd()}/spaces`;

if (!fs.existsSync(SPACES_PATH)){
  fs.mkdirSync(SPACES_PATH);
}

if (_.hasIn(startupOptions, 'multiclone')) {
  // TODO: get space.json & parse -> clone all from config in ./space
}
