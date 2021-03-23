const database = require('../../utils/database');

const getProjects = function getProjects() {
  global.logger.debug('getProjects', 'models - getProjects.js');
  return new Promise((resolve, reject) => {
    database.all('SELECT * FROM project', (error, rows) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        global.logger.debug(`getProjects resolve ${rows}`, 'models - getProjects.js');
        resolve({ projects: rows });
      }
    });
  });
};

module.exports = getProjects;
