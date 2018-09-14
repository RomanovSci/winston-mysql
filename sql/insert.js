/**
 * Return insert quesry
 * @param  {String} table 
 * @param  {String} level 
 * @param  {String} msg   
 * @return {String}
 */
 module.exports = function(table, level, msg) {

  if (!table) {
    throw new Error("Table name can't be blank");
  }

  var insertQuery = "INSERT INTO " + table + " (`level`, `message`) VALUES ('" + level.trim() + "', '"+ msg.trim() + "');";

  return insertQuery;
}
