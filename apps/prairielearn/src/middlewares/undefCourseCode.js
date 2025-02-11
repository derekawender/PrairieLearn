var ERR = require('async-stacktrace');
var async = require('async');

const { logger } = require('@prairielearn/logger');
var requireFrontend = require('../lib/require-frontend');
var sqldb = require('@prairielearn/postgres');

var sql = sqldb.loadSqlEquiv(__filename);

var undefAllCourseCode = function (callback) {
  sqldb.query(sql.select_course_paths, [], function (err, result) {
    if (ERR(err, callback)) return;
    async.each(
      result.rows,
      function (row, callback) {
        requireFrontend.undefQuestionServers(row.path, logger, function (err) {
          if (ERR(err, callback)) return;
          callback(null);
        });
      },
      function (err) {
        if (ERR(err, callback)) return;
        callback(null);
      },
    );
  });
};

module.exports = function (req, res, next) {
  if (req.app.get('env') === 'development') {
    undefAllCourseCode(function (err) {
      if (ERR(err, next)) return;
      next();
    });
  } else {
    next();
  }
};
