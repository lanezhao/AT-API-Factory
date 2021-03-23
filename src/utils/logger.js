const logger = {
  trace(message = '', source = '') {
    console.log(Math.round(new Date().getTime() / 1000), 'TRACE', message, source);
  },
  debug(message = '', source = '') {
    console.log(Math.round(new Date().getTime() / 1000), 'DEBUG', message, source);
  },
  info(message = '', source = '') {
    console.info(Math.round(new Date().getTime() / 1000), 'INFO', message, source);
  },
  warn(message = '', source = '') {
    console.warn(Math.round(new Date().getTime() / 1000), 'WARN', message, source);
  },
  error(message = '', source = '') {
    console.error(Math.round(new Date().getTime() / 1000), 'error', message, source);
  },
  fatal(message = '', source = '') {
    console.error(Math.round(new Date().getTime() / 1000), 'FATAL', message, source);
  },
};

global.logger = logger;

module.exports = logger;
