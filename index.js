const commandLineArgs = require('command-line-args');
const fs = require('fs');
const _  = require('lodash');


const startupOptionDifinition = [
  { name: 'init_spaces', alias: 'i', type: Boolean },
  { name: 'multiclone_space', alias: 'm', type: String },
];

const startupOptions = commandLineArgs(startupOptionDifinition);
const SPACES_PATH = `${process.cwd()}/spaces`;


if (_.hasIn(startupOptions, 'multiclone_space')) {
  const spacePath = `./${startupOptions.multiclone_space}`;
  if (!fs.existsSync(spacePath)) {
    console.log('Space file not found!');
    process.exit(-1);
  }
}
else if (_.hasIn(startupOptions, 'init_spaces')) {
  if (!fs.existsSync(SPACES_PATH)){
    fs.mkdirSync(SPACES_PATH);
    fs.writeFileSync(`${SPACES_PATH}/example.space.json`, JSON.stringify({
      "space-name": [
        {
          "repo1": "https://github.com/",
          "repo2": "https://github.com/"
        }
      ]
    }));
  }
}
