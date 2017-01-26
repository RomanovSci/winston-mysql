var assert  = require('assert');
var winston = require('winston');
var MySQL   = require('../lib');

var config = {
  user      : 'root',
  password  : 'toor',
  db        : 'database_development'
};

describe('Test winston MYSQL transport.', function() {
  this.MySQLTransport = null;

  it('Throw error if config is empty', () => {
    assert.throws(() => {
      new winston.transports.MySQL();
    }, Error);
  });

  it('Does not throw error if config is correct', () => {
    assert.doesNotThrow(() => {
      this.MySQLTransport = new winston.transports.MySQL(config);
      this.connection = this.MySQLTransport.connection;
    });
  });

  it('Connection should be open', () => {
      assert.equal(this.connection.state, 'authenticated');
  });

  it('Should write log to database', () => {
    assert.doesNotThrow(() => {
      this.MySQLTransport.log('info', 'testing message');
    });
  });
});