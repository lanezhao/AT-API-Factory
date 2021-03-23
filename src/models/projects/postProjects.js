const { v4: uuidv4 } = require('uuid');

const database = require('../../utils/database');

const postProjects = function postProjects({
  name,
  port,
}) {
  global.logger.debug('postProjects', 'models - postProjects.js');
  const sql = `INSERT INTO Project (uuid, name, port) VALUES ('${uuidv4()}', '${name}', ${port})`;
  global.logger.debug('postProjects', 'models - postProjects.js', sql);
  return new Promise((resolve, reject) => {
    database.run(sql, (error) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        global.logger.debug('postProjects resolve', 'models - postProjects.js');
        resolve();
      }
    });
  });
};

module.exports = postProjects;
