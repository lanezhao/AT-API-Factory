const methods = require('./methods');

/**
 *
 * @param {Object} arguments
 * @param {Object} arguments.req Request Object
 * @param {Object} arguments.res Response Object
 * @param {String} arguments.path Request Path
 * @param {Object} arguments.router Router Object
 * @returns {Object} returns
 */

module.exports = ({
  req,
  res,
  path,
  router,
}) => {
  const matchedRoute = path // Request path.
    .split('/') // Split path by '/'. e.g.: '/api/v1//projects/1/at-api-factory' => ['', 'api', 'v1', '', 'projects', '1', 'at-api-factory']
    .filter((item) => (item !== '')) // Filter blank path e.g.: ['', 'api', 'v1', '', 'projects', '1', 'at-api-factory'] => ['api', 'v1', 'projects', '1', 'at-api-factory']
    .reduce((acc, cur, idx, src) => {
      if (!acc.isMatched) {
        if (acc.matched[cur] !== undefined) {
          acc.matched = acc.matched[cur];
        } else {
          const dynamic = Object.keys(acc.matched).filter((route) => (/^:/.test(route)));
          if (dynamic.length) {
            acc.matched = acc.matched[dynamic[0]];
            acc.params[dynamic[0].substring(1)] = cur;
          }
        }
        if (idx === src.length - 1) {
          if (acc.matched[req.method.toLocaleUpperCase()] !== undefined) {
            acc.matched = acc.matched[req.method.toLocaleUpperCase()];
            acc.isMatched = true;
          } else {
            res.writeHead(405, {
              Allow: Object.keys(methods)
                .filter((method) => (Object.keys(acc.matched).includes(method))).join(', '),
            });
            res.end();
          }
        }
      }
      return acc;
    }, {
      isMatched: false,
      matched: router,
      params: {},
    });

  return matchedRoute;
};
