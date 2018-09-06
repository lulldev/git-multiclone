import fs from 'fs';
import _ from  'lodash';
import {exec} from 'child_process';


export default class GitMulticlone {
  
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
    if (!fs.existsSync(GitMulticlone.SPACES_CONFIG)) {
      console.log('Space file not found!');
      process.exit(-1);
    }
    const spaceFileContent = JSON.parse(fs.readFileSync(GitMulticlone.SPACES_CONFIG, 'utf8'));
    const spacesList = Object.keys(spaceFileContent);
    spacesList.forEach((spaceName) => {
      const currentSpacePath = `${GitMulticlone.SPACES_PATH}/${spaceName}`;
      if (!fs.existsSync(currentSpacePath)){
        fs.mkdirSync(currentSpacePath);
      }
      const repoData = spaceFileContent[spaceName];
      Object.entries(repoData).forEach((repo) => {
        const dirName = repo[0];
        const repoUrl = repo[1];
        const repoPath = `spaces/${spaceName}/${dirName}`;
        this.reclone(repoUrl, repoPath);
      });
    });
  }

  reclone(repoUrl, repoPath) {
    if (!fs.existsSync(repoPath)){
      exec(`git clone ${repoUrl} ${repoPath}`, (err, stdout, stderr) => {
        if (err) {
          console.log(`Error new reclone: ${repoPath}`);
          console.log(stderr);
          return;
        }
      });
    }
    else {
      exec(`cd ${repoPath} && git fetch --all && git reset --hard origin/master && git pull`, (err, stdout, stderr) => {
        if (err) {
          console.log(`Error reclone exist repo: ${repoPath}`);
          console.log(stderr);
          return;
        }
      });
    }
  }
}
