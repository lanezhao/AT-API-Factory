module.exports = {
  api: {
    v1: {
      projects: {
        GET(req, res) {
          console.log(req, res);
        },
        POST(req, res) {
          console.log(req, res);
        },
        ':id': {
          GET(req, res, {
            path,
            params,
            query,
            hash,
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
              hash,
              fullPath,
            );
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
