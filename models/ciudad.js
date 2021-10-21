const { INTEGER, STRING} = require('sequelize');
module.exports = sequelize => {
    sequelize.define('ciudad', {
        id:{
            type: INTEGER, //Varchar(30)
            autoIncrement: true,
            allowNull: false,
            primaryKey: true 
        },
        nombre:  {
            type: STRING,
            allowNull: false
        },
        pais: {
            type: STRING,
            allowNull: false
        },
        popularidad: INTEGER
    })
}