const http = require('http');

const url = require('url');

// const cookie = require('cookie');

// const methods = require('./methods');

const matchingRoute = require('./matchingRoute');

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

    const matchedRoute = matchingRoute({
      req,
      res,
      path: pathname,
      router,
    });

    console.log(matchedRoute);

    if (matchedRoute.isMatched) {
      req.on('end', () => {
        const reqBodyString = Buffer.concat(reqBodyBuffer).toString();
        if (reqBodyString) {
          reqBody = JSON.parse(reqBodyString);
        }
        matchedRoute.matched.apply(store, [req, res, {
          path: pathname,
          params: matchedRoute.params,
          query,
          body: reqBody,
        }]);
      });
    }
  } catch (error) {
    console.error(error);
  }
}).listen(7788, '127.0.0.1');
