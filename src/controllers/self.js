module.exports = {
  api: {
    v1: {
      projects: {
        GET(req, res, obj) {
          console.log(req, res);
          // console.log(res.setHeader);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(obj));
        },
        POST(req, res, obj) {
          console.log(req, res);
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(obj));
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
      },
    },
  },
};
