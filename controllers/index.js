const db = require('../utils/sqlite.js');

module.exports = {
    post: async (req, res) => {
        if (!req.body.nombre || !req.body.pais || !req.body.descripcion) {
            console.error('Bad request, not enough parameters or using wrong names')
            return res.status(400).json({error: 'Bad request, not enough parameters or using wrong names'})
        }
        db.getByName(req.body.nombre)
            .then(
                async ciudad => {
                    if (ciudad) {
                        ciudad.popularidad += 1
                        await db.update(ciudad);
                    } else {
                        await db.create(req.body);
                    }
                    ciudad = await db.getLast();
                    console.log(ciudad)
                    return res.status(200).json({ items: ciudad, total: ciudad.length });
                }
            )
            .catch(
                err => {
                    console.log(err);
                    return res.status(500).json({ error: err })
                }
            )
    },

    get: (req, res) => {
        if (!req.body.nombre) {
            console.error('Bad request, not enough parameters or using wrong names')
            return res.status(400).json({error: 'Bad request, not enough parameters or using wrong names'})
        }
        db.getByName(req.body.nombre)
            .then(
                ciudad => {
                    if (ciudad) {
                        return res.status(200).json({ items: ciudad, total: ciudad.length });
                    } else {
                        return res.sendStatus(404);
                    }
                }
            )
            .catch(
                err => {
                    console.log(err);
                    return res.status(500).json({ error: err })
                }
            )
    },

    getAll: (req, res) => {
        if (!req.params.pais) {
            console.error('Bad request, not enough parameters')
            return res.status(400).json({error: 'Bad request, not enough parameters'})
        }
        db.getByPais(req.params.pais)
            .then(
                data => {
                    if (data) {
                        return res.status(200).json({ items: data, total: data.length });
                    } else {
                        return res.status(404).json({ items: [], total: 0 });
                    }
                }
            )
            .catch(
                err => {
                    console.log(err);
                    return res.status(500).json({ error: err })
                }
            )
    },

    del: (req, res) => {
        if (!req.body.id) {
            console.error('Bad request, not enough parameters or using wrong names')
            return res.status(400).json({error: 'Bad request, not enough parameters or using wrong names'})
        }
        db.delete(req.body.id)
            .then(data => {
                return res.sendStatus(200);
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({ error: err })
            })
    },


    put: (req, res) => {
        if (!req.body.id || !req.body.nombre || !req.body.pais || !req.body.popularidad || !req.body.descripcion) {
            console.error('Bad request, not enough parameters or using wrong names')
            return res.status(400).json({error: 'Bad request, not enough parameters or using wrong names'})
        }
        db.update(req.body)
            .then(data => {
                return res.status(200).json({ items: data, total: data.length });
            })
            .catch(err => {
                console.log(err);
                return res.status(500).json({ error: err })
            })
    },

    reset: (req, res) => {
        db.reset()
            .then(data => {
                return res.sendStatus(data);
            })
            .catch(err => {
                console.log(err);
                return res.sendStatus(500);
            })
    }
}

/* No pus no voy a usar sequelize ahora, pero sí lo sé usar ire nomás que habilidad
const Ciudad = require('../utils/database').models.ciudad

module.exports = {
    post: (req, res) => {
        Ciudad.find({ where: { name: req.body.name } })
            .then(
                data => {
                    req.body = data;
                    req.body.popularidad = req.body.popularidad + 1
                    this.put(req, res);
                }
            ).catch(err => {
                Ciudad.create(req.body)
                    .then(data => {
                        return res.status(200).json({ items: data, status: 200 });
                    })
                    .catch(err => {
                        console.log(error);
                        return res.status(500).json({ error: err })
                    })
            })
    },

    get: (req, res) => {
        Ciudad.find({ where: { id: req.body.id } })
            .then(
                data => {
                    return res.status(200).json({ items: data, status: 200 });
                }
            )
            .catch(
                err => {
                    console.log(error);
                    return res.status(500).json({ error: err })
                }
            )
    },

    getAll: (req, res) => {
        Ciudad.findAll()
            .then(
                data => {
                    return res.status(200).json({ items: data, status: 200 });
                }
            )
            .catch(
                err => {
                    console.log(error);
                    return res.status(500).json({ error: err })
                }
            )
    },

    del: (req, res) => {
        Ciudad.destroy({ where: { id: req.body.id } })
            .then(data => {
                return res.status(200).json({ items: data, status: 200 });
            })
            .catch(err => {
                console.log(error);
                return res.status(500).json({ error: err })
            })
    },


    put: (req, res) => {
        Ciudad.update(
            { nombre: req.body.nombre },
            { where: { id: req.body.id } }
        )
            .then(data => {
                return res.status(200).json({ items: data, status: 200 });
            })
            .catch(err => {
                console.log(error);
                return res.status(500).json({ error: err })
            })
    }
}

*/
