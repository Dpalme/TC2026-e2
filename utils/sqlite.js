/**
 * Me marcaba un error intentando conectar a la bd de la instancia porque la versión de mariadb es 5.6 y sequelize ya sólo soporta 10+
 * Tons hice esto
 */

// Utilities we need
const fs = require("fs");

// Initialize the database
const dbFile = "./.data/ciudades.db";
const exists = fs.existsSync(dbFile);
const sqlite3 = require("sqlite3").verbose();
const dbWrapper = require("sqlite");
let db;

dbWrapper
    .open({
        filename: dbFile,
        driver: sqlite3.Database
    })
    .then(async dBase => {
        db = dBase;

        try {
            await db.run(
                "CREATE TABLE IF NOT EXISTS ciudades (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, pais TEXT, descripcion TEXT, popularidad INTEGER);"
            );
        } catch (dbError) {
            console.error(dbError);
        }
    });

module.exports = {

    getLast: async () => {
        try {
            return await db.all("SELECT * FROM ciudades ORDER BY id DESC LIMIT 1;");
        } catch (dbError) {
            console.error(dbError);
        }
    },

    getById: async id => {
        try {
            return await db.get("SELECT * FROM ciudades WHERE id=?;", id);
        } catch (dbError) {
            console.error(dbError);
        }
    },

    getByName: async nombre => {
        try {
            return await db.get("SELECT * FROM ciudades WHERE nombre=?;", nombre);
        } catch (dbError) {
            console.error(dbError);
        }
    },

    getByPais: async pais => {
        try {
            return await db.get("SELECT * FROM ciudades WHERE pais=?;", pais);
        } catch (dbError) {
            console.error(dbError);
        }
    },

    getAll: async () => {
        try {
            return await db.all("SELECT * FROM ciudades;");
        } catch (dbError) {
            console.error(dbError);
        }
    },

    create: async ciudad => {
        try {
            return await db.run(
                "INSERT INTO ciudades (nombre, pais, popularidad, descripcion) VALUES (?, ?, ?, ?);",
                [ciudad.nombre, ciudad.pais, 1, ciudad.descripcion]
            );
        } catch (dbError) {
            console.error(dbError);
        }
    },

    delete: async id => {
        try {
            await db.run("DELETE FROM ciudades WHERE id = ?;", id);

            return true;
        } catch (dbError) {
            console.error(dbError);
            return false;
        }
    },

    update: async ciudad => {
        try {
            return await db.run(
                "UPDATE ciudades SET nombre = ?, pais = ?, popularidad = ?, descripcion = ? WHERE id = ?;",
                [ciudad.nombre, ciudad.pais, ciudad.popularidad, ciudad.descripcion, ciudad.id]
            );
        } catch (dbError) {
            console.error(dbError);
            return false;
        }
    },

    reset: async () => {
        try {
            await db.run(
                "DROP TABLE IF EXISTS ciudades;"
            );
            await db.run(
                "CREATE TABLE IF NOT EXISTS ciudades (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, pais TEXT, descripcion TEXT, popularidad INTEGER);"
            );
            return 200;
        } catch (dbError) {
            console.error(dbError);
            return false;
        }
    }
};
