var fs        = require('fs')
  , path      = require('path')
  , Sequelize = require('sequelize')
  , lodash    = require('lodash')
  , sequelize = new Sequelize('my-wallet', 'root', '', {
        host: 'localhost',
        dialect: 'mysql', //|'mariadb'|'sqlite'|'postgres'|'mssql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000
        },
        logging: false
    })
  , db        = {};

fs.readdirSync(__dirname)
  .filter(function(file) {
    return ((file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) == '.js'))
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
});

//Adiciona objetos ao db
Object.keys(db).forEach(function(modelName) {
  if (db[modelName].options.hasOwnProperty('associate')) {
    db[modelName].options.associate(db)
  }
});

//exporta sequelize
module.exports = lodash.extend({
  sequelize: sequelize,
  Sequelize: Sequelize
}, db);