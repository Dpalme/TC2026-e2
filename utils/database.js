const Sequelize = require("sequelize")

const sequelize = new Sequelize('u3db','user3','root',{
    dialect: 'mysql',
    host: '54.198.161.35',
    define:{
        timestamps: false,
        freezeTableName : true
    }    
})

require('../models/ciudad')(sequelize)

module.exports = sequelize