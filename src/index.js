const commandLineArgs = require('command-line-args');
const fs = require('fs');
const _  = require('lodash');
const GitMulticlone = require('./multiclone');

const startupOptionDifinition = [
  { name: 'init_spaces', alias: 'i', type: Boolean },
  { name: 'multiclone_space', alias: 'm', type: Boolean },
];

const startupOptions = commandLineArgs(startupOptionDifinition);
const gitMulticlone = new GitMulticlone();

if (_.hasIn(startupOptions, 'multiclone_space')) {
  gitMulticlone.startClone();
}
else if (_.hasIn(startupOptions, 'init_spaces')) {
  gitMulticlone.initSpaces();
}
