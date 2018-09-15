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
    fs.stat(GitMulticlone.SPACES_CONFIG, (err) => {
      if(err && err.code === 'ENOENT') {
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
    console.log('Start multicloning...');
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
      const projectData = spaceFileContent[spaceName];
      const projectList = Object.keys(projectData);
      projectList.forEach((projectName) => {
        const projectPath = `${currentSpacePath}/${projectName}`;
        if (!fs.existsSync(projectPath)){
          fs.mkdirSync(projectPath);
        }
        const repoData = projectData[projectName];
        Object.entries(repoData).forEach((repo) => {
          const repoName = repo[0];
          const repoUrl = repo[1];
          const repoPath = `${projectPath}/${repoName}`;
          this.reclone(repoUrl, repoPath);
        });
      });
    });
  }

  reclone(repoUrl, repoPath) {
    const recloneCommand = (!fs.existsSync(repoPath)) 
      ? `git clone ${repoUrl} ${repoPath}`
      : `cd ${repoPath} && git fetch --all && git reset --hard origin/master && git pull`;

    exec(recloneCommand, (err, stdout, stderr) => {
      if (err) {
        console.log(`- error reclone: ${repoPath}`);
        console.log(stderr);
        return;
      }
      else {
        console.log(`+ cloning ${repoUrl} complete!`);
      }
    });
  }
}
