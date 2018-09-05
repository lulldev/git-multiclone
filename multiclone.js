const fs = require('fs');
const _  = require('lodash');


class GitMulticlone {
  
  static SPACES_PATH = `${process.cwd()}/spaces`;
  static SPACES_CONFIG = `${process.cwd()}/spaces.json`;
  
  constructor(spaceConfigPath) {
    this.spaceConfigPath = spaceConfigPath;
  }

  initSpaces() {
    if (!fs.existsSync(GitMulticlone.SPACES_PATH)){
      fs.mkdirSync(GitMulticlone.SPACES_PATH);
    }
    fs.stat(SPACES_CONFIG, (err) => {
      if(err.code == 'ENOENT') {
        fs.writeFileSync(GitMulticlone.SPACES_CONFIG, JSON.stringify({
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

  startClone() {
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
}

module.exports = GitMulticlone;
