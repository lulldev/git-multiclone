const commandLineArgs = require('command-line-args');
const fs = require('fs');
const _  = require('lodash');


const startupOptionDifinition = [
  { name: 'init_spaces', alias: 'i', type: Boolean },
  { name: 'multiclone_space', alias: 'm', type: Boolean },
];

const startupOptions = commandLineArgs(startupOptionDifinition);
const SPACES_PATH = `${process.cwd()}/spaces`;
const SPACES_CONFIG = `${process.cwd()}/spaces.json`;

if (_.hasIn(startupOptions, 'multiclone_space')) {
  if (!fs.existsSync(SPACES_CONFIG)) {
    console.log('Space file not found!');
    process.exit(-1);
  }
  const spaceFileContent = JSON.parse(fs.readFileSync(SPACES_CONFIG, 'utf8'));
  const spacesList = Object.keys(spaceFileContent);
  spacesList.forEach((spaceName) => {
    const currentSpacePath = `${SPACES_PATH}/${spaceName}`;
    if (!fs.existsSync(currentSpacePath)){
      fs.mkdirSync(currentSpacePath);
    }
  });
}
else if (_.hasIn(startupOptions, 'init_spaces')) {
  if (!fs.existsSync(SPACES_PATH)){
    fs.mkdirSync(SPACES_PATH);
  }
  fs.stat(SPACES_CONFIG, (err, stat) => {
    if(err.code == 'ENOENT') {
      fs.writeFileSync(SPACES_CONFIG, JSON.stringify({
        "space-name": [
          {
            "project-name": {
              "repo1": "https://github.com/",
              "repo2": "https://github.com/"
            }
          }
        ]
      }));
    } 
  });
}
