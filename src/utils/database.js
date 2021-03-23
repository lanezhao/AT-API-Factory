const sqlite3 = require('sqlite3');
const conifg = require('../config');

function dbInit() {
  const db = new sqlite3.Database(conifg.databaseFile, (error) => {
    if (error) {
      global.logger.error(
        `Error occurred while opening database file: 
          ${conifg.databaseFile}: ${error.message}`, 'init()',
      );
    } else {
      global.logger.info(`Database ${conifg.databaseFile} is open`);
      process.on('exit', (code) => {
        global.logger.info(`CLOSING Database ${conifg.databaseFile}, exit code: ${code}`);
        db.close((err) => {
          global.logger.error(`Error closing DB with message: ${err.message}: and code ${code}`);
        });
      });
    }
  });
  return db;
}

let database;

function getDatabase() {
  if (typeof db === 'undefined') {
    database = dbInit();
    database.run(`
    CREATE TABLE IF NOT EXISTS  project (
      id   INTEGER PRIMARY KEY
                   UNIQUE
                   NOT NULL,
      uuid STRING  UNIQUE
                   NOT NULL,
      name STRING  UNIQUE
                   NOT NULL,
      port INTEGER UNIQUE
                   NOT NULL
    );
  `, (error) => {
      if (error)global.logger.error(error);
    });
  }
  return database;
}

module.exports = getDatabase();
