const projectsModels = require('../models/projects');

module.exports = {
  GET(req, res) {
    console.log('GET: /projects');
    global.logger.debug('GET: /projects/', 'controllers - projects.js');
    projectsModels.getProjects()
      .then((projects) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ projects }));
      })
      .catch(() => {
        res.writeHead(400, { 'Content-Type': 'text/json' });
        res.end();
      });
  },
  POST(req, res, { body }) {
    console.log('POST: /projects', body);
    projectsModels.postProjects({
      name: body.name,
      port: body.port,
    })
      .then(projectsModels.getProjects)
      .then((projects) => {
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ projects }));
      })
      .catch(() => {
        res.writeHead(400, { 'Content-Type': 'text/json' });
        res.end();
      });
  },
  ':id': {
    GET(req, res, {
      path,
      params,
      query,
      fullPath,
      // matched,
      // name,
      // redirectedFrom,
    }) {
      console.log('GET: /projects/:id');
      console.log(
        req,
        res,
        path,
        params,
        query,
        fullPath,
      );
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        path,
        params,
        query,
        fullPath,
      }));
    },
    paths: {
      GET() {

      },
    },
  },
};
