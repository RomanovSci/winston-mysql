module.exports = function(tableName) {

  if (!tableName) {
    throw new Error('Required table name');    
  }

  var createLogTableQuery = "CREATE TABLE IF NOT EXISTS `" + tableName.trim() + "` (\
      `id` INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,\
      `level` VARCHAR(256) NOT NULL DEFAULT 'undefined',\
      `message` TEXT NOT NULL,\
      `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP\
  ) CHARSET=latin1 ENGINE=InnoDB";

  return createLogTableQuery;
}