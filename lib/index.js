var winston = require('winston');
var mysql   = require('mysql');
var util    = require('util');

/**
 * Constructor
 * @param options {Object} Logger options
 */
var MySQL = exports.MySQL = function(options) {
  var options = options || {};

  if (!options.user || !options.password || !options.db) {
    throw new Error("'db', 'user', 'password' params is requered for db connection");
  }

  this.unique  = options.unique || false;
  this.silent  = options.silent || false;
  this.level   = options.level  || 'info';
  this.host    = options.host   || 'localhost';
  this.table   = options.table  || 'log';
  this.db      = options.db;
  this.dbUser  = options.user;
  this.dbPswd  = options.password;
  this.sqlPath = '../sql/';

  this.connection = mysql.createConnection({
    host     : this.host,
    user     : this.dbUser,
    password : this.dbPswd,
    database : this.db
  });

  this.connection.connect();
  this.connection.query(
    require(this.sqlPath+'create')(this.table), 
    function(err, res, fields) {
      
      if (err) {
        throw err;
      }
    });
}

/** @extends winston.Transport */
util.inherits(MySQL, winston.Transport)

/**
 * Define a getter so that `winston.transports.MySQL`
 * is available and thus backwards compatible.
 */
winston.transports.MySQL = MySQL;

/**
 * Core logging method exposed to Winston. 
 * Metadata is optional.
 * 
 * @param level    {string}   Level at which to log the message.
 * @param msg      {string}   Message to log.
 * @param meta     {?Object}  Additional metadata to attach.
 * @param callback {function} Continuation to respond to when complete.
 */
MySQL.prototype.log = function(level, msg, meta, callback) {
  var self = this;
  
  if (this.silent || (this.unique && this.level != level)) {
    return callback(null, true);
  }

  // Insert log to db
  this.connection.query(
    require(this.sqlPath+'insert')(this.table, level, msg), 
    function(err, res, fields) {
      
      if (err) {
        throw err;
      }
    });
}