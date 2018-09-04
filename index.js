const commandLineArgs = require('command-line-args');
const fs = require('fs');
const _  = require('lodash');
const os = require('os');


const startupOptionDifinition = [
  { name: 'init', alias: 'i', type: Boolean },
  { name: 'create-space', alias: 'c', type: String },
];

const startupOptions = commandLineArgs(startupOptionDifinition);
console.log(startupOptions);

if (!_.isNull(startupOptions.init)) {
  console.log('INIT!', os.homedir());
}
