const http = require('http');

const url = require('url');

// const cookie = require('cookie');

const methods = require('./methods');

const self = require('../controllers/self');

const store = {};

const router = { ...self };

http.createServer((req, res) => {
  try {
    console.info(`%cRequest URL: %c${req.url}`,
      'color: #999;',
      'color: #036');

    let reqBody = {};
    const reqBodyBuffer = [];

    req.on('data', (data) => { reqBodyBuffer.push(data); });

    const {
      pathname,
      query,
    } = url.parse(req.url, true);

    const matchingRoute = pathname.split('/').filter((item) => (item !== '')).reduce((acc, cur, idx, src) => {
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

    console.log(matchingRoute);

    if (matchingRoute.isMatched) {
      req.on('end', () => {
        const reqBodyString = Buffer.concat(reqBodyBuffer).toString();
        console.log('reqBodyString', reqBodyString);
        if (reqBodyString) {
          reqBody = JSON.parse(reqBodyString);
        }
        matchingRoute.matched.apply(store, [req, res, {
          path: pathname,
          params: matchingRoute.params,
          query,
          body: reqBody,
        }]);
      });
    }
  } catch (error) {
    console.error(error);
  }
}).listen(7788, '127.0.0.1');
